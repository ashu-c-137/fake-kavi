import { useState } from 'react';
import { getAllPoems, getAllCategories, type PoemWithDetails, type Category } from '../data/poems';
import { Calendar, User, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PoemsProps {
  onNavigate: (path: string) => void;
}

export function Poems({ onNavigate }: PoemsProps) {
  const { t, language } = useLanguage();
  const poems = getAllPoems().sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const categories = getAllCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const useRoman = language === 'en';

  const filteredPoems = poems.filter((poem) => {
    const matchesSearch =
      searchTerm === '' ||
      poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.titleRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.contentRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poem.author.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null || poem.category?.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
            {t('poems.title')}
          </h1>
          <p className="text-lg hindi-text text-stone-600">
            {t('poems.subtitle')}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('poems.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 hindi-text"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700 sans-text">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{t('common.filter')}:</span>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg sans-text text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-rose-900 text-white'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {t('common.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg sans-text text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-rose-900 text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {useRoman ? category.name_en : category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredPoems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl hindi-text text-stone-600">{t('poems.noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPoems.map((poem) => (
              <PoemCard key={poem.id} poem={poem} onNavigate={onNavigate} />
            ))}
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
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer card-hover"
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
