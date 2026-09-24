# AnaliseReview

Guia de escolha da **maquininha Ton** para autônomos, MEIs e pequenos negócios, operado como **Parceiro Renda Ton** (programa de indicação da Ton). O site apresenta modelos, taxas e condições com fontes datadas e direciona o visitante para os links de indicação do parceiro.

- **Produção**: https://analisereview.com.br (Cloudflare Pages)
- **Domínio**: `analisereview.com.br` (DNS no Cloudflare)
- **E-mail do site**: `contato@analisereview.com.br` (hospedado na Umber; MX/SPF/DMARC/SRV no Cloudflare)
- **Mensuração**: GA4 `G-1PXXTST395` com Consent Mode v2 (LGPD) e evento `affiliate_click`
- **Repositório**: https://github.com/acostaapk/analisereview

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Astro 5 (output estático, CSS inline, scripts mínimos) |
| Conteúdo | Content collections do Astro + validação Zod |
| Tipografia | Ton Condensed, Sharon Sans (self-hosted) + Inter (`@fontsource`) |
| SEO | `@astrojs/sitemap`, JSON-LD (Product, FAQPage, Article, Breadcrumb), `llms.txt` |
| Imagens | WebP (fotos oficiais de produto do kit do parceiro) |
| Hospedagem | Cloudflare Pages (direct upload via `wrangler`) |
| Linguagem | TypeScript |

## Estrutura

```
analisereview/
├── astro.config.mjs
├── package.json
├── public/
│   ├── parceiro-ton.webp/.png    # logo obrigatório "Parceiro Ton"
│   ├── 660x500_t3-smart.webp     # imagem do produto (hero)
│   ├── t1-showcase-new.webp … t3-smart-showcase-new.webp  # fotos dos modelos
│   ├── qr-afiliado.png           # QR com logo do parceiro → link de indicação
│   ├── fonts/                    # TonCondensedVF, SharonSans, SharonDisplay (woff2)
│   ├── favicon.svg               # verde #12ca65 com cartão NFC (original)
│   ├── og-image.png              # imagem social 1200×630 (peça do kit)
│   ├── robots.txt                # inclui AI crawlers + sitemap
│   └── llms.txt                  # mapa do conteúdo para agentes de IA
├── src/
│   ├── content/
│   │   ├── config.ts             # schema (Zod) da collection "reviews"
│   │   └── reviews/maquininha-ton.md
│   ├── data/
│   │   ├── site.ts               # siteBase, affiliateUrl, maquininhasUrl, contactEmail
│   │   └── models.ts             # catálogo de modelos + deep links de checkout
│   ├── layouts/
│   │   ├── Base.astro            # <head>, header (logo+menu hambúrguer+CTA), rodapé, GA4
│   │   └── Guide.astro           # layout dos guias (hero, FAQ, CTA, JSON-LD)
│   ├── components/
│   │   ├── AffiliateCTA.astro    # CTA de indicação + disclosure
│   │   ├── Simulator.astro       # simulador interativo de taxas promocionais
│   │   ├── JsonLd.astro          # injeta JSON-LD
│   │   └── CookieBanner.astro    # consentimento LGPD (integra Consent Mode)
│   ├── pages/
│   │   ├── index.astro                 # home de vendas
│   │   ├── metodologia.astro           # como escolhemos e explicamos
│   │   ├── privacidade.astro           # política de privacidade (LGPD)
│   │   ├── termos.astro                # termos de uso
│   │   ├── contato.astro               # contato (Gmail no desktop, app no celular)
│   │   ├── 404.astro                   # página não encontrada
│   │   ├── reviews/[slug].astro        # página da maquininha Ton
│   │   └── guias/
│   │       ├── taxas-ton.astro         # taxas e condições + simulador
│   │       ├── modelos-ton.astro       # comparativo dos modelos
│   │       ├── qual-maquininha-ton.astro  # escolha por perfil de venda
│   │       └── bandeiras-e-vouchers-ton.astro  # bandeiras e vouchers
│   └── styles/global.css       # design tokens + estilos base
├── docs/marketing/             # auditoria, proposta comercial, baseline e plano de ads
└── images/                     # acervo EducaTon (não versionado)
```

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home de vendas: hero, diferenciais, modelos com preço e parcelas, taxas, FAQ, como pedir |
| `/reviews/maquininha-ton` | Página da Ton: benefícios, condições, simulador, Pix, modelos, prova social, FAQ |
| `/guias/taxas-ton` | Taxas: promoção, faixa de vendas, Pix e parcelamento |
| `/guias/modelos-ton` | Comparativo T1/T2/T3/T3 Smart (tabela vira cards no mobile) |
| `/guias/qual-maquininha-ton` | Recomendação por perfil (rua, delivery, balcão, loja, MEI) |
| `/guias/bandeiras-e-vouchers-ton` | Bandeiras, vouchers e exigência de CNPJ |
| `/metodologia` | Como escolhemos e explicamos cada maquininha |
| `/privacidade` | Política de Privacidade (LGPD) |
| `/termos` | Termos de Uso |
| `/contato` | Contato do site (e-mail) e canais oficiais da Ton |

## Modelo de conteúdo

Cada review é um arquivo `.md` em `src/content/reviews/`, com frontmatter validado por Zod (`src/content/config.ts`): `title`, `description`, `product`, `company`, `benefits[]`, `category`, `updatedAt`, `affiliateUrl`, `image`, `faqs[{q,a}]`.

Os modelos e seus preços/parcelas/deep links ficam em `src/data/models.ts`; as taxas e condições ficam no corpo do `.md`, sempre com data e fonte.

## Design system

Definido em `src/styles/global.css`:

- **Cores**: verde Ton `#88ff00` (ações), verde-escuro `#203d00`/`#002e1f`, texto `#20252a`, títulos `#1b221f`, superfície `#eef3f0`.
- **Tipografia**: `Ton Condensed` (títulos), `Sharon Sans` (labels), `Inter` (corpo), self-hosted com `font-display: swap` + preload.
- **Layout**: conteúdo centralizado; CTA de pedido fixo no topo; menu hambúrguer no mobile (logo Parceiro Ton na frente); cards com altura uniforme por seção (`grid-auto-rows: 1fr`); tabelas largas viram cards empilhados no mobile (sem rolagem lateral).
- **Acessibilidade**: contraste AA (auditado), foco visível, um único `<h1>` por página, `prefers-reduced-motion`, reflow até 320px.

## Monetização

- **CTAs gerais** ("Pedir minha maquininha", "Pedir no site da Ton") → `ton.com.br/maquininhas?referrer=B7C09243…` (escolha de modelos com referrer; desconto validado).
- **Cards de modelo** → deep link direto ao carrinho daquele modelo (`ton.com.br/checkout/cart?productId=…&referrer=…`).
- Links de indicação com `rel="nofollow sponsored"`; exceção: PDFs legais em `documentos.ton.com.br`.
- "Simular minhas taxas" e links de simulador → simulador interno do site (`/reviews/maquininha-ton#simulador`); "simulador oficial" continua apontando para o catálogo da Ton com referrer.

## SEO e GEO

- Sitemap XML (`sitemap-index.xml`) referenciado no `robots.txt`; canonical, Open Graph e Twitter cards em todas as páginas.
- JSON-LD: `Organization`/`WebSite` (home), `Product` + `AggregateOffer` (lowPrice/highPrice) + 4 `Offer`s + `FAQPage` + `BreadcrumbList` (página Ton), `Article` + `FAQPage` + `BreadcrumbList` (guias).
- GEO: `robots.txt` libera GPTBot, ClaudeBot, PerplexityBot, Google-Extended e outros; `llms.txt` no raiz; resposta direta ("Em resumo") com números, unidades e data.
- CSS 100% inline; fontes com preload.

## Mensuração e publicidade

- **GA4** `G-1PXXTST395`: Consent Mode v2 (tudo negado por padrão; atualiza conforme o banner LGPD) + evento `affiliate_click` em todos os links patrocinados.
- **Google Ads** (conta Sleep 2661197125): campanha Search **"Maquininha Sem Aluguel — AnaliseReview"** (id 24279500526), **PAUSADA**, anúncio **APROVADO** pelo Google. R$ 20/dia, CPC manual R$ 3, Brasil/pt-BR, 10 palavras-chave em frase, 16 negativas de marca, URL final `/reviews/maquininha-ton/`. Detalhes em `docs/marketing/2026-09-24-google-ads-campanha.md`.
- **Ativação pendente** de aprovação explícita + vínculo GA4↔Google Ads + confirmação da comissão no app.

## Compliance (diretrizes Renda Ton)

- Logo **"Parceiro Ton"** no cabeçalho e no rodapé; texto legal idêntico ao modelo da diretriz.
- **Proibido** comparar a Ton com concorrentes; **proibido** comprar palavras-chave de marca em mídia paga.
- Link para o site oficial (`ton.com.br`); **banner de cookies (LGPD)** com checkboxes desmarcados por padrão.
- Sem informação falsa; taxas, preços e depoimentos sempre com data e fonte.

> O site não é o canal oficial do Ton e não deve ser apresentado como tal.

## E-mail (contato@analisereview.com.br)

Hospedagem na Umber com DNS no Cloudflare:

| Registro | Valor |
|---|---|
| MX | mx364.umbler.com (10) · mx128.umbler.in (20) · mx783.umbler.com.br (30) · mx240.umbler.co.uk (40) |
| SPF (TXT) | `v=spf1 include:spf.umbler.com ~all` |
| DMARC (TXT `_dmarc`) | `v=DMARC1; p=none;` (endurecer após validar DKIM) |
| SRV `_autodiscover._tcp` | autodiscover224.umbler.com:443 (0, 0) |

O endereço de contato fica centralizado em `src/data/site.ts` (`contactEmail`).

## Atualização de ofertas

As condições mudam com frequência. Antes de publicar taxas ou preços:

1. Confira o simulador oficial (`ton.com.br/planos-e-taxas`) nos mesmos cenários de plano, bandeira, parcelas, prazo e faixa de vendas.
2. Atualize os valores no `.md`/`models.ts` e a data em `updatedAt`.
3. Confira o catálogo pelo link de indicação e valide o destino.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run check    # validação de tipos (astro check)
npm run preview  # pré-visualiza o build
```

## Deploy (Cloudflare Pages)

```bash
npm run build
wrangler pages deploy dist --project-name analisereview
```

> Requer `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no ambiente.
> Alternativa: conectar o repositório no dashboard da Cloudflare Pages (build `npm run build`, output `dist`) para deploy automático a cada push.

## Notas

- `images/` (materiais de divulgação do EducaTon) e `.wrangler/` estão no `.gitignore`. Para publicar no site, exportar derivados otimizados (WebP) para `public/`.
- O acervo local contém peças de momentos diferentes; sempre confira a oferta vigente antes de usar.
- A moeda dos valores é BRL; os dados de taxas são coletados das páginas públicas da Ton e datados em `updatedAt`.
