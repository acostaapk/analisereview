import { describe, expect, it } from 'vitest';
import { safeEqual, verifyBearer } from '../src/lib/notfair/auth';

const SECRET = 'test-secret-123';

describe('verifyBearer', () => {
  it('accepts the exact Authorization header', () => {
    expect(verifyBearer(`Bearer ${SECRET}`, SECRET)).toBe(true);
  });

  it('rejects a missing header', () => {
    expect(verifyBearer(null, SECRET)).toBe(false);
    expect(verifyBearer(undefined, SECRET)).toBe(false);
  });

  it('rejects a wrong secret', () => {
    expect(verifyBearer('Bearer wrong-secret', SECRET)).toBe(false);
  });

  it('rejects a missing Bearer prefix', () => {
    expect(verifyBearer(SECRET, SECRET)).toBe(false);
  });

  it('rejects a tampered scheme or trailing whitespace', () => {
    expect(verifyBearer(`bearer ${SECRET}`, SECRET)).toBe(false);
    expect(verifyBearer(`Bearer ${SECRET} `, SECRET)).toBe(false);
    expect(verifyBearer(` Bearer ${SECRET}`, SECRET)).toBe(false);
  });

  it('rejects when no secret is configured', () => {
    expect(verifyBearer(`Bearer ${SECRET}`, '')).toBe(false);
  });
});

describe('safeEqual', () => {
  it('matches equal strings', () => {
    expect(safeEqual('abc', 'abc')).toBe(true);
    expect(safeEqual('', '')).toBe(true);
  });

  it('rejects different strings of equal length', () => {
    expect(safeEqual('abc', 'abd')).toBe(false);
  });

  it('rejects different lengths without throwing', () => {
    expect(safeEqual('short', 'a-much-longer-secret')).toBe(false);
    expect(safeEqual('a-much-longer-secret', 'short')).toBe(false);
  });
});
