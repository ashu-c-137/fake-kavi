import { BookOpen, Heart, Feather } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-rose-900 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl hindi-text text-stone-600">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-semibold hindi-heading text-stone-900 mb-4">
              {t('about.whoWeAre')}
            </h2>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed mb-4">
              {t('about.whoWeAreText1')}
            </p>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed">
              {t('about.whoWeAreText2')}
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Feather className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                {t('about.creativity')}
              </h3>
              <p className="hindi-text text-stone-600">
                {t('about.creativityDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                {t('about.emotions')}
              </h3>
              <p className="hindi-text text-stone-600">
                {t('about.emotionsDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                {t('about.literature')}
              </h3>
              <p className="hindi-text text-stone-600">
                {t('about.literatureDesc')}
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl font-semibold hindi-heading text-stone-900 mb-4">
              {t('about.ourMission')}
            </h2>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed mb-4">
              {t('about.missionText1')}
            </p>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed">
              {t('about.missionText2')}
            </p>
          </section>

          <section className="pt-8 border-t border-stone-200">
            <blockquote className="hindi-text text-2xl text-center text-stone-700 italic leading-relaxed whitespace-pre-line">
              "{t('about.quote')}"
            </blockquote>
            <p className="text-center sans-text text-stone-600 mt-4">— FakeKavi</p>
          </section>
        </div>
      </div>
    </div>
  );
}
