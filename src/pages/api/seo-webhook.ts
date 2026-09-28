import type { APIContext } from 'astro';
import { verifyBearer } from '../../lib/notfair/auth';
import { validateDelivery, ValidationError } from '../../lib/notfair/validate';
import { upsertPosts } from '../../lib/notfair/db';
import { getDb, getWebhookSecret } from '../../lib/notfair/env';

export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function requireSecret(context: APIContext): string | Response {
  const secret = getWebhookSecret(context.locals);
  if (!secret) {
    console.error('[seo-webhook] NOTFAIR_SEO_WEBHOOK_SECRET is not configured');
    return json({ error: 'Server misconfigured' }, 500);
  }
  return secret;
}

export async function POST(context: APIContext): Promise<Response> {
  const secret = requireSecret(context);
  if (secret instanceof Response) return secret;

  const contentType = context.request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415);
  }

  // Authenticate before parsing or saving anything.
  if (!verifyBearer(context.request.headers.get('authorization'), secret)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  let delivery;
  try {
    delivery = validateDelivery(body);
  } catch (error) {
    if (error instanceof ValidationError) return json({ error: error.message }, error.status);
    throw error;
  }

  // Connection test: validate auth + payload, never persist.
  if (delivery.test) {
    return json({ ok: true });
  }

  // Real deliveries carry positive post ids (0 is reserved for tests).
  for (const post of delivery.data.posts) {
    if (post.id <= 0) {
      return json({ error: 'Real posts must have a positive id' }, 400);
    }
  }

  const db = getDb(context.locals);
  if (!db) {
    console.error('[seo-webhook] DB binding is not configured');
    return json({ error: 'Server misconfigured' }, 500);
  }

  try {
    await upsertPosts(db, delivery.data.posts);
  } catch (error) {
    // Storage failure -> non-2xx so NotFair retries the delivery.
    console.error('[seo-webhook] failed to store posts', error);
    return json({ error: 'Storage failure' }, 500);
  }

  return json({ ok: true, stored: delivery.data.posts.length });
}
