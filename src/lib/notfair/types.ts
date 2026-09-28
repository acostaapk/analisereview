/** NotFair SEO webhook delivery contract.
 *  One POST carries 1-10 posts. A test delivery has test: true and
 *  id: 0 and must never be persisted. */

export interface NotFairPost {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  meta_description: string | null;
  tags: string[];
  image_url: string | null;
  reading_time_minutes: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface NotFairDelivery {
  event_type: string;
  test: boolean;
  timestamp: string;
  data: {
    posts: NotFairPost[];
  };
}

/** A D1 row as read back (tags stored as a JSON string). */
export interface NotFairPostRow {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  meta_description: string | null;
  tags: string;
  image_url: string | null;
  reading_time_minutes: number | null;
  created_at: string;
  updated_at: string | null;
}
