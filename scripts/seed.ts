/**
 * Database Seed Script
 * 
 * This script populates the Supabase database with initial data:
 * - Creates the author "Ashutosh Dubey"
 * - Creates initial categories
 * - Adds the first poem
 * 
 * Usage:
 * 1. Make sure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 2. Run: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please create a .env file with:');
  console.error('  VITE_SUPABASE_URL=your_url');
  console.error('  VITE_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to generate slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // 1. Create Author: Ashutosh Dubey
    console.log('📝 Creating author: Ashutosh Dubey');
    const authorSlug = generateSlug('Ashutosh Dubey');
    
    const { data: existingAuthor, error: authorCheckError } = await supabase
      .from('authors')
      .select('id')
      .eq('slug', authorSlug)
      .maybeSingle();

    if (authorCheckError && authorCheckError.code !== 'PGRST116') {
      throw authorCheckError;
    }

    let authorId: string;
    
    if (existingAuthor) {
      console.log('   ✓ Author already exists');
      authorId = existingAuthor.id;
    } else {
      const { data: author, error: authorError } = await supabase
        .from('authors')
        .insert({
          name: 'Ashutosh Dubey',
          slug: authorSlug,
          bio: 'एक कवि जो भावनाओं को शब्दों में पिरोता है।'
        })
        .select('id')
        .single();

      if (authorError) throw authorError;
      authorId = author.id;
      console.log('   ✓ Author created');
    }

    // 2. Create a category (प्रेम - Love/Romance)
    console.log('\n📚 Creating category: प्रेम');
    const categoryName = 'प्रेम';
    const categorySlug = generateSlug(categoryName);
    
    const { data: existingCategory, error: categoryCheckError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (categoryCheckError && categoryCheckError.code !== 'PGRST116') {
      throw categoryCheckError;
    }

    let categoryId: string | null = null;
    
    if (existingCategory) {
      console.log('   ✓ Category already exists');
      categoryId = existingCategory.id;
    } else {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .insert({
          name: categoryName,
          slug: categorySlug,
          description: 'प्रेम और रिश्तों पर केंद्रित कविताएँ'
        })
        .select('id')
        .single();

      if (categoryError) throw categoryError;
      categoryId = category.id;
      console.log('   ✓ Category created');
    }

    // 3. Add the first poem
    console.log('\n📖 Adding poem: कल रात मच्छर के काटने से');
    const poemTitle = 'कल रात मच्छर के काटने से';
    const poemSlug = generateSlug(poemTitle);
    const poemContent = `कल रात मच्छर के काटने से

आगयी फिर तुम्हारी याद
कि होता मैं एक मच्छर
तो काटता तुम्हारे माथे को और हो जाता-
मैं तुम्हारे माथे की बिंदी
काटता तुम्हारे गालों को और बन जाता-
तुम्हारा सबसे प्रिये तिल
काटता तुम्हारे होंठों को और पी जाता-
उसका सारा लाल रंग
और इस तरह तुम्हें छूने के लालच में
तुम्हारे ही हाथों मारा जाता`;

    const poemExcerpt = 'कल रात मच्छर के काटने से आगयी फिर तुम्हारी याद...';

    // Check if poem already exists
    const { data: existingPoem, error: poemCheckError } = await supabase
      .from('poems')
      .select('id')
      .eq('slug', poemSlug)
      .maybeSingle();

    if (poemCheckError && poemCheckError.code !== 'PGRST116') {
      throw poemCheckError;
    }

    if (existingPoem) {
      console.log('   ✓ Poem already exists');
      console.log('\n✅ Database already seeded!');
      return;
    }

    const { data: poem, error: poemError } = await supabase
      .from('poems')
      .insert({
        title: poemTitle,
        slug: poemSlug,
        content: poemContent,
        excerpt: poemExcerpt,
        author_id: authorId,
        category_id: categoryId,
        is_featured: true,
        published_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (poemError) throw poemError;
    console.log('   ✓ Poem created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Author: Ashutosh Dubey (${authorSlug})`);
    console.log(`   - Category: ${categoryName} (${categorySlug})`);
    console.log(`   - Poem: ${poemTitle} (${poemSlug})`);
    console.log('\n🎉 You can now view the poem on your website!');

  } catch (error: any) {
    console.error('\n❌ Error seeding database:');
    console.error(error.message);
    if (error.details) console.error('Details:', error.details);
    if (error.hint) console.error('Hint:', error.hint);
    process.exit(1);
  }
}

seedDatabase();

