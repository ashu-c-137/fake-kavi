/**
 * Database Seed Script (JavaScript version)
 * 
 * This script populates the Supabase database with initial data.
 * 
 * Usage:
 * 1. Make sure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 2. Run: node scripts/seed.js
 * 
 * Note: This requires the @supabase/supabase-js package and dotenv
 * Install if needed: npm install dotenv
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please create a .env file in the project root with:');
  console.error('  VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.error('\nYou can find these in your Supabase project:');
  console.error('  Settings → API → Project URL & anon public key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to generate slug from text
function generateSlug(text) {
  // For Hindi text, create a simpler slug using transliteration approximation
  const transliteration = {
    'क': 'k', 'ल': 'l', 'र': 'r', 'ा': 'a', 'त': 't',
    'म': 'm', 'च': 'ch', 'े': 'e', 'स': 's', ' ': '-'
  };
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Simplified slug generator for Hindi - just use a URL-safe version
function createSlug(text) {
  // Remove special characters, replace spaces with hyphens
  return text
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .trim();
}

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // 1. Create Author: Ashutosh Dubey
    console.log('📝 Creating author: Ashutosh Dubey');
    const authorSlug = 'ashutosh-dubey';
    
    const { data: existingAuthor } = await supabase
      .from('authors')
      .select('id')
      .eq('slug', authorSlug)
      .maybeSingle();

    let authorId;
    
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

      if (authorError) {
        // If RLS prevents insert, we need to use service role key or disable RLS temporarily
        console.error('   ⚠️  Error creating author. This might be due to RLS policies.');
        console.error('   Suggestion: You may need to run this script with a service role key');
        throw authorError;
      }
      authorId = author.id;
      console.log('   ✓ Author created');
    }

    // 2. Create a category (प्रेम - Love/Romance)
    console.log('\n📚 Creating category: प्रेम');
    const categoryName = 'प्रेम';
    const categorySlug = 'prem';
    
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .maybeSingle();

    let categoryId = null;
    
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
    const poemSlug = 'kal-raat-machhar-ke-katne-se';
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
    const { data: existingPoem } = await supabase
      .from('poems')
      .select('id')
      .eq('slug', poemSlug)
      .maybeSingle();

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

  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(error.message);
    if (error.details) console.error('Details:', error.details);
    if (error.hint) console.error('Hint:', error.hint);
    
    // Check if it's an RLS policy error
    if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('RLS')) {
      console.error('\n💡 Tip: The error might be due to Row Level Security (RLS) policies.');
      console.error('   You have two options:');
      console.error('   1. Temporarily disable RLS for inserts in Supabase dashboard');
      console.error('   2. Use the Supabase dashboard SQL editor to insert the data directly');
      console.error('   3. Use a service role key (not recommended for client-side code)');
    }
    
    process.exit(1);
  }
}

seedDatabase();

