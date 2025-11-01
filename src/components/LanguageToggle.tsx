import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 hover:border-rose-400 text-rose-900 sans-text font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
      aria-label={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
      title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <Globe className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      <span className="text-sm font-bold tracking-wide">
        {language === 'hi' ? 'EN' : 'हि'}
      </span>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-rose-900 text-white text-xs sans-text px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {language === 'hi' ? 'English' : 'हिंदी'}
      </span>
    </button>
  );
}

