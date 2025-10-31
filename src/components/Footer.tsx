import { BookOpen, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-rose-400" />
              <h3 className="text-xl font-bold hindi-heading text-white">FakeKavi</h3>
            </div>
            <p className="hindi-text text-sm leading-relaxed">
              कविता जो सच्ची नहीं, पर लगती है सच्ची।
              जहाँ शब्द झूठ बोलते हैं, और भावना सच्ची होती है।
            </p>
          </div>

          <div>
            <h4 className="font-semibold sans-text text-white mb-4">पृष्ठ</h4>
            <ul className="space-y-2 sans-text text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="link-hover"
                >
                  होम
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/poems')}
                  className="link-hover"
                >
                  कविताएँ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/authors')}
                  className="link-hover"
                >
                  कवि
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="link-hover"
                >
                  परिचय
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold sans-text text-white mb-4">संपर्क</h4>
            <button
              onClick={() => onNavigate('/contact')}
              className="flex items-center gap-2 text-sm sans-text link-hover"
            >
              <Mail className="w-4 h-4" />
              हमसे संपर्क करें
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center">
          <p className="text-sm sans-text text-stone-400">
            © 2025 FakeKavi.com | सर्वाधिकार सुरक्षित
          </p>
        </div>
      </div>
    </footer>
  );
}
