import { BookOpen, Calendar, User } from 'lucide-react';
import { getFeaturedPoems, getRecentPoems, type PoemWithDetails } from '../data/poems';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t, language } = useLanguage();
  const featuredPoems = getFeaturedPoems().slice(0, 3);
  const recentPoems = getRecentPoems(6);
  const useRoman = language === 'en';

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-rose-50 via-amber-50 to-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-rose-900" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold hindi-heading text-rose-900 mb-6">
              {t('home.title')}
            </h1>
            <p className="text-2xl hindi-text text-stone-700 mb-4">
              {t('home.tagline')}
            </p>
            <p className="text-lg hindi-text text-stone-600 leading-relaxed">
              {t('home.subtitle')}
            </p>
            <button
              onClick={() => onNavigate('/poems')}
              className="mt-8 px-8 py-3 bg-rose-900 text-white sans-text font-semibold rounded-lg hover:bg-rose-800 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('home.readAllPoems')}
            </button>
          </div>
        </div>
      </section>

      {featuredPoems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold hindi-heading text-stone-900 mb-8">
            {t('home.featuredPoems')}
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
          {t('home.recentPoems')}
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
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer card-hover ${
        featured ? 'border-2 border-rose-200' : ''
      }`}
    >
      {poem.featured_image_url && (
        <div className="h-48 overflow-hidden bg-stone-200">
          <img
            src={poem.featured_image_url}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-2xl font-semibold text-stone-900 mb-3 hover:text-rose-900 transition-colors ${useRoman ? 'sans-text' : 'hindi-heading'}`}>
          {displayTitle}
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
        <p className={`text-stone-700 line-clamp-3 ${useRoman ? 'sans-text' : 'hindi-text'}`}>
          {displayExcerpt}
        </p>
        {poem.category && (
          <span className="inline-block mt-4 px-3 py-1 bg-rose-100 text-rose-900 text-xs sans-text font-medium rounded-full">
            {useRoman ? poem.category.name_en : poem.category.name}
          </span>
        )}
      </div>
    </article>
  );
}
