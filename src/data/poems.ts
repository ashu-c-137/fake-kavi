export interface Author {
    id: string;
    name: string;
    slug: string;
    bio: string;
    avatar_url: string | null;
    created_at: string;
}

export interface Category {
    id: string;
    name: string; // Hindi name
    name_en: string; // English name
    slug: string;
    description: string;
    description_en: string; // English description
    created_at: string;
}

export interface Poem {
    id: string;
    title: string; // Hindi Devanagari title
    titleRoman: string; // Roman script title
    slug: string;
    content: string; // Hindi content
    contentRoman: string; // Roman script content
    excerpt: string;
    excerptRoman: string;
    author_id: string;
    category_id: string | null;
    featured_image_url: string | null;
    is_featured: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface PoemWithDetails extends Poem {
    author: Author;
    category: Category | null;
}

// Authors data
export const authors: Author[] = [
    {
        id: '1',
        name: 'Ashutosh Dubey',
        slug: 'ashutosh-dubey',
        bio: 'एक कवि जो सच को झूठ और झूठ को सच बनाने में माहिर हैं। उनकी कविताओं में हास्य, व्यंग्य और गहरी संवेदनशीलता का अद्भुत मिश्रण मिलता है।',
        avatar_url: null,
        created_at: new Date().toISOString()
    }
];

// Categories data
export const categories: Category[] = [
    {
        id: '1',
        name: 'प्रेम',
        name_en: 'Love',
        slug: 'prem',
        description: 'प्रेम और रिश्तों पर केंद्रित कविताएँ',
        description_en: 'Poems focused on love and relationships',
        created_at: new Date().toISOString()
    }
];

// Poems data
const poems: Poem[] = [
    {
        id: '1',
        title: 'सच्चा आशिक',
        titleRoman: 'Sachcha Ashiq',
        slug: 'kal-raat-machhar-ke-katne-se',
        content: `कल रात मच्छर के काटने से
आगयी फिर तुम्हारी याद

कि होता मैं एक मच्छर
तो काटता तुम्हारे माथे को और हो जाता-
मैं तुम्हारे माथे की बिंदी

काटता तुम्हारे गालों को और बन जाता-
तुम्हारा सबसे प्रिये तिल

काटता तुम्हारे होंठों को और पी जाता-
उसका सारा लाल रंग

और इस तरह तुम्हें छूने के लालच में
तुम्हारे ही हाथों मारा जाता`,
        contentRoman: 
        `kal raat machchar ke kaatne se
aagayi phir tumhari yaad

ki hota main ek machchar 
toh kaat'ta tumhare maathe ko aur hojata-
main tumhare maathe ki bindi

kaat'ta tumhare gaalon ko aur ban jaata-
tumahra sabse priye til

kaat'ta tumhare honthhon ko aur pee jaata-
uska saara laal rang

aur is tarah tumhe chhoone ke lalach mein
tumhare hi haathon maara jaata`,
        excerpt: 'कल रात मच्छर के काटने से...',
        excerptRoman: 'kal raat machchar ke kaatne se...',
        author_id: '1',
        category_id: '1',
        featured_image_url: 'https://oqfwjobtaivmhdsrutsg.supabase.co/storage/v1/object/public/poem-banners/banner.png',
        is_featured: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

// Helper functions to get data with relationships
export function getAllPoems(): PoemWithDetails[] {
    return poems.map(poem => ({
        ...poem,
        author: authors.find(a => a.id === poem.author_id)!,
        category: poem.category_id ? categories.find(c => c.id === poem.category_id) || null : null
    }));
}

export function getPoemBySlug(slug: string): PoemWithDetails | null {
    const poem = poems.find(p => p.slug === slug);
    if (!poem) return null;

    return {
        ...poem,
        author: authors.find(a => a.id === poem.author_id)!,
        category: poem.category_id ? categories.find(c => c.id === poem.category_id) || null : null
    };
}

export function getFeaturedPoems(): PoemWithDetails[] {
    return getAllPoems().filter(p => p.is_featured);
}

export function getRecentPoems(limit?: number): PoemWithDetails[] {
    const all = getAllPoems().sort((a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
    return limit ? all.slice(0, limit) : all;
}

export function getPoemsByAuthor(authorId: string): PoemWithDetails[] {
    return getAllPoems().filter(p => p.author_id === authorId);
}

export function getPoemsByCategory(categoryId: string): PoemWithDetails[] {
    return getAllPoems().filter(p => p.category_id === categoryId);
}

export function getRelatedPoems(poemId: string, limit: number = 3): PoemWithDetails[] {
    const poem = poems.find(p => p.id === poemId);
    if (!poem) return [];

    const related = getAllPoems()
        .filter(p => p.id !== poemId && (p.author_id === poem.author_id || p.category_id === poem.category_id))
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, limit);

    return related;
}

export function getAllAuthors(): Author[] {
    return authors;
}

export function getAuthorBySlug(slug: string): Author | null {
    return authors.find(a => a.slug === slug) || null;
}

export function getAllCategories(): Category[] {
    return categories;
}

export function getCategoryBySlug(slug: string): Category | null {
    return categories.find(c => c.slug === slug) || null;
}

