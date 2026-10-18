import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} gap-3 ${className}`.trim()}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline text-3xl font-bold tracking-tight text-ink dark:text-white md:text-[40px] md:leading-[1.1] lg:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className={`max-w-[46rem] text-base leading-relaxed text-text-secondary ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
