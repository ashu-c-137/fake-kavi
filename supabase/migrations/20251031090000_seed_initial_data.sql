-- Seed initial data for FakeKavi
-- Run this in your Supabase SQL Editor after running the schema migration

-- Insert Author: Ashutosh Dubey
INSERT INTO authors (name, slug, bio)
VALUES (
  'Ashutosh Dubey',
  'ashutosh-dubey',
  'एक कवि जो भावनाओं को शब्दों में पिरोता है।'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Category: प्रेम
INSERT INTO categories (name, slug, description)
VALUES (
  'प्रेम',
  'prem',
  'प्रेम और रिश्तों पर केंद्रित कविताएँ'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert the first poem
INSERT INTO poems (
  title,
  slug,
  content,
  excerpt,
  author_id,
  category_id,
  is_featured,
  published_at
)
SELECT 
  'कल रात मच्छर के काटने से',
  'kal-raat-machhar-ke-katne-se',
  'कल रात मच्छर के काटने से

आगयी फिर तुम्हारी याद
कि होता मैं एक मच्छर
तो काटता तुम्हारे माथे को और हो जाता-
मैं तुम्हारे माथे की बिंदी
काटता तुम्हारे गालों को और बन जाता-
तुम्हारा सबसे प्रिये तिल
काटता तुम्हारे होंठों को और पी जाता-
उसका सारा लाल रंग
और इस तरह तुम्हें छूने के लालच में
तुम्हारे ही हाथों मारा जाता',
  'कल रात मच्छर के काटने से आगयी फिर तुम्हारी याद...',
  (SELECT id FROM authors WHERE slug = 'ashutosh-dubey'),
  (SELECT id FROM categories WHERE slug = 'prem'),
  true,
  now()
ON CONFLICT (slug) DO NOTHING;

