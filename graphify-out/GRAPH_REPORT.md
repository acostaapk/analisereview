# Graph Report - analisereview  (2026-09-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 154 nodes · 264 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 452 input · 139 output

## Graph Freshness
- Built from commit: `88daed3e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Site Configuration
- Post Validation Logic
- Database Operations
- Build and Type Scripts
- Content Models and Pages
- Astro Dependencies
- Runtime Environment Setup
- Cookie Consent Banner
- TypeScript Configuration
- Review Collections Config

## God Nodes (most connected - your core abstractions)
1. `siteBase` - 9 edges
2. `D1PreparedStatement` - 8 edges
3. `POST()` - 8 edges
4. `affiliateUrl` - 8 edges
5. `updatedAt` - 8 edges
6. `upsertPosts()` - 7 edges
7. `scripts` - 7 edges
8. `D1Like` - 6 edges
9. `validateDelivery()` - 6 edges
10. `getPostBySlug()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `expectInvalid()` --calls--> `validateDelivery()`  [EXTRACTED]
  tests/validate.test.ts → src/lib/notfair/validate.ts
- `FakeD1` --implements--> `D1Like`  [EXTRACTED]
  tests/db.test.ts → src/lib/notfair/db.ts
- `POST()` --calls--> `upsertPosts()`  [EXTRACTED]
  src/pages/api/seo-webhook.ts → src/lib/notfair/db.ts
- `POST()` --calls--> `getDb()`  [EXTRACTED]
  src/pages/api/seo-webhook.ts → src/lib/notfair/env.ts
- `requireSecret()` --calls--> `getWebhookSecret()`  [EXTRACTED]
  src/pages/api/seo-webhook.ts → src/lib/notfair/env.ts

## Import Cycles
- None detected.

## Communities (13 total, 3 thin omitted)

### Community 0 - "Site Configuration"
Cohesion: 0.16
Nodes (17): affiliateUrl, contactEmail, maquininhasUrl, publisher, simulatorUrl, siteBase, updatedAt, site (+9 more)

### Community 1 - "Post Validation Logic"
Cohesion: 0.14
Nodes (15): safeEqual(), verifyBearer(), NotFairDelivery, validateDelivery(), validatePost(), ValidationError, json(), POST() (+7 more)

### Community 2 - "Database Operations"
Cohesion: 0.17
Nodes (12): D1Like, D1PreparedStatement, getPostBySlug(), listPosts(), parseTags(), rowToPost(), UPSERT_SQL, upsertPosts() (+4 more)

### Community 3 - "Build and Type Scripts"
Cohesion: 0.10
Nodes (19): @astrojs/check, devDependencies, @astrojs/check, @types/sanitize-html, typescript, vitest, name, scripts (+11 more)

### Community 4 - "Content Models and Pages"
Cohesion: 0.12
Nodes (11): MachineModel, models, structuredData, trustItems, highPrice, lowPrice, priceNumbers, ratings (+3 more)

### Community 5 - "Astro Dependencies"
Cohesion: 0.13
Nodes (15): astro, @astrojs/cloudflare, @astrojs/sitemap, @fontsource/fraunces, @fontsource/inter, @fontsource/source-serif-4, dependencies, astro (+7 more)

### Community 6 - "Runtime Environment Setup"
Cohesion: 0.33
Nodes (5): getDb(), getWebhookSecret(), runtimeEnv(), RuntimeLocals, sanitizeArticleHtml()

## Knowledge Gaps
- **54 isolated node(s):** `MachineModel`, `RuntimeLocals`, `simulatorUrl`, `site`, `structuredData` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDb()` connect `Runtime Environment Setup` to `Post Validation Logic`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `siteBase` connect `Site Configuration` to `Content Models and Pages`, `Runtime Environment Setup`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `MachineModel`, `RuntimeLocals`, `simulatorUrl` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Post Validation Logic` be split into smaller, more focused modules?**
  _Cohesion score 0.14492753623188406 - nodes in this community are weakly interconnected._
- **Should `Build and Type Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Content Models and Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.12280701754385964 - nodes in this community are weakly interconnected._
- **Should `Astro Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._