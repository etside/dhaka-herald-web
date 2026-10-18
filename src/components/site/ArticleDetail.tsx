import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ARTICLES, type Article } from '../../data/articles';
import ArticleCard from './ArticleCard';
import Reveal from './Reveal';
import { ChevronLeft, Clock } from './icons';

function buildBody(article: Article): string[] {
  const { category } = article;
  return [
    `The development has been closely watched across ${category.toLowerCase()} circles in Dhaka, where officials, analysts and residents alike have weighed in on what it means for the months ahead. Several people familiar with the matter described the move as significant but long anticipated.`,
    `"This is the kind of moment that resets expectations," one observer said, asking not to be identified before a formal announcement. "What matters now is execution — and whether the promises hold up once the cameras leave."`,
    `Supporters of the decision point to early indicators of progress, while critics caution that the full picture will only emerge over time. Both sides agree the next few weeks will be decisive.`,
    `Dhaka Heralds will continue to follow the story as it develops. This report draws on interviews, public records and reporting from our correspondents in Dhaka and beyond.`,
  ];
}

function ReadingProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-1 origin-left"
      style={{ scaleX: reduced ? scrollYProgress : scaleX, background: 'var(--signal)' }}
    />
  );
}

export default function ArticleDetail({ article }: { article: Article }) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category && !a.embedUrl).slice(0, 3);
  const fallbackRelated = ARTICLES.filter((a) => a.id !== article.id && !a.embedUrl).slice(0, 3);
  const more = related.length ? related : fallbackRelated;

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article ref={bodyRef as React.RefObject<HTMLElement>} className="bg-background">
      <ReadingProgress targetRef={bodyRef} />

      <header className="page-shell pt-28 lg:pt-36">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-gold-deep dark:hover:text-signal"
        >
          <ChevronLeft size={18} />
          Back to all news
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">
              {article.category}
              <span className="h-1 w-1 rounded-full bg-signal" />
              <span className="inline-flex items-center gap-1.5 font-medium tracking-normal text-text-muted normal-case">
                <Clock size={14} />
                {article.time}
              </span>
            </div>

            <h1 className="mt-5 font-headline text-[32px] font-black leading-[1.08] tracking-tight text-text-primary sm:text-[44px] lg:text-[54px]">
              {article.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">{article.excerpt}</p>

            <div className="mt-8 flex items-center justify-between border-y border-[var(--border-line)] py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal text-sm font-black text-v1-black">
                  DH
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-text-primary">Dhaka Heralds Desk</div>
                  <div className="text-text-muted">Correspondent · Dhaka</div>
                </div>
              </div>
              <button
                type="button"
                onClick={share}
                className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-signal hover:text-gold-deep"
              >
                {copied ? 'Link copied' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="page-shell mt-10">
        <Reveal className="overflow-hidden rounded-[24px] border border-[var(--border-line)]">
          <img src={article.image} alt="" className="max-h-[70vh] w-full object-cover" />
        </Reveal>
      </div>

      <div className="page-shell mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
        <div className="max-w-2xl">
          {buildBody(article).map((paragraph, i) => (
            <Reveal key={i} delay={i * 40} y={16}>
              <p className={`mb-6 leading-[1.8] text-text-secondary ${i === 0 ? 'text-lg font-medium text-text-primary' : 'text-base'}`}>
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[20px] border border-[var(--border-line)] bg-surface-2 p-6">
            <h2 className="font-headline text-lg font-bold text-text-primary">More from {article.category}</h2>
            <div className="mt-4 flex flex-col divide-y divide-[var(--border-line)]">
              {more.map((a) => (
                <Link key={a.id} to={`/article/${a.id}`} className="group flex gap-3 py-3 first:pt-0 last:pb-0">
                  <img src={a.image} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-[12px] object-cover" />
                  <span className="text-sm font-semibold leading-snug text-text-primary transition-colors group-hover:text-gold-deep dark:group-hover:text-signal">
                    {a.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="page-shell py-16 lg:py-24">
        <h2 className="mb-8 font-headline text-2xl font-bold tracking-tight text-text-primary md:text-[32px]">Keep reading</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a, i) => (
            <Reveal key={a.id} delay={i * 70} className="h-full">
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
