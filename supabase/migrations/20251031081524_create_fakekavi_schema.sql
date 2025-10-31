/*
  # FakeKavi Poetry Website Schema

  ## Overview
  This migration creates the complete database schema for the FakeKavi Hindi poetry website.
  The design follows a normalized structure to support multiple authors, poems, categories, and tags.

  ## New Tables

  ### 1. authors
  Stores information about poets contributing to FakeKavi
  - `id` (uuid, primary key) - Unique identifier for each author
  - `name` (text) - Author's display name
  - `slug` (text, unique) - URL-friendly version of the name
  - `bio` (text) - Author biography in Hindi/English
  - `avatar_url` (text) - Optional profile image URL
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. categories
  Organizes poems by theme or style
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name` (text) - Category name (e.g., "प्रेम", "व्यंग्य", "समाज")
  - `slug` (text, unique) - URL-friendly version
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. poems
  The main content table storing all poetry
  - `id` (uuid, primary key) - Unique identifier for each poem
  - `title` (text) - Poem title
  - `slug` (text, unique) - URL-friendly version for routing
  - `content` (text) - Full poem text in Devanagari
  - `excerpt` (text) - Short preview for listings
  - `author_id` (uuid, foreign key) - References authors table
  - `category_id` (uuid, foreign key) - References categories table
  - `featured_image_url` (text) - Optional header image
  - `is_featured` (boolean) - Whether to show on homepage
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. tags
  Flexible tagging system for poems
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, unique) - Tag name
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. poem_tags
  Many-to-many relationship between poems and tags
  - `poem_id` (uuid, foreign key) - References poems table
  - `tag_id` (uuid, foreign key) - References tags table
  - Primary key on (poem_id, tag_id)

  ## Security
  Row Level Security (RLS) is enabled on all tables.
  Public read access is granted since this is a public poetry website.
  Write operations are restricted to authenticated users only.

  ## Indexes
  Indexes are created on:
  - Slug fields for fast URL routing
  - Foreign keys for efficient joins
  - Featured flag for homepage queries
  - Published date for chronological sorting
*/

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  bio text DEFAULT '',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  author_id uuid NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured_image_url text,
  is_featured boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create poem_tags junction table
CREATE TABLE IF NOT EXISTS poem_tags (
  poem_id uuid NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (poem_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_poems_slug ON poems(slug);
CREATE INDEX IF NOT EXISTS idx_poems_author ON poems(author_id);
CREATE INDEX IF NOT EXISTS idx_poems_category ON poems(category_id);
CREATE INDEX IF NOT EXISTS idx_poems_featured ON poems(is_featured);
CREATE INDEX IF NOT EXISTS idx_poems_published ON poems(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access

-- Authors policies
CREATE POLICY "Anyone can view authors"
  ON authors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Poems policies
CREATE POLICY "Anyone can view published poems"
  ON poems FOR SELECT
  TO public
  USING (published_at <= now());

CREATE POLICY "Authenticated users can insert poems"
  ON poems FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update poems"
  ON poems FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete poems"
  ON poems FOR DELETE
  TO authenticated
  USING (true);

-- Tags policies
CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Poem_tags policies
CREATE POLICY "Anyone can view poem tags"
  ON poem_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage poem tags"
  ON poem_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);