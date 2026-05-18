import { Router } from "express";
import type { Request, Response } from "express";
import * as db from "./db.js";

const router = Router();

// ============ CALIBRATION API ============

router.post("/calibration/start", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, specialty, practiceType, sessionType } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let client = await db.getClientByEmail(email);
    if (!client) {
      const clientId = await db.createClient({
        firstName: firstName || "Unknown",
        lastName: lastName || "Unknown",
        email,
        phone: phone || null,
        specialty: specialty || null,
        practiceType: practiceType || null,
        status: "lead",
      });
      client = await db.getClientById(clientId);
    }

    if (!client) {
      return res.status(500).json({ error: "Failed to create client" });
    }

    const sessionId = await db.createCalibrationSession({
      clientId: client.id,
      sessionType: sessionType || "quick",
      state: "initialized",
      currentStep: 0,
      totalSteps: 10,
    });

    await db.logBehavioralEvent({
      clientId: client.id,
      sessionId,
      eventType: "session_started",
      eventCategory: "conversion",
      eventData: { sessionType, source: req.headers.referer },
    });

    res.json({ success: true, sessionId, clientId: client.id });
  } catch (error: any) {
    console.error("[Calibration] Start error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/calibration/respond", async (req: Request, res: Response) => {
  try {
    const { sessionId, questionId, questionCategory, responseValue, responseType, responseTimeMs, sequenceOrder } = req.body;

    await db.saveSessionResponse({
      sessionId,
      questionId: questionId || `q_${sequenceOrder}`,
      questionCategory: questionCategory || "values",
      responseValue: String(responseValue),
      responseType: responseType || "choice",
      responseTimeMs: responseTimeMs || null,
      sequenceOrder: sequenceOrder || 1,
    });

    // Map question category to session state
    const stateMap: Record<string, string> = {
      values: "values_discovery",
      risk: "risk_assessment",
      goals: "goals_timeline",
      decision_style: "decision_style",
      sensory: "breathing_calibration",
      future_self: "future_self_activation",
    };
    const newState = stateMap[questionCategory] || "values_discovery";
    await db.updateCalibrationSessionState(sessionId, newState, sequenceOrder || 1);

    res.json({ success: true });
  } catch (error: any) {
    console.error("[Calibration] Respond error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/calibration/complete", async (req: Request, res: Response) => {
  try {
    const { sessionId, clientId, genomeType, scores, durationSeconds } = req.body;

    await db.completeCalibrationSession(sessionId, durationSeconds || 0);

    // Get genome metadata for the type
    const genomeMeta = GENOME_METADATA[genomeType] || GENOME_METADATA.quiet_strategist;

    const genomeId = await db.createWealthGenomeProfile({
      clientId,
      sessionId,
      genomeType: genomeType || "quiet_strategist",
      genomeDisplayName: genomeMeta.displayName,
      coreEssence: genomeMeta.coreEssence,
      strategyTilt: genomeMeta.strategyTilt,
      iulAggressiveness: genomeMeta.iul,
      stocksBondsAggressiveness: genomeMeta.stocksBonds,
      realEstateAggressiveness: genomeMeta.realEstate,
      cryptoAggressiveness: genomeMeta.crypto,
      overallProfile: genomeMeta.overallProfile,
      valuesScore: scores?.values || null,
      riskScore: scores?.risk || null,
      goalsScore: scores?.goals || null,
      decisionStyleScore: scores?.decisionStyle || null,
    });

    // Generate strategy recommendations
    const strategies = getStrategiesForGenome(genomeType);
    if (strategies.length > 0) {
      await db.createStrategyRecommendations(
        strategies.map((s, i) => ({
          clientId,
          genomeProfileId: genomeId,
          strategyType: s.type,
          aggressivenessLevel: s.aggressiveness,
          allocationPercentage: s.allocation,
          rationale: s.rationale,
          sequenceOrder: i + 1,
        }))
      );
    }

    await db.logBehavioralEvent({
      clientId,
      sessionId,
      eventType: "calibration_completed",
      eventCategory: "conversion",
      eventData: { genomeType, durationSeconds },
    });

    res.json({
      success: true,
      genomeId,
      genomeType,
      genomeMeta,
      strategies,
    });
  } catch (error: any) {
    console.error("[Calibration] Complete error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/calibration/session/:id", async (req: Request, res: Response) => {
  try {
    const session = await db.getCalibrationSession(parseInt(req.params.id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const responses = await db.getSessionResponses(session.id);
    res.json({ success: true, session, responses });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CLIENT ENDPOINTS ============

router.get("/clients/by-email/:email", async (req: Request, res: Response) => {
  try {
    const client = await db.getClientByEmail(decodeURIComponent(req.params.email));
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ success: true, client });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/clients/:id/genome", async (req: Request, res: Response) => {
  try {
    const genome = await db.getClientWealthGenome(parseInt(req.params.id));
    if (!genome) {
      return res.status(404).json({ error: "No genome profile found" });
    }
    res.json({ success: true, genome });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/clients/:id/strategies", async (req: Request, res: Response) => {
  try {
    const strategies = await db.getClientStrategies(parseInt(req.params.id));
    res.json({ success: true, strategies });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ADVISOR ENDPOINTS ============

router.post("/advisor/notes", async (req: Request, res: Response) => {
  try {
    const { clientId, advisorId, noteType, content, isPrivate } = req.body;
    const noteId = await db.createAdvisorNote({
      clientId,
      advisorId: advisorId || 1,
      noteType: noteType || "general",
      content,
      isPrivate: isPrivate || false,
    });
    res.json({ success: true, noteId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/advisor/notes/:clientId", async (req: Request, res: Response) => {
  try {
    const notes = await db.getClientAdvisorNotes(parseInt(req.params.clientId));
    res.json({ success: true, notes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============ GENOME METADATA ============

const GENOME_METADATA: Record<string, {
  displayName: string;
  coreEssence: string;
  strategyTilt: string;
  iul: number;
  stocksBonds: number;
  realEstate: number;
  crypto: number;
  overallProfile: string;
}> = {
  quiet_strategist: {
    displayName: "The Quiet Strategist",
    coreEssence: "You build wealth through patience, precision, and deliberate action. Your power lies in seeing what others miss.",
    strategyTilt: "Conservative growth with strategic tax optimization",
    iul: 8, stocksBonds: 5, realEstate: 6, crypto: 2,
    overallProfile: "conservative_growth",
  },
  legacy_builder: {
    displayName: "The Legacy Builder",
    coreEssence: "Your wealth serves a purpose beyond yourself. Every decision is measured against its multi-generational impact.",
    strategyTilt: "Generational wealth transfer and dynasty planning",
    iul: 9, stocksBonds: 4, realEstate: 7, crypto: 1,
    overallProfile: "legacy_focused",
  },
  freedom_architect: {
    displayName: "The Freedom Architect",
    coreEssence: "Financial independence is your north star. You design systems that generate freedom, not obligations.",
    strategyTilt: "Aggressive growth with income independence focus",
    iul: 7, stocksBonds: 6, realEstate: 7, crypto: 5,
    overallProfile: "growth_aggressive",
  },
  steady_guardian: {
    displayName: "The Steady Guardian",
    coreEssence: "Protection and certainty are your foundations. You sleep well knowing your family is secured against any storm.",
    strategyTilt: "Capital preservation with guaranteed income streams",
    iul: 9, stocksBonds: 7, realEstate: 4, crypto: 1,
    overallProfile: "conservative_stable",
  },
  bold_weaver: {
    displayName: "The Bold Weaver",
    coreEssence: "You see connections others miss and act decisively. Complexity is your playground, not your enemy.",
    strategyTilt: "Sophisticated leverage and multi-strategy approach",
    iul: 6, stocksBonds: 7, realEstate: 5, crypto: 7,
    overallProfile: "aggressive_diversified",
  },
  intuitive_alchemist: {
    displayName: "The Intuitive Alchemist",
    coreEssence: "Your gut has made you millions. You trust your instincts and they reward you with outsized returns.",
    strategyTilt: "Flexible allocation following market intuition",
    iul: 5, stocksBonds: 6, realEstate: 7, crypto: 4,
    overallProfile: "moderate_flexible",
  },
  family_sovereign: {
    displayName: "The Family Sovereign",
    coreEssence: "Your family is your empire. Every financial structure serves the sovereignty of your household.",
    strategyTilt: "Family-controlled structures and infinite banking",
    iul: 10, stocksBonds: 3, realEstate: 8, crypto: 1,
    overallProfile: "family_controlled",
  },
  calculated_creator: {
    displayName: "The Calculated Creator",
    coreEssence: "Numbers don't lie, and neither do you. Every basis point matters in your precisely engineered wealth machine.",
    strategyTilt: "Quantitative optimization and tax arbitrage",
    iul: 7, stocksBonds: 8, realEstate: 6, crypto: 3,
    overallProfile: "analytical_optimized",
  },
  resilient_optimizer: {
    displayName: "The Resilient Optimizer",
    coreEssence: "You've weathered storms and emerged stronger. Your wealth strategy is anti-fragile by design.",
    strategyTilt: "Diversified resilience with systematic optimization",
    iul: 8, stocksBonds: 6, realEstate: 5, crypto: 2,
    overallProfile: "moderate_resilient",
  },
  sovereign_minimalist: {
    displayName: "The Sovereign Minimalist",
    coreEssence: "Maximum impact, minimum complexity. Your wealth works for you, not the other way around.",
    strategyTilt: "Simplified high-efficiency structures",
    iul: 9, stocksBonds: 5, realEstate: 3, crypto: 1,
    overallProfile: "simple_efficient",
  },
};

// ============ STRATEGY GENERATION ============

function getStrategiesForGenome(genomeType: string) {
  const strategyMap: Record<string, Array<{
    type: string;
    aggressiveness: string;
    allocation: string;
    rationale: string;
  }>> = {
    quiet_strategist: [
      { type: "iul", aggressiveness: "moderate", allocation: "35.00", rationale: "Tax-free growth with downside protection matches your methodical approach" },
      { type: "roth_ladder", aggressiveness: "low_moderate", allocation: "25.00", rationale: "Systematic tax-bracket optimization over 5-year windows" },
      { type: "real_estate", aggressiveness: "low_moderate", allocation: "20.00", rationale: "Passive syndication provides diversification without active management" },
      { type: "stocks_bonds", aggressiveness: "moderate", allocation: "20.00", rationale: "Index-based core for steady compounding" },
    ],
    legacy_builder: [
      { type: "iul", aggressiveness: "mod_aggressive", allocation: "40.00", rationale: "Dynasty-style policy for generational wealth transfer" },
      { type: "captive_insurance", aggressiveness: "moderate", allocation: "20.00", rationale: "Tax-advantaged risk management protecting legacy assets" },
      { type: "real_estate", aggressiveness: "moderate", allocation: "25.00", rationale: "Family trust structure builds tangible legacy" },
      { type: "infinite_banking", aggressiveness: "moderate", allocation: "15.00", rationale: "Whole life foundation for family banking system" },
    ],
    freedom_architect: [
      { type: "iul", aggressiveness: "aggressive", allocation: "30.00", rationale: "Maximum-funded policy for tax-free retirement income" },
      { type: "crypto", aggressiveness: "aggressive", allocation: "15.00", rationale: "Asymmetric upside aligned with independence mindset" },
      { type: "real_estate", aggressiveness: "mod_aggressive", allocation: "30.00", rationale: "Short-term rentals create location-independent income" },
      { type: "stocks_bonds", aggressiveness: "mod_aggressive", allocation: "25.00", rationale: "Growth-oriented portfolio for wealth acceleration" },
    ],
    steady_guardian: [
      { type: "iul", aggressiveness: "cautious", allocation: "40.00", rationale: "Guaranteed policy with living benefits for worst-case protection" },
      { type: "stocks_bonds", aggressiveness: "cautious", allocation: "30.00", rationale: "Municipal bonds provide tax-free stable income" },
      { type: "real_estate", aggressiveness: "low_moderate", allocation: "20.00", rationale: "Triple-net leases for reliable income" },
      { type: "annuity", aggressiveness: "very_low", allocation: "10.00", rationale: "Guaranteed income floor for peace of mind" },
    ],
    bold_weaver: [
      { type: "iul", aggressiveness: "aggressive", allocation: "25.00", rationale: "Premium-financed policy maximizing leverage" },
      { type: "stocks_bonds", aggressiveness: "aggressive", allocation: "25.00", rationale: "Concentrated growth in disruptive companies" },
      { type: "crypto", aggressiveness: "very_aggressive", allocation: "20.00", rationale: "DeFi protocols for enhanced yields" },
      { type: "real_estate", aggressiveness: "mod_aggressive", allocation: "20.00", rationale: "Value-add opportunities with leverage" },
      { type: "premium_financing", aggressiveness: "aggressive", allocation: "10.00", rationale: "Sophisticated leverage strategy" },
    ],
    intuitive_alchemist: [
      { type: "iul", aggressiveness: "moderate", allocation: "30.00", rationale: "Flexible premium allows variable contributions based on timing" },
      { type: "real_estate", aggressiveness: "mod_aggressive", allocation: "30.00", rationale: "Value-add properties reward pattern recognition" },
      { type: "stocks_bonds", aggressiveness: "moderate", allocation: "25.00", rationale: "Thematic ETFs channel market intuitions" },
      { type: "crypto", aggressiveness: "moderate", allocation: "15.00", rationale: "Emerging asset class for intuitive traders" },
    ],
    family_sovereign: [
      { type: "infinite_banking", aggressiveness: "moderate", allocation: "35.00", rationale: "Family bank system for lending and wealth recycling" },
      { type: "captive_insurance", aggressiveness: "moderate", allocation: "20.00", rationale: "Multi-entity captive keeps premiums in family" },
      { type: "real_estate", aggressiveness: "moderate", allocation: "30.00", rationale: "Family LP with valuation discounts" },
      { type: "iul", aggressiveness: "mod_aggressive", allocation: "15.00", rationale: "Additional tax-free growth layer" },
    ],
    calculated_creator: [
      { type: "iul", aggressiveness: "moderate", allocation: "30.00", rationale: "Split-dollar arrangement with calculated cost recovery" },
      { type: "stocks_bonds", aggressiveness: "mod_aggressive", allocation: "30.00", rationale: "Quantitative multi-factor equity strategy" },
      { type: "real_estate", aggressiveness: "moderate", allocation: "25.00", rationale: "1031 exchange chain with precise timing" },
      { type: "cost_segregation", aggressiveness: "moderate", allocation: "15.00", rationale: "Accelerated depreciation for tax optimization" },
    ],
    resilient_optimizer: [
      { type: "iul", aggressiveness: "moderate", allocation: "35.00", rationale: "Survivorship policy optimizing estate transfer" },
      { type: "roth_ladder", aggressiveness: "moderate", allocation: "25.00", rationale: "Mega backdoor Roth maximizing tax-free space" },
      { type: "stocks_bonds", aggressiveness: "moderate", allocation: "25.00", rationale: "TIPS ladder for inflation-protected returns" },
      { type: "real_estate", aggressiveness: "low_moderate", allocation: "15.00", rationale: "Stable income properties for resilient foundation" },
    ],
    sovereign_minimalist: [
      { type: "iul", aggressiveness: "moderate", allocation: "45.00", rationale: "Single-premium policy for maximum simplicity" },
      { type: "stocks_bonds", aggressiveness: "moderate", allocation: "35.00", rationale: "Three-fund portfolio with auto-rebalancing" },
      { type: "real_estate", aggressiveness: "low_moderate", allocation: "20.00", rationale: "REIT allocation for hands-off real estate" },
    ],
  };

  return strategyMap[genomeType] || strategyMap.quiet_strategist;
}

export default router;
