import { getPoemBySlug, getRelatedPoems, type PoemWithDetails } from '../data/poems';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ClickablePoemContent } from '../components/ClickablePoemContent';

interface SinglePoemProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function SinglePoem({ slug, onNavigate }: SinglePoemProps) {
  const { t, language } = useLanguage();
  const poem = getPoemBySlug(slug);
  const relatedPoems = poem ? getRelatedPoems(poem.id, 3) : [];
  
  // Use language to determine script: 'hi' = Devanagari, 'en' = Roman
  const useRoman = language === 'en';
  const displayContent = useRoman ? poem?.contentRoman : poem?.content || '';
  const displayExcerpt = useRoman ? poem?.excerptRoman : poem?.excerpt || '';
  const displayTitle = useRoman ? poem?.titleRoman : poem?.title || '';

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const locale = language === 'en' ? 'en-US' : 'hi-IN';
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: poem ? displayTitle : '',
        text: displayExcerpt,
        url: window.location.href,
      });
    }
  }

  if (!poem) {
    return (
        <div className="min-h-screen py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl hindi-heading text-stone-900 mb-4">{t('singlePoem.notFound')}</h1>
              <button
                onClick={() => onNavigate('/poems')}
                className="text-rose-900 sans-text hover:underline"
              >
                {t('singlePoem.viewAllPoems')}
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
          {t('singlePoem.backToPoems')}
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {poem.featured_image_url && (
            <div className="h-64 md:h-96 overflow-hidden bg-stone-200">
              <img
                src={poem.featured_image_url}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className={`text-4xl md:text-5xl font-bold text-stone-900 mb-6 ${useRoman ? 'sans-text' : 'hindi-heading'}`}>
                {displayTitle}
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
                    {useRoman ? poem.category.name_en : poem.category.name}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className={`poem-content text-stone-800 mb-12 py-8 border-t border-b border-stone-200 ${useRoman ? 'sans-text' : 'hindi-text'}`}>
                <ClickablePoemContent content={displayContent} isRoman={useRoman} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-200">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-rose-900 text-white sans-text font-medium rounded-lg hover:bg-rose-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {t('common.share')}
              </button>
            </div>
          </div>
        </article>

        {relatedPoems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
              {t('singlePoem.relatedPoems')}
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
  const { language } = useLanguage();
  const useRoman = language === 'en';
  const displayTitle = useRoman ? poem.titleRoman : poem.title;
  const displayExcerpt = useRoman ? poem.excerptRoman : poem.excerpt;
  
  return (
    <article
      onClick={() => onNavigate(`/poem/${poem.slug}`)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer card-hover"
    >
      <h3 className={`text-xl font-semibold text-stone-900 mb-2 hover:text-rose-900 transition-colors ${useRoman ? 'sans-text' : 'hindi-heading'}`}>
        {displayTitle}
      </h3>
      <p className="text-sm sans-text text-stone-600 mb-3">{poem.author.name}</p>
      <p className={`text-stone-700 line-clamp-3 text-sm ${useRoman ? 'sans-text' : 'hindi-text'}`}>
        {displayExcerpt}
      </p>
    </article>
  );
}
