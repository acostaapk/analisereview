# AnaliseReview — Design Spec

Data: 2026-09-23
Status: aprovado pelo usuário (design em seções)

## 1. Visão geral

`analisereview.com.br` é um site estático de análises (reviews) de produtos de
"renda extra" (cursos/infoprodutos do mercado brasileiro), monetizado por
afiliação (Hotmart). O site se posiciona como análise editorial séria — o
"Wirecutter brasileiro" do nicho de renda extra — em oposição ao padrão de
template clickbait que domina o nicho.

## 2. Posicionamento e marca

- **Tom**: editorial / análises sérias. Independente, baseado em evidência.
- **Direção de arte**: "jornal de análise" — serif display, tinta sobre papel,
  regras finas, veredito em caixa destacada. Sem gradients, sem "cara de IA".
- **Anti-referências** (o que NÃO fazer): template de blog genérico, promessa de
  ganho ("ganhe R$X/mês"), depoimentos fabricados, contagem regressiva, botões
  de urgência falsos.

## 3. Público

Misto (iniciantes e céticos), com prioridade para quem tem intenção de compra —
quem pesquisa "X vale a pena?" antes de fechar. Idioma: pt-BR. Geografia: Brasil.

## 4. Metodologia (modelo de honestidade)

Cada review é uma **análise de dados públicos**, nunca uma promessa de teste:

- Preço e forma de pagamento (públicos na página de venda).
- Conteúdo/currículo do curso (público).
- Número de avaliações (Hotmart) — proxy de volume de vendas.
- Reputação do autor/produtor.
- Garantia e política de reembolso.

Regras inegociáveis:

1. **Sem claim de ganho inventado.** Nunca prometer resultado financeiro.
2. **Dados datados.** Todo preço/contagem de avaliações carrega data de consulta.
3. **Nota defensável.** A nota global (0–10) deriva de sub-notas com critérios
   públicos documentados na página de metodologia.
4. **Disclosure de afiliado** explícito em todo link monetizado.

## 5. Stack

- **Framework**: Astro (estático, content collections, zero JS desnecessário).
- **Hospedagem**: Cloudflare Pages (grátis, deploy via git, CDN).
- **Sem backend, sem banco, sem WordPress.**

## 6. Arquitetura (estrutura de arquivos)

```
analisereview/
├── astro.config.mjs
├── package.json
├── public/                     # favicon, og-image, robots
└── src/
    ├── content/reviews/        # content collection (uma review = um .md)
    │   └── formula-negocio-online.md
    ├── content/config.ts       # schema Zod da collection
    ├── layouts/Base.astro      # <html>/<head>/<header>/<footer>/<main>
    ├── components/
    │   ├── Scorecard.astro     # veredito + nota global + sub-notas
    │   ├── DataTable.astro     # preço, avaliações, autor, garantia (datados)
    │   ├── ProsCons.astro      # duas colunas
    │   ├── VerdictBox.astro    # caixa de veredito final
    │   └── AffiliateCTA.astro  # botão de afiliado + disclosure
    ├── pages/
    │   ├── index.astro         # home
    │   ├── metodologia.astro   # "como analisamos"
    │   └── reviews/[slug].astro# template de review
    └── styles/global.css       # design tokens + estilos globais
```

Para publicar uma review nova: criar um `.md` em `src/content/reviews/`. O
template e os componentes renderizam a página. Nenhuma alteração de código.

## 7. Modelo de conteúdo (schema da collection)

Frontmatter de cada review (validado por Zod):

| Campo | Tipo | Exemplo (FNO) |
|---|---|---|
| `title` | string | "Fórmula Negócio Online: análise completa" |
| `product` | string | "Fórmula Negócio Online" |
| `author` | string | "Alex Vargas" |
| `price` | number | 297 |
| `priceCurrency` | string | "BRL" |
| `reviewCount` | number | 11296 |
| `score` | number (0–10) | 7.5 |
| `subscores` | object | {conteudo, suporte, garantia, custoBeneficio} |
| `pros` | string[] | [...] |
| `cons` | string[] | [...] |
| `verdict` | string | "Recomendado para..." |
| `recommended` | boolean | true |
| `affiliateUrl` | string | hoplink Hotmart |
| `category` | string | "renda extra" |
| `updatedAt` | string (ISO) | "2026-09-23" |
| `description` | string | meta description |

## 8. Páginas

### Home (`/`)
- Manchete editorial (promessa da marca: análise independente, sem hype).
- "Análise em destaque" (card da review FNO).
- Como funciona a metodologia (3 passos).
- Lista de categorias/links para reviews futuras.

### Review (`/reviews/[slug]`)
- **Topo**: Scorecard (veredito + nota global + sub-notas).
- **DataTable**: preço, nº de avaliações, autor, garantia — com data de consulta.
- **Prós / Contras**.
- **Análise em seções** (para quem é, o que tem, o que considerar).
- **VerdictBox** (veredito final + nota).
- **AffiliateCTA** (link Hotmart + disclosure).

### Metodologia (`/metodologia`)
- Como analisamos (dados públicos, sem teste).
- Critérios de pontuação (rubrica das sub-notas).
- Disclosure de afiliado e política de independência.

## 9. Design system (visual)

- **Tipografia**: display serif (Fraunces) para manchetes/veredito; body serif
  legível (ex.: Source Serif 4) para texto corrido. Sem Inter/Roboto/Arial.
- **Cores**: tinta `#1a1a1a`, papel `#faf7f2`, um accent vermelho-editorial
  (usado só para veredito/links/regras). Sem roxo-tech, sem gradiente.
- **Espaçamento**: escala 4px (tokens). `line-height` ≥ 1.5 no corpo.
- **Detalhes**: regras finas (1px), veredito em caixa com borda, números grandes
  no scorecard. Conteúdo-liderado (não centrado).
- **Acessibilidade**: contraste AA (4.5:1), foco visível, um único `<h1>`,
  `prefers-reduced-motion` respeitado, reflow até 320px.

## 10. Compliance / disclosure

- Todo `AffiliateCTA` inclui: "Podemos receber comissão pela sua compra, sem
  custo adicional para você."
- `rel="nofollow sponsored"` nos links de afiliado.
- Nenhuma afirmação de renda/ganho.
- Página de metodologia serve como disclosure público e permanente.

## 11. Não-objetivos (fora de escopo do MVP)

- Sistema de login/comentários.
- Mais de uma review (a segunda entra como novo `.md` depois).
- Comparativos multi-produto, newsletter, busca, análise de métricas próprias.
- Tráfego pago.

## 12. Critérios de sucesso (MVP)

1. `npm run build` passa e o site faz deploy no Cloudflare Pages.
2. Três rotas públicas: `/`, `/reviews/formula-negocio-online`,
   `/metodologia`.
3. Review do FNO usa dados reais datados (R$ 297, 11.296 avaliações).
4. Disclosure presente em todo link de afiliado.
5. Nota e sub-notas são defensáveis pela rubrica da metodologia.
6. Design passa no teste de substituição (não serve para outro produto).
7. Acessível (contraste AA, navegação por teclado, reflow 320px).
