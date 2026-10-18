import { Link } from 'react-router-dom';
import type { Article } from '../../data/articles';
import { ArrowUpRight, Clock } from './icons';

const urgencyLabel: Record<Article['urgency'], string | null> = {
  breaking: 'Breaking',
  high: 'Trending',
  normal: null,
  low: 'Analysis',
};

export function UrgencyTag({ urgency }: { urgency: Article['urgency'] }) {
  const label = urgencyLabel[urgency];
  if (!label) return null;
  const tone =
    urgency === 'breaking'
      ? 'bg-[var(--breaking)] text-white'
      : urgency === 'high'
        ? 'bg-signal text-v1-black'
        : 'bg-white/90 text-v1-dark';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${tone}`}>
      {label}
    </span>
  );
}

interface ArticleCardProps {
  article: Article;
  size?: 'default' | 'large';
  className?: string;
}

export default function ArticleCard({ article, size = 'default', className = '' }: ArticleCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-line)] bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0,0,.2,1)] hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] ${className}`}
    >
      <Link to={`/article/${article.id}`} className="relative block overflow-hidden" aria-label={article.title}>
        <div className={size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
          <img
            src={article.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0,0,.2,1)] group-hover:scale-[1.06]"
          />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <UrgencyTag urgency={article.urgency} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep dark:text-signal">
          {article.category}
        </div>

        <h3 className="font-headline text-lg font-bold leading-snug tracking-tight text-text-primary">
          <Link to={`/article/${article.id}`} className="transition-colors group-hover:text-gold-deep dark:group-hover:text-signal">
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <Clock size={14} />
            {article.time}
          </span>
          <Link
            to={`/article/${article.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-text-primary transition-colors group-hover:bg-signal group-hover:text-v1-black"
            aria-label={`Read: ${article.title}`}
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
