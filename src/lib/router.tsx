import { useState, useEffect } from 'react';

export function useRouter() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { route, navigate };
}

export function parseRoute(route: string): { path: string; params: Record<string, string> } {
  const [path, ...segments] = route.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  if (segments.length > 0) {
    params.slug = segments[0];
  }

  return { path: path ? `/${path}` : '/', params };
}
