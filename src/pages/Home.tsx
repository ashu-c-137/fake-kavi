import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PoemWithDetails } from '../lib/database.types';
import { BookOpen, Calendar, User } from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [featuredPoems, setFeaturedPoems] = useState<PoemWithDetails[]>([]);
  const [recentPoems, setRecentPoems] = useState<PoemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoems();
  }, []);

  async function loadPoems() {
    try {
      const { data: featured, error: featuredError } = await supabase
        .from('poems')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      const { data: recent, error: recentError } = await supabase
        .from('poems')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .order('published_at', { ascending: false })
        .limit(6);

      if (featuredError) throw featuredError;
      if (recentError) throw recentError;

      setFeaturedPoems(featured as unknown as PoemWithDetails[]);
      setRecentPoems(recent as unknown as PoemWithDetails[]);
    } catch (error) {
      console.error('Error loading poems:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-900 sans-text text-lg">लोड हो रहा है...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-rose-50 via-amber-50 to-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-rose-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold hindi-heading text-rose-900 mb-6">
              FakeKavi
            </h1>
            <p className="text-2xl hindi-text text-stone-700 mb-4">
              कविता जो सच्ची नहीं, पर लगती है सच्ची
            </p>
            <p className="text-lg hindi-text text-stone-600 leading-relaxed">
              यहाँ हर शब्द एक कल्पना है, हर भावना एक अतिशयोक्ति।
              पर इसी झूठ में छुपी है जिंदगी की सच्चाई।
            </p>
            <button
              onClick={() => onNavigate('/poems')}
              className="mt-8 px-8 py-3 bg-rose-900 text-white sans-text font-semibold rounded-lg hover:bg-rose-800 transition-colors shadow-lg hover:shadow-xl"
            >
              सभी कविताएँ पढ़ें
            </button>
          </div>
        </div>
      </section>

      {featuredPoems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
            चुनिंदा रचनाएँ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPoems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} onNavigate={onNavigate} featured />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
          ताज़ा कविताएँ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPoems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface PoemCardProps {
  poem: PoemWithDetails;
  onNavigate: (path: string) => void;
  featured?: boolean;
}

function PoemCard({ poem, onNavigate, featured }: PoemCardProps) {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  return (
    <article
      onClick={() => onNavigate(`/poem/${poem.slug}`)}
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer card-hover ${
        featured ? 'border-2 border-rose-200' : ''
      }`}
    >
      {poem.featured_image_url && (
        <div className="h-48 overflow-hidden bg-stone-200">
          <img
            src={poem.featured_image_url}
            alt={poem.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold hindi-heading text-stone-900 mb-3 hover:text-rose-900 transition-colors">
          {poem.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600 mb-4 sans-text">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{poem.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(poem.published_at)}</span>
          </div>
        </div>
        <p className="hindi-text text-stone-700 line-clamp-3">
          {poem.excerpt}
        </p>
        {poem.category && (
          <span className="inline-block mt-4 px-3 py-1 bg-rose-100 text-rose-900 text-xs sans-text font-medium rounded-full">
            {poem.category.name}
          </span>
        )}
      </div>
    </article>
  );
}
