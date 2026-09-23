# AnaliseReview

Site estático de análises de cursos de renda extra (Astro).

## Deploy (Cloudflare Pages)

1. Suba este repositório para o GitHub.
2. No Cloudflare Pages: "Create project" → conecte o repo.
3. Build command: `npm run build` · Output dir: `dist`.

## Publicar uma review nova

Crie `src/content/reviews/<slug>.md` seguindo o schema em
`src/content/config.ts`. O site gera a página automaticamente.
