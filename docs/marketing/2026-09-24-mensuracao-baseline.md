# Baseline de Mensuração — AnaliseReview

Data: 24/09/2026 · Fonte: NotFair MCP (GSC + GA4 conectados) · Status: `baseline`

## Conexões (workspace NotFair)

| Plataforma | Estado | Identificador |
|---|---|---|
| Google Ads | ✅ conectado | conta `2661197125` (Sleep) |
| Search Console | ✅ conectado | `sc-domain:analisereview.com.br` |
| Google Analytics 4 | ✅ conectado | `properties/555727956` (fuso America/Bahia) |

## Dados — últimos 28 dias (28/08–24/09)

| Métrica | Valor | Fonte |
|---|---|---|
| GSC cliques (todas as páginas) | **0** | Search Analytics |
| GSC impressões | **2** (só `/guias/bandeiras-e-vouchers-ton/`, posição média 19,5) | Search Analytics |
| GA4 sessões | **0** | runReport (sem linhas) |
| GA4 página de destino da review | **0** | runReport |
| Realtime (30 min) | **0** usuários ativos | runRealtimeReport |

> Site no ar (HTTP 200) e sitemap servindo; a ausência de dados = site novo sem tráfego, não falha de mensuração (verificações abaixo).

## Estado de indexação (URL Inspection, 24/09 21:35Z)

- `/reviews/maquininha-ton/`: veredito **PASS** — "Submitted and indexed", robots ALLOWED, canonical próprio, crawl MOBILE, último crawl **24/09/2026 21:35**.
- Sitemap `sitemap-index.xml`: submetido 23/09, baixado 24/09, **0 erros / 0 avisos**, 10 URLs enviadas (contador "indexed" do sitemap ainda mostra 0 — defasagem típica do relatório).

## Mensuração no site

- GA4 `G-1PXXTST395` presente na página da review (gtag + `googletagmanager.com/gtag/js`).
- Consent Mode / banner LGPD presentes (`consent` no HTML).
- Handler `affiliate_click` presente; **key event `affiliate_click` já registrado no GA4** (criado 24/09 20:25, `ONCE_PER_EVENT`).
- Key events extras no GA4: `close_convert_lead`, `qualify_lead`, `purchase` (criados 24/09).

## Achados / pendências

1. **Vínculo GA4 ↔ Google Ads (2661197125): FEITO em 24/09** — eventos GA4 importados como conversion_actions (`GOOGLE_ANALYTICS_4_*`). Correções aplicadas no mesmo dia:
   - `Visualização de página` (WEBPAGE, id 7376588349) primária → **secundária** (changeId 1134739, verificado por leitura).
   - `AnaliseReview (web) affiliate_click` (id 7793324873) era `HIDDEN` (stub automático do vínculo, invisível na UI) → **importada via wizard "Criar ação de conversão → Importar do GA4"** → agora `ENABLED` + `primary_for_goal: true` (verificado por GAQL 24/09 22:29Z).
   - Outros stubs GA4 (`purchase`, `close_convert_lead`, `qualify_lead`) seguem `HIDDEN` — não são necessários agora; importar pelo mesmo wizard se virarem necessários.
   - Meta "Visualização de página" mostra "Configuração incorreta" (sem ação primária) — cosmético, ignorar.
2. Rich result **Product** da review com avisos: `Missing field "review"` e `Missing field "aggregateRating"` (WARNING, não bloqueia). Só preencher com dados reais/datados (compliance Renda Ton).
3. Breadcrumb JSON-LD com item "Unnamed item".
4. Campanha Google Ads `24279500526` segue **PAUSADA** — ativação pendente de aprovação explícita + comissão confirmada no app.
5. GSC: 0 cliques em 28 dias → tráfego orgânico ainda não existe; será medido a partir da ativação das frentes.

## Metas 30 dias (a partir de 24/09)

- Página review indexada ✅ (já cumprido).
- ≥ 100 sessões GA4 · ≥ 10 eventos `affiliate_click` · ≥ 1 indicação válida (Renda Ton).
- Primeira leitura de cliques/orgânico no GSC > 0.

## Próxima revisão

Relatório semanal: GSC (cliques/impressões/consultas) + GA4 (sessões, `affiliate_click`) + Ads (custo/CPA).

## 2026-09-24 — MCP próprio (substitui NotFair)

Servidor `google-mcp` self-hosted em /home/andre/marketing/google-mcp
(GA4 + GSC + Google Ads, OAuth próprio; developer token sunset 09/2026 —
nível de acesso agora é do projeto Google Cloud `adgenius-497919`).
Spike: ver google-mcp/docs/spike-2026-09-24.md (nível do token).
