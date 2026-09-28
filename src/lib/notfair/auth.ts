/** Constant-time bearer verification.
 *  The Workers runtime has no node:crypto.timingSafeEqual, so this
 *  compares in a fixed loop over the longer input. */

export function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let result = a.length ^ b.length;
  for (let i = 0; i < len; i += 1) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    result |= ca ^ cb;
  }
  return result === 0;
}

export function verifyBearer(authorizationHeader: string | null | undefined, secret: string): boolean {
  if (typeof authorizationHeader !== 'string') return false;
  if (!secret) return false;
  return safeEqual(authorizationHeader, `Bearer ${secret}`);
}
