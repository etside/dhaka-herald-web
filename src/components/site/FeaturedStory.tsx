import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ARTICLES, type Article } from '../../data/articles';
import SectionHeading from './SectionHeading';
import { ArrowRight } from './icons';

const chapters: Article[] = ARTICLES.filter((a) => !a.embedUrl).slice(0, 4);

function ChapterDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex flex-col items-center gap-3" role="tablist" aria-label="Chapters">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`chapter-dot ${i === active ? 'is-active' : ''}`} role="tab" aria-selected={i === active} aria-label={`Chapter ${i + 1}`} />
      ))}
    </div>
  );
}

function StickyVisual({ active, progress }: { active: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const y = useTransform(progress, [0, 1], ['-5%', '5%']);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="sticky top-28">
      <div className="relative h-[68vh] overflow-hidden rounded-[24px] border border-[var(--border-line)] bg-v1-black">
        {chapters.map((c, i) => (
          <motion.img
            key={c.id}
            src={c.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-[110%] w-full object-cover"
            style={{ y }}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            Chapter {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
          </span>
          <ChapterDots count={chapters.length} active={active} />
        </div>
      </div>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-3">
        <motion.div className="h-full origin-left rounded-full bg-signal" style={{ scaleX }} />
      </div>
    </div>
  );
}

function Chapter({ article, index }: { article: Article; index: number }) {
  return (
    <div data-index={index} className="flex min-h-[78vh] items-center">
      <div className="w-full rounded-[24px] border border-[var(--border-line)] bg-surface p-6 sm:p-8">
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[16px] lg:hidden">
          <img src={article.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          {article.category}
          <span className="text-text-muted">· {article.time}</span>
        </div>
        <h3 className="mt-4 font-headline text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-[32px]">
          {article.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{article.excerpt}</p>
        <Link
          to={`/article/${article.id}`}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-text-primary transition-colors hover:text-gold-deep dark:hover:text-signal"
        >
          Read the full story
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedStory() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    if (reduced) return;
    const nodes = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section id="featured" className="scroll-mt-24 bg-background py-16 lg:py-24">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Featured"
          title="The stories shaping Bangladesh"
          description="A scrolling dispatch — four stories we can't stop thinking about, told top to bottom."
        />
      </div>

      <div ref={trackRef} className="page-shell mt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {!reduced && (
            <div className="hidden lg:block">
              <StickyVisual active={active} progress={scrollYProgress} />
            </div>
          )}

          <div>
            {chapters.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
              >
                <Chapter article={c} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
