# FakeKavi

A Hindi poetry website built with React and TypeScript using static data.

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Add poems**: Edit `src/data/poems.ts` to add more poems, authors, and categories.

## Features

- 🎨 Modern, responsive design with Hindi typography
- 📝 Poetry management with categories and authors
- 🔍 Browse poems by author, category, or date
- ⭐ Featured poems on homepage
- 📱 Mobile-friendly interface

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Static data (no backend required)
- Hash-based routing

## Adding Poems

To add poems, edit `src/data/poems.ts`. The file contains:
- `authors` - Array of author objects
- `categories` - Array of category objects  
- `poems` - Array of poem objects

Simply add your new poems, authors, or categories to the respective arrays following the existing structure.
