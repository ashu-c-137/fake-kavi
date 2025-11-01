import { getAuthorBySlug, getPoemsByAuthor, type Author, type PoemWithDetails } from '../data/poems';
import { User, ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthorProfileProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function AuthorProfile({ slug, onNavigate }: AuthorProfileProps) {
  const { t } = useLanguage();
  const author = getAuthorBySlug(slug);
  const poems = author ? getPoemsByAuthor(author.id).sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  ) : [];

  if (!author) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl hindi-heading text-stone-900 mb-4">{t('authorProfile.notFound')}</h1>
            <button
              onClick={() => onNavigate('/authors')}
              className="text-rose-900 sans-text hover:underline"
            >
              {t('authorProfile.viewAllAuthors')}
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
          {t('authorProfile.backToAuthors')}
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
                {author.bio || ''}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <p className="sans-text text-stone-600">
              <span className="font-semibold">{poems.length}</span> {t('authorProfile.poemsCount')}
            </p>
          </div>
        </div>

        {poems.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
              {t('authorProfile.authorPoems')} {author.name}
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
              {t('authorProfile.noPoems')}
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
  const { language } = useLanguage();
  const useRoman = language === 'en';
  const displayTitle = useRoman ? poem.titleRoman : poem.title;
  const displayExcerpt = useRoman ? poem.excerptRoman : poem.excerpt;
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const locale = language === 'en' ? 'en-US' : 'hi-IN';
    return new Intl.DateTimeFormat(locale, {
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
      <h3 className={`text-2xl font-semibold text-stone-900 mb-3 hover:text-rose-900 transition-colors ${useRoman ? 'sans-text' : 'hindi-heading'}`}>
        {displayTitle}
      </h3>
      <div className="flex items-center gap-2 text-sm text-stone-600 mb-4 sans-text">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(poem.published_at)}</span>
      </div>
      <p className={`text-stone-700 line-clamp-3 ${useRoman ? 'sans-text' : 'hindi-text'}`}>
        {displayExcerpt}
      </p>
      {poem.category && (
        <span className="inline-block mt-4 px-3 py-1 bg-rose-100 text-rose-900 text-xs sans-text font-medium rounded-full">
          {useRoman ? poem.category.name_en : poem.category.name}
        </span>
      )}
    </article>
  );
}
