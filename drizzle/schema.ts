import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  json,
  decimal,
} from "drizzle-orm/mysql-core";

// ============================================================
// USERS TABLE
// ============================================================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "advisor"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// ============================================================
// CLIENTS TABLE - Physician/Advisor clients
// ============================================================
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  specialty: varchar("specialty", { length: 200 }),
  practiceType: varchar("practiceType", { length: 100 }),
  annualIncome: decimal("annualIncome", { precision: 12, scale: 2 }),
  yearsInPractice: int("yearsInPractice"),
  state: varchar("state", { length: 50 }),
  city: varchar("city", { length: 100 }),
  referralSource: varchar("referralSource", { length: 200 }),
  assignedAdvisorId: int("assignedAdvisorId").references(() => users.id),
  status: mysqlEnum("status", ["lead", "prospect", "active", "inactive", "churned"]).default("lead").notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// CALIBRATION SESSIONS TABLE
// ============================================================
export const calibrationSessions = mysqlTable("calibration_sessions", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionType: mysqlEnum("sessionType", ["quick", "standard", "full"]).default("quick").notNull(),
  state: mysqlEnum("state", [
    "initialized",
    "breathing_calibration",
    "values_discovery",
    "risk_assessment",
    "goals_timeline",
    "decision_style",
    "future_self_activation",
    "genome_reveal",
    "completed",
    "abandoned",
  ]).default("initialized").notNull(),
  currentStep: int("currentStep").default(0).notNull(),
  totalSteps: int("totalSteps").default(10).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  durationSeconds: int("durationSeconds"),
  breathingCalibrated: boolean("breathingCalibrated").default(false).notNull(),
  metadata: json("metadata"),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// SESSION RESPONSES TABLE
// ============================================================
export const sessionResponses = mysqlTable("session_responses", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").references(() => calibrationSessions.id).notNull(),
  questionId: varchar("questionId", { length: 100 }).notNull(),
  questionCategory: mysqlEnum("questionCategory", [
    "values",
    "risk",
    "goals",
    "decision_style",
    "sensory",
    "future_self",
  ]).notNull(),
  responseValue: text("responseValue").notNull(),
  responseType: mysqlEnum("responseType", ["scale", "choice", "text", "slider"]).default("choice").notNull(),
  responseTimeMs: int("responseTimeMs"),
  confidenceScore: decimal("confidenceScore", { precision: 3, scale: 2 }),
  sequenceOrder: int("sequenceOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// WEALTH GENOME PROFILES TABLE
// ============================================================
export const wealthGenomeProfiles = mysqlTable("wealth_genome_profiles", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionId: int("sessionId").references(() => calibrationSessions.id).notNull(),
  versionId: int("versionId").references(() => wealthGenomeVersions.id),
  genomeType: mysqlEnum("genomeType", [
    "quiet_strategist",
    "legacy_builder",
    "freedom_architect",
    "steady_guardian",
    "bold_weaver",
    "intuitive_alchemist",
    "family_sovereign",
    "calculated_creator",
    "resilient_optimizer",
    "sovereign_minimalist",
  ]).notNull(),
  genomeDisplayName: varchar("genomeDisplayName", { length: 100 }).notNull(),
  coreEssence: text("coreEssence").notNull(),
  strategyTilt: text("strategyTilt").notNull(),
  // Asset class aggressiveness scores (1-10)
  iulAggressiveness: int("iulAggressiveness").notNull(),
  stocksBondsAggressiveness: int("stocksBondsAggressiveness").notNull(),
  realEstateAggressiveness: int("realEstateAggressiveness").notNull(),
  cryptoAggressiveness: int("cryptoAggressiveness").notNull(),
  overallProfile: varchar("overallProfile", { length: 50 }).notNull(),
  // Scoring breakdown
  valuesScore: json("valuesScore"),
  riskScore: json("riskScore"),
  goalsScore: json("goalsScore"),
  decisionStyleScore: json("decisionStyleScore"),
  isActive: boolean("isActive").default(true).notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// WEALTH GENOME VERSIONS TABLE (for algorithm versioning)
// ============================================================
export const wealthGenomeVersions = mysqlTable("wealth_genome_versions", {
  id: int("id").autoincrement().primaryKey(),
  version: varchar("version", { length: 20 }).notNull(),
  algorithmDescription: text("algorithmDescription"),
  scoringWeights: json("scoringWeights"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// PERSONALITY PORTRAITS TABLE
// ============================================================
export const personalityPortraits = mysqlTable("personality_portraits", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionId: int("sessionId").references(() => calibrationSessions.id).notNull(),
  heroJourneyStage: varchar("heroJourneyStage", { length: 100 }),
  heroNarrative: text("heroNarrative"),
  strengthsIdentified: json("strengthsIdentified"),
  blindSpotsIdentified: json("blindSpotsIdentified"),
  motivationDrivers: json("motivationDrivers"),
  communicationStyle: varchar("communicationStyle", { length: 100 }),
  decisionMakingPattern: varchar("decisionMakingPattern", { length: 100 }),
  riskTolerance: varchar("riskTolerance", { length: 50 }),
  timeHorizonPreference: varchar("timeHorizonPreference", { length: 50 }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// VISION BOARD CHAPTERS TABLE
// ============================================================
export const visionBoardChapters = mysqlTable("vision_board_chapters", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionId: int("sessionId").references(() => calibrationSessions.id).notNull(),
  chapterNumber: int("chapterNumber").notNull(),
  chapterTitle: varchar("chapterTitle", { length: 200 }).notNull(),
  prompt: text("prompt"),
  generatedImageUrl: text("generatedImageUrl"),
  narrativeText: text("narrativeText"),
  triggerMoment: varchar("triggerMoment", { length: 200 }),
  emotionalTone: varchar("emotionalTone", { length: 100 }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// VISION BOARD ASSETS TABLE
// ============================================================
export const visionBoardAssets = mysqlTable("vision_board_assets", {
  id: int("id").autoincrement().primaryKey(),
  chapterId: int("chapterId").references(() => visionBoardChapters.id).notNull(),
  assetType: mysqlEnum("assetType", ["image", "audio", "video", "text"]).notNull(),
  storageKey: varchar("storageKey", { length: 500 }),
  url: text("url"),
  mimeType: varchar("mimeType", { length: 100 }),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// BEHAVIORAL EVENTS TABLE (Event Sourcing)
// ============================================================
export const behavioralEvents = mysqlTable("behavioral_events", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionId: int("sessionId").references(() => calibrationSessions.id),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  eventCategory: mysqlEnum("eventCategory", [
    "navigation",
    "response",
    "hesitation",
    "engagement",
    "breathing",
    "emotional_shift",
    "conversion",
  ]).notNull(),
  eventData: json("eventData"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  durationMs: int("durationMs"),
  pageContext: varchar("pageContext", { length: 200 }),
  deviceInfo: json("deviceInfo"),
});

// ============================================================
// STRATEGY RECOMMENDATIONS TABLE
// ============================================================
export const strategyRecommendations = mysqlTable("strategy_recommendations", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  genomeProfileId: int("genomeProfileId").references(() => wealthGenomeProfiles.id).notNull(),
  strategyType: mysqlEnum("strategyType", [
    "iul",
    "heloc_cycling",
    "roth_ladder",
    "captive_insurance",
    "student_loan",
    "infinite_banking",
    "real_estate",
    "stocks_bonds",
    "crypto",
    "solar",
    "annuity",
    "defined_benefit",
    "cost_segregation",
    "opportunity_zone",
    "premium_financing",
  ]).notNull(),
  aggressivenessLevel: mysqlEnum("aggressivenessLevel", [
    "very_low",
    "cautious",
    "low_moderate",
    "moderate",
    "mod_aggressive",
    "aggressive",
    "very_aggressive",
  ]).notNull(),
  allocationPercentage: decimal("allocationPercentage", { precision: 5, scale: 2 }),
  rationale: text("rationale"),
  sequenceOrder: int("sequenceOrder"),
  isActive: boolean("isActive").default(true).notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// MULTI-GENERATIONAL POLICIES TABLE
// ============================================================
export const multiGenPolicies = mysqlTable("multi_gen_policies", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  policyType: varchar("policyType", { length: 100 }).notNull(),
  beneficiaryStructure: json("beneficiaryStructure"),
  generationsCovered: int("generationsCovered"),
  annualContribution: decimal("annualContribution", { precision: 12, scale: 2 }),
  projectedValue: decimal("projectedValue", { precision: 14, scale: 2 }),
  timeHorizonYears: int("timeHorizonYears"),
  notes: text("notes"),
  isActive: boolean("isActive").default(true).notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// VOICE & BREATHING METADATA TABLE
// ============================================================
export const voiceBreathingMetadata = mysqlTable("voice_breathing_metadata", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  sessionId: int("sessionId").references(() => calibrationSessions.id).notNull(),
  breathingPattern: varchar("breathingPattern", { length: 50 }),
  avgInhaleMs: int("avgInhaleMs"),
  avgExhaleMs: int("avgExhaleMs"),
  avgHoldMs: int("avgHoldMs"),
  coherenceScore: decimal("coherenceScore", { precision: 3, scale: 2 }),
  baselineHeartRate: int("baselineHeartRate"),
  voiceToneProfile: json("voiceToneProfile"),
  excitementBaseline: decimal("excitementBaseline", { precision: 3, scale: 2 }),
  confusionBaseline: decimal("confusionBaseline", { precision: 3, scale: 2 }),
  cameraUsed: boolean("cameraUsed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// ADVISOR NOTES TABLE
// ============================================================
export const advisorNotes = mysqlTable("advisor_notes", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").references(() => clients.id).notNull(),
  advisorId: int("advisorId").references(() => users.id).notNull(),
  noteType: mysqlEnum("noteType", ["general", "strategy", "objection", "follow_up", "handoff"]).default("general").notNull(),
  content: text("content").notNull(),
  isPrivate: boolean("isPrivate").default(false).notNull(),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// AUDIT LOG TABLE
// ============================================================
export const auditLog = mysqlTable("audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 100 }).notNull(),
  entityId: int("entityId"),
  previousState: json("previousState"),
  newState: json("newState"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// TYPE EXPORTS
// ============================================================
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;
export type CalibrationSession = typeof calibrationSessions.$inferSelect;
export type InsertCalibrationSession = typeof calibrationSessions.$inferInsert;
export type SessionResponse = typeof sessionResponses.$inferSelect;
export type InsertSessionResponse = typeof sessionResponses.$inferInsert;
export type WealthGenomeProfile = typeof wealthGenomeProfiles.$inferSelect;
export type InsertWealthGenomeProfile = typeof wealthGenomeProfiles.$inferInsert;
export type StrategyRecommendation = typeof strategyRecommendations.$inferSelect;
export type InsertStrategyRecommendation = typeof strategyRecommendations.$inferInsert;
export type BehavioralEvent = typeof behavioralEvents.$inferSelect;
export type InsertBehavioralEvent = typeof behavioralEvents.$inferInsert;
