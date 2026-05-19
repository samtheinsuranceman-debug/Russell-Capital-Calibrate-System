/**
 * Calibration API Client
 * Handles all communication with the backend calibration endpoints.
 * Designed for fire-and-forget usage so the UI never blocks on API calls.
 */

const API_BASE = "/api";

interface StartSessionResponse {
  success: boolean;
  sessionId: number;
  clientId: number;
}

interface RespondPayload {
  sessionId: number;
  questionId: string;
  questionCategory: string;
  responseValue: string;
  responseType: string;
  responseTimeMs: number | null;
  sequenceOrder: number;
}

interface CompletePayload {
  sessionId: number;
  clientId: number;
  genomeType: string;
  scores: {
    values: number;
    risk: number;
    goals: number;
    decisionStyle: number;
  };
  durationSeconds: number;
}

interface CompleteResponse {
  success: boolean;
  genomeId: number;
  genomeType: string;
  genomeMeta: {
    displayName: string;
    coreEssence: string;
    strategyTilt: string;
    iul: number;
    stocksBonds: number;
    realEstate: number;
    crypto: number;
    overallProfile: string;
  };
  strategies: Array<{
    type: string;
    aggressiveness: string;
    allocation: string;
    rationale: string;
  }>;
}

export async function startCalibrationSession(data: {
  email?: string;
  firstName?: string;
  lastName?: string;
  sessionType?: string;
}): Promise<StartSessionResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/calibration/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email || `anon_${Date.now()}@calibrate.local`,
        firstName: data.firstName || "Anonymous",
        lastName: data.lastName || "User",
        sessionType: data.sessionType || "standard",
      }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("[Calibration API] Start session failed:", err);
    return null;
  }
}

export async function submitResponse(payload: RespondPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/calibration/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.warn("[Calibration API] Submit response failed:", err);
    return false;
  }
}

export async function completeCalibration(payload: CompletePayload): Promise<CompleteResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/calibration/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("[Calibration API] Complete failed:", err);
    return null;
  }
}
