# Self-Hosted Mem0 Clone — Architecture Specification

**Status:** PLANNED — Q3 2026 Deployment Target  
**Priority:** 10/10 — Data sovereignty + infinite scale + zero credit limits  
**Author:** Russell Labs Engineering  
**Date:** May 19, 2026

---

## Executive Summary

This document specifies a 1:1 functional clone of Mem0.ai's graph+embedding hybrid memory system, deployed entirely on our own infrastructure. The goal is full data sovereignty, zero dependency on mem0.ai credits, and bidirectional integration with our existing Genome/DrBuddy/Church pipelines.

The self-hosted system maintains **exact API parity** with Mem0 Cloud, enabling a zero-downtime migration by simply swapping the `MEM0_BASE_URL` environment variable.

---

## Architecture Overview

Mem0's core architecture (reverse-engineered from SDK + public documentation + API behavior):

| Layer | Mem0 Cloud | Self-Hosted Equivalent |
|-------|-----------|----------------------|
| Vector Store | Proprietary (likely Qdrant/Pinecone) | **Qdrant** (fastest, production-proven) |
| Embedding Model | OpenAI text-embedding-3-small | **nomic-embed-text** via Ollama (local) or **all-MiniLM-L6-v2** (HuggingFace) |
| Graph Layer | Neo4j-style relationship extraction | **NetworkX** + persisted to Qdrant metadata or **Neo4j Community** |
| Memory Extraction | LLM-based fact extraction from conversations | **Grok/Claude** via OpenRouter for extraction |
| API Layer | Proprietary REST API | **FastAPI** with exact endpoint parity |
| Cache | Unknown (likely Redis) | **Redis** for hot-path caching |
| Search | Hybrid (vector similarity + graph traversal) | **Qdrant hybrid search** + NetworkX graph walk |

---

## Detailed Component Specification

### 1. Vector Layer — Qdrant

Qdrant is the primary vector store. Selected over alternatives for:
- Fastest query latency (sub-10ms for 1M vectors)
- Native payload filtering (replaces metadata queries)
- Built-in multi-tenancy via collection partitioning
- Rust-based, single binary deployment

**Collection Schema:**

```json
{
  "collection_name": "samuel_memories",
  "vectors": {
    "size": 768,
    "distance": "Cosine"
  },
  "payload_schema": {
    "user_id": "keyword",
    "project": "keyword",
    "memory_text": "text",
    "source": "keyword",
    "timestamp": "datetime",
    "event_type": "keyword",
    "graph_edges": "keyword[]",
    "metadata": "json"
  }
}
```

**Namespace Isolation:** Each project namespace maps to a Qdrant partition filter:
```python
PROJECT_IDS = {
    "root": "samuel_a_2026",
    "dr_buddy": "samuel_a_dr_buddy",
    "russell_capital": "samuel_a_russell_capital",
    "church": "samuel_a_church_morphic",
    "weight_loss": "samuel_a_weight_loss_genome",
    "edu_genius": "samuel_a_edu_genius",
    "med_freedom": "samuel_a_med_freedom",
    "genome": "samuel_a_genome_scoring",
}
```

### 2. Embedding Model — Local Inference

**Primary:** `nomic-embed-text` via Ollama (768 dimensions, Apache 2.0 license)
**Fallback:** `all-MiniLM-L6-v2` via sentence-transformers (384 dimensions, faster)

```python
# Ollama embedding (preferred — runs on same Docker network)
import httpx

async def embed(text: str) -> list[float]:
    response = await httpx.post(
        "http://ollama:11434/api/embeddings",
        json={"model": "nomic-embed-text", "prompt": text}
    )
    return response.json()["embedding"]
```

### 3. Graph Layer — Relationship Extraction

Mem0 extracts entities and relationships from memories. We replicate this with:

**Entity Extraction Pipeline:**
1. LLM extracts (subject, predicate, object) triples from memory text
2. Triples stored as Qdrant payload metadata (`graph_edges`)
3. NetworkX in-memory graph built on startup for traversal
4. Optional: Neo4j Community Edition for persistent graph queries

**Example Graph Edges:**
```
Samuel → diet → vegetarian
Samuel → allergy → nut
Samuel → genome → MTHFR_variant
Samuel → weight_goal → 185_lbs_dec_2026
Samuel → medication → sertraline (tapering)
Samuel → therapy → CBT + mindfulness
```

**Extraction Prompt:**
```
Extract all factual relationships from this memory as (subject, predicate, object) triples.
Return JSON array of {"subject": "", "predicate": "", "object": ""}.
Focus on: preferences, medical facts, goals, relationships, decisions.
```

### 4. Memory Extraction — LLM-Based Fact Distillation

When `add()` is called with conversation messages, the system:

1. Sends messages to LLM with extraction prompt
2. LLM returns distilled facts/preferences/decisions
3. Each fact becomes a separate memory entry (vector + graph edges)
4. Deduplication: cosine similarity > 0.95 against existing memories → UPDATE instead of ADD

**Extraction Flow:**
```
Input: [{"role": "user", "content": "I'm vegetarian and allergic to nuts"}]
  ↓ LLM Extraction
Output: [
  {"memory": "User is vegetarian", "entities": [("Samuel", "diet", "vegetarian")]},
  {"memory": "User has nut allergy", "entities": [("Samuel", "allergy", "nuts")]}
]
  ↓ Embed + Store
Qdrant: 2 vectors with payload + graph edges
```

### 5. API Layer — FastAPI with Exact Endpoint Parity

```python
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Mem0 Self-Hosted Clone", version="1.0.0")

# Exact API parity with https://api.mem0.ai/v1/

@app.post("/v1/memories/")
async def add_memories(request: AddMemoryRequest, authorization: str = Header(...)):
    """Add memories from conversation — extracts facts via LLM"""
    ...

@app.post("/v1/memories/search/")
async def search_memories(request: SearchRequest, authorization: str = Header(...)):
    """Semantic search across memories for a user_id"""
    ...

@app.get("/v1/memories/{memory_id}/")
async def get_memory(memory_id: str, authorization: str = Header(...)):
    """Get a specific memory by ID"""
    ...

@app.put("/v1/memories/{memory_id}/")
async def update_memory(memory_id: str, request: UpdateRequest, authorization: str = Header(...)):
    """Update a memory's text content"""
    ...

@app.delete("/v1/memories/{memory_id}/")
async def delete_memory(memory_id: str, authorization: str = Header(...)):
    """Delete a specific memory"""
    ...

@app.delete("/v1/memories/")
async def delete_all_memories(request: DeleteAllRequest, authorization: str = Header(...)):
    """Delete all memories for a user_id"""
    ...

@app.get("/v1/memories/{memory_id}/history/")
async def get_memory_history(memory_id: str, authorization: str = Header(...)):
    """Get change history for a memory"""
    ...
```

### 6. Hybrid Search — Vector + Graph

When `search()` is called:

1. **Vector Search:** Embed query → Qdrant cosine similarity search (top-K)
2. **Graph Expansion:** For top results, traverse graph edges to find connected memories
3. **Re-ranking:** Combine vector score (0.7 weight) + graph proximity (0.3 weight)
4. **Return:** Merged, deduplicated, scored results

```python
async def hybrid_search(query: str, user_id: str, limit: int = 10):
    # Phase 1: Vector similarity
    query_vector = await embed(query)
    vector_results = await qdrant.search(
        collection="samuel_memories",
        query_vector=query_vector,
        query_filter={"must": [{"key": "user_id", "match": {"value": user_id}}]},
        limit=limit * 2,
    )
    
    # Phase 2: Graph expansion
    graph_expanded = set()
    for result in vector_results[:5]:
        edges = result.payload.get("graph_edges", [])
        for edge in edges:
            neighbors = graph.neighbors(edge)
            graph_expanded.update(neighbors)
    
    # Phase 3: Re-rank
    combined = rerank(vector_results, graph_expanded, weights=(0.7, 0.3))
    return combined[:limit]
```

---

## Docker Compose Deployment

```yaml
version: "3.8"

services:
  # Vector Store
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage
    environment:
      - QDRANT__SERVICE__GRPC_PORT=6334
    restart: unless-stopped

  # Local Embedding Model
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped

  # Cache Layer
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # API Server
  mem0-api:
    build: ./mem0-clone
    ports:
      - "8100:8100"
    environment:
      - QDRANT_URL=http://qdrant:6333
      - OLLAMA_URL=http://ollama:11434
      - REDIS_URL=redis://redis:6379
      - LLM_API_KEY=${OPENROUTER_API_KEY}
      - LLM_BASE_URL=https://openrouter.ai/api/v1
      - LLM_MODEL=anthropic/claude-sonnet-4-20250514
      - AUTH_TOKEN=${MEM0_SELF_HOSTED_TOKEN}
    depends_on:
      - qdrant
      - ollama
      - redis
    restart: unless-stopped

  # Optional: Graph Database
  neo4j:
    image: neo4j:5-community
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/${NEO4J_PASSWORD}
    volumes:
      - neo4j_data:/data
    restart: unless-stopped

volumes:
  qdrant_data:
  ollama_data:
  redis_data:
  neo4j_data:
```

---

## Migration Script — Cloud → Self-Hosted

Exports all current Mem0 Cloud memories and imports them into the self-hosted instance in under 60 seconds.

```python
#!/usr/bin/env python3
"""
mem0_migration.py — Export Mem0 Cloud → Import Self-Hosted
Target: < 60 seconds for full migration
"""
import asyncio
import httpx
import os
from datetime import datetime

CLOUD_API_KEY = os.getenv("MEM0_API_KEY")
CLOUD_BASE = "https://api.mem0.ai/v1"
SELF_HOSTED_BASE = os.getenv("MEM0_SELF_HOSTED_URL", "http://localhost:8100/v1")
SELF_HOSTED_TOKEN = os.getenv("MEM0_SELF_HOSTED_TOKEN")

PROJECT_IDS = {
    "root": "samuel_a_2026",
    "dr_buddy": "samuel_a_dr_buddy",
    "russell_capital": "samuel_a_russell_capital",
    "church": "samuel_a_church_morphic",
    "weight_loss": "samuel_a_weight_loss_genome",
    "edu_genius": "samuel_a_edu_genius",
    "med_freedom": "samuel_a_med_freedom",
    "genome": "samuel_a_genome_scoring",
}

async def export_namespace(client: httpx.AsyncClient, user_id: str) -> list:
    """Export all memories for a namespace from Mem0 Cloud"""
    response = await client.post(
        f"{CLOUD_BASE}/memories/",
        headers={"Authorization": f"Token {CLOUD_API_KEY}"},
        json={"user_id": user_id},
    )
    return response.json().get("results", [])

async def import_memory(client: httpx.AsyncClient, memory: dict):
    """Import a single memory into self-hosted instance"""
    await client.post(
        f"{SELF_HOSTED_BASE}/memories/import",
        headers={"Authorization": f"Token {SELF_HOSTED_TOKEN}"},
        json={
            "id": memory["id"],
            "memory": memory["memory"],
            "user_id": memory["user_id"],
            "metadata": memory.get("metadata", {}),
            "created_at": memory.get("created_at"),
        },
    )

async def migrate():
    start = datetime.now()
    total = 0
    
    async with httpx.AsyncClient(timeout=30) as client:
        for project, user_id in PROJECT_IDS.items():
            print(f"Exporting {project} ({user_id})...")
            memories = await export_namespace(client, user_id)
            print(f"  → {len(memories)} memories found")
            
            # Batch import
            tasks = [import_memory(client, m) for m in memories]
            await asyncio.gather(*tasks)
            total += len(memories)
            print(f"  ✅ Imported {len(memories)} memories")
    
    elapsed = (datetime.now() - start).total_seconds()
    print(f"\n{'='*50}")
    print(f"Migration complete: {total} memories in {elapsed:.1f}s")
    print(f"{'='*50}")

if __name__ == "__main__":
    asyncio.run(migrate())
```

---

## Why 30x Better Than Mem0 Cloud

| Dimension | Mem0 Cloud | Self-Hosted |
|-----------|-----------|-------------|
| Data Sovereignty | Third-party servers | Our infrastructure, our rules |
| Credit Limits | Pay per memory/search | Unlimited — fixed infrastructure cost |
| Latency | ~200ms (network hop) | ~10ms (local Qdrant) |
| Scale | Throttled by plan | Horizontal scaling via Qdrant sharding |
| Customization | Fixed extraction pipeline | Custom LLM prompts, custom graph logic |
| Integration | REST API only | Direct Qdrant access + REST API |
| Audit Trail | Limited history | Full version control on every memory |
| Offline Mode | Impossible | Works without internet |
| Model Choice | Locked to their embeddings | Any embedding model (swap freely) |
| Graph Depth | Unknown | Full Neo4j/NetworkX — unlimited traversal |

---

## Implementation Timeline

| Phase | Target | Deliverable |
|-------|--------|-------------|
| Phase 1 | June 2026 | Docker compose + Qdrant + FastAPI skeleton |
| Phase 2 | July 2026 | LLM extraction pipeline + embedding + search |
| Phase 3 | August 2026 | Graph layer + hybrid search + migration script |
| Phase 4 | September 2026 | Production deployment + Russell Labs URL swap |

---

## Switchover Protocol

The migration is designed for zero-downtime switchover:

1. Run migration script (exports cloud → imports self-hosted)
2. Verify memory counts match across all 8 namespaces
3. Run search quality tests (compare top-5 results for 20 benchmark queries)
4. Update `MEM0_BASE_URL` in Russell Labs environment variables
5. Monitor for 24 hours, keep cloud as read-only fallback
6. Decommission cloud subscription after 7 days stable

---

## Security Considerations

- All data encrypted at rest (Qdrant volume encryption)
- TLS between all services (internal Docker network + external HTTPS)
- Token-based auth matching Mem0 Cloud's `Authorization: Token` header
- Network isolation: Qdrant/Redis/Ollama not exposed externally
- Backup: Daily Qdrant snapshots to S3 (encrypted)

---

## Monitoring & Observability

- Prometheus metrics on all services (latency, throughput, error rates)
- Grafana dashboards for memory growth, search quality, embedding latency
- Alerting: memory count drift > 5% between cloud and self-hosted during transition
- Health endpoint: `GET /health` returns service status + memory count per namespace
