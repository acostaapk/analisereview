-- NotFair SEO delivered posts. Each row is one published article.
-- Real deliveries upsert by `id` (primary key); re-delivered canonical
-- articles overwrite instead of creating a second URL.
-- `slug` is unique so the public route /blog/{slug} stays one-to-one.
-- Apply locally:  wrangler d1 execute analisereview --local --file=./migrations/0001_notfair_posts.sql
-- Apply remote:   wrangler d1 execute analisereview --remote --file=./migrations/0001_notfair_posts.sql
CREATE TABLE IF NOT EXISTS notfair_posts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_html TEXT NOT NULL,
  meta_description TEXT,
  tags TEXT NOT NULL DEFAULT '[]',
  image_url TEXT,
  reading_time_minutes INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT
);
