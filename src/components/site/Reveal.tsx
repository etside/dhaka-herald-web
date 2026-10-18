import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** distance in px to rise from; ignored when reduced motion is preferred */
  y?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

function useInView<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 24,
  style,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal-up ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...(inView ? undefined : { transform: `translateY(${y}px)` }), ...style }}
    >
      {children}
    </Tag>
  );
}
