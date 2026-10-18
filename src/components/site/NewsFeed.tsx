import { useMemo, useState } from 'react';
import { ARTICLES, CATEGORIES, type Article } from '../../data/articles';
import EmbedCard from '../EmbedCard';
import ArticleCard from './ArticleCard';
import Reveal from './Reveal';

interface NewsFeedProps {
  id?: string;
  fixedCategory?: string;
  showStrip?: boolean;
  heading?: boolean;
  items?: Article[];
  limit?: number;
}

function matchesCategory(article: Article, category: string) {
  if (category === 'All') return true;
  return article.category.toLowerCase() === category.toLowerCase();
}

export default function NewsFeed({
  id,
  fixedCategory,
  showStrip = false,
  heading = false,
  items,
  limit,
}: NewsFeedProps) {
  const [active, setActive] = useState(fixedCategory ?? 'All');
  const category = fixedCategory ?? active;

  const feed = useMemo(() => {
    const base = items ?? ARTICLES;
    const filtered = base.filter((a) => matchesCategory(a, category));
    return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
  }, [items, category, limit]);

  return (
    <section id={id} className="scroll-mt-24 bg-background py-14 lg:py-20">
      <div className="page-shell">
        {heading && (
          <Reveal className="mb-8 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">
              {category === 'All' ? 'Today’s briefing' : category}
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-text-primary md:text-[40px]">
              {category === 'All' ? 'Latest stories' : `${category} news`}
            </h2>
          </Reveal>
        )}

        {showStrip && (
          <Reveal className="mb-8 -mx-4 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    category === cat
                      ? 'bg-signal text-v1-black shadow-[0_4px_15px_rgba(255,198,93,0.6)]'
                      : 'border border-[var(--border-strong)] text-text-secondary hover:border-signal hover:text-gold-deep'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {feed.length === 0 ? (
          <Reveal className="rounded-[20px] border border-dashed border-[var(--border-strong)] bg-surface-2 p-12 text-center text-text-muted">
            No stories in this section yet.
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {feed.map((article, i) => (
              <Reveal key={article.id} delay={Math.min(i, 6) * 70} className="h-full">
                {article.embedUrl && article.owner ? (
                  <EmbedCard
                    embedUrl={article.embedUrl}
                    thumbnailUrl={article.image}
                    mediaType={article.mediaType || 'image'}
                    owner={article.owner}
                    engagement={article.engagement || { likes: 0, comments: 0 }}
                    caption={article.excerpt}
                  />
                ) : (
                  <ArticleCard article={article} />
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
