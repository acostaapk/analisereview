import sanitizeHtml from 'sanitize-html';

/** Article-safe policy: same family as NotFair's own Next.js client.
 *  Keeps headings, TOC, tables, figures, links, and remote https images
 *  (notfair.co and any HTTPS host present in delivered content_html). */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'figure',
      'figcaption',
      'h1',
      'h2',
      'h3',
      'h4',
      'img',
      'nav',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'title', 'target', 'rel'],
      div: ['class'],
      h1: ['id'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      li: ['class'],
      nav: ['aria-label', 'class'],
      p: ['class'],
      th: ['scope'],
      td: ['scope'],
    },
    allowedClasses: {
      div: ['nf-tablewrap'],
      li: ['nf-toc-l2', 'nf-toc-l3'],
      nav: ['nf-toc'],
      p: ['nf-attribution', 'nf-toc-title'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['https'] },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });
}
