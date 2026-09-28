import { describe, expect, it } from 'vitest';
import type { D1Like, D1PreparedStatement } from '../src/lib/notfair/db';
import { getPostBySlug, listPosts, upsertPosts } from '../src/lib/notfair/db';
import type { NotFairPost, NotFairPostRow } from '../src/lib/notfair/types';

/** Stateful in-memory D1 double. Applies the real UPSERT semantics
 *  (overwrite by id, unique slug) so idempotency is actually exercised. */
class FakeD1 implements D1Like {
  rows = new Map<number, NotFairPostRow>();
  statements: string[] = [];

  prepare(query: string): D1PreparedStatement {
    const fake = this;
    let values: unknown[] = [];
    const statement: D1PreparedStatement = {
      bind(...args: unknown[]) {
        values = args;
        return statement;
      },
      async run() {
        fake.statements.push(query);
        if (query.startsWith('INSERT INTO notfair_posts')) {
          const [
            id,
            title,
            slug,
            content_html,
            meta_description,
            tags,
            image_url,
            reading_time_minutes,
            created_at,
            updated_at,
          ] = values;
          const row = {
            id,
            title,
            slug,
            content_html,
            meta_description,
            tags,
            image_url,
            reading_time_minutes,
            created_at,
            updated_at,
          } as unknown as NotFairPostRow;
          for (const existing of fake.rows.values()) {
            if (existing.slug === row.slug && existing.id !== row.id) {
              throw new Error('UNIQUE constraint failed: notfair_posts.slug');
            }
          }
          fake.rows.set(row.id, row);
        }
        return { success: true };
      },
      async all<T>() {
        fake.statements.push(query);
        const rows = [...fake.rows.values()].sort(
          (a, b) => String(b.created_at).localeCompare(String(a.created_at)) || b.id - a.id,
        );
        return { results: rows as unknown as T[] };
      },
      async first<T>() {
        fake.statements.push(query);
        const slug = values[0] as string;
        for (const row of fake.rows.values()) {
          if (row.slug === slug) return row as unknown as T;
        }
        return null;
      },
    };
    return statement;
  }

  async batch(statements: D1PreparedStatement[]): Promise<unknown[]> {
    const results: unknown[] = [];
    for (const statement of statements) results.push(await statement.run());
    return results;
  }
}

const post: NotFairPost = {
  id: 123,
  title: 'Article title',
  slug: 'article-title',
  content_html: '<p>Complete article HTML</p><img src="https://example.supabase.co/storage/i.png" alt="inline">',
  meta_description: 'Search description',
  tags: ['seo', 'marketing'],
  image_url: 'https://notfair.co/api/seo/og?postId=123',
  reading_time_minutes: 5,
  created_at: '2026-08-09T12:00:00.000Z',
  updated_at: '2026-08-10T12:00:00.000Z',
};

describe('upsertPosts', () => {
  it('stores every supplied field with an idempotent ON CONFLICT(id) upsert', async () => {
    const db = new FakeD1();
    await upsertPosts(db, [post]);

    expect(
      db.statements.some((sql) => /ON CONFLICT\s*\(\s*id\s*\)\s*DO UPDATE/i.test(sql)),
    ).toBe(true);
    expect(db.rows.size).toBe(1);

    const stored = await getPostBySlug(db, 'article-title');
    expect(stored).toEqual(post);
  });

  it('a repeated delivery with the same id and slug overwrites instead of duplicating', async () => {
    const db = new FakeD1();
    await upsertPosts(db, [post]);
    await upsertPosts(db, [
      {
        ...post,
        title: 'Article title (atualizado)',
        content_html: '<p>Complete article HTML v2</p>',
        updated_at: '2026-08-11T12:00:00.000Z',
      },
    ]);

    expect(db.rows.size).toBe(1);
    const stored = await getPostBySlug(db, 'article-title');
    expect(stored?.title).toBe('Article title (atualizado)');
    expect(stored?.content_html).toBe('<p>Complete article HTML v2</p>');
    expect(stored?.updated_at).toBe('2026-08-11T12:00:00.000Z');
    // Untouched fields survive the overwrite.
    expect(stored?.image_url).toBe('https://notfair.co/api/seo/og?postId=123');
    expect(stored?.tags).toEqual(['seo', 'marketing']);
  });

  it('stores a whole batch in one call', async () => {
    const db = new FakeD1();
    await upsertPosts(db, [
      post,
      { ...post, id: 124, slug: 'second-post', title: 'Second post' },
    ]);
    expect(db.rows.size).toBe(2);
  });
});

describe('listPosts / getPostBySlug', () => {
  it('returns null for an unknown slug', async () => {
    const db = new FakeD1();
    expect(await getPostBySlug(db, 'missing')).toBeNull();
  });

  it('lists stored posts with tags parsed back from JSON', async () => {
    const db = new FakeD1();
    await upsertPosts(db, [post]);
    const posts = await listPosts(db);
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe('article-title');
    expect(posts[0].tags).toEqual(['seo', 'marketing']);
    expect(posts[0].image_url).toBe('https://notfair.co/api/seo/og?postId=123');
  });
});
