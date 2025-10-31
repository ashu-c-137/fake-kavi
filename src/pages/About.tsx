import { BookOpen, Heart, Feather } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-rose-900 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
            FakeKavi के बारे में
          </h1>
          <p className="text-xl hindi-text text-stone-600">
            जहाँ झूठ और सच का फर्क मिट जाता है
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-semibold hindi-heading text-stone-900 mb-4">
              हम कौन हैं?
            </h2>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed mb-4">
              FakeKavi एक डिजिटल घर है उन कविताओं का जो सच्ची नहीं हैं, पर सच लगती हैं।
              यहाँ हर शब्द एक अतिशयोक्ति है, हर भावना एक कल्पना, और हर पंक्ति एक
              व्यंग्य। लेकिन इसी झूठ में छुपी है जिंदगी की असली सच्चाई।
            </p>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed">
              हम मानते हैं कि कविता सिर्फ भावनाओं का इज़हार नहीं, बल्कि जिंदगी को एक
              नए नज़रिये से देखने का माध्यम भी है। FakeKavi पर आपको मिलेंगी ऐसी
              रचनाएँ जो आपको हँसाएँगी, रुलाएँगी, सोचने पर मजबूर करेंगी, और कभी-कभी
              हैरान भी।
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Feather className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                रचनात्मकता
              </h3>
              <p className="hindi-text text-stone-600">
                हर कविता एक नया प्रयोग
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                भावनाएँ
              </h3>
              <p className="hindi-text text-stone-600">
                झूठ में भी सच्ची अनुभूति
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-rose-900" />
              </div>
              <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-2">
                साहित्य
              </h3>
              <p className="hindi-text text-stone-600">
                परंपरा से परे, नए आयाम
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl font-semibold hindi-heading text-stone-900 mb-4">
              हमारा उद्देश्य
            </h2>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed mb-4">
              FakeKavi का उद्देश्य है हिंदी साहित्य को एक नया आयाम देना। हम चाहते हैं
              कि कविता को गंभीरता के बोझ से मुक्त करके, उसे हर किसी के लिए सुलभ और
              मनोरंजक बनाया जाए।
            </p>
            <p className="hindi-text text-lg text-stone-700 leading-relaxed">
              यहाँ आपको मिलेंगे ऐसे प्रयोग जो शायद पारंपरिक साहित्य में स्वीकार्य
              नहीं होंगे, लेकिन जो आधुनिक जीवन की विडंबनाओं को बेहतरीन तरीके से
              व्यक्त करते हैं।
            </p>
          </section>

          <section className="pt-8 border-t border-stone-200">
            <blockquote className="hindi-text text-2xl text-center text-stone-700 italic leading-relaxed">
              "सच्ची कविता वो नहीं जो सच बयान करे,<br />
              बल्कि वो है जो झूठ को इतना खूबसूरत बना दे<br />
              कि सच लगने लगे।"
            </blockquote>
            <p className="text-center sans-text text-stone-600 mt-4">— FakeKavi</p>
          </section>
        </div>
      </div>
    </div>
  );
}
