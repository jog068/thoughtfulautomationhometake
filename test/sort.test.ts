import { describe, expect, it } from 'vitest';
import { sort } from '../src/index.js';

describe('sort', () => {
  it('returns STANDARD for packages that are neither bulky nor heavy', () => {
    expect(sort(10, 10, 10, 5)).toBe('STANDARD');
  });

  it('returns SPECIAL for bulky-only packages', () => {
    expect(sort(150, 10, 10, 5)).toBe('SPECIAL');
    expect(sort(100, 100, 100, 5)).toBe('SPECIAL');
  });

  it('returns SPECIAL for heavy-only packages', () => {
    expect(sort(10, 10, 10, 20)).toBe('SPECIAL');
  });

  it('returns REJECTED for packages that are both bulky and heavy', () => {
    expect(sort(150, 10, 10, 20)).toBe('REJECTED');
  });

  it('treats exactly 1,000,000 cm^3 as bulky', () => {
    expect(sort(100, 100, 100, 0)).toBe('SPECIAL');
  });

  it('treats exactly one dimension of 150 cm as bulky', () => {
    expect(sort(149.99, 150, 149.99, 0)).toBe('SPECIAL');
  });

  it('treats exactly 20 kg as heavy', () => {
    expect(sort(1, 1, 1, 20)).toBe('SPECIAL');
  });

  it('does not trigger bulky/heavy just below thresholds', () => {
    expect(sort(149.99, 149.99, 44.45, 19.99)).toBe('STANDARD');
  });

  it('allows zero values as valid input', () => {
    expect(sort(0, 0, 0, 0)).toBe('STANDARD');
  });

  it('throws RangeError for negative inputs', () => {
    expect(() => sort(-1, 1, 1, 1)).toThrow(RangeError);
    expect(() => sort(1, -1, 1, 1)).toThrow(RangeError);
    expect(() => sort(1, 1, -1, 1)).toThrow(RangeError);
    expect(() => sort(1, 1, 1, -1)).toThrow(RangeError);
  });

  it('throws TypeError for non-finite numbers', () => {
    expect(() => sort(Number.NaN, 1, 1, 1)).toThrow(TypeError);
    expect(() => sort(1, Number.POSITIVE_INFINITY, 1, 1)).toThrow(TypeError);
    expect(() => sort(1, 1, Number.NEGATIVE_INFINITY, 1)).toThrow(TypeError);
    expect(() => sort(1, 1, 1, Number.NaN)).toThrow(TypeError);
  });

  it('throws TypeError for non-number runtime values', () => {
    expect(() => sort('10' as any, 1, 1, 1)).toThrow(TypeError);
    expect(() => sort(1, null as any, 1, 1)).toThrow(TypeError);
    expect(() => sort(1, 1, undefined as any, 1)).toThrow(TypeError);
    expect(() => sort(1, 1, 1, {} as any)).toThrow(TypeError);
  });
});
