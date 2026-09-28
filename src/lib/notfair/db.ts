import type { NotFairPost, NotFairPostRow } from './types';

/** Structural subset of Cloudflare's D1Database, so this module stays
 *  testable without a real binding (tests pass a fake). */
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean }>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  first<T = unknown>(): Promise<T | null>;
}

export interface D1Like {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}

const UPSERT_SQL = [
  'INSERT INTO notfair_posts',
  '  (id, title, slug, content_html, meta_description, tags, image_url, reading_time_minutes, created_at, updated_at)',
  'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  'ON CONFLICT(id) DO UPDATE SET',
  '  title = excluded.title,',
  '  slug = excluded.slug,',
  '  content_html = excluded.content_html,',
  '  meta_description = excluded.meta_description,',
  '  tags = excluded.tags,',
  '  image_url = excluded.image_url,',
  '  reading_time_minutes = excluded.reading_time_minutes,',
  '  created_at = excluded.created_at,',
  '  updated_at = excluded.updated_at',
].join('\n');

/** Idempotent store: same id/slug delivered again overwrites the row.
 *  D1 executes `db.batch()` sequentially; every statement is an upsert,
 *  so retrying a delivery never creates a second URL for the same post. */
export async function upsertPosts(db: D1Like, posts: NotFairPost[]): Promise<void> {
  if (posts.length === 0) return;
  const statements = posts.map((post) =>
    db.prepare(UPSERT_SQL).bind(
      post.id,
      post.title,
      post.slug,
      post.content_html,
      post.meta_description,
      JSON.stringify(post.tags),
      post.image_url,
      post.reading_time_minutes,
      post.created_at,
      post.updated_at,
    ),
  );
  await db.batch(statements);
}

/** Newest first; falls back to id order when created_at is empty. */
export async function listPosts(db: D1Like): Promise<NotFairPost[]> {
  const result = await db
    .prepare(
      'SELECT id, title, slug, content_html, meta_description, tags, image_url,' +
        ' reading_time_minutes, created_at, updated_at' +
        ' FROM notfair_posts' +
        " ORDER BY COALESCE(NULLIF(created_at, ''), '0') DESC, id DESC",
    )
    .all<NotFairPostRow>();
  return result.results.map(rowToPost);
}

export async function getPostBySlug(db: D1Like, slug: string): Promise<NotFairPost | null> {
  const row = await db
    .prepare(
      'SELECT id, title, slug, content_html, meta_description, tags, image_url,' +
        ' reading_time_minutes, created_at, updated_at' +
        ' FROM notfair_posts WHERE slug = ? LIMIT 1',
    )
    .bind(slug)
    .first<NotFairPostRow>();
  return row ? rowToPost(row) : null;
}

function rowToPost(row: NotFairPostRow): NotFairPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content_html: row.content_html,
    meta_description: row.meta_description ?? null,
    tags: parseTags(row.tags),
    image_url: row.image_url ?? null,
    reading_time_minutes: row.reading_time_minutes ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at ?? null,
  };
}

function parseTags(raw: unknown): string[] {
  if (typeof raw !== 'string' || raw.length === 0) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === 'string')
      : [];
  } catch {
    return [];
  }
}
