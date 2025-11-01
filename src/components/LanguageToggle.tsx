import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 sans-text font-medium transition-colors"
      aria-label="Toggle language"
      title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm">{language === 'hi' ? 'EN' : 'हिं'}</span>
    </button>
  );
}

