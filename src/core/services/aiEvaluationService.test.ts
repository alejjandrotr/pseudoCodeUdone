import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGenerateContent } = vi.hoisted(() => ({
  mockGenerateContent: vi.fn(),
}));

vi.mock('@google/genai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@google/genai')>();

  function GoogleGenAI(_opts: unknown) {
    return {
      models: { generateContent: mockGenerateContent },
    };
  }

  return {
    ...actual,
    GoogleGenAI,
  };
});

import { evaluarPseudocodigo } from './aiEvaluationService';
import {
  DEFAULT_GEMINI_MODEL,
  normalizeGeminiModel,
  parseJsonResponse,
  classifyGeminiError,
} from './geminiConfig';
import { buildUdoneRulesForContext } from './udone-cache.service';
import { Professor } from '../types/professor.types';

describe('geminiConfig', () => {
  it('migrates deprecated models to DEFAULT_GEMINI_MODEL', () => {
    expect(normalizeGeminiModel('gemini-1.5-flash')).toBe(DEFAULT_GEMINI_MODEL);
    expect(normalizeGeminiModel('gemini-2.0-flash')).toBe(DEFAULT_GEMINI_MODEL);
    expect(normalizeGeminiModel('gemini-2.5-flash')).toBe(DEFAULT_GEMINI_MODEL);
    expect(normalizeGeminiModel('gemini-2.5-pro')).toBe(DEFAULT_GEMINI_MODEL);
    expect(normalizeGeminiModel('')).toBe(DEFAULT_GEMINI_MODEL);
    expect(normalizeGeminiModel(null)).toBe(DEFAULT_GEMINI_MODEL);
  });

  it('keeps valid Gemini 4 models unchanged', () => {
    expect(normalizeGeminiModel('gemini-4-hydrogen')).toBe('gemini-4-hydrogen');
    expect(normalizeGeminiModel('gemini-4-argon')).toBe('gemini-4-argon');
    expect(normalizeGeminiModel('gemini-4-carbon')).toBe('gemini-4-carbon');
  });

  it('parses plain JSON and markdown-fenced JSON cleanly', () => {
    expect(parseJsonResponse<{ ok: boolean }>('{"ok": true}')).toEqual({ ok: true });
    expect(
      parseJsonResponse<{ notaTotal: number }>('```json\n{"notaTotal": 8.5}\n```')
    ).toEqual({ notaTotal: 8.5 });
    expect(
      parseJsonResponse<{ a: number }>('Aquí está el resultado:\n{"a": 1}\nFin.')
    ).toEqual({ a: 1 });
  });

  it('classifies Gemini API errors accurately', () => {
    expect(classifyGeminiError(new Error('API key not valid'))).toBe('API_KEY_INVALID');
    expect(classifyGeminiError(new Error('RESOURCE_EXHAUSTED: quota exceeded'))).toBe('QUOTA_EXCEEDED');
    expect(classifyGeminiError(new Error('404 NOT_FOUND'))).toBe('MODEL_NOT_FOUND');
    expect(classifyGeminiError(new Error('Network failure'))).toBe('EVALUATION_FAILED');
  });
});

describe('buildUdoneRulesForContext (modular rules)', () => {
  it('excludes advanced modules for a simple sequential exercise', () => {
    const rules = buildUdoneRulesForContext(
      'Leer dos números enteros y mostrar su suma.',
      'Algoritmo Suma\nDeclaración\nVariables: a, b, s: Entero\nInicio\nLeer a\nLeer b\ns <- a + b\nEscribir s\nFin'
    );
    expect(rules).toContain('REGLAS BASE UDONE:');
    expect(rules).not.toContain('SELECCIÓN:');
    expect(rules).not.toContain('CICLOS:');
    expect(rules).not.toContain('ARREGLOS:');
    expect(rules).not.toContain('MÓDULOS (PROCEDIMIENTOS Y FUNCIONES):');
    expect(rules).not.toContain('REGISTROS Y ARCHIVOS:');
  });

  it('includes relevant modules when context uses loops and arrays', () => {
    const rules = buildUdoneRulesForContext(
      'Leer un arreglo de 10 notas y calcular el promedio.',
      'Para i = 1 Hasta 10\nLeer notas[i]\nFin Para'
    );
    expect(rules).toContain('CICLOS:');
    expect(rules).toContain('ARREGLOS:');
    expect(rules).not.toContain('REGISTROS Y ARCHIVOS:');
  });
});

describe('aiEvaluationService', () => {
  const mockProfessor: Professor = {
    id: 'test-prof',
    name: 'Dr. Test',
    difficultyLevel: 'Fácil',
    promptBehavior: 'Sé muy amable y explica todo paso a paso.',
    shortStory: 'Un profesor de prueba para tests unitarios.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateContent.mockResolvedValue({
      text: 'Evaluación simulada',
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 50,
        totalTokenCount: 150,
        cachedContentTokenCount: 0,
      },
    });
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

  it('normalizes legacy model names to gemini-4-hydrogen before calling API', async () => {
    const result = await evaluarPseudocodigo(
      'Inicio\nFin',
      'Enunciado test',
      mockProfessor,
      'valid-api-key',
      'gemini-2.0-flash'
    );
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-4-hydrogen',
      })
    );
    expect(result.cached).toBe(false);
    expect(result.text).toBe('Evaluación simulada');
  });

  it('marks cached: true when implicit caching returns cachedContentTokenCount > 0', async () => {
    mockGenerateContent.mockResolvedValueOnce({
      text: 'Evaluación con caché implícito',
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 50,
        totalTokenCount: 150,
        cachedContentTokenCount: 80,
      },
    });

    const result = await evaluarPseudocodigo(
      'Inicio\nFin',
      'Enunciado test',
      mockProfessor,
      'valid-api-key'
    );
    expect(result.cached).toBe(true);
    expect(result.usage?.cachedTokens).toBe(80);
  });
});
