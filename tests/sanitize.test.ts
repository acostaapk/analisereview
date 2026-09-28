import { describe, expect, it } from 'vitest';
import { sanitizeArticleHtml } from '../src/lib/notfair/sanitize';

describe('sanitizeArticleHtml', () => {
  it('keeps the featured cover image and inline images', () => {
    const html = sanitizeArticleHtml(
      '<p><img src="https://notfair.co/api/seo/og?postId=123" alt="cover" width="1200" height="675" loading="lazy"></p>' +
        '<p><img src="https://example.supabase.co/storage/v1/object/public/img.png" alt="inline"></p>',
    );
    expect(html).toContain('src="https://notfair.co/api/seo/og?postId=123"');
    expect(html).toContain('src="https://example.supabase.co/storage/v1/object/public/img.png"');
    expect(html).toContain('alt="cover"');
  });

  it('preserves links with safe rel and keeps headings, tables, figures, TOC', () => {
    const html = sanitizeArticleHtml(
      '<nav class="nf-toc"><p class="nf-toc-title">Sumário</p><ul><li class="nf-toc-l2"><a href="https://analisereview.com.br/blog/x" target="_blank">X</a></li></ul></nav>' +
        '<h2 id="s1">Seção</h2><div class="nf-tablewrap"><table><thead><tr><th scope="col">A</th></tr></thead><tbody><tr><td>B</td></tr></tbody></table></div>' +
        '<figure><figcaption>Legenda</figcaption></figure><p class="nf-attribution">Divulgação</p>',
    );
    expect(html).toContain('<nav class="nf-toc">');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('<h2 id="s1">');
    expect(html).toContain('<th scope="col">');
    expect(html).toContain('<figcaption>');
    expect(html).toContain('nf-attribution');
  });

  it('strips scripts, event handlers, and dangerous schemes', () => {
    const html = sanitizeArticleHtml(
      '<p onclick="evil()">x</p><script>alert(1)</script>' +
        '<a href="javascript:alert(1)">bad</a>' +
        '<img src="https://notfair.co/api/seo/og?postId=1" onerror="evil()" alt="ok">',
    );
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onclick');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('javascript:');
    expect(html).toContain('alt="ok"');
  });
});
