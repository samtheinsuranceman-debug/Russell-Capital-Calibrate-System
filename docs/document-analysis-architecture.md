# Document Analysis Pipeline + Multi-Source Narrative Comparison

## Architecture (Reverse-Engineered from AlterAI, Enhanced with Dual-AI)

**Status:** Live in Russell Labs (2026-05-19)  
**Location:** `server/documentAnalysis.ts` → `documentAnalysis.analyzeDocument` + `documentAnalysis.compareNarratives`

---

## 1. Document Analysis Pipeline

### Purpose
Critical analysis of medical/pharmaceutical literature. Detects conflicts of interest, statistical manipulation, underpowered studies, p-hacking, conclusion-data misalignment, and funding bias.

### Flow
```
PDF/Text Input → Dual-AI Analysis (OpenAI + Grok in parallel)
                     ↓
              Merge Strategy: Take MORE SKEPTICAL assessment
                     ↓
              Structured Output:
              - Conflict of Interest Detection (severity: none→critical)
              - Statistical Validity Score (0-100)
              - Sample Size Adequacy
              - Conclusion-Data Alignment Score
              - Bias Assessment (selection, publication, reporting, attrition)
              - Clinical Relevance (NNT/NNH, generalizability)
              - Verdict (trustworthiness 0-100, recommendation)
```

### Merge Logic (Patent-Quality Innovation)
- **Lower trustworthiness wins** (more skeptical)
- **Higher COI severity wins** (more cautious)
- **Lower statistical validity wins**
- **All issues/discrepancies merged** (union, not intersection)
- **More skeptical recommendation wins** (strong_accept < ... < reject)
- Grok specifically prompted for pharmaceutical industry influence detection

### Document Types Supported
- Clinical trials (RCT)
- Meta-analyses
- Observational studies
- Case reports
- Review articles
- Press releases (pharma PR detection)
- FDA labels
- Patient leaflets

---

## 2. Multi-Source Narrative Comparison Engine

### Purpose
Compare how different source types frame the same health/pharma topic. Identify discrepancies between official narratives and actual evidence.

### 6 Source Perspectives
1. **Pharma-funded** — industry research and messaging
2. **Independent** — researchers with no pharma funding
3. **Government** — FDA, CDC, EMA regulatory positions
4. **Academic** — university research institutions
5. **Media** — mainstream coverage and framing
6. **Patient advocacy** — lived experience and patient groups

### Flow
```
Topic Input → Dual-AI Analysis (OpenAI structured + Grok uncensored)
                   ↓
            Merge Strategy:
            - Grok's suppressed evidence merged in
            - Grok's alternative narratives merged in
            - Grok's "follow the money" analysis preferred (more specific)
            - All discrepancies unioned
            - Red flags merged
                   ↓
            Output:
            - Consensus points (what all agree on)
            - Discrepancies (with evidence weight)
            - Narrative framing (official vs alternative vs suppressed)
            - Truth assessment (confidence 0-100)
            - Patient implications (actionable insights + doctor questions)
```

### Key Innovation
Grok is specifically prompted to be "especially direct about pharmaceutical industry manipulation, regulatory capture, and suppressed evidence" — creating a truth-seeking layer that OpenAI's safety training may filter.

---

## Integration Points

| System | Connection |
|--------|-----------|
| MedFreedom Engine | Analyze clinical trials supporting/opposing specific medications |
| DrBuddy | Compare treatment narratives for patient's specific conditions |
| Pharmacovigilance (#22) | Feed document analysis into adverse reaction signal detection |
| Agentic Memory Bus | Store analysis results as persistent memory entries |
| Genome Reveal | Contextualize genetic research quality for personalized insights |

---

## AlterAI vs Russell Labs Comparison

| Capability | AlterAI | Russell Labs |
|-----------|---------|-------------|
| Document analysis | Basic PDF critique | Dual-AI skeptical merge with COI detection |
| Narrative comparison | Multi-source search | 6-perspective framework with pharma bias detection |
| Memory persistence | Yes (their core) | Agentic Memory Bus (Altar-style) |
| Health integration | None | DrBuddy + MedFreedom + Pharmacovigilance |
| Voice interface | None | 8s timed captions + morphic resonance particles |
| Uncensored analysis | Yes (their differentiator) | Grok layer provides uncensored truth-seeking |

---

## Filing Priority
- **Document Analysis Pipeline**: Utility patent — "System and method for dual-AI skeptical merge analysis of medical literature with automated conflict of interest severity escalation"
- **Narrative Comparison Engine**: Utility patent — "System and method for multi-perspective health narrative comparison using asymmetric AI prompting for suppressed evidence detection"

---

*Pushed: 2026-05-19 | Session: Sheldrake + AlterAI Integration Sprint*
