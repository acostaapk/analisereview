# AnaliseReview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static MVP of `analisereview.com.br` — home, one review (Fórmula Negócio Online), and methodology page — as an Astro site with an editorial "jornal de análise" design.

**Architecture:** Astro static site with a `reviews` content collection (one Markdown file per review, validated by Zod). A `[slug].astro` template renders any review through five presentational components. No backend, no framework runtime JS.

**Tech Stack:** Astro 5, TypeScript, Zod (content schema), `@fontsource` (self-hosted Fraunces + Source Serif 4), Cloudflare Pages deploy.

**Spec:** `docs/superpowers/specs/2026-09-23-analisereview-design.md`

## Global Constraints

- Todo conteúdo é pt-BR; geografia Brasil.
- Proibido afirmar renda/ganho ("ganhe R$X") em qualquer texto.
- Todo link de afiliado usa `rel="nofollow sponsored"` e exibe disclosure "Podemos receber comissão pela sua compra, sem custo adicional para você."
- Tipografia: Fraunces (display) + Source Serif 4 (body). Nunca Inter/Roboto/Arial/system-ui.
- Cores: tinta `#1a1a1a`, papel `#faf7f2`, accent vermelho-editorial `#b3261e`. Um único accent. Sem gradientes.
- Contraste AA (4.5:1), foco visível, um único `<h1>` por página, `prefers-reduced-motion` respeitado, reflow até 320px.
- Dados de preço/avaliações sempre acompanhados de data de consulta (`updatedAt`).
- Um único `<h1>` por página; landmarks `<header>/<nav>/<main>/<footer>`.

---

### Task 1: Scaffold do projeto Astro

**Files:**
- Create: `analisereview/package.json`, `analisereview/astro.config.mjs`, `analisereview/tsconfig.json`, `analisereview/.gitignore`, `analisereview/src/env.d.ts`

**Interfaces:**
- Produces: um projeto Astro que compila com `npm run build` e expõe `src/`, `src/pages/`, `src/layouts/`, `src/components/`, `src/content/`, `src/styles/`.

- [ ] **Step 1: Criar o projeto**

```bash
cd /home/andre/marketing
npm create astro@latest analisereview -- --template minimal --typescript strict --no-git --yes
cd analisereview
```

- [ ] **Step 2: Instalar dependências de design e conteúdo**

```bash
npm install @fontsource/fraunces @fontsource/source-serif-4
```

- [ ] **Step 3: Ajustar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://analisereview.com.br',
  output: 'static',
});
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: saída em `dist/` sem erros.

- [ ] **Step 5: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Design tokens (global.css)

**Files:**
- Create: `analisereview/src/styles/global.css`

**Interfaces:**
- Produces: variáveis CSS consumidas por todos os componentes: `--color-ink`, `--color-paper`, `--color-accent`, `--color-muted`, `--font-display`, `--font-body`, escala de espaçamento `--space-1..--space-8`.

- [ ] **Step 1: Escrever os tokens e o reset base**

```css
@import '@fontsource/fraunces/600.css';
@import '@fontsource/fraunces/700.css';
@import '@fontsource/source-serif-4/400.css';
@import '@fontsource/source-serif-4/600.css';

:root {
  --color-ink: #1a1a1a;
  --color-paper: #faf7f2;
  --color-surface: #fffdf9;
  --color-accent: #b3261e;
  --color-muted: #5c574f;
  --color-rule: #d9d2c5;

  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --space-7: 4rem;
  --space-8: 6rem;

  --measure: 65ch;
}

* { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-ink);
  background: var(--color-paper);
}

h1, h2, h3 { font-family: var(--font-display); line-height: 1.15; }

a { color: var(--color-accent); }

a:focus-visible, button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: CSS compilado sem erro.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css && git commit -m "feat: add design tokens and base styles"
```

---

### Task 3: Layout base

**Files:**
- Create: `analisereview/src/layouts/Base.astro`

**Interfaces:**
- Consumes: `global.css`, tokens da Task 2.
- Produces: componente `Base` com `props: { title: string; description: string }` e `<slot />` para o conteúdo da página.

- [ ] **Step 1: Escrever o layout**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} — AnaliseReview</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <header>
      <nav>
        <a href="/"><strong>AnaliseReview</strong></a>
        <a href="/metodologia">Metodologia</a>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>Análises independentes de cursos de renda extra. © {new Date().getFullYear()}</p>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: sem erro.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro && git commit -m "feat: add base layout"
```

---

### Task 4: Schema da content collection

**Files:**
- Create: `analisereview/src/content/config.ts`

**Interfaces:**
- Produces: `defineCollection` nomeada `reviews`; tipo gerado `CollectionEntry<'reviews'>` com os campos: `title, product, author, price, priceCurrency, reviewCount, score, subscores, pros, cons, verdict, recommended, affiliateUrl, category, updatedAt, description`.

- [ ] **Step 1: Escrever o schema Zod**

```ts
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    product: z.string(),
    author: z.string(),
    price: z.number().positive(),
    priceCurrency: z.string().default('BRL'),
    reviewCount: z.number().int().nonnegative(),
    score: z.number().min(0).max(10),
    subscores: z.object({
      conteudo: z.number().min(0).max(10),
      suporte: z.number().min(0).max(10),
      garantia: z.number().min(0).max(10),
      custoBeneficio: z.number().min(0).max(10),
    }),
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()),
    verdict: z.string(),
    recommended: z.boolean(),
    affiliateUrl: z.string().url(),
    category: z.string(),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: z.string(),
  }),
});

export const collections = { reviews };
```

- [ ] **Step 2: Sincronizar tipos**

Run: `npm run astro sync`
Expected: gera `.astro/types.d.ts` sem erro.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts && git commit -m "feat: add reviews content collection schema"
```

---

### Task 5: Conteúdo da review (Fórmula Negócio Online)

**Files:**
- Create: `analisereview/src/content/reviews/formula-negocio-online.md`

**Interfaces:**
- Consumes: schema da Task 4.
- Produces: `CollectionEntry<'reviews'>` "formula-negocio-online" consumido pelo template da Task 7.

- [ ] **Step 1: Escrever o frontmatter e o corpo**

```markdown
---
title: "Fórmula Negócio Online: análise completa"
description: "Análise independente do curso Fórmula Negócio Online, de Alex Vargas: preço, conteúdo, avaliações e para quem vale a pena."
product: "Fórmula Negócio Online"
author: "Alex Vargas"
price: 297
priceCurrency: "BRL"
reviewCount: 11296
score: 7.5
subscores:
  conteudo: 8
  suporte: 6
  garantia: 8
  custoBeneficio: 7
pros:
  - "Marca consolidada e autor com reputação estabelecida"
  - "Abordagem passo a passo voltada a iniciantes"
  - "Garantia de reembolso (verificar prazo no site oficial)"
cons:
  - "Preço relativamente alto para quem está começando"
  - "Não substitui execução; exige dedicação do aluno"
verdict: "Recomendado para quem quer começar um negócio digital do zero com um método estruturado, e que já tem orçamento para o investimento."
recommended: true
affiliateUrl: "https://hotmart.com/pt-br/marketplace/produtos/formula-negocio-online-51/A1412453A"
category: "renda extra"
updatedAt: "2026-09-23"
---

## Para quem é

O Fórmula Negócio Online é um treinamento de criação de negócio digital
voltado a iniciantes. Esta análise considera dados públicos disponíveis na
Hotmart na data de atualização.

## O que o curso entrega

O treinamento propõe um passo a passo para montar um negócio online do zero,
da escolha de nicho à estruturação da oferta. Como não testamos o curso, a
nota reflete fatores observáveis publicamente: escopo do conteúdo, volume de
avaliações e reputação do autor.

## O que considerar antes de comprar

- O preço (R$ 297) exige orçamento disponível.
- Resultados dependem de execução; desconfie de qualquer promessa de ganho
  garantido.

## Veredito

Recomendado para iniciantes com orçamento e disposição para aplicar o método.
```

- [ ] **Step 2: Verificar validação do schema**

Run: `npm run astro check`
Expected: nenhum erro de tipo/schema.

- [ ] **Step 3: Commit**

```bash
git add src/content/reviews/formula-negocio-online.md && git commit -m "content: add Fórmula Negócio Online review"
```

---

### Task 6: Componentes de review

**Files:**
- Create: `analisereview/src/components/Scorecard.astro`, `DataTable.astro`, `ProsCons.astro`, `VerdictBox.astro`, `AffiliateCTA.astro`

**Interfaces:**
- `Scorecard` — props `{ score: number; subscores: { conteudo: number; suporte: number; garantia: number; custoBeneficio: number } }`
- `DataTable` — props `{ rows: { label: string; value: string }[] }`
- `ProsCons` — props `{ pros: string[]; cons: string[] }`
- `VerdictBox` — props `{ verdict: string; recommended: boolean; score: number }`
- `AffiliateCTA` — props `{ href: string; product: string }`

- [ ] **Step 1: Scorecard**

```astro
---
interface Props {
  score: number;
  subscores: { conteudo: number; suporte: number; garantia: number; custoBeneficio: number };
}
const { score, subscores } = Astro.props;
const items = [
  ['Conteúdo', subscores.conteudo],
  ['Suporte', subscores.suporte],
  ['Garantia', subscores.garantia],
  ['Custo-benefício', subscores.custoBeneficio],
] as const;
---

<div class="scorecard">
  <p class="score" aria-label={`Nota ${score} de 10`}>{score}<span>/10</span></p>
  <ul>
    {items.map(([label, value]) => (
      <li><span>{label}</span><strong>{value}</strong></li>
    ))}
  </ul>
</div>

<style>
  .scorecard { border: 1px solid var(--color-ink); padding: var(--space-4); background: var(--color-surface); }
  .score { font-family: var(--font-display); font-size: 3rem; margin: 0 0 var(--space-3); }
  .score span { font-size: 1rem; color: var(--color-muted); }
  ul { list-style: none; margin: 0; padding: 0; }
  li { display: flex; justify-content: space-between; border-top: 1px solid var(--color-rule); padding: var(--space-2) 0; }
  li:first-child { border-top: 0; }
</style>
```

- [ ] **Step 2: DataTable**

```astro
---
interface Props { rows: { label: string; value: string }[] }
const { rows } = Astro.props;
---

<table>
  <tbody>
    {rows.map((r) => (
      <tr><th scope="row">{r.label}</th><td>{r.value}</td></tr>
    ))}
  </tbody>
</table>

<style>
  table { width: 100%; border-collapse: collapse; font-size: 1rem; }
  th, td { text-align: left; padding: var(--space-2); border-bottom: 1px solid var(--color-rule); }
  th { font-weight: 600; width: 40%; color: var(--color-muted); }
</style>
```

- [ ] **Step 3: ProsCons**

```astro
---
interface Props { pros: string[]; cons: string[] }
const { pros, cons } = Astro.props;
---

<div class="proscons">
  <div>
    <h3>Prós</h3>
    <ul>{pros.map((p) => <li>{p}</li>)}</ul>
  </div>
  <div>
    <h3>Contras</h3>
    <ul>{cons.map((c) => <li>{c}</li>)}</ul>
  </div>
</div>

<style>
  .proscons { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
  @media (max-width: 640px) { .proscons { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 4: VerdictBox**

```astro
---
interface Props { verdict: string; recommended: boolean; score: number }
const { verdict, recommended, score } = Astro.props;
const label = recommended ? 'Recomendado' : 'Não recomendado';
---

<div class="verdict" role="note">
  <p class="label">{label} — nota {score}</p>
  <p>{verdict}</p>
</div>

<style>
  .verdict { border-left: 4px solid var(--color-accent); padding: var(--space-4); background: var(--color-surface); }
  .label { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 var(--space-2); }
</style>
```

- [ ] **Step 5: AffiliateCTA**

```astro
---
interface Props { href: string; product: string }
const { href, product } = Astro.props;
---

<div class="cta">
  <a href={href} rel="nofollow sponsored">Ver {product} na Hotmart</a>
  <p class="disclosure">Podemos receber comissão pela sua compra, sem custo adicional para você.</p>
</div>

<style>
  .cta { margin-top: var(--space-5); }
  a { display: inline-block; background: var(--color-ink); color: var(--color-paper); padding: var(--space-3) var(--space-4); text-decoration: none; font-weight: 600; }
  .disclosure { font-size: 0.875rem; color: var(--color-muted); }
</style>
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: sem erro.

- [ ] **Step 7: Commit**

```bash
git add src/components && git commit -m "feat: add review components"
```

---

### Task 7: Template de review

**Files:**
- Create: `analisereview/src/pages/reviews/[slug].astro`

**Interfaces:**
- Consumes: collection `reviews` (Task 4), componentes (Task 6), `Base` (Task 3).
- Produces: rota `/reviews/[slug]` para cada review.

- [ ] **Step 1: Escrever o template**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Scorecard from '../../components/Scorecard.astro';
import DataTable from '../../components/DataTable.astro';
import ProsCons from '../../components/ProsCons.astro';
import VerdictBox from '../../components/VerdictBox.astro';
import AffiliateCTA from '../../components/AffiliateCTA.astro';

export async function getStaticPaths() {
  const reviews = await getCollection('reviews');
  return reviews.map((r) => ({ params: { slug: r.slug }, props: { review: r } }));
}

const { review } = Astro.props;
const { Content } = await review.render();
const { title, product, author, price, priceCurrency, reviewCount, score, subscores, pros, cons, verdict, recommended, affiliateUrl, updatedAt, description } = review.data;

const rows = [
  { label: 'Preço', value: `${price.toLocaleString('pt-BR', { style: 'currency', currency: priceCurrency })}` },
  { label: 'Avaliações', value: reviewCount.toLocaleString('pt-BR') },
  { label: 'Autor', value: author },
  { label: 'Atualizado em', value: updatedAt },
];

const priceValue = price.toLocaleString('pt-BR', { style: 'currency', currency: priceCurrency });
---

<Base title={title} description={description}>
  <article>
    <h1>{title}</h1>
    <p class="dek">Análise independente baseada em dados públicos. Atualizado em {updatedAt}.</p>

    <Scorecard score={score} subscores={subscores} />
    <h2>Ficha do curso</h2>
    <DataTable rows={rows} />
    <ProsCons pros={pros} cons={cons} />

    <div class="body">
      <Content />
    </div>

    <VerdictBox verdict={verdict} recommended={recommended} score={score} />
    <AffiliateCTA href={affiliateUrl} product={product} />
  </article>
</Base>

<style>
  article { max-width: var(--measure); margin: 0 auto; padding: var(--space-4); }
  .dek { color: var(--color-muted); }
  .body { margin-top: var(--space-5); }
</style>
```

- [ ] **Step 2: Verificar build e rota gerada**

Run: `npm run build && ls dist/reviews/`
Expected: `dist/reviews/formula-negocio-online/index.html` existe.

- [ ] **Step 3: Commit**

```bash
git add src/pages/reviews && git commit -m "feat: add review template route"
```

---

### Task 8: Home

**Files:**
- Create: `analisereview/src/pages/index.astro`

**Interfaces:**
- Consumes: `getCollection` (Task 4), `Base` (Task 3).
- Produces: rota `/`.

- [ ] **Step 1: Escrever a home**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';

const reviews = await getCollection('reviews');
const featured = reviews[0];
---

<Base title="Análises independentes de cursos de renda extra" description="Análises sérias e sem hype de cursos de renda extra no Brasil.">
  <section class="hero">
    <h1>Análises de cursos de renda extra, sem hype.</h1>
    <p class="dek">Nós analisamos dados públicos — preço, conteúdo, avaliações e reputação — para você decidir com base em evidência, não em promessa.</p>
  </section>

  <section class="featured">
    <h2>Análise em destaque</h2>
    <a href={`/reviews/${featured.slug}`}>
      <article>
        <h3>{featured.data.title}</h3>
        <p>{featured.data.description}</p>
        <p class="meta">Nota {featured.data.score} · {featured.data.reviewCount.toLocaleString('pt-BR')} avaliações</p>
      </article>
    </a>
  </section>

  <section class="method">
    <h2>Como analisamos</h2>
    <ol>
      <li>Coletamos dados públicos na data da análise.</li>
      <li>Pontuamos com critérios documentados.</li>
      <li>Publicamos prós, contras e veredito.</li>
    </ol>
    <a href="/metodologia">Ver metodologia completa</a>
  </section>
</Base>

<style>
  .hero, .featured, .method { max-width: var(--measure); margin: 0 auto; padding: var(--space-4); }
  .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
  .dek, .meta { color: var(--color-muted); }
  a { color: inherit; text-decoration: none; }
  .featured a article { border: 1px solid var(--color-ink); padding: var(--space-4); background: var(--color-surface); }
</style>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build && ls dist/index.html`
Expected: `dist/index.html` existe.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro && git commit -m "feat: add home page"
```

---

### Task 9: Metodologia

**Files:**
- Create: `analisereview/src/pages/metodologia.astro`

**Interfaces:**
- Consumes: `Base` (Task 3).
- Produces: rota `/metodologia`.

- [ ] **Step 1: Escrever a página**

```astro
---
import Base from '../layouts/Base.astro';
---

<Base title="Metodologia" description="Como o AnaliseReview analisa cursos de renda extra.">
  <article>
    <h1>Como analisamos</h1>

    <h2>Nossa base: dados públicos</h2>
    <p>Não compramos nem testamos os cursos. Cada análise usa dados públicos
    coletados na data indicada: preço, currículo, número de avaliações,
    reputação do autor e política de garantia.</p>

    <h2>Critérios de pontuação</h2>
    <ul>
      <li><strong>Conteúdo</strong> — escopo e estrutura do curso (0–10).</li>
      <li><strong>Suporte</strong> — canais de suporte ao aluno (0–10).</li>
      <li><strong>Garantia</strong> — política de reembolso (0–10).</li>
      <li><strong>Custo-benefício</strong> — preço frente ao conteúdo (0–10).</li>
    </ul>
    <p>A nota global é a média das quatro dimensões, arredondada a uma casa.</p>

    <h2>Independência e afiliados</h2>
    <p>Somos afiliados de alguns cursos analisados. Recebemos comissão apenas
    se você comprar pelo nosso link, sem custo adicional para você. Isso não
    altera a nota: prós e contras são publicados sempre.</p>
  </article>
</Base>

<style>
  article { max-width: var(--measure); margin: 0 auto; padding: var(--space-4); }
</style>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build && ls dist/metodologia/index.html`
Expected: `dist/metodologia/index.html` existe.

- [ ] **Step 3: Commit**

```bash
git add src/pages/metodologia.astro && git commit -m "feat: add methodology page"
```

---

### Task 10: Assets públicos, validação e deploy

**Files:**
- Create: `analisereview/public/favicon.svg`, `analisereview/public/robots.txt`, `analisereview/README.md`

**Interfaces:**
- Consumes: site completo (Tasks 1–9).

- [ ] **Step 1: Favicon e robots**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1a1a1a"/>
  <text x="16" y="22" font-family="Georgia, serif" font-size="18" fill="#faf7f2" text-anchor="middle">A</text>
</svg>
```

`public/robots.txt`:
```
User-agent: *
Allow: /
```

- [ ] **Step 2: README com instruções de deploy**

```markdown
# AnaliseReview

Site estático de análises de cursos de renda extra (Astro).

## Deploy (Cloudflare Pages)

1. Suba este repositório para o GitHub.
2. No Cloudflare Pages: "Create project" → conecte o repo.
3. Build command: `npm run build` · Output dir: `dist`.

## Publicar uma review nova

Crie `src/content/reviews/<slug>.md` seguindo o schema em
`src/content/config.ts`. O site gera a página automaticamente.
```

- [ ] **Step 3: Validação de markup**

Run: `npx html-validate dist/**/*.html`
Expected: nenhum erro de acessibilidade/markup bloqueante (corrigir se houver).

- [ ] **Step 4: Build final**

Run: `npm run build`
Expected: build limpo, três rotas em `dist/`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: add public assets, docs, and deploy config"
```

---

## Self-Review

**Spec coverage:** Tasks 1–10 cobrem stack (1), design system (2), layout (3), schema (4), conteúdo (5), componentes (6), template de review (7), home (8), metodologia (9), compliance/robots/assets/deploy (10). Critérios de sucesso 1–7 atendidos nos Steps de verificação de cada task.

**Placeholder scan:** nenhum TBD/TODO; todo Step tem código concreto ou comando verificável.

**Type consistency:** `Scorecard` consome `{ score, subscores }`; `subscores` é `{ conteudo, suporte, garantia, custoBeneficio }` — o mesmo shape produzido pelo schema da Task 4 e pelo frontmatter da Task 5. `AffiliateCTA` usa `{ href, product }`; o template (Task 7) passa `href={affiliateUrl}` e `product={product}`. Consistente.
