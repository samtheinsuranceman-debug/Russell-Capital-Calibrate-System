# Mem0 Production Memory Architecture

## Graph + Embedding Hybrid Persistent Memory Layer

**Status:** Live in Russell Labs (2026-05-19)  
**Location:** `server/mem0.ts` → 7 cloud sync procedures in `memory` router  
**API:** Mem0 Cloud REST (`https://api.mem0.ai/v1`)  
**Auth:** Token-based (`MEM0_API_KEY`)

---

## 1. Architecture Overview

### Purpose
Production-grade persistent agentic memory across all Russell Labs platforms. Replaces local-only DB storage with Mem0's graph+embedding hybrid — enabling semantic search, cross-platform resonance detection, and long-term personality/clinical pattern accumulation.

### Design Philosophy
```
Local DB (agenticMemory.ts)     Mem0 Cloud (mem0.ts)
         ↓                              ↓
    Fast cache                   Persistent semantic store
    Session-local                Cross-session, cross-platform
    Pattern synthesis            Graph relationships + embeddings
         ↓                              ↓
         └──────── Dual-Layer ──────────┘
                       ↓
              Enriched Session Context
              (Genome → DrBuddy → Mem0 → Sessions)
```

### Why Mem0 (vs. raw vector DB)
- **Graph + Embedding Hybrid**: Mem0 maintains both knowledge graph relationships AND vector embeddings — captures "Sam prefers CBT" as both a searchable vector AND a graph node linked to "therapy preferences"
- **Automatic Fact Extraction**: Send raw conversation → Mem0 extracts structured facts, preferences, relationships without manual parsing
- **Deduplication**: Same fact mentioned across sessions gets merged, not duplicated
- **Temporal Awareness**: Mem0 tracks when facts were learned and updated, enabling "what changed since last session" queries
- **Cross-Namespace Resonance**: One query surfaces connected patterns across health, wealth, consciousness, and education simultaneously

---

## 2. Namespace Architecture

### Project-Scoped User IDs
Each Russell Labs platform gets its own Mem0 namespace. All share one human identity (Samuel A.) but partition memories by domain:

| Namespace | User ID | Domain | Memory Types |
|-----------|---------|--------|--------------|
| `root` | `samuel_a_2026` | Master identity | Cross-domain patterns, meta-insights |
| `dr_buddy` | `samuel_a_dr_buddy` | Clinical/therapy | Session insights, risk levels, techniques |
| `russell_capital` | `samuel_a_russell_capital` | Wealth Genome | Dimension scores, calibration patterns |
| `church` | `samuel_a_church_morphic` | Consciousness | Morphic anchors, theological resonance |
| `weight_loss` | `samuel_a_weight_loss_genome` | Metabolic health | Adherence signals, metabolic patterns |
| `edu_genius` | `samuel_a_edu_genius` | Education | Learning style, cognitive profile |
| `med_freedom` | `samuel_a_med_freedom` | Medication tapering | Taper history, withdrawal patterns |

### Cross-Namespace Resonance Search
```
Query: "anxiety patterns affecting decision-making"
         ↓
    Promise.allSettled (parallel search all 7 namespaces)
         ↓
    Results aggregated:
    - dr_buddy: "History of generalized anxiety, responds to CBT"
    - russell_capital: "Risk aversion score 82/100, avoids financial decisions under stress"
    - church: "Anxiety dissolves during contemplative prayer (ancestral anchor)"
    - weight_loss: "Stress eating triggered by decision fatigue"
         ↓
    Unified resonance map returned to caller
```

---

## 3. Data Flow Pipelines

### Pipeline A: Wealth Genome → Mem0
```
PersonalityAssessment (200 questions, 4 sessions)
    → Session complete
    → storeGenomeToMem0({ dimensions, sessionNumber, totalScore })
    → Mem0 extracts: dimension scores, patterns, growth areas
    → Stored in russell_capital namespace
    → Available for DrBuddy enrichment in next therapy session
```

### Pipeline B: DrBuddy → Mem0
```
DrBuddy therapy session
    → Clinical insights generated (dual-AI: OpenAI + Grok)
    → storeDrBuddyToMem0({ insight, sessionId, riskLevel, techniques })
    → Mem0 extracts: therapeutic preferences, risk patterns, effective techniques
    → Stored in dr_buddy namespace
    → Surfaces in future sessions via searchMem0("previous therapy insights")
```

### Pipeline C: Morphic Resonance → Mem0
```
Session 3-4 questions (Sheldrake-infused, Q131-195)
    → Ancestral/theological/consciousness answers captured
    → storeMorphicAnchor(anchor, resonanceType)
    → Mem0 stores as church namespace memory
    → Surfaces during future calibration when resonant patterns detected
```

### Pipeline D: Cross-Platform Enrichment
```
Any platform session starts
    → crossNamespaceSearch(currentContext)
    → Returns memories from ALL namespaces ranked by relevance
    → Injected into session system prompt as enrichment context
    → User experiences continuity across platforms without repetition
```

---

## 4. API Integration Details

### REST Endpoints Used
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/memories/` | POST | Add new memories from conversation |
| `/v1/memories/search/` | POST | Semantic search within namespace |
| `/v1/memories/` | GET (with user_id) | Get all memories for namespace |
| `/v1/memories/{id}/` | GET | Get specific memory |
| `/v1/memories/{id}/` | PUT | Update memory text |
| `/v1/memories/{id}/` | DELETE | Delete specific memory |
| `/v1/memories/{id}/history/` | GET | Get memory change history |

### Error Handling & Resilience
- **15-second timeout** via AbortController on all API calls
- **Graceful degradation**: If Mem0 is down, local DB (agenticMemory.ts) continues functioning
- **Partial failure tolerance**: crossNamespaceSearch uses Promise.allSettled — if 2/7 namespaces fail, the other 5 still return results
- **No data loss**: Local DB stores everything first, Mem0 is the persistent cloud sync layer

### Metadata Enrichment
Every memory stored includes:
```json
{
  "project": "dr_buddy",
  "source": "russell_labs_platform",
  "timestamp": "2026-05-19T16:45:00.000Z",
  // Plus domain-specific metadata:
  "type": "clinical_insight",
  "riskLevel": "low",
  "techniques": ["CBT", "mindfulness"]
}
```

---

## 5. Mem0's Internal Architecture (Reverse-Engineered)

### Graph + Embedding Hybrid Model
Based on Mem0's published architecture and observed behavior:

```
Input: Raw conversation messages
         ↓
    Fact Extraction Layer (LLM-powered)
    - Extracts discrete facts, preferences, relationships
    - "I prefer morning meditation" → fact node
         ↓
    Embedding Layer (vector similarity)
    - Each fact gets a dense vector embedding
    - Enables semantic search ("relaxation techniques" finds "meditation")
         ↓
    Knowledge Graph Layer (relationship tracking)
    - Facts linked by relationships: "Sam" → prefers → "CBT"
    - Enables traversal: "What does Sam prefer?" → all preference nodes
         ↓
    Deduplication & Merge Layer
    - Same fact from different sessions → merged, not duplicated
    - Conflicting facts → newer overwrites with history preserved
         ↓
    Temporal Layer
    - created_at, updated_at tracked per memory
    - Enables "what's new since last session" queries
    - Memory decay possible (older = lower relevance unless reinforced)
```

### Why This Beats Raw Vector DB
| Feature | Raw Vector DB | Mem0 Graph+Embedding |
|---------|---------------|---------------------|
| Semantic search | Yes | Yes |
| Relationship traversal | No | Yes (knowledge graph) |
| Automatic fact extraction | No (manual chunking) | Yes (LLM-powered) |
| Deduplication | No (stores duplicates) | Yes (merge layer) |
| Temporal awareness | Manual timestamps | Built-in history tracking |
| Cross-session continuity | Manual stitching | Automatic |
| Conflict resolution | Last-write-wins | History-preserving merge |

---

## 6. Integration with Existing Systems

### Coexistence with Local Agentic Memory Bus
The local `agenticMemory.ts` system (6 procedures) remains active for:
- Fast in-session pattern synthesis (no network latency)
- Resonant pattern generation via LLM (synthesizePatterns)
- Bridge logging (memoryBridgeLogs table)
- Strength-based memory ranking (access count, recency)

Mem0 adds:
- Persistent cross-session memory (survives server restarts)
- Semantic search (not just dimension-based filtering)
- Cross-platform resonance (weight_loss memories surface in dr_buddy)
- Automatic fact extraction from raw conversations

### Future: Bidirectional Sync
Planned for next iteration:
- Local DB → Mem0 batch sync (nightly)
- Mem0 → Local DB cache refresh (on session start)
- Conflict resolution: Mem0 is source of truth, local is cache

---

## 7. Security & Privacy

### Data Classification
- **PHI Warning**: No BAA signed with Mem0 yet — do NOT store identifiable health records
- **Current safe data**: Personality scores, learning preferences, general patterns, anonymized insights
- **Blocked until BAA**: Specific diagnoses, medication names, crisis event details

### Access Control
- All Mem0 procedures require `protectedProcedure` (authenticated user only)
- API key stored as server-side secret (never exposed to client)
- No direct client → Mem0 communication (all proxied through tRPC)

---

## 8. Test Coverage

**File:** `server/mem0.test.ts` (30 tests)

| Category | Tests | Coverage |
|----------|-------|----------|
| Namespace mapping | 1 | All 7 PROJECT_IDS verified |
| addMemory | 4 | Namespace routing, metadata, defaults, errors |
| searchMemory | 3 | Correct user_id, empty results, missing field |
| getMemories | 1 | Namespace fetch |
| getMemory | 1 | Single memory by ID |
| updateMemory | 1 | PUT with text |
| deleteMemory | 1 | DELETE by ID |
| deleteAllMemories | 1 | Namespace-scoped delete |
| getMemoryHistory | 1 | History endpoint |
| storeDrBuddyInsight | 1 | Clinical insight storage |
| storeGenomeScore | 1 | Genome score storage |
| storeMorphicAnchor | 2 | All 4 resonance types |
| crossNamespaceSearch | 2 | Parallel search + partial failure |
| validateApiKey | 3 | Valid, invalid, network error |
| Authentication | 2 | Token header, missing key |
| Error handling | 3 | 500, 429, timeout |
| Namespace routing | 2 | All namespaces for add + search |

---

*Pushed: 2026-05-19 | Session: Phase 27 Mem0 Integration | Platform: Russell Labs*
