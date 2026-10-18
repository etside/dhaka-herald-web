import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import SettingsPanel from './components/SettingsPanel';
import AdminPanel from './components/admin/AdminPanel';
import { LayoutProvider } from './contexts/LayoutContext';
import { AuthProvider } from './contexts/AuthContext';
import SiteLayout from './components/site/SiteLayout';
import FloatingActions from './components/site/FloatingActions';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

const ONBOARDING_KEY = 'dh-onboarding-v2';

// SPA redirect handler for GitHub Pages
// 404.html redirects to index.html?/path — we parse that and navigate
function useGitHubPagesRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const search = window.location.search;
    if (search && search.startsWith('?/')) {
      const redirectPath = search
        .slice(1)
        .replace(/~and~/g, '&')
        .replace(/~plus~/g, '+');
      window.history.replaceState({}, '', redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
}

function AppRoutes() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useGitHubPagesRedirect();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ',' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSettings((s) => !s);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPanel onBack={() => navigate('/')} />} />
        <Route path="/panel" element={<AdminPanel onBack={() => navigate('/')} />} />
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="section/:slug" element={<CategoryPage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <FloatingActions onSettings={() => setShowSettings(true)} onAdmin={() => navigate('/admin')} />
      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    try {
      const done = localStorage.getItem(ONBOARDING_KEY);
      if (done) setOnboardingDone(true);
    } catch {}
  }, []);

  const handleSplashDone = () => {
    setShowSplash(false);
    if (!onboardingDone) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingDone = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem(ONBOARDING_KEY, '1');
    } catch {}
    setOnboardingDone(true);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <LayoutProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-text-primary">
              {showSplash ? (
                <SplashScreen onDone={handleSplashDone} />
              ) : showOnboarding ? (
                <Onboarding onDone={handleOnboardingDone} />
              ) : (
                <AppRoutes />
              )}
            </div>
          </BrowserRouter>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
