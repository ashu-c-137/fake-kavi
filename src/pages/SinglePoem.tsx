import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PoemWithDetails } from '../lib/database.types';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

interface SinglePoemProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function SinglePoem({ slug, onNavigate }: SinglePoemProps) {
  const [poem, setPoem] = useState<PoemWithDetails | null>(null);
  const [relatedPoems, setRelatedPoems] = useState<PoemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoem();
  }, [slug]);

  async function loadPoem() {
    try {
      const { data, error } = await supabase
        .from('poems')
        .select(`
          *,
          author:authors(*),
          category:categories(*)
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPoem(data as unknown as PoemWithDetails);

        const { data: related, error: relatedError } = await supabase
          .from('poems')
          .select(`
            *,
            author:authors(*),
            category:categories(*)
          `)
          .neq('id', data.id)
          .or(`author_id.eq.${data.author_id},category_id.eq.${data.category_id}`)
          .order('published_at', { ascending: false })
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedPoems(related as unknown as PoemWithDetails[]);
      }
    } catch (error) {
      console.error('Error loading poem:', error);
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

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: poem?.title,
        text: poem?.excerpt,
        url: window.location.href,
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-900 sans-text text-lg">लोड हो रहा है...</div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl hindi-heading text-stone-900 mb-4">कविता नहीं मिली</h1>
            <button
              onClick={() => onNavigate('/poems')}
              className="text-rose-900 sans-text hover:underline"
            >
              सभी कविताएँ देखें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('/poems')}
          className="flex items-center gap-2 text-stone-700 hover:text-rose-900 sans-text font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          सभी कविताओं पर वापस जाएँ
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {poem.featured_image_url && (
            <div className="h-64 md:h-96 overflow-hidden bg-stone-200">
              <img
                src={poem.featured_image_url}
                alt={poem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-6">
                {poem.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-stone-600 sans-text">
                <button
                  onClick={() => onNavigate(`/author/${poem.author.slug}`)}
                  className="flex items-center gap-2 hover:text-rose-900 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{poem.author.name}</span>
                </button>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(poem.published_at)}</span>
                </div>
                {poem.category && (
                  <span className="px-3 py-1 bg-rose-100 text-rose-900 text-sm font-medium rounded-full">
                    {poem.category.name}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <div className="poem-content text-stone-800 mb-12 py-8 border-t border-b border-stone-200">
                {poem.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-200">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-rose-900 text-white sans-text font-medium rounded-lg hover:bg-rose-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                शेयर करें
              </button>
            </div>
          </div>
        </article>

        {relatedPoems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
              आपको यह भी पसंद आ सकती हैं
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPoems.map((relatedPoem) => (
                <RelatedPoemCard
                  key={relatedPoem.id}
                  poem={relatedPoem}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

interface RelatedPoemCardProps {
  poem: PoemWithDetails;
  onNavigate: (path: string) => void;
}

function RelatedPoemCard({ poem, onNavigate }: RelatedPoemCardProps) {
  return (
    <article
      onClick={() => onNavigate(`/poem/${poem.slug}`)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer card-hover"
    >
      <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2 hover:text-rose-900 transition-colors">
        {poem.title}
      </h3>
      <p className="text-sm sans-text text-stone-600 mb-3">{poem.author.name}</p>
      <p className="hindi-text text-stone-700 line-clamp-3 text-sm">
        {poem.excerpt}
      </p>
    </article>
  );
}
