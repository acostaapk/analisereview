# AnaliseReview

Site estático de análise da **maquininha Ton**, operado como **Parceiro Renda Ton** (programa de indicação da Ton / Pagar.me). O site apresenta uma análise honesta, baseada em dados públicos, e direciona o leitor para o link de indicação do parceiro.

- **Produção (Pages)**: https://analisereview.pages.dev
- **Domínio próprio**: `analisereview.com.br` (nameservers já apontam para a Cloudflare; aguardando propagação)
- **Repositório**: https://github.com/acostaapk/analisereview

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Astro 5 (output estático, sem runtime JS por padrão) |
| Conteúdo | Content collections do Astro + validação Zod |
| Tipografia | Fraunces (display) + Source Serif 4 (corpo), self-hosted via `@fontsource` |
| Hospedagem | Cloudflare Pages (direct upload via `wrangler`) |
| Linguagem | TypeScript |

## Estrutura

```
analisereview/
├── astro.config.mjs
├── package.json
├── public/
│   ├── parceiro-ton.png        # logo obrigatório "Parceiro Ton"
│   ├── maquininha-ton.png      # imagem do produto
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── content/
│   │   ├── config.ts           # schema (Zod) da collection "reviews"
│   │   └── reviews/
│   │       └── maquininha-ton.md
│   ├── layouts/
│   │   └── Base.astro          # <head>, masthead, rodapé legal, cookie banner
│   ├── components/
│   │   ├── Scorecard.astro     # nota geral + sub-notas em barras
│   │   ├── DataTable.astro     # ficha técnica (adesão, usuários, empresa, data)
│   │   ├── ProsCons.astro      # prós (+) / contras (–)
│   │   ├── VerdictBox.astro    # veredito final
│   │   ├── AffiliateCTA.astro  # link de indicação + disclosure
│   │   └── CookieBanner.astro  # consentimento LGPD
│   ├── pages/
│   │   ├── index.astro                 # home
│   │   ├── metodologia.astro           # como analisamos
│   │   └── reviews/[slug].astro        # template de review
│   └── styles/global.css       # design tokens + estilos base
└── docs/superpowers/           # spec e plano do projeto
```

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home editorial: chamada, análise em destaque, como analisamos |
| `/reviews/maquininha-ton` | Review completa (hero, scorecard, ficha, prós/contras, veredito, CTA) |
| `/metodologia` | Critérios de pontuação, independência e parceria |

## Modelo de conteúdo

Cada review é um arquivo `.md` em `src/content/reviews/`, com frontmatter validado por Zod (`src/content/config.ts`):

| Campo | Tipo | Descrição |
|---|---|---|
| `title` | string | Título da análise |
| `description` | string | Resumo (usado em SEO/OG e na home) |
| `product` | string | Nome do produto |
| `company` | string | Empresa responsável |
| `price` | number | Custo de adesão (0 = taxa única/variável) |
| `priceCurrency` | string | Moeda (padrão `BRL`) |
| `reviewCount` | number | Nº de usuários/avaliações (fonte pública) |
| `score` | 0–10 | Nota global = média das sub-notas |
| `subscores` | objeto | `taxas`, `suporte`, `garantia`, `custoBeneficio` (0–10) |
| `pros` / `cons` | string[] | Listas |
| `verdict` | string | Veredito canônico (renderizado no `VerdictBox`) |
| `recommended` | boolean | Define o selo recomendado/não recomendado |
| `affiliateUrl` | URL | Link de indicação (Renda Ton) |
| `category` | string | Categoria exibida no eyebrow |
| `updatedAt` | `YYYY-MM-DD` | Data da coleta dos dados (obrigatória) |
| `image` | string (opcional) | Imagem do produto |

### Publicar uma nova review

1. Crie `src/content/reviews/<slug>.md` seguindo o schema acima.
2. Rode `npm run build` (a validação Zod roda automaticamente).
3. Faça o deploy (ver abaixo).

## Design system

Definido em `src/styles/global.css`:

- **Cores**: tinta `#1a1a1a`, papel `#faf7f2`, superfície `#fffdf9`, accent `#b3261e`, verde (prós) `#1e7a3c`, muted `#5c574f`, linhas `#d9d2c5`.
- **Tipografia**: `Fraunces` para títulos (`--font-display`), `Source Serif 4` para o corpo (`--font-body`).
- **Espaçamento**: escala em `--space-1` … `--space-8`.
- **Acessibilidade**: contraste AA, foco visível, um único `<h1>` por página, `prefers-reduced-motion` respeitado, reflow até 320px.

## Compliance (diretrizes Renda Ton)

O site segue a diretriz **"Criação de Websites"** do programa Renda Ton:

- Logo **"Parceiro Ton"** no cabeçalho e no rodapé.
- **Texto legal obrigatório** no rodapé (identificação como parceiro, não como canal oficial).
- **Proibido** comparar a Ton com concorrentes (sem menções comparativas/depreciativas).
- Link para o site oficial (`ton.com.br`).
- **Banner de cookies (LGPD)** com categorias e checkboxes desmarcados por padrão.

> O site não é o canal oficial do Ton e não deve ser apresentado como tal.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # pré-visualiza o build
```

## Deploy (Cloudflare Pages)

Direct upload:

```bash
npm run build
wrangler pages deploy dist --project-name analisereview
```

> Requer `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no ambiente.
> Alternativa: conectar o repositório no dashboard da Cloudflare Pages (build `npm run build`, output `dist`) para deploy automático a cada push.

## Notas

- `images/` (materiais de divulgação do EducaTon) está no `.gitignore` — não versionar arquivos pesados.
- A moeda dos valores é BRL; os dados de taxas são coletados das páginas públicas da Ton e datados em `updatedAt`.
