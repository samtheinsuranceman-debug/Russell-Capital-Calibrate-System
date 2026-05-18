import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  clients,
  calibrationSessions,
  sessionResponses,
  wealthGenomeProfiles,
  behavioralEvents,
  strategyRecommendations,
  advisorNotes,
} from "../drizzle/schema.js";

let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function createClient(data: any): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(clients).values(data);
  return result[0].insertId;
}

export async function getClientByEmail(email: string) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(clients).where(and(eq(clients.email, email), eq(clients.isDeleted, false))).limit(1);
  return result[0] || undefined;
}

export async function getClientById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(clients).where(and(eq(clients.id, id), eq(clients.isDeleted, false))).limit(1);
  return result[0] || undefined;
}

export async function createCalibrationSession(data: any): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(calibrationSessions).values(data);
  return result[0].insertId;
}

export async function getCalibrationSession(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(calibrationSessions).where(eq(calibrationSessions.id, id)).limit(1);
  return result[0] || undefined;
}

export async function updateCalibrationSessionState(id: number, state: string, currentStep: number) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(calibrationSessions).set({ state: state as any, currentStep }).where(eq(calibrationSessions.id, id));
}

export async function completeCalibrationSession(id: number, durationSeconds: number) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  await db.update(calibrationSessions).set({ state: "completed" as any, completedAt: new Date(), durationSeconds }).where(eq(calibrationSessions.id, id));
}

export async function saveSessionResponse(data: any): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(sessionResponses).values(data);
  return result[0].insertId;
}

export async function getSessionResponses(sessionId: number) {
  const db = getDb();
  if (!db) return [];
  return db.select().from(sessionResponses).where(eq(sessionResponses.sessionId, sessionId)).orderBy(sessionResponses.sequenceOrder);
}

export async function createWealthGenomeProfile(data: any): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(wealthGenomeProfiles).values(data);
  return result[0].insertId;
}

export async function getClientWealthGenome(clientId: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(wealthGenomeProfiles)
    .where(and(eq(wealthGenomeProfiles.clientId, clientId), eq(wealthGenomeProfiles.isActive, true), eq(wealthGenomeProfiles.isDeleted, false)))
    .orderBy(desc(wealthGenomeProfiles.createdAt))
    .limit(1);
  return result[0] || undefined;
}

export async function logBehavioralEvent(data: any): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(behavioralEvents).values(data);
  return result[0].insertId;
}

export async function createStrategyRecommendations(recommendations: any[]) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  if (recommendations.length === 0) return;
  await db.insert(strategyRecommendations).values(recommendations);
}

export async function getClientStrategies(clientId: number) {
  const db = getDb();
  if (!db) return [];
  return db.select().from(strategyRecommendations)
    .where(and(eq(strategyRecommendations.clientId, clientId), eq(strategyRecommendations.isActive, true), eq(strategyRecommendations.isDeleted, false)))
    .orderBy(strategyRecommendations.sequenceOrder);
}

export async function createAdvisorNote(data: any) {
  const db = getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(advisorNotes).values(data);
  return result[0].insertId;
}

export async function getClientAdvisorNotes(clientId: number) {
  const db = getDb();
  if (!db) return [];
  return db.select().from(advisorNotes)
    .where(and(eq(advisorNotes.clientId, clientId), eq(advisorNotes.isDeleted, false)))
    .orderBy(desc(advisorNotes.createdAt));
}
