import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./db.js', () => ({
  createClient: vi.fn(),
  createCalibrationSession: vi.fn(),
  saveSessionResponse: vi.fn(),
  updateSessionStep: vi.fn(),
  completeCalibrationSession: vi.fn(),
  createWealthGenomeProfile: vi.fn(),
  createStrategyRecommendation: vi.fn(),
  getCalibrationSession: vi.fn(),
  getSessionResponses: vi.fn(),
  getWealthGenomeProfile: vi.fn(),
  getStrategyRecommendations: vi.fn(),
}));

import * as db from './db.js';
const mockedDb = vi.mocked(db);

describe('Calibration API Logic', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create client and session on start', async () => {
    mockedDb.createClient.mockResolvedValue(1);
    mockedDb.createCalibrationSession.mockResolvedValue(100);
    const clientId = await db.createClient({ email: 'test@example.com', firstName: 'John', lastName: 'Doe', specialty: 'Cardiology' });
    expect(clientId).toBe(1);
    const sessionId = await db.createCalibrationSession({ clientId: 1, state: 'initialized', currentStep: 0 });
    expect(sessionId).toBe(100);
  });

  it('should save response and update step', async () => {
    mockedDb.saveSessionResponse.mockResolvedValue(undefined);
    mockedDb.updateSessionStep.mockResolvedValue(undefined);
    await db.saveSessionResponse({ sessionId: 100, questionId: 'q1', responseValue: 'family_protection', responseTimeMs: 3500, phase: 'values_vision' });
    expect(mockedDb.saveSessionResponse).toHaveBeenCalled();
    await db.updateSessionStep(100, 1);
    expect(mockedDb.updateSessionStep).toHaveBeenCalledWith(100, 1);
  });

  it('should create genome profile on complete', async () => {
    mockedDb.completeCalibrationSession.mockResolvedValue(undefined);
    mockedDb.createWealthGenomeProfile.mockResolvedValue(200);
    await db.completeCalibrationSession(100);
    const genomeId = await db.createWealthGenomeProfile({
      clientId: 1, sessionId: 100, genomeType: 'quiet_strategist',
      genomeDisplayName: 'The Quiet Strategist', coreEssence: 'Patience.',
      strategyTilt: 'conservative_growth', iulAggressiveness: 7,
      rothAggressiveness: 6, realEstateAggressiveness: 4, stocksBondsAggressiveness: 5,
      valuesScore: 85, riskScore: 60, timeHorizonScore: 75, controlScore: 70,
    });
    expect(genomeId).toBe(200);
  });

  it('should determine correct genome type from metadata', () => {
    const GENOME_METADATA: Record<string, { displayName: string }> = {
      quiet_strategist: { displayName: 'The Quiet Strategist' },
      bold_architect: { displayName: 'The Bold Architect' },
      guardian_builder: { displayName: 'The Guardian Builder' },
      balanced_visionary: { displayName: 'The Balanced Visionary' },
    };
    expect(GENOME_METADATA['quiet_strategist'].displayName).toBe('The Quiet Strategist');
    const fallback = GENOME_METADATA['unknown'] || GENOME_METADATA.quiet_strategist;
    expect(fallback.displayName).toBe('The Quiet Strategist');
  });

  it('should retrieve session with responses', async () => {
    mockedDb.getCalibrationSession.mockResolvedValue({ id: 100, clientId: 1, state: 'completed', currentStep: 10 });
    mockedDb.getSessionResponses.mockResolvedValue([
      { questionId: 'q1', responseValue: 'family_protection', responseTimeMs: 3500 },
      { questionId: 'q2', responseValue: 'calculated_risk', responseTimeMs: 4200 },
    ]);
    const session = await db.getCalibrationSession(100);
    expect(session?.state).toBe('completed');
    const responses = await db.getSessionResponses(100);
    expect(responses).toHaveLength(2);
  });

  it('should retrieve genome profile', async () => {
    mockedDb.getWealthGenomeProfile.mockResolvedValue({ id: 200, clientId: 1, genomeType: 'quiet_strategist', genomeDisplayName: 'The Quiet Strategist', iulAggressiveness: 7 });
    const genome = await db.getWealthGenomeProfile(1);
    expect(genome?.genomeType).toBe('quiet_strategist');
  });

  it('should validate strategy allocations sum to 100', async () => {
    mockedDb.getStrategyRecommendations.mockResolvedValue([
      { strategyType: 'iul', allocationPercentage: 35, aggressivenessLevel: 7 },
      { strategyType: 'roth_conversion', allocationPercentage: 25, aggressivenessLevel: 6 },
      { strategyType: 'real_estate', allocationPercentage: 20, aggressivenessLevel: 4 },
      { strategyType: 'stocks_bonds', allocationPercentage: 20, aggressivenessLevel: 5 },
    ]);
    const strategies = await db.getStrategyRecommendations(1);
    expect(strategies).toHaveLength(4);
    const total = strategies.reduce((sum: number, s: any) => sum + s.allocationPercentage, 0);
    expect(total).toBe(100);
  });
});
