import { describe, expect, it } from 'vitest';
import { validateDelivery, validatePost, ValidationError } from '../src/lib/notfair/validate';

const realPost = {
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
  data: { posts: [realPost] },
};

function expectInvalid(body: unknown, message: string): void {
  expect(() => validateDelivery(body)).toThrowError(ValidationError);
  expect(() => validateDelivery(body)).toThrowError(message);
}

describe('validateDelivery', () => {
  it('accepts the contract example and normalizes every field', () => {
    const delivery = validateDelivery(structuredClone(realDelivery));
    expect(delivery.test).toBe(false);
    expect(delivery.data.posts).toHaveLength(1);
    expect(delivery.data.posts[0]).toEqual(realPost);
  });

  it('accepts a connection test (test: true, minimal fields, id: 0)', () => {
    const delivery = validateDelivery({
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
    });
    expect(delivery.test).toBe(true);
    const post = delivery.data.posts[0];
    expect(post.id).toBe(0);
    expect(post.meta_description).toBeNull();
    expect(post.tags).toEqual([]);
    expect(post.image_url).toBeNull();
    expect(post.reading_time_minutes).toBeNull();
    expect(post.updated_at).toBeNull();
  });

  it('accepts up to 10 posts', () => {
    const posts = Array.from({ length: 10 }, (_, i) => ({
      ...realPost,
      id: 100 + i,
      slug: `post-${i}`,
    }));
    const delivery = validateDelivery({ ...realDelivery, data: { posts } });
    expect(delivery.data.posts).toHaveLength(10);
  });

  it('rejects empty and oversized batches', () => {
    expectInvalid({ ...realDelivery, data: { posts: [] } }, '1-10 posts');
    const posts = Array.from({ length: 11 }, (_, i) => ({ ...realPost, id: 100 + i, slug: `p-${i}` }));
    expectInvalid({ ...realDelivery, data: { posts } }, '1-10 posts');
  });

  it('rejects a non-object body and missing envelope fields', () => {
    expectInvalid(null, 'JSON object');
    expectInvalid('nope', 'JSON object');
    expectInvalid({ ...realDelivery, event_type: undefined }, 'event_type');
    expectInvalid({ ...realDelivery, test: 'yes' }, 'test must be a boolean');
    expectInvalid({ ...realDelivery, data: {} }, 'data.posts');
  });
});

describe('validatePost', () => {
  it('requires id, title, slug, content_html, created_at', () => {
    const base = { ...realPost };
    for (const field of ['title', 'slug', 'content_html', 'created_at'] as const) {
      const copy = { ...base };
      delete (copy as Record<string, unknown>)[field];
      expect(() => validatePost(copy)).toThrowError(ValidationError);
    }
  });

  it('rejects non-integer, negative, or non-numeric ids', () => {
    for (const id of [-1, 1.5, '123', null]) {
      expect(() => validatePost({ ...realPost, id })).toThrowError(/id/);
    }
  });

  it('rejects slugs that are not lowercase URL slugs', () => {
    for (const slug of ['Article-Title', 'article title', 'artigo_título', '/x', '']) {
      expect(() => validatePost({ ...realPost, slug })).toThrowError(/slug/);
    }
  });

  it('keeps only string tags and drops the rest', () => {
    const post = validatePost({ ...realPost, tags: ['seo', 42, null, 'marketing'] });
    expect(post.tags).toEqual(['seo', 'marketing']);
  });
});
