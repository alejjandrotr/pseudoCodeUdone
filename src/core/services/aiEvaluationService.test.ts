import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mocks must be declared before any imports that use them ──────────────────
vi.mock('./udone-cache.service', () => ({
  UDONE_RULES: 'MOCKED_UDONE_RULES',
  getOrCreateUdoneCache: vi.fn().mockResolvedValue(null),
}));

vi.mock('@google/genai', async () => {
  const generateContent = vi.fn().mockResolvedValue({
    text: 'Evaluación simulada',
    usageMetadata: {
      promptTokenCount: 100,
      candidatesTokenCount: 50,
      totalTokenCount: 150,
      cachedContentTokenCount: 0,
    },
  });

  function GoogleGenAI(_opts: unknown) {
    return {
      models: { generateContent },
      caches: {
        create: vi.fn().mockResolvedValue({ name: 'cachedContents/mock-123' }),
      },
    };
  }

  return { GoogleGenAI };
});

// ── Import under test (after mocks are set up) ───────────────────────────────
import { evaluarPseudocodigo } from './aiEvaluationService';
import { Professor } from '../types/professor.types';

describe('aiEvaluationService', () => {
  const mockProfessor: Professor = {
    id: 'test-prof',
    name: 'Dr. Test',
    difficultyLevel: 'Fácil',
    promptBehavior: 'Sé muy amable y explica todo paso a paso.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws API_KEY_MISSING error when API key is empty', async () => {
    await expect(
      evaluarPseudocodigo('Inicio\nFin', 'Enunciado test', mockProfessor, '')
    ).rejects.toThrow('API_KEY_MISSING');
  });

  it('throws API_KEY_MISSING error when API key is undefined', async () => {
    await expect(
      evaluarPseudocodigo('Inicio\nFin', 'Enunciado test', mockProfessor, undefined as unknown as string)
    ).rejects.toThrow('API_KEY_MISSING');
  });

  it('returns cached: false when no cache is available (fallback path)', async () => {
    const result = await evaluarPseudocodigo(
      'Inicio\nFin',
      'Enunciado test',
      mockProfessor,
      'valid-api-key'
    );
    expect(result.cached).toBe(false);
    expect(result.text).toBeDefined();
  });

  it('returns usage metadata when the API responds', async () => {
    const result = await evaluarPseudocodigo(
      'Inicio\nFin',
      'Enunciado test',
      mockProfessor,
      'valid-api-key'
    );
    expect(result.usage).toBeDefined();
    expect(result.usage?.totalTokens).toBe(150);
  });
});
