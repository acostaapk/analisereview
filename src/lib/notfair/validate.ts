import type { NotFairDelivery, NotFairPost } from './types';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class ValidationError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

export function validateDelivery(body: unknown): NotFairDelivery {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError('Body must be a JSON object');
  }
  const record = body as Record<string, unknown>;

  if (typeof record.event_type !== 'string' || record.event_type.length === 0) {
    throw new ValidationError('event_type is required');
  }
  if (typeof record.test !== 'boolean') {
    throw new ValidationError('test must be a boolean');
  }

  const data = record.data as Record<string, unknown> | undefined;
  if (typeof data !== 'object' || data === null || !Array.isArray(data.posts)) {
    throw new ValidationError('data.posts must be an array');
  }

  const rawPosts = data.posts as unknown[];
  if (rawPosts.length < 1 || rawPosts.length > 10) {
    throw new ValidationError('A delivery must contain 1-10 posts');
  }

  const posts = rawPosts.map((raw) => validatePost(raw));
  return {
    event_type: record.event_type,
    test: record.test,
    timestamp: typeof record.timestamp === 'string' ? record.timestamp : '',
    data: { posts },
  };
}

export function validatePost(raw: unknown): NotFairPost {
  if (typeof raw !== 'object' || raw === null) {
    throw new ValidationError('Each post must be an object');
  }
  const post = raw as Record<string, unknown>;

  if (typeof post.id !== 'number' || !Number.isInteger(post.id) || post.id < 0) {
    throw new ValidationError('id must be a non-negative integer (0 is reserved for test deliveries)');
  }
  if (typeof post.title !== 'string' || post.title.trim().length === 0) {
    throw new ValidationError('title is required');
  }
  if (typeof post.slug !== 'string' || post.slug.length === 0) {
    throw new ValidationError('slug is required');
  }
  if (!SLUG_RE.test(post.slug)) {
    throw new ValidationError('slug must be a lowercase URL slug');
  }
  if (typeof post.content_html !== 'string') {
    throw new ValidationError('content_html is required');
  }
  if (typeof post.created_at !== 'string' || post.created_at.trim().length === 0) {
    throw new ValidationError('created_at is required');
  }

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content_html: post.content_html,
    meta_description: typeof post.meta_description === 'string' ? post.meta_description : null,
    tags: Array.isArray(post.tags)
      ? (post.tags as unknown[]).filter((tag): tag is string => typeof tag === 'string')
      : [],
    image_url: typeof post.image_url === 'string' ? post.image_url : null,
    reading_time_minutes:
      typeof post.reading_time_minutes === 'number' ? post.reading_time_minutes : null,
    created_at: post.created_at,
    updated_at: typeof post.updated_at === 'string' ? post.updated_at : null,
  };
}
