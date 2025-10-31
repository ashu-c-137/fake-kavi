import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Author, PoemWithDetails } from '../lib/database.types';
import { User, ArrowLeft, Calendar } from 'lucide-react';

interface AuthorProfileProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function AuthorProfile({ slug, onNavigate }: AuthorProfileProps) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [poems, setPoems] = useState<PoemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthorData();
  }, [slug]);

  async function loadAuthorData() {
    try {
      const { data: authorData, error: authorError } = await supabase
        .from('authors')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (authorError) throw authorError;

      if (authorData) {
        setAuthor(authorData);

        const { data: poemsData, error: poemsError } = await supabase
          .from('poems')
          .select(`
            *,
            author:authors(*),
            category:categories(*)
          `)
          .eq('author_id', authorData.id)
          .order('published_at', { ascending: false });

        if (poemsError) throw poemsError;
        setPoems(poemsData as unknown as PoemWithDetails[]);
      }
    } catch (error) {
      console.error('Error loading author data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-900 sans-text text-lg">लोड हो रहा है...</div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl hindi-heading text-stone-900 mb-4">कवि नहीं मिले</h1>
            <button
              onClick={() => onNavigate('/authors')}
              className="text-rose-900 sans-text hover:underline"
            >
              सभी कवि देखें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('/authors')}
          className="flex items-center gap-2 text-stone-700 hover:text-rose-900 sans-text font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          सभी कवियों पर वापस जाएँ
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {author.avatar_url ? (
              <img
                src={author.avatar_url}
                alt={author.name}
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-rose-100 flex items-center justify-center shadow-md">
                <User className="w-16 h-16 text-rose-900" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
                {author.name}
              </h1>
              <p className="text-lg hindi-text text-stone-700 leading-relaxed">
                {author.bio || 'कोई परिचय उपलब्ध नहीं है।'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <p className="sans-text text-stone-600">
              <span className="font-semibold">{poems.length}</span> कविताएँ प्रकाशित
            </p>
          </div>
        </div>

        {poems.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
              {author.name} की रचनाएँ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {poems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg hindi-text text-stone-600">
              अभी तक कोई कविता प्रकाशित नहीं हुई है
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface PoemCardProps {
  poem: PoemWithDetails;
  onNavigate: (path: string) => void;
}

function PoemCard({ poem, onNavigate }: PoemCardProps) {
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
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer card-hover"
    >
      <h3 className="text-2xl font-semibold hindi-heading text-stone-900 mb-3 hover:text-rose-900 transition-colors">
        {poem.title}
      </h3>
      <div className="flex items-center gap-2 text-sm text-stone-600 mb-4 sans-text">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(poem.published_at)}</span>
      </div>
      <p className="hindi-text text-stone-700 line-clamp-3">
        {poem.excerpt}
      </p>
      {poem.category && (
        <span className="inline-block mt-4 px-3 py-1 bg-rose-100 text-rose-900 text-xs sans-text font-medium rounded-full">
          {poem.category.name}
        </span>
      )}
    </article>
  );
}
