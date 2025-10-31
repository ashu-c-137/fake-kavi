import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Author } from '../lib/database.types';
import { User } from 'lucide-react';

interface AuthorsProps {
  onNavigate: (path: string) => void;
}

export function Authors({ onNavigate }: AuthorsProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthors();
  }, []);

  async function loadAuthors() {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');

      if (error) throw error;
      setAuthors(data);
    } catch (error) {
      console.error('Error loading authors:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-900 sans-text text-lg">लोड हो रहा है...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold hindi-heading text-stone-900 mb-4">
            हमारे कवि
          </h1>
          <p className="text-lg hindi-text text-stone-600">
            वे लोग जो झूठ को इतनी खूबसूरती से लिखते हैं कि सच लगने लगता है
          </p>
        </div>

        {authors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl hindi-text text-stone-600">अभी कोई कवि नहीं हैं</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface AuthorCardProps {
  author: Author;
  onNavigate: (path: string) => void;
}

function AuthorCard({ author, onNavigate }: AuthorCardProps) {
  return (
    <article
      onClick={() => onNavigate(`/author/${author.slug}`)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer card-hover"
    >
      <div className="flex items-start gap-4 mb-4">
        {author.avatar_url ? (
          <img
            src={author.avatar_url}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
            <User className="w-8 h-8 text-rose-900" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold hindi-heading text-stone-900 hover:text-rose-900 transition-colors">
            {author.name}
          </h3>
        </div>
      </div>
      <p className="hindi-text text-stone-700 line-clamp-4">
        {author.bio || 'कोई परिचय उपलब्ध नहीं है।'}
      </p>
    </article>
  );
}
