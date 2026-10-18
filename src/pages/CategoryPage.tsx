import { Link, useParams } from 'react-router-dom';
import { ARTICLES, CATEGORIES } from '../data/articles';
import NewsFeed from '../components/site/NewsFeed';
import Reveal from '../components/site/Reveal';
import { ChevronLeft } from '../components/site/icons';

function resolveCategory(slug?: string) {
  if (!slug) return 'All';
  const all = Array.from(new Set([...CATEGORIES, ...ARTICLES.map((a) => a.category)]));
  return all.find((c) => c.toLowerCase() === slug.toLowerCase()) ?? slug;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const category = resolveCategory(slug);
  const count = ARTICLES.filter((a) => a.category.toLowerCase() === category.toLowerCase()).length;

  return (
    <>
      <header className="bg-background pb-4 pt-28 lg:pt-36">
        <div className="page-shell">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-gold-deep dark:hover:text-signal"
          >
            <ChevronLeft size={18} />
            Back to all news
          </Link>

          <Reveal className="mt-8 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">
              Section
            </span>
            <h1 className="font-headline text-4xl font-black tracking-tight text-text-primary sm:text-5xl lg:text-[56px]">
              {category}
            </h1>
            <p className="text-text-secondary">
              {count} {count === 1 ? 'story' : 'stories'} in this section, updated through the day.
            </p>
          </Reveal>

          <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to={c === 'All' ? '/' : `/section/${c}`}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    category === c
                      ? 'bg-signal text-v1-black shadow-[0_4px_15px_rgba(255,198,93,0.6)]'
                      : 'border border-[var(--border-strong)] text-text-secondary hover:border-signal hover:text-gold-deep'
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <NewsFeed heading={false} fixedCategory={category} />

      {count === 0 && (
        <div className="page-shell pb-20">
          <Reveal className="rounded-[20px] border border-dashed border-[var(--border-strong)] bg-surface-2 p-12 text-center text-text-muted">
            Nothing filed under {category} yet — try another section.
          </Reveal>
        </div>
      )}
    </>
  );
}
