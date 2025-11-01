import { useEffect } from 'react';
import { useRouter, parseRoute } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Poems } from './pages/Poems';
import { SinglePoem } from './pages/SinglePoem';
import { Authors } from './pages/Authors';
import { AuthorProfile } from './pages/AuthorProfile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  const { route, navigate } = useRouter();
  const { path, params } = parseRoute(route);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  function renderPage() {
    switch (path) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/poems':
        return <Poems onNavigate={navigate} />;
      case '/poem':
        return <SinglePoem slug={params.slug} onNavigate={navigate} />;
      case '/authors':
        return <Authors onNavigate={navigate} />;
      case '/author':
        return <AuthorProfile slug={params.slug} onNavigate={navigate} />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      default:
        return <Home onNavigate={navigate} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath={path} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
