import { X, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WordDetails {
  word: string;
  meaning: string;
  meaning_en: string;
  etymology: string;
  etymology_en: string;
  example?: string;
  example_en?: string;
}

interface WordBottomSheetProps {
  word: string;
  details: WordDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WordBottomSheet({ word, details, isOpen, onClose }: WordBottomSheetProps) {
  const { t, language } = useLanguage();
  const useEnglish = language === 'en';

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden animate-slide-up">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-rose-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold hindi-heading text-stone-900">
                  {word}
                </h3>
                <p className="text-xs sans-text text-stone-500">
                  {useEnglish ? 'Word Details' : 'शब्द विवरण'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {details ? (
              <div className="space-y-6">
                {/* Meaning */}
                <section>
                  <h4 className="text-sm font-semibold sans-text text-stone-600 mb-2 uppercase tracking-wide">
                    {useEnglish ? 'Meaning' : 'अर्थ'}
                  </h4>
                  <p className={`text-lg ${useEnglish ? 'sans-text' : 'hindi-text'} text-stone-800 leading-relaxed`}>
                    {useEnglish ? details.meaning_en : details.meaning}
                  </p>
                </section>

                {/* Etymology */}
                <section>
                  <h4 className="text-sm font-semibold sans-text text-stone-600 mb-2 uppercase tracking-wide">
                    {useEnglish ? 'Etymology' : 'व्युत्पत्ति'}
                  </h4>
                  <p className={`text-base ${useEnglish ? 'sans-text' : 'hindi-text'} text-stone-700 leading-relaxed`}>
                    {useEnglish ? details.etymology_en : details.etymology}
                  </p>
                </section>

                {/* Example */}
                {details.example && (
                  <section>
                    <h4 className="text-sm font-semibold sans-text text-stone-600 mb-2 uppercase tracking-wide">
                      {useEnglish ? 'Example' : 'उदाहरण'}
                    </h4>
                    <p className={`text-base ${useEnglish ? 'sans-text' : 'hindi-text'} text-stone-700 leading-relaxed italic`}>
                      {useEnglish ? (details.example_en || details.example) : details.example}
                    </p>
                  </section>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={`text-lg ${useEnglish ? 'sans-text' : 'hindi-text'} text-stone-600`}>
                  {useEnglish 
                    ? `No details available for "${word}"` 
                    : `"${word}" के लिए कोई विवरण उपलब्ध नहीं है`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

