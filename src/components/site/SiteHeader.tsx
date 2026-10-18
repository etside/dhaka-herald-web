import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../lib/theme';
import { ARTICLES, CATEGORIES } from '../../data/articles';
import {
  Briefcase,
  Close,
  Cpu,
  Gauge,
  Landmark,
  Menu,
  Newspaper,
  Palette,
  Search,
} from './icons';

interface NavItem {
  label: string;
  to: string;
  icon: (props: { size?: number; className?: string }) => JSX.Element;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', icon: Newspaper },
  { label: 'Politics', to: '/section/Politics', icon: Landmark },
  { label: 'Economy', to: '/section/Economy', icon: Gauge },
  { label: 'Tech', to: '/section/Technology', icon: Cpu },
  { label: 'Business', to: '/section/Business', icon: Briefcase },
  { label: 'Culture', to: '/section/Culture', icon: Palette },
];

const NAV_LABELS = new Set(NAV_ITEMS.map((n) => n.label));
const MORE_ITEMS = CATEGORIES.filter((c) => c !== 'All' && !NAV_LABELS.has(c));

function Wordmark({ tone }: { tone: 'light' | 'dark' }) {
  const text = tone === 'light' ? 'text-white' : 'text-ink dark:text-white';
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[12px] bg-signal text-[15px] font-black text-v1-black shadow-[0_2px_10px_rgba(255,198,93,0.6)]">
        DH
      </span>
      <span className={`font-headline text-[19px] font-black leading-none tracking-tight ${text}`}>
        Dhaka&nbsp;Heralds
      </span>
    </span>
  );
}

export default function SiteHeader({ transparentAtTop = false }: { transparentAtTop?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const atTopTransparent = transparentAtTop && !scrolled && location.pathname === '/';
  const overlay = atTopTransparent;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled ? 'true' : 'false'}
        data-solid={overlay ? 'false' : 'true'}
        data-tone={overlay ? 'light' : 'dark'}
      >
        <div className="header-inner">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" aria-label="Dhaka Heralds — home" className="shrink-0 transition-opacity hover:opacity-90">
              <Wordmark tone={overlay ? 'light' : 'dark'} />
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-[16px] px-2 py-2 lg:flex xl:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className="nav-pill"
                >
                  {active && <span className="nav-pill__bg" aria-hidden="true" />}
                  <span className="nav-pill__icon">
                    <Icon
                      size={20}
                      className={`relative ${active ? 'text-gold-deep dark:text-signal' : 'text-ink-muted'}`}
                    />
                  </span>
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-[16px] transition-colors hover:text-gold-deep dark:hover:text-signal ${
                overlay ? 'text-white' : 'text-ink dark:text-white'
              }`}
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`hidden h-[46px] w-[46px] items-center justify-center rounded-[16px] transition-colors hover:text-gold-deep dark:hover:text-signal sm:flex ${
                overlay ? 'text-white' : 'text-ink dark:text-white'
              }`}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <span
              className={`ml-1 hidden items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide md:inline-flex ${
                overlay ? 'bg-white/15 text-white' : 'bg-surface-2 text-ink dark:bg-white/10 dark:text-white'
              }`}
            >
              EN
            </span>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-[16px] transition-colors hover:text-gold-deep lg:hidden ${
                overlay ? 'text-white' : 'text-ink dark:text-white'
              }`}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[var(--border-line)] px-4 pb-4 pt-3 sm:px-6">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search headlines, topics, sections…"
                className="w-full rounded-[16px] border border-[var(--border-strong)] bg-surface-2 py-3 pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-signal"
              />
            </div>
            {query.trim() && (
              <ul className="mt-3 max-h-[50vh] overflow-y-auto rounded-[16px] border border-[var(--border-line)] bg-surface p-2">
                {results.length === 0 && (
                  <li className="px-3 py-3 text-sm text-text-muted">No stories match “{query}”.</li>
                )}
                {results.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery('');
                        navigate(`/article/${a.id}`);
                      }}
                      className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left transition-colors hover:bg-surface-2"
                    >
                      <img src={a.image} alt="" className="h-10 w-10 shrink-0 rounded-[10px] object-cover" loading="lazy" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-text-primary">{a.title}</span>
                        <span className="text-xs text-text-muted">{a.category} · {a.time}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-[var(--border-line)] bg-background p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <Wordmark tone="dark" />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-surface-2 text-text-primary"
              >
                <Close size={20} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-[16px] px-3 py-3 text-base font-semibold ${
                      active ? 'bg-signal text-v1-black' : 'text-text-primary hover:bg-surface-2'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 mb-3 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">More sections</div>
            <div className="flex flex-wrap gap-2">
              {MORE_ITEMS.map((c) => (
                <Link
                  key={c}
                  to={`/section/${c}`}
                  className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-signal hover:text-gold-deep"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
