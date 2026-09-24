# Plano de Campanha Google Ads — AnaliseReview

Data: 24/09/2026 · Status: `draft` (preflight brief — premissas declaradas pendem de confirmação)
Skill aplicada: NotFair `paid-ads-launch` (operating contract + measurement framework).

## 1. Objetivo e medição

| Item | Valor |
|---|---|
| Conversão primária | Indicação válida de maquininha (validada no relatório Renda Ton) |
| Conversão secundária (site) | Clique no link de indicação (`affiliate_click`) via GA4 |
| Fonte da verdade | Relatório Renda Ton (reconciliação agregada por mês/campanha) + GA4 para cliques/páginas |
| Janela de atribuição | Clicks 30 dias (Google) × maturação do Renda Ton (validação KYC + pagamento até dia 10 do mês seguinte) |
| Geo | Brasil, pt-BR |
| Destino | `https://analisereview.com.br/reviews/maquininha-ton/` (página Ton); variação por grupo conforme palavras-chave |
| Orçamento | **R$ 20/dia** · teto mensal **R$ 600** |

## 2. Economia do parceiro (da documentação oficial da Ton)

Verificado no Regulamento Renda Ton (01/09/2026):

- **AtivaTon**: R$ 80 (CPF) ou R$ 100 (CNPJ) por novo cliente que ativar e transacionar ≥ R$ 500 no mês da indicação ou no seguinte.
- **Comissão pela indicação** (máquina): varia por nível, plano e modelo — tabela em imagem no PDF `comissoes-tier.pdf`; **confirmar valor do seu nível no app**.
- **FaturaTon**: comissão por faixa de faturamento do cliente, 1–3 meses conforme o nível no momento da indicação (3º mês só Referência+ ou Ton na Mão).
- **Indique 3 e Ganhe R$100** e **UpTON** (R$ 150 a cada 3 indicações válidas de POS, Especialista I+).

**Premissa declarada para o plano (assumption):** comissão mínima garantida ≈ R$ 80 (AtivaTon) + comissão da máquina → valor por indicação válida ≈ R$ 80–120. Se o seu nível/mix for diferente, recalculo o teto de CPA.

## 3. Limites e guardrails

| Métrica | Valor | Base |
|---|---|---|
| CPA-alvo por indicação válida | ≤ R$ 60 | Premissa de comissão ≥ R$ 80 → margem antes de outros custos |
| CPC máximo inicial | R$ 3,00 | Orçamento R$ 20/dia → ≥ 6–7 cliques/dia para leitura |
| Guardrail de perda | Gasto > R$ 150 sem NENHUMA indicação válida (ou > 2 semanas sem sinal) → pausar e revisar |
| Revisão | Leitura operacional em 7 dias; decisão inicial em 14–30 dias (respeitar maturação Renda Ton) |

> Sem atribuição por clique → CPA de anúncio será aproximado (gasto ÷ indicações do período, coorte declarada). Não é teste causal entre canais.

## 4. Estrutura da conta

Conta nova dedicada (criar em ads.google.com). Campanha **Search**, 1 campanha inicial:

| Grupo | Intenção | Palavras (exata/frase, sem marca) | Destino |
|---|---|---|---|
| G1 — Sem aluguel | Transacional | "maquininha sem aluguel", "maquininha sem aluguel e sem mensalidade", "maquininha sem aluguel para cpf" | `/reviews/maquininha-ton/` |
| G2 — Primeira maquininha | Transacional | "maquininha para cpf", "maquininha de cartão barata", "primeira maquininha de cartão" | `/guias/qual-maquininha-ton/` |
| G3 — Comprovante/balcão | Comercial | "maquininha com comprovante impresso", "maquininha para loja" | `/guias/modelos-ton/` |

**Negativas obrigatórias (diretriz Renda Ton, item 8 + intenção incompatível):** ton, stone, pagar.me, equals, mundipagg, mercadopago, pagseguro, infinitepay, sumup e variações de grafia; suporte, login, atendimento, vagas, consultor, renda extra, afiliado, reclamação.

## 5. Cadeia de mensagem (em conformidade com a diretriz)

**Identificação exigida:** todo anúncio identifica "Parceiro Renda Ton" (não usar "oficial"; sem menção a concorrentes; sem informação falsa).

Headlines sugeridas (G1):

1. `Maquininha Sem Aluguel` | 2. `Parceiro Renda Ton` | 3. `Garantia Vitalícia`
4. `Receba em 1 Dia Útil` | 5. `Pix na Maquininha Grátis` | 6. `Veja Modelos e Condições`

Descrições sugeridas:

1. `Sem mensalidade e sem aluguel. Compare T1, T2, T3 e T3 Smart e veja as condições da promoção.`
2. `Somos Parceiro Renda Ton. Entenda as taxas e o parcelamento antes de pedir a sua maquininha.`

CTAs: "Ver modelos e condições" / "Pedir a maquininha". Promessas do anúncio casam com a página (sem aluguel, modelos, taxas) — conferir por grupo.

## 6. Experimentação

- **Variável única:** intenção de palavra-chave (3 grupos) com mesma página-padrão de qualidade.
- Métricas de decisão: indicações válidas por grupo, CPA por grupo, CTR→afiliate_click (GA4).
- Condição de parada: guardrail da seção 3; grupo com CPA > R$ 90 sem FaturaTon compensando → pausar grupo.
- Não iniciar experimentos de anúncio antes de ≥ 14 dias de dados maduros.

## 7. Prontidão (readiness)

| Item | Estado |
|---|---|
| Conta Google Ads | ✅ conta existente **Sleep (2661197125)**, moeda BRL, fuso America/Sao_Paulo |
| Campanha criada (PAUSADA) | ✅ id **24279500526** — "Maquininha Sem Aluguel — AnaliseReview" (24/09/2026) |
| Estrutura da campanha | ✅ Search · R$ 20/dia · CPC manual R$ 3 · somente Google Search · geo Brasil (2076) · idioma pt (1014) |
| Palavras-chave | ✅ 10 em frase, todas ENABLED |
| Negativas de marca/intenção | ✅ 16 aplicadas no nível da campanha |
| RSA | ✅ 6 títulos + 2 descrições · **APROVADO** pelo Google (revisão concluída) · URL final `analisereview.com.br/reviews/maquininha-ton/` |
| GA4 no site | ✅ `G-1PXXTST395` instalado com Consent Mode v2 + evento `affiliate_click` |
| Vínculo GA4 ↔ Google Ads | ❌ pendente (usuário: Analytics → Administrador → Vínculos do Google Ads → 2661197125 → importar conversões) |
| Ativar campanha | ❌ **aguardando aprovação explícita do usuário** (enableCampaign) |
| Comissão real do nível no app | ❌ pendente — ajusta o teto de CPA |

## 8. Revisão pós-mudanças do site (24/09/2026)

- Página de destino ganhou simulador de taxas, deep links por modelo (carrinho), prova social e FAQ — o anúncio continua alinhado ("Veja Modelos e Condições").
- CTAs do site agora levam a `ton.com.br/maquininhas?referrer=…` (desconto validado pelo usuário); cards de modelo levam direto ao checkout do modelo.
- Nenhuma alteração necessária no anúncio: textos, URL final e aprovação de política permanecem válidos.

## 8. Próximos passos

1. Você cria a conta Google Ads nova e a propriedade GA4 (me passe o Measurement ID).
2. Eu instalo o GA4 no site com respeito ao consentimento e adiciono o evento de clique + UTMs.
3. Você confirma o valor da comissão do seu nível no app (fecha o teto de CPA).
4. Crio a campanha pausada com grupos G1–G3 e negativas; você ativa quando aprovar.
