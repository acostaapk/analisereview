# AnaliseReview: proposta comercial, vendas e aquisição

Data da consulta: 23/09/2026. Status da proposta: `ready_for_review`. Status do plano de mídia: `draft`, dependente da economia da operação e da mensuração.

## Recomendação

Posicionar o AnaliseReview como um **guia de escolha da maquininha Ton para autônomos, MEIs e pequenos negócios**. O visitante deve conseguir escolher um modelo, entender os custos e acessar as condições de adesão pelo link do parceiro.

O usuário confirmou que ainda não anuncia. A primeira etapa deve preparar a página e a medição para um teste de aquisição. A receita relevante para o parceiro é a comissão de indicações válidas, com os critérios do programa, e não o valor das vendas processadas na maquininha.

### Cinco prioridades

| Ordem | Evidência observada | Ação proposta | Resultado a verificar |
|---|---|---|---|
| 1 | A review apresenta 7,97% como crédito em geral e associa 0,74% ao pós-promoção sem identificar o plano | Corrigir modalidades, separar planos e mostrar condições e fontes | Concordância entre texto, tabela, veredito e oferta de destino |
| 2 | O domínio próprio não resolveu; o DNS público retornou servidores do Registro.br e nenhuma resposta A/AAAA | Conferir delegação DNS e vínculo do domínio no Cloudflare Pages; depois consolidar a versão principal | HTTPS funcional e redirecionamento preservando caminho e parâmetros |
| 3 | No navegador de 390 × 844 px, o único CTA de indicação começa em y=5.349 px; o banner de cookies ocupa 398 px de altura | Colocar CTA e orientação de escolha no topo; compactar o primeiro nível do banner | CTA visível na primeira tela e categorias opcionais acessíveis, sem sobreposição |
| 4 | Código e navegador mostram apenas o script de consentimento; NotFair não tem GSC ou GA4 conectados | Instrumentar o percurso e reconciliar indicações com o relatório do programa | Eventos verificados e distinção entre clique, indicação válida e comissão |
| 5 | Existe uma review comercial, sem guias dedicados; as diretrizes proíbem comprar palavras-chave de marca | Produzir conteúdo de decisão sobre Ton e preparar um teste pago com intenção genérica | Consultas relevantes, cliques qualificados e comissões atribuíveis |

Não há base de tráfego, conversão ou comissão efetiva para quantificar aumento de vendas ou retorno. Os impactos comerciais acima são hipóteses a validar.

## 1. Base da análise

- README, configuração Astro, páginas, componentes, conteúdo e documentos do projeto.
- As três páginas publicadas em `https://analisereview.pages.dev`.
- Navegador Chromium/Playwright, com inspeção mobile em 390 × 844 e reflow em 320 px.
- NotFair: descoberta das conexões de marketing. Apenas Google Ads aparece conectado; o usuário informou que ainda não anuncia este site.
- Google Suggest em português/Brasil, como sinal qualitativo de vocabulário. Sugestões não representam volume, CPC, dificuldade ou posição.
- Simulador da Ton e catálogo acessado pelo link de indicação do site, sem enviar formulários ou realizar pedido.
- Diretrizes do programa e regulamento Renda Ton em vigor desde 01/09/2026.
- Inventário dos dez diretórios de materiais em `images/`, com leitura seletiva de imagens e PDFs. Os vídeos foram localizados; seu conteúdo completo ainda precisa de revisão antes da publicação.

O PageSpeed Insights retornou HTTP 429. LCP, INP, CLS e notas Lighthouse permanecem indisponíveis. A ausência de GSC conectado também impede concluir se uma página está indexada ou qual posição ocupa.

O arquivo `2026-09-23-baseline.json`, nesta pasta, registra as principais observações para uma nova auditoria.

## 2. Correções de conteúdo que afetam a venda

### Crédito à vista e parcelamento

Em `src/content/reviews/maquininha-ton.md`, o valor de 7,97% aparece como taxa de crédito genérica e sustenta parte dos contras e do veredito. A consulta ao simulador mostra outra distinção:

| Condição consultada | Débito | Crédito à vista | Crédito 12x |
|---|---:|---:|---:|
| Período promocional | 0,57% | 0,57% | 7,97% |
| Até R$ 3 mil de vendas mensais, após promoção | 1,69% | 3,86% | 20,39% |
| Acima de R$ 30 mil de vendas mensais, após promoção | 1,19% | 2,85% | 11,51% |

**Escopo:** maquininhas, Visa/Mastercard, recebimento em um dia útil, tabela apresentada para novos clientes, consultada em 23/09/2026. A promoção informada dura 30 dias ou até R$ 5 mil em vendas. Outros planos, bandeiras, prazos e modalidades exigem sua própria tabela. No quadro promocional consultado, 7,97% aparece de 7 a 12 parcelas.

O catálogo acessado pelo link de indicação também exibiu 0,57% no débito, 0,57% no crédito e 7,97% em 12x. A URL de destino preservou o parâmetro `referrer`; isso confirma o percurso do link, mas não comprova atribuição de comissão nem desconto adicional no fechamento.

### O valor de 0,74% pertence a outro contexto

O arquivo `images/Black-na-regua-pack/Black na régua/Ton Black Visa e Master.png` mostra **0,74% no débito, acima de R$ 80 mil mensais, recebimento em um dia útil**. Essa informação não deve representar a continuação automática da promoção Mega+.

A tabela local `images/Bombe-o-Mega-plus/Bombe o Mega+/Ton Mega+ Visa e Master.png` coincide com os três cenários acima consultados no simulador. A disponibilidade atual do Black para o link do parceiro não foi confirmada.

**Tratamento editorial proposto:** cada taxa deve carregar plano, modalidade, parcelas, bandeira, prazo, faixa de vendas, condição promocional, data e fonte. Reavaliar os contras e a nota depois dessa correção; não basta trocar um número.

### Exemplos que ajudam o cliente

Mostrar um cálculo simples em texto e HTML, com as condições próximas:

- Venda de R$ 1.000 no crédito à vista, a 0,57%: tarifa de R$ 5,70; recebimento de R$ 994,30.
- A mesma venda no crédito à vista, a 3,86%: tarifa de R$ 38,60; recebimento de R$ 961,40.
- Venda de R$ 1.000 em 12x, a 7,97%: tarifa de R$ 79,70; recebimento de R$ 920,30.

São exemplos aritméticos das taxas consultadas, não simulações de lucro do comerciante. A adesão e outros custos não entram nesses valores.

### Outros ajustes de confiança

- A metodologia declara que não houve teste físico. Usar a expressão **“análise de parceiro baseada em dados públicos”** e identificar o responsável editorial.
- Explicar a evidência de cada subnota. A média 8/10 está correta, mas a página de metodologia não mostra como se chega, por exemplo, a 8 em suporte. Retirar a nota até documentar a rubrica também é uma opção.
- Os 4.680.875 representam empreendedores informados pela Ton, não avaliações deste site. Separar esse conceito de `reviewCount` antes de gerar dados estruturados.
- A Ton exibiu 9,4/10 para Reclame Aqui na consulta; a review informa 9,2/10. Citar a origem e a data se esse dado permanecer, sem apresentá-lo como apuração independente.
- Especificar a condição do Pix: após o período inicial, a fonte consultada informa isenção com chave CPF, CNPJ ou telefone na Conta Ton; sem a condição, informa 0,49%. “Qualquer chave Pix” seria impreciso.
- Explicar garantia enquanto durar a parceria e os requisitos do recebimento na hora.

## 3. Proposta de valor e estrutura da página

### Caminhos considerados

| Caminho | Vantagem | Limitação |
|---|---|---|
| Review editorial concentrada | Menor esforço inicial | Continua exigindo leitura longa para escolher e pedir |
| **Guia comercial com análise e escolha por perfil** | Atende intenção de compra e aproveita conteúdo e materiais existentes | Exige atualização das condições e mensuração do percurso |
| Página focada em promoção | Comunicação direta de uma oferta | Depende da vigência da promoção e exige revisões frequentes |

**Recomendação:** o segundo caminho. Manter a leitura editorial e apresentar a decisão de compra cedo.

### Texto sugerido para o topo

**Identificação:** Guia de escolha · Parceiro Renda Ton

**Título:** Escolha a maquininha Ton para o seu negócio e entenda quanto vai pagar.

**Subtítulo:** Veja as diferenças entre T1, T2, T3 e T3 Smart, confira as taxas por modalidade e consulte as condições de adesão. A análise usa informações públicas da Ton, com data e fonte.

**Botão principal:** Ver modelos e condições na Ton

**Ação secundária:** Entender as taxas

**Próximo ao botão:** Você continua no site da Ton pelo nosso link de indicação. Somos Parceiro Renda Ton e podemos receber comissão, sem custo adicional para você. Confira as condições antes de concluir o pedido.

Só usar um percentual de desconto no botão ou no anúncio depois de confirmar sua aplicação ao modelo e plano no percurso de indicação.

### Ordem recomendada

1. Título, benefício concreto, imagem de produto e CTA.
2. Escolha por necessidade, com fotos dos modelos e diferenças objetivas.
3. Resumo das taxas, com promoção e pós-promoção separados.
4. Cenários de R$ 1.000 e explicação do que muda o custo.
5. Pontos de atenção: dependência de celular, impressão, parcelamento, condições de recebimento e garantia.
6. Perguntas frequentes e fontes.
7. Resumo da recomendação e CTA final.

Na review, incluir um CTA após o resumo inicial e outro após as condições, além do final. Uma barra mobile pode ser testada depois de resolver a interação com o banner de consentimento.

### Escolha por necessidade

| Necessidade | Modelo a avaliar | Informação confirmada no catálogo consultado |
|---|---|---|
| Entrada com aparelho ligado ao celular | T1 | Precisa de celular com internet; comprovante por SMS |
| Portabilidade com conexão própria | T2 | Chip e Wi-Fi; comprovante por SMS |
| Comprovante impresso | T3 | Chip e Wi-Fi; impressão ou SMS |
| Operação com interface Android | T3 Smart | Chip 4G, Wi-Fi e visor touchscreen |

O catálogo apresenta parcelamento até 21x em T3/T3 Smart para novos clientes e até 12x em T1/T2. A escolha depende do uso; evitar um selo “melhor para todos”.

Os valores à vista exibidos no catálogo pelo link, em 23/09/2026, foram T1 R$ 16,80; T2 R$ 49,88; T3 R$ 108,00; T3 Smart R$ 191,88. São uma captura da oferta consultada, não um compromisso de preço futuro ou de desconto exclusivo.

### Apresentação visual

Usar as imagens de produto do kit, texto em HTML e identificação de parceiro. O guia de marca prioriza verde, preto e branco; ajustar a direção atual, que usa destaque vermelho, com contraste legível. Evitar incorporar uma arte publicitária inteira como conteúdo principal: textos pequenos dentro de imagens dificultam leitura, acessibilidade e manutenção.

## 4. SEO e tráfego orgânico

### Problemas técnicos confirmados

| Verificação | Resultado em produção | Proposta |
|---|---|---|
| Páginas principais | Três respostas HTTP 200; um H1 por página | Preservar rotas e hierarquia |
| Canonical | Ausente nas três páginas | Definir URLs canônicas no layout após decidir o domínio funcional |
| Sitemap | `/sitemap.xml` e `/sitemap-index.xml` retornam HTML da home com HTTP 200 | Gerar XML com as rotas reais e referenciá-lo em `robots.txt` |
| Página inexistente | `/pagina-inexistente-auditoria-20260923` retorna home com HTTP 200 | Criar uma página 404 e verificar o status HTTP no Pages |
| Open Graph | Título e descrição presentes; imagem e URL ausentes | Criar imagem social e URLs absolutas |
| JSON-LD | Ausente nas três páginas | Descrever conteúdo editorial e breadcrumbs com dados reais |
| Reflow | Sem rolagem horizontal nas larguras testadas de 320 e 390 px | Repetir a verificação após inserir tabelas e CTAs |

A resposta de uma URL inexistente é compatível com o fallback do Pages e pode produzir soft 404. Não houve inspeção do índice do Google para confirmar esse diagnóstico no GSC.

Resolver o domínio antes de apontar canonical ou sitemap para ele. Quando estiver funcional, consolidar Pages/domínio próprio com redirecionamento adequado. O valor `site` em `astro.config.mjs` não cria sozinho um canonical no HTML.

### Conteúdo inicial

| Intenção | Expressões e evidência | Página proposta | Papel comercial |
|---|---|---|---|
| Decidir se vale a pena | “maquininha ton vale a pena”, presente nas sugestões consultadas | Ampliar `/reviews/maquininha-ton/` | Responder às objeções e orientar o pedido |
| Entender custo | “maquininha ton taxas”, “taxas ton cpf”, “taxas ton cnpj”, nas sugestões | `/guias/taxas-ton/` | Explicar promoção, faixa de vendas e custos reais |
| Escolher modelo | “maquininha ton t2”, “maquininha ton t3”, “maquininha ton t3 smart”, nas sugestões | `/guias/modelos-ton/` | Ajudar a escolher entre os equipamentos |
| Aceitar benefícios | “maquininha ton aceita vale alimentação”, nas sugestões | `/guias/bandeiras-e-vouchers-ton/` | Explicar modelos, CNPJ e credenciamento por bandeira |
| Resolver dúvida sobre Pix | Tema presente nas fontes e nos materiais locais; demanda ainda não medida | Seção inicial na review; guia próprio se justificar | Explicar a condição de isenção e facilitar ativação |

Todos os guias devem apontar para a review e para o próximo passo relevante. Criar páginas individuais de modelos quando houver conteúdo próprio suficiente para a decisão. A priorização acima usa intenção comercial, não estimativa de volume.

**Títulos sugeridos:**

- Home: `Maquininhas Ton: modelos e condições | AnaliseReview`
- Review: `Maquininha Ton vale a pena? Taxas e análise | AnaliseReview`
- Guia de taxas: `Taxas Ton: promoção e condições por plano | AnaliseReview`

**Descrição sugerida para a review:** “Entenda as taxas e diferenças entre as maquininhas Ton. Veja para quem cada modelo faz sentido e consulte as condições pelo link do parceiro.”

Explicações e FAQs devem responder ao leitor mesmo sem rich results. Não há promessa de estrelas ou FAQ na busca. Não usar a contagem de empreendedores como `AggregateRating`, nem representar `price: 0` como oferta gratuita.

### Distribuição orgânica com o acervo

- Um conteúdo por dúvida: modelo com impressão, dependência do celular, taxa promocional versus recorrente, condições de Pix e vouchers.
- Reaproveitar cada guia em um carrossel e um vídeo curto, direcionando para a seção correspondente.
- Usar os vídeos de modelos em `Vai-um-extra/` como base após revisar falas, condições e identificação de parceiro.
- Usar o tutorial de chave Pix como apoio à ativação e o material de vouchers para explicar habilitação. Esses conteúdos têm papel distinto da aquisição de novos clientes.

## 5. Tráfego pago: teste inicial proposto

### Regra que muda a seleção de palavras-chave

A diretriz **“Anúncios online e rede social”, item 8**, disponível no documento consolidado do programa, proíbe lances ou aquisição de palavras-chave contendo Ton, Stone, Pagar.me, Equals, MundiPagg, marcas concorrentes e variações.

Portanto, consultas sobre Ton entram na proposta de conteúdo orgânico. A identificação **Parceiro Renda Ton** continua exigida nas peças. O README atual precisa incluir essa restrição de mídia.

### Opção de primeiro experimento: Google Search genérico

Hipótese: buscas que já indicam necessidade de equipamento podem gerar visitas mais próximas da decisão de adesão.

- Um teste concentrado em uma intenção, com destino alinhado: **maquininha sem aluguel**.
- Candidatos para pesquisa e validação: `[maquininha sem aluguel]`, `"maquininha para cpf"`, `"maquininha com comprovante impresso"`. O primeiro tema e a variante “para cpf” apareceram nas sugestões consultadas; os demais são hipóteses de produto.
- Começar com correspondências exata/frase e controle dos termos acionados. Mesmo essas correspondências admitem variações.
- Excluir as marcas e variações vedadas pelo programa. Revisar termos de suporte, login, manutenção, vagas e recrutamento de parceiros para não comprar intenção incompatível.
- A definição de regiões, orçamento, limites de CPC e CPA depende dos dados econômicos do parceiro. Brasil/pt-BR é o mercado documentado; isso não determina por si só a segmentação do piloto.

**Rascunho de mensagem:**

> Maquininha Sem Aluguel
>
> Confira Taxas e Modelos
>
> Parceiro Renda Ton. Entenda modelos, taxas e prazos antes de pedir sua maquininha.

**Destino:** inicialmente, a review corrigida com “sem aluguel”, taxa de adesão, modelos e CTA no topo. Uma página própria para essa intenção pode ser avaliada depois; evitar uma página que apenas repita a home e encaminhe o clique sem ajudar na escolha.

O exemplo é uma direção de mensagem, não uma campanha completa pronta para ativar.

### Opção seguinte: Meta Ads com materiais existentes

O acervo fornece material para Facebook/Instagram. Escolher um canal para o primeiro piloto evita fragmentar um orçamento ainda indefinido. A preferência final entre Search e Meta depende de CPC, comissão, criativos e capacidade de verificar indicações.

Três conceitos para revisão, com formato, público e destino mantidos constantes dentro do teste; a variável é o ângulo da mensagem:

| ID | Hipótese e gancho | Evidência e material | CTA e destino |
|---|---|---|---|
| C1 | Negócios iniciantes podem responder a “Sua maquininha sem aluguel” | FAQ da Ton: adesão sem cobrança fixa; imagens do Kit de Criação | “Ver modelos e condições”, topo comercial da review |
| C2 | A dúvida operacional pode gerar interesse: “Precisa imprimir comprovantes?” | Catálogo: T3/T3 Smart imprimem; T1/T2 usam SMS; kit e vídeos dos modelos | “Entender os modelos”, seção de escolha da review |
| C3 | Clareza de custo pode qualificar o clique: “Saiba quanto recebe em cada venda” | Simulador e tabelas por bandeira, com promoção e pós-promoção separados | “Entender as taxas”, seção de taxas da review |

**Produção comum:** composição com os produtos e logo de parceiro, versões de feed e vertical, texto legível e condições próximas da promessa. Revisar os vídeos e as regras do programa para adaptações. Usar imagens do acervo como material promocional, sem apresentá-las como teste próprio ou depoimento de cliente do AnaliseReview.

**Critério comum de teste:** comissão líquida por coorte de visitas quando houver atribuição verificável; enquanto isso, sessões com clique de indicação são apenas um sinal intermediário. Registrar CTR de link, custo da visita e custo por clique de indicação para diagnóstico. Configuração de atribuição e teto de perda devem ser definidos antes da ativação.

**Revisão:** leitura operacional após sete dias completos; avaliação inicial após 14 dias ou mais, respeitando a maturação real das indicações. Se houver pouco volume ou vendas pendentes, o resultado permanece inconclusivo. Falha de medição ou limite de perda atingido exige interromper o teste e revisar antes de continuar.

## 6. Mensuração e rentabilidade

### Percurso mínimo

`origem → página de entrada → consulta de modelos/taxas → clique de indicação → indicação válida → comissão aprovada/paga`

| Evento ou registro | Definição | Uso |
|---|---|---|
| `page_view` | Visualização da página, conforme consentimento/configuração | Aquisição e páginas de entrada |
| `select_model` | Escolha explícita de um modelo | Identificar interesse; não presumir compra |
| `affiliate_click` | Clique em link monetizado, com `placement`, página e modelo quando houver | Conversão intermediária |
| Indicação válida | Registro confirmado no relatório do Renda Ton/Renda Extra | Conversão comercial |
| Comissão | Valor aprovado/pago, modalidade da recompensa e data | Receita e retorno do parceiro |

Integrar as escolhas do banner ao carregamento das ferramentas e aos eventos. Hoje ele apenas grava preferências em `localStorage`. Incluir acesso posterior às preferências e informações de privacidade correspondentes ao tratamento efetivo.

Medir cliques uma única vez, preservar navegação e `referrer`, e usar UTMs nos links de entrada do AnaliseReview. Não substituir os parâmetros do link do programa ou acrescentar identificadores de venda sem suporte documentado.

O checkout pertence à Ton. Instalar GA4 ou pixel no AnaliseReview não fornece automaticamente o evento de compra no outro domínio. O regulamento, cláusula 5.10, descreve um benefício de Pixel do Facebook para o nível **Referência I**; a elegibilidade e o funcionamento na conta deste parceiro ainda precisam de confirmação.

Se não existir associação entre campanha e indicação, registrar essa limitação. Um teste com um canal e reconciliação agregada pode ajudar a aprender, mas não prova ROAS de cada anúncio. Também não equivale a um teste causal entre canais.

### Fórmulas para definir limites

- **CPA de indicação válida:** gasto em mídia ÷ indicações válidas atribuídas, com janela e maturação explícitas.
- **Retorno sobre mídia do parceiro:** comissões líquidas atribuídas ÷ gasto em mídia. Não usar faturamento do lojista ou preço do equipamento como receita do parceiro.
- **Margem de contribuição:** comissões líquidas atribuídas − mídia − outros custos variáveis ainda não descontados.
- **CPC de equilíbrio:** comissão líquida esperada por indicação válida × probabilidade de indicação válida por clique no anúncio, antes de outros custos variáveis.
- **CPC-alvo:** contribuição disponível por indicação, já descontados custos e margem desejada, × taxa de indicação válida por clique.

A probabilidade acima inclui o percurso inteiro, e não apenas a conversão de quem já chegou ao catálogo. Comissões por ativação e faturamento dependem de requisitos; não incorporar o máximo anunciado como receita garantida. O regulamento atual também define prazos de validação e pagamento que podem ultrapassar a primeira janela de observação do piloto.

Orçamento diário/total, nível do parceiro, comissão efetiva por modelo e acesso à atribuição ainda não têm confirmação nesta análise. Por isso, este documento não recomenda valores de investimento nem prevê lucro.

## 7. Aproveitamento dos materiais locais

Os caminhos abaixo são relativos à raiz `/home/andre/marketing/analisereview`.

| Pasta/material | Aplicação proposta | Condição de uso na proposta |
|---|---|---|
| `images/Crie-suas-artes/Kit de Criação/` | Fotos de modelos, logos de parceiro e elementos para o site/criativos | Exportar apenas as peças escolhidas; conferir a correspondência entre foto e modelo vigente |
| `images/Bombe-o-Mega-plus/Bombe o Mega+/Ton Mega+ Visa e Master.png` | Fonte auxiliar da tabela de taxas | Os cenários amostrados coincidem com o simulador; transformar a informação em HTML com data e condições |
| `images/Bombe-o-Mega-plus/Bombe o Mega+/Ton Mega+ Elo e Amex.png` | Evidenciar que bandeiras têm custos distintos | Validar os cenários que forem publicados no simulador vigente |
| `images/Black-na-regua-pack/Black na régua/` | Material de plano Black | Confirmar se o plano está disponível ao parceiro e separar do Mega+ |
| `images/Vai-um-extra/Vai um extra/` | Vídeos de T1/T2/T3/T3 Smart e material de bandeiras | Revisar os vídeos; vincular o criativo à seção do modelo ou à explicação de habilitação |
| `images/Pegue-carona-campanhas-v4/Pegue carona nas campanhas/` | Referência de formatos e campanhas para redes sociais | Verificar produto, condições e autorização da campanha antes de reutilizar |
| `images/Manual-cliente-1/1.Arsenal de vendas - envie pro cliente digital/` | Tutorial de chave Pix e materiais de catálogo | Apoio à ativação/uso; não substituir a proposta de aquisição por tutoriais de suporte |
| `images/Manual-cliente-2/2.Arsenal de vendas - envie pro cliente digital/` | Explicações de vouchers e Área MEI | Informar modelos, CNPJ e credenciamento exigidos; evitar garantir prazo do emissor |
| `images/Manual-junto-da-maquininha/` | Apoio pós-adesão | Usar em conteúdo de uso/ativação depois de validar atualidade |
| `images/Pronto-pra-bater-na-porta/Pronto pra bater na porta/` | Folhetos e identificação presencial | Adaptar informações atuais ao formato web, em vez de publicar folheto antigo como oferta vigente |
| `images/Pack-Parceiros/Veja o que outros parceiros estão fazendo/` | Referências de comunicação | Não tratar pessoas das peças como clientes próprios ou reproduzir claims sem fonte |

### Divergências encontradas no acervo

- `Feed_1.jpg` e `Story_1.png`, do pacote Mega+, anunciam 18x; o catálogo consultado apresenta até 21x em modelos elegíveis. Esse acervo reúne peças de momentos diferentes.
- `Folheto_A4_Dobra_Mega+.pdf` combina valores promocionais e condições posteriores, mas não explica todas as faixas próximas de cada número. Não o converter em uma promessa universal.
- `FEED_01.png` traz “desconto exclusivo”. A aplicação desse benefício precisa de confirmação no link e no nível do parceiro.
- A tabela Black mostra de onde pode vir a referência a 0,74%, mas não comprova a disponibilidade atual desse plano para o link publicado.

Manter os originais em `images/`, conforme a organização existente. Para publicar no site, selecionar derivados otimizados, nomeados por produto, com dimensões explícitas. Evitar transferir os pacotes e vídeos completos para todas as páginas.

## 8. README e documentação

O README descreve a implementação atual melhor que os documentos em `docs/superpowers/`. A spec e o plano antigos ainda descrevem cursos, Hotmart e Fórmula Negócio Online; a spec também coloca tráfego pago fora do MVP. Esses documentos precisam de identificação como histórico quando a nova direção for aprovada.

**Introdução proposta para o README:**

> AnaliseReview é um guia de escolha da maquininha Ton para autônomos, MEIs e pequenos negócios. O site explica modelos, taxas e condições com fontes datadas e encaminha o visitante ao link do Parceiro Renda Ton. A operação acompanha indicações válidas e comissões para avaliar o resultado do conteúdo e da aquisição de tráfego.

Acrescentar ao README:

1. Objetivo comercial, público e conversão principal.
2. Situação do domínio verificada, substituindo a afirmação de delegação já concluída enquanto ela não se confirmar.
3. Restrição à compra de palavras-chave de marca e fontes das regras de divulgação.
4. Origem, validade e rotina de revisão das ofertas.
5. Mapa do acervo e quais derivados entram no site.
6. Eventos de mensuração e limite de visibilidade do checkout externo.
7. Indicadores de resultado e responsáveis pela atualização.

Revisar também os conceitos do conteúdo: `price: 0` hoje é um valor sentinela, não gratuidade; `reviewCount` hoje representa usuários informados pela marca, não avaliações. Esses significados não podem vazar para preço publicado ou dados estruturados.

## 9. Sequência recomendada para 30 dias

| Período proposto | Entrega | Verificação |
|---|---|---|
| 23–29/09 | Correção de taxas, topo orientado à escolha, CTA e diagnóstico do domínio | Fontes e modalidades consistentes; teste mobile; domínio validado |
| 30/09–06/10 | Canonical, sitemap, 404, imagem social, consentimento e mensuração | HTTP/HTML corretos; eventos sem duplicação; consentimento exercitável |
| 07–13/10 | Guias de taxas/modelos, reaproveitamento de peças e preparação de um piloto | Texto útil em HTML, links internos, criativos com condições verificadas |
| 14–22/10 | Publicação editorial e leitura inicial do piloto, se os pré-requisitos estiverem concluídos | Qualidade das visitas, sinais intermediários e indicações já maduras |

As datas são uma sequência proposta a partir da auditoria. O piloto só entra após definir economia, verba e atribuição. A análise de comissões continua além desse calendário quando as regras de apuração exigirem.

### Arquivos envolvidos na primeira revisão

- `src/content/reviews/maquininha-ton.md`: fatos, condições, fontes, texto e veredito.
- `src/pages/index.astro`: proposta comercial e caminho para modelos/taxas.
- `src/pages/reviews/[slug].astro`: ordem das informações e posições dos CTAs.
- `src/components/AffiliateCTA.astro`: mensagem de ação e contexto de indicação.
- `src/components/CookieBanner.astro`: experiência compacta e integração das preferências quando a medição entrar.
- `src/layouts/Base.astro`: canonical e metadados sociais.
- `src/pages/404.astro` e geração de sitemap: respostas corretas para rastreamento.
- `README.md`: proposta, aquisição, acervo e rotina de manutenção.

### Critérios para validar a aplicação

- Conferir taxas nos mesmos cenários de plano, bandeira, prazo e faixa de vendas.
- Executar `npm run check` e `npm run build` quando houver alterações no site.
- Verificar as páginas em 320 px, 390 px e desktop, com e sem consentimento.
- Confirmar CTA acessível, destino e preservação do identificador de parceiro.
- Verificar canonical e sitemap apenas para URLs funcionais; exigir XML no sitemap e HTTP 404 para caminhos inexistentes.
- Validar eventos no depurador da ferramenta escolhida, sem registrar clique como pedido confirmado.
- Comparar resultados por origem, página de entrada e coorte madura. Uma mudança antes/depois é observacional; o aumento, por si só, não prova causalidade.

## Fontes

Consultas realizadas em 23/09/2026:

1. [Home publicada](https://analisereview.pages.dev/), [review](https://analisereview.pages.dev/reviews/maquininha-ton/) e [metodologia](https://analisereview.pages.dev/metodologia/).
2. [Planos e taxas da Ton](https://www.ton.com.br/planos-e-taxas), com seleções descritas na seção 2; [catálogo](https://www.ton.com.br/catalogo), também consultado pelo link de indicação existente no projeto.
3. [Site da Ton](https://www.ton.com.br/): condições de Pix, garantia, recebimento, modelos e reputação informada pela própria marca.
4. [Diretrizes consolidadas do programa](https://documentos.ton.com.br/rendaextra-todas-diretrizes.pdf): marca, websites e anúncios; item 8 da diretriz de anúncios.
5. [Regulamento Renda Ton](https://documentos.ton.com.br/regulamento-renda-ton.pdf), vigente desde 01/09/2026: recompensas, validação e benefício do pixel.
6. DNS público: [NS](https://dns.google/resolve?name=analisereview.com.br&type=NS), [A](https://dns.google/resolve?name=analisereview.com.br&type=A) e [AAAA](https://dns.google/resolve?name=analisereview.com.br&type=AAAA).
7. Google Suggest: [maquininha Ton](https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=maquininha%20ton), [taxas Ton](https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=taxas%20ton), [Ton vale a pena](https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=ton%20vale%20a%20pena) e [maquininha sem aluguel](https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&gl=br&q=maquininha%20sem%20aluguel).
8. Materiais locais identificados na seção 7 e código do projeto na revisão `9b854a9`.

Nota de atualização: a home da Ton também exibiu uma promessa de cashback cujo detalhamento mencionava adesões de 24/06 a 31/08. Não incorporar essa oferta à proposta de setembro sem confirmar um regulamento que cubra o período e o link do parceiro.
