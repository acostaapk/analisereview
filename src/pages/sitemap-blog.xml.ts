import type { APIContext } from 'astro';
import { listPosts } from '../lib/notfair/db';
import { getDb } from '../lib/notfair/env';
import { siteBase } from '../data/site';

export const prerender = false;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Dynamic sitemap for NotFair blog posts stored in D1.
 *  Referenced from robots.txt alongside the static sitemap-index.xml. */
export async function GET(context: APIContext): Promise<Response> {
  const db = getDb(context.locals);
  const posts = db ? await listPosts(db) : [];

  const urls = posts
    .map((post) => {
      const lastmod = post.updated_at ?? post.created_at;
      return [
        '<url>',
        `<loc>${siteBase}/blog/${escapeXml(post.slug)}</loc>`,
        lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '',
        '</url>',
      ].join('');
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
