import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: '/', label: t('header.home') },
    { path: '/poems', label: t('header.poems') },
    { path: '/authors', label: t('header.authors') },
    { path: '/about', label: t('header.about') },
    { path: '/contact', label: t('header.contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <BookOpen className="w-8 h-8 text-rose-900 group-hover:text-rose-700 transition-colors" />
            <div className="text-left hidden sm:block">
              <h1 className="text-2xl font-bold hindi-heading text-rose-900 group-hover:text-rose-700 transition-colors">
                FakeKavi
              </h1>
              <p className="text-xs hindi-text text-stone-600 -mt-1">
                {t('header.tagline')}
              </p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6 flex-1 ml-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`sans-text font-medium text-base transition-colors ${
                  isActive(item.path)
                    ? 'text-rose-900 border-b-2 border-rose-900 pb-1'
                    : 'text-stone-700 hover:text-rose-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div>
              <LanguageToggle />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-rose-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg sans-text font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-rose-50 text-rose-900'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
