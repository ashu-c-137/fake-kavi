# FakeKavi Setup Guide

This guide will help you set up the FakeKavi poetry website with Supabase.

## Prerequisites

- Node.js and npm installed
- A Supabase account (free tier works fine)
- Git (optional)

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - Project Name: `fake-kavi` (or any name)
   - Database Password: (choose a strong password)
   - Region: Choose closest to you
4. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `supabase/migrations/20251031081524_create_fakekavi_schema.sql`
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. Wait for it to complete successfully

## Step 3: Seed Initial Data

1. Still in the SQL Editor, click **New Query** again
2. Copy the entire content from `supabase/migrations/20251031090000_seed_initial_data.sql`
3. Paste it into the SQL editor
4. Click **Run**
5. Verify by going to **Table Editor** → You should see:
   - 1 author (Ashutosh Dubey)
   - 1 category (प्रेम)
   - 1 poem (कल रात मच्छर के काटने से)

## Step 4: Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** in the left sidebar
3. You'll see:
   - **Project URL** - Copy this
   - **anon public** key - Copy this (under Project API keys)

## Step 5: Create Environment Variables

1. In your project root, create a file named `.env`
2. Add the following (replace with your actual values):

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Example:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** Never commit the `.env` file to git (it's already in `.gitignore`)

## Step 6: Install Dependencies and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The website should now be running at `http://localhost:5173` (or another port if 5173 is busy).

## Alternative: Using the Seed Script

If you prefer using a script instead of SQL:

1. Install dotenv if needed: `npm install dotenv`
2. Run: `node scripts/seed.js`

**Note:** The script may fail due to Row Level Security (RLS) policies. If it does, use the SQL method above instead.

## Troubleshooting

### Blank Page / Nothing Showing

- Check that your `.env` file exists and has correct values
- Restart the dev server after creating/updating `.env`
- Open browser console (F12) to check for errors
- Verify that the data was inserted correctly in Supabase Table Editor

### "Missing Supabase environment variables" Error

- Make sure `.env` file is in the project root (same folder as `package.json`)
- Make sure variable names start with `VITE_` (for Vite to read them)
- Restart the dev server after creating `.env`

### Database Connection Errors

- Verify your Supabase project is active (not paused)
- Check that your URL and key are correct
- Make sure RLS policies allow public read access (already set in migration)

## Next Steps

- Add more poems through Supabase dashboard
- Customize the website design
- Add more categories and authors

Happy poetry writing! 🎉

