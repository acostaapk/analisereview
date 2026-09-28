import type { APIContext } from 'astro';
import { describe, expect, it } from 'vitest';
import { POST } from '../src/pages/api/seo-webhook';

const SECRET = 's3cr3t-webhook';

const post = {
  id: 123,
  title: 'Article title',
  slug: 'article-title',
  content_html: '<p>Complete article HTML</p>',
  meta_description: 'Search description',
  tags: ['seo', 'marketing'],
  image_url: 'https://notfair.co/api/seo/og?postId=123',
  reading_time_minutes: 5,
  created_at: '2026-08-09T12:00:00.000Z',
  updated_at: '2026-08-10T12:00:00.000Z',
};

const realDelivery = {
  event_type: 'publish_posts',
  test: false,
  timestamp: '2026-08-09T12:00:00.000Z',
  data: { posts: [post] },
};

function makeFakeDb() {
  const rows = new Map<number, Record<string, unknown>>();
  const db = {
    rows,
    prepare(query: string) {
      let values: unknown[] = [];
      const statement = {
        bind(...args: unknown[]) {
          values = args;
          return statement;
        },
        async run() {
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
            rows.set(id as number, {
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
            });
          }
          return { success: true };
        },
        async all() {
          return { results: [...rows.values()] };
        },
        async first() {
          return null;
        },
      };
      return statement;
    },
    async batch(statements: { run(): Promise<unknown> }[]) {
      const out: unknown[] = [];
      for (const statement of statements) out.push(await statement.run());
      return out;
    },
  };
  return db;
}

function makeContext(options: {
  auth?: string;
  contentType?: string | null;
  body?: unknown;
  rawBody?: string;
  db?: ReturnType<typeof makeFakeDb>;
  secret?: string;
}): APIContext {
  const headers = new Headers();
  if (options.contentType !== null) {
    headers.set('content-type', options.contentType ?? 'application/json');
  }
  if (options.auth !== undefined) headers.set('authorization', options.auth);
  const init: RequestInit = { method: 'POST', headers };
  if (options.rawBody !== undefined) {
    init.body = options.rawBody;
  } else if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }
  const request = new Request('https://analisereview.com.br/api/seo-webhook', init);
  const locals = {
    runtime: {
      env: {
        NOTFAIR_SEO_WEBHOOK_SECRET: options.secret ?? SECRET,
        DB: options.db,
      },
    },
  };
  return { request, locals } as unknown as APIContext;
}

describe('POST /api/seo-webhook', () => {
  it('returns 401 for a missing or invalid secret, before touching storage', async () => {
    const db = makeFakeDb();
    for (const auth of [undefined, 'Bearer wrong', 'wrong-scheme']) {
      const response = await POST(makeContext({ auth, body: realDelivery, db }));
      expect(response.status).toBe(401);
    }
    expect(db.rows.size).toBe(0);
  });

  it('rejects a non-JSON Content-Type', async () => {
    const response = await POST(
      makeContext({ auth: `Bearer ${SECRET}`, contentType: 'text/plain', db: makeFakeDb(), body: realDelivery }),
    );
    expect(response.status).toBe(415);
  });

  it('rejects malformed JSON', async () => {
    const response = await POST(
      makeContext({ auth: `Bearer ${SECRET}`, db: makeFakeDb(), rawBody: '{oops' }),
    );
    expect(response.status).toBe(400);
  });

  it('accepts a signed test delivery without persisting it', async () => {
    const db = makeFakeDb();
    const response = await POST(
      makeContext({
        auth: `Bearer ${SECRET}`,
        db,
        body: {
          event_type: 'publish_posts',
          test: true,
          timestamp: '2026-08-09T12:00:00.000Z',
          data: {
            posts: [
              {
                id: 0,
                title: 'Connection test',
                slug: 'connection-test',
                content_html: '<p>test</p>',
                created_at: '2026-08-09T12:00:00.000Z',
              },
            ],
          },
        },
      }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(db.rows.size).toBe(0);
  });

  it('stores a real delivery and returns 2xx only after storing', async () => {
    const db = makeFakeDb();
    const response = await POST(
      makeContext({ auth: `Bearer ${SECRET}`, db, body: structuredClone(realDelivery) }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, stored: 1 });

    const stored = db.rows.get(123);
    expect(stored?.title).toBe('Article title');
    expect(stored?.slug).toBe('article-title');
    expect(stored?.content_html).toBe('<p>Complete article HTML</p>');
    expect(stored?.image_url).toBe('https://notfair.co/api/seo/og?postId=123');
    expect(stored?.updated_at).toBe('2026-08-10T12:00:00.000Z');
    expect(JSON.parse(stored?.tags as string)).toEqual(['seo', 'marketing']);
  });

  it('a repeated real delivery overwrites the same row (no second URL)', async () => {
    const db = makeFakeDb();
    const context = () =>
      makeContext({ auth: `Bearer ${SECRET}`, db, body: structuredClone(realDelivery) });
    expect((await POST(context())).status).toBe(200);

    const updated = structuredClone(realDelivery);
    updated.data.posts[0].title = 'Article title (v2)';
    updated.data.posts[0].updated_at = '2026-08-11T12:00:00.000Z';
    expect((await POST(makeContext({ auth: `Bearer ${SECRET}`, db, body: updated }))).status).toBe(
      200,
    );

    expect(db.rows.size).toBe(1);
    expect(db.rows.get(123)?.title).toBe('Article title (v2)');
  });

  it('rejects a real delivery that carries id 0 and an invalid post', async () => {
    const db = makeFakeDb();
    const zeroId = structuredClone(realDelivery);
    zeroId.data.posts[0].id = 0;
    expect(
      (await POST(makeContext({ auth: `Bearer ${SECRET}`, db, body: zeroId }))).status,
    ).toBe(400);

    const badSlug = structuredClone(realDelivery);
    badSlug.data.posts[0].slug = 'Not A Slug!';
    expect(
      (await POST(makeContext({ auth: `Bearer ${SECRET}`, db, body: badSlug }))).status,
    ).toBe(400);
    expect(db.rows.size).toBe(0);
  });

  it('returns 500 when the secret or DB binding is missing', async () => {
    const noSecret = await POST(
      makeContext({ auth: 'Bearer x', body: realDelivery, secret: '', db: makeFakeDb() }),
    );
    expect(noSecret.status).toBe(500);

    const noDb = await POST(
      makeContext({ auth: `Bearer ${SECRET}`, body: realDelivery, db: undefined }),
    );
    expect(noDb.status).toBe(500);
  });
});
