import * as db from "./db.js";

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
    coreEssence: "You design systems that generate wealth without consuming your time. Freedom is your ultimate currency.",
    strategyTilt: "Passive income streams and lifestyle optimization",
    iul: 7, stocksBonds: 3, realEstate: 8, crypto: 4,
    overallProfile: "passive_income",
  },
  steady_guardian: {
    displayName: "The Steady Guardian",
    coreEssence: "You protect what matters most. Your approach to wealth is methodical, secure, and deeply responsible.",
    strategyTilt: "Capital preservation with steady income generation",
    iul: 9, stocksBonds: 7, realEstate: 5, crypto: 1,
    overallProfile: "capital_preservation",
  },
  bold_weaver: {
    displayName: "The Bold Weaver",
    coreEssence: "You see connections others cannot. Your wealth strategy weaves together unconventional opportunities into a powerful tapestry.",
    strategyTilt: "Multi-strategy integration with calculated risk",
    iul: 6, stocksBonds: 5, realEstate: 7, crypto: 6,
    overallProfile: "multi_strategy",
  },
  intuitive_alchemist: {
    displayName: "The Intuitive Alchemist",
    coreEssence: "You transform ordinary opportunities into extraordinary wealth. Your intuition guides you to hidden value.",
    strategyTilt: "Alternative investments and emerging opportunities",
    iul: 5, stocksBonds: 3, realEstate: 6, crypto: 8,
    overallProfile: "alternative_growth",
  },
  family_sovereign: {
    displayName: "The Family Sovereign",
    coreEssence: "Your family is your kingdom. Every financial decision strengthens the dynasty you are building.",
    strategyTilt: "Family wealth protection and education funding",
    iul: 9, stocksBonds: 6, realEstate: 7, crypto: 1,
    overallProfile: "family_dynasty",
  },
  calculated_creator: {
    displayName: "The Calculated Creator",
    coreEssence: "You create wealth through innovation and precision. Every risk is measured, every opportunity is engineered.",
    strategyTilt: "Growth through innovation with risk management",
    iul: 6, stocksBonds: 4, realEstate: 5, crypto: 7,
    overallProfile: "innovation_growth",
  },
  resilient_optimizer: {
    displayName: "The Resilient Optimizer",
    coreEssence: "You find efficiency in everything. Your wealth grows because you eliminate waste and maximize every dollar.",
    strategyTilt: "Tax optimization and efficiency maximization",
    iul: 8, stocksBonds: 6, realEstate: 6, crypto: 3,
    overallProfile: "tax_optimized",
  },
  sovereign_minimalist: {
    displayName: "The Sovereign Minimalist",
    coreEssence: "Less is more. You achieve financial sovereignty through simplicity, clarity, and focused execution.",
    strategyTilt: "Simplified high-impact strategies",
    iul: 7, stocksBonds: 7, realEstate: 4, crypto: 2,
    overallProfile: "simplified_growth",
  },
};

// ============ STRATEGY GENERATION HELPER ============
function getStrategiesForGenome(genomeType: string) {
  const genome = GENOME_METADATA[genomeType];
  if (!genome) return [];

  const strategies: Array<{
    strategyType: string;
    aggressivenessLevel: string;
    allocationPercentage: number;
    rationale: string;
    sequenceOrder: number;
  }> = [];

  function aggressivenessLabel(score: number): string {
    if (score <= 2) return "very_low";
    if (score <= 3) return "cautious";
    if (score <= 4) return "low_moderate";
    if (score <= 5) return "moderate";
    if (score <= 6) return "mod_aggressive";
    if (score <= 8) return "aggressive";
    return "very_aggressive";
  }

  const total = genome.iul + genome.stocksBonds + genome.realEstate + genome.crypto;

  strategies.push({
    strategyType: "iul",
    aggressivenessLevel: aggressivenessLabel(genome.iul),
    allocationPercentage: Math.round((genome.iul / total) * 100),
    rationale: `Based on your ${genome.displayName} profile, IUL provides ${genome.iul >= 7 ? "strong" : "moderate"} tax-advantaged growth aligned with your ${genome.strategyTilt.toLowerCase()} approach.`,
    sequenceOrder: 1,
  });

  strategies.push({
    strategyType: "stocks_bonds",
    aggressivenessLevel: aggressivenessLabel(genome.stocksBonds),
    allocationPercentage: Math.round((genome.stocksBonds / total) * 100),
    rationale: `Traditional market exposure calibrated to your risk tolerance as a ${genome.displayName}.`,
    sequenceOrder: 2,
  });

  strategies.push({
    strategyType: "real_estate",
    aggressivenessLevel: aggressivenessLabel(genome.realEstate),
    allocationPercentage: Math.round((genome.realEstate / total) * 100),
    rationale: `Real estate allocation designed for ${genome.realEstate >= 7 ? "significant passive income" : "portfolio diversification"} within your wealth blueprint.`,
    sequenceOrder: 3,
  });

  strategies.push({
    strategyType: "crypto",
    aggressivenessLevel: aggressivenessLabel(genome.crypto),
    allocationPercentage: Math.round((genome.crypto / total) * 100),
    rationale: `Digital asset exposure ${genome.crypto >= 5 ? "leveraging emerging opportunities" : "kept minimal for stability"} per your ${genome.displayName} archetype.`,
    sequenceOrder: 4,
  });

  return strategies;
}

// ============ ROUTE HANDLERS ============
export function registerRoutes(router: any) {

  // POST /calibration/start - Start a new calibration session
  router.post("/calibration/start", async (req: any, res: any) => {
    try {
      const { email, firstName, lastName, sessionType } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Find or create client
      let client = await db.getClientByEmail(email);
      let clientId: number;

      if (client) {
        clientId = client.id;
      } else {
        clientId = await db.createClient({
          email,
          firstName: firstName || null,
          lastName: lastName || null,
          status: "lead",
        });
      }

      // Create calibration session
      const sessionId = await db.createCalibrationSession({
        clientId,
        sessionType: sessionType || "standard",
        state: "initialized",
        currentStep: 0,
        totalSteps: 10,
      });

      // Log behavioral event
      await db.logBehavioralEvent({
        clientId,
        sessionId,
        eventCategory: "session_start",
        eventType: "calibration_initiated",
        eventData: JSON.stringify({ sessionType: sessionType || "standard" }),
      });

      res.json({
        success: true,
        sessionId,
        clientId,
        state: "initialized",
        message: "Calibration session started",
      });
    } catch (error: any) {
      console.error("[API] Error starting calibration:", error);
      res.status(500).json({ error: "Failed to start calibration session", details: error.message });
    }
  });

  // POST /calibration/respond - Submit a response to a question
  router.post("/calibration/respond", async (req: any, res: any) => {
    try {
      const { sessionId, questionId, questionCategory, responseValue, responseType, responseTimeMs, sequenceOrder } = req.body;

      if (!sessionId || !questionId || !questionCategory || responseValue === undefined) {
        return res.status(400).json({ error: "Missing required fields: sessionId, questionId, questionCategory, responseValue" });
      }

      // Save the response
      const responseId = await db.saveSessionResponse({
        sessionId,
        questionId,
        questionCategory,
        responseValue: String(responseValue),
        responseType: responseType || "choice",
        responseTimeMs: responseTimeMs || 0,
        sequenceOrder: sequenceOrder || 0,
      });

      // Determine next state based on category
      const stateMap: Record<string, string> = {
        values: "values_discovery",
        risk: "risk_assessment",
        goals: "goals_timeline",
        decision_style: "decision_style",
        sensory: "breathing_calibration",
        future_self: "future_self_activation",
      };

      const newState = stateMap[questionCategory] || "values_discovery";
      const step = sequenceOrder || 1;

      await db.updateCalibrationSessionState(sessionId, newState, step);

      res.json({
        success: true,
        responseId,
        state: newState,
        step,
      });
    } catch (error: any) {
      console.error("[API] Error saving response:", error);
      res.status(500).json({ error: "Failed to save response", details: error.message });
    }
  });

  // POST /calibration/complete - Complete calibration and generate genome
  router.post("/calibration/complete", async (req: any, res: any) => {
    try {
      const { sessionId, durationSeconds } = req.body;

      if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
      }

      // Get session to find clientId
      const session = await db.getCalibrationSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      // Get all responses for this session
      const responses = await db.getSessionResponses(sessionId);

      // Calculate genome type based on responses
      const genomeType = calculateGenomeType(responses);
      const genome = GENOME_METADATA[genomeType];

      if (!genome) {
        return res.status(500).json({ error: "Invalid genome type calculated" });
      }

      // Complete the session
      await db.completeCalibrationSession(sessionId, durationSeconds || 0);

      // Create wealth genome profile
      const profileId = await db.createWealthGenomeProfile({
        clientId: session.clientId,
        sessionId,
        genomeType,
        genomeDisplayName: genome.displayName,
        coreEssence: genome.coreEssence,
        strategyTilt: genome.strategyTilt,
        iulAggressiveness: genome.iul,
        stocksBondsAggressiveness: genome.stocksBonds,
        realEstateAggressiveness: genome.realEstate,
        cryptoAggressiveness: genome.crypto,
        overallProfile: genome.overallProfile,
      });

      // Generate strategy recommendations
      const strategies = getStrategiesForGenome(genomeType);
      if (strategies.length > 0) {
        const strategyRecords = strategies.map((s) => ({
          clientId: session.clientId,
          genomeProfileId: profileId,
          strategyType: s.strategyType,
          aggressivenessLevel: s.aggressivenessLevel,
          allocationPercentage: String(s.allocationPercentage),
          rationale: s.rationale,
          sequenceOrder: s.sequenceOrder,
        }));
        await db.createStrategyRecommendations(strategyRecords);
      }

      // Log completion event
      await db.logBehavioralEvent({
        clientId: session.clientId,
        sessionId,
        eventCategory: "session_complete",
        eventType: "genome_generated",
        eventData: JSON.stringify({ genomeType, profileId }),
      });

      res.json({
        success: true,
        genomeType,
        genome: {
          displayName: genome.displayName,
          coreEssence: genome.coreEssence,
          strategyTilt: genome.strategyTilt,
          aggressiveness: {
            iul: genome.iul,
            stocksBonds: genome.stocksBonds,
            realEstate: genome.realEstate,
            crypto: genome.crypto,
          },
          overallProfile: genome.overallProfile,
        },
        profileId,
        strategies,
      });
    } catch (error: any) {
      console.error("[API] Error completing calibration:", error);
      res.status(500).json({ error: "Failed to complete calibration", details: error.message });
    }
  });

  // GET /calibration/session/:id - Get session details
  router.get("/calibration/session/:id", async (req: any, res: any) => {
    try {
      const sessionId = parseInt(req.params.id);
      if (isNaN(sessionId)) {
        return res.status(400).json({ error: "Invalid session ID" });
      }

      const session = await db.getCalibrationSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const responses = await db.getSessionResponses(sessionId);

      res.json({
        success: true,
        session,
        responses,
        responseCount: responses.length,
      });
    } catch (error: any) {
      console.error("[API] Error getting session:", error);
      res.status(500).json({ error: "Failed to get session", details: error.message });
    }
  });

  // GET /clients/:id/genome - Get client's wealth genome profile
  router.get("/clients/:id/genome", async (req: any, res: any) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }

      const genome = await db.getClientWealthGenome(clientId);
      if (!genome) {
        return res.status(404).json({ error: "No genome profile found for this client" });
      }

      res.json({ success: true, genome });
    } catch (error: any) {
      console.error("[API] Error getting genome:", error);
      res.status(500).json({ error: "Failed to get genome profile", details: error.message });
    }
  });

  // GET /clients/:id/strategies - Get client's strategy recommendations
  router.get("/clients/:id/strategies", async (req: any, res: any) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }

      const strategies = await db.getClientStrategies(clientId);

      res.json({ success: true, strategies });
    } catch (error: any) {
      console.error("[API] Error getting strategies:", error);
      res.status(500).json({ error: "Failed to get strategies", details: error.message });
    }
  });

  // POST /advisor/notes - Create an advisor note
  router.post("/advisor/notes", async (req: any, res: any) => {
    try {
      const { clientId, advisorId, sessionId, noteType, content, isPrivate } = req.body;

      if (!clientId || !content) {
        return res.status(400).json({ error: "clientId and content are required" });
      }

      const note = await db.createAdvisorNote({
        clientId,
        advisorId: advisorId || null,
        sessionId: sessionId || null,
        noteType: noteType || "general",
        content,
        isPrivate: isPrivate !== undefined ? isPrivate : true,
      });

      res.json({ success: true, note });
    } catch (error: any) {
      console.error("[API] Error creating note:", error);
      res.status(500).json({ error: "Failed to create advisor note", details: error.message });
    }
  });

  // GET /advisor/notes/:clientId - Get advisor notes for a client
  router.get("/advisor/notes/:clientId", async (req: any, res: any) => {
    try {
      const clientId = parseInt(req.params.clientId);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }

      const notes = await db.getClientAdvisorNotes(clientId);

      res.json({ success: true, notes });
    } catch (error: any) {
      console.error("[API] Error getting notes:", error);
      res.status(500).json({ error: "Failed to get advisor notes", details: error.message });
    }
  });
}

// ============ GENOME CALCULATION ============
function calculateGenomeType(responses: any[]): string {
  const genomeTypes = Object.keys(GENOME_METADATA);

  if (!responses || responses.length === 0) {
    return "quiet_strategist";
  }

  const scores: Record<string, number> = {};
  genomeTypes.forEach((g) => (scores[g] = 0));

  for (const response of responses) {
    const val = parseInt(response.responseValue) || 0;
    const cat = response.questionCategory;

    if (cat === "values") {
      if (val >= 8) { scores.legacy_builder += 3; scores.family_sovereign += 2; }
      else if (val >= 5) { scores.quiet_strategist += 2; scores.steady_guardian += 2; }
      else { scores.freedom_architect += 2; scores.sovereign_minimalist += 2; }
    }

    if (cat === "risk") {
      if (val >= 8) { scores.bold_weaver += 3; scores.intuitive_alchemist += 3; scores.calculated_creator += 2; }
      else if (val >= 5) { scores.freedom_architect += 2; scores.resilient_optimizer += 2; }
      else { scores.steady_guardian += 3; scores.quiet_strategist += 2; scores.family_sovereign += 2; }
    }

    if (cat === "goals") {
      if (val >= 8) { scores.legacy_builder += 3; scores.calculated_creator += 2; }
      else if (val >= 5) { scores.resilient_optimizer += 2; scores.bold_weaver += 2; }
      else { scores.sovereign_minimalist += 3; scores.freedom_architect += 2; }
    }

    if (cat === "decision_style") {
      if (val >= 8) { scores.calculated_creator += 3; scores.quiet_strategist += 2; }
      else if (val >= 5) { scores.resilient_optimizer += 2; scores.bold_weaver += 2; }
      else { scores.intuitive_alchemist += 3; scores.freedom_architect += 2; }
    }

    if (cat === "sensory") {
      if (val >= 7) { scores.intuitive_alchemist += 2; scores.sovereign_minimalist += 2; }
      else { scores.calculated_creator += 1; scores.resilient_optimizer += 1; }
    }

    if (cat === "future_self") {
      if (val >= 8) { scores.legacy_builder += 2; scores.family_sovereign += 2; }
      else if (val >= 5) { scores.bold_weaver += 2; scores.freedom_architect += 1; }
      else { scores.sovereign_minimalist += 2; scores.steady_guardian += 1; }
    }
  }

  let maxScore = 0;
  let topGenome = "quiet_strategist";
  for (const [genome, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topGenome = genome;
    }
  }

  return topGenome;
}

export default { registerRoutes };
