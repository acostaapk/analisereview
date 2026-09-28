import type { D1Like } from './db';

type RuntimeLocals = {
  runtime?: {
    env?: Record<string, unknown>;
  };
};

/** Read-only view of the Cloudflare Pages runtime env, without touching
 *  App.Locals typing. Local `astro dev` gets values from `.dev.vars`;
 *  production gets them from Pages bindings + secrets. */
export function runtimeEnv(locals: unknown): Record<string, unknown> {
  const value = locals as RuntimeLocals | null | undefined;
  return value?.runtime?.env ?? {};
}

export function getDb(locals: unknown): D1Like | undefined {
  const db = runtimeEnv(locals).DB;
  return typeof db === 'object' && db !== null ? (db as D1Like) : undefined;
}

export function getWebhookSecret(locals: unknown): string | undefined {
  const secret = runtimeEnv(locals).NOTFAIR_SEO_WEBHOOK_SECRET;
  return typeof secret === 'string' && secret.length > 0 ? secret : undefined;
}
