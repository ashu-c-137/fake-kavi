import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Mail className="w-16 h-16 text-rose-900 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
            हमसे संपर्क करें
          </h1>
          <p className="text-xl hindi-text text-stone-600">
            अपनी कविता, सुझाव या प्रतिक्रिया साझा करें
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold hindi-heading text-stone-900 mb-4">
              अपनी बात रखें
            </h2>
            <p className="hindi-text text-stone-700 leading-relaxed">
              क्या आपके पास भी कोई "फेक" कविता है? या फिर FakeKavi के बारे में कुछ
              कहना चाहते हैं? हम आपकी बात सुनने के लिए उत्सुक हैं। नीचे दिए फॉर्म
              के माध्यम से हमसे संपर्क करें।
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="hindi-text text-green-800 text-lg font-medium">
                धन्यवाद! आपका संदेश प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block sans-text font-medium text-stone-700 mb-2"
                  >
                    नाम *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 hindi-text"
                    placeholder="आपका नाम"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block sans-text font-medium text-stone-700 mb-2"
                  >
                    ईमेल *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 sans-text"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block sans-text font-medium text-stone-700 mb-2"
                >
                  विषय *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 hindi-text"
                  placeholder="आप किस बारे में लिखना चाहते हैं?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block sans-text font-medium text-stone-700 mb-2"
                >
                  संदेश *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 hindi-text resize-none"
                  placeholder="अपना संदेश यहाँ लिखें..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-rose-900 text-white sans-text font-semibold rounded-lg hover:bg-rose-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                संदेश भेजें
              </button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="text-xl font-semibold hindi-heading text-stone-900 mb-4">
              अपनी कविता सबमिट करें
            </h3>
            <p className="hindi-text text-stone-700 leading-relaxed mb-4">
              अगर आप भी एक "फेक कवि" हैं और अपनी रचनाएँ FakeKavi पर प्रकाशित
              करवाना चाहते हैं, तो ऊपर दिए फॉर्म के माध्यम से अपनी कविता भेजें।
              हम हर सबमिशन को ध्यान से पढ़ते हैं और चुनिंदा कविताओं को साइट पर
              प्रकाशित करते हैं।
            </p>
            <p className="hindi-text text-sm text-stone-600 italic">
              नोट: कृपया अपनी मौलिक रचनाएँ ही भेजें। नकल या साहित्यिक चोरी को
              प्रोत्साहित नहीं किया जाता।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
