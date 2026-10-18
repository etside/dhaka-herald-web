import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from './icons';

type Variant = 'signal' | 'dark' | 'ghost';

interface CtaButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}

const variantClass: Record<Variant, string> = {
  signal: 'btn-capsule btn-signal',
  dark: 'btn-capsule btn-dark',
  ghost: 'btn-capsule btn-ghost',
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="whitespace-nowrap px-1 text-sm font-semibold md:text-base">{children}</span>
      <span aria-hidden="true" className="btn-capsule__well">
        <span className="btn-capsule__arrow btn-capsule__arrow--a">
          <ArrowRight size={26} className="text-current" />
        </span>
        <span className="btn-capsule__arrow btn-capsule__arrow--b">
          <ArrowRight size={26} className="text-current" />
        </span>
      </span>
    </>
  );
}

export default function CtaButton({
  children,
  to,
  href,
  onClick,
  variant = 'dark',
  className = '',
  ariaLabel,
}: CtaButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();
  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        <Inner>{children}</Inner>
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        <Inner>{children}</Inner>
      </a>
    );
  }
  return (
    <button type="button" className={classes} aria-label={ariaLabel} onClick={onClick}>
      <Inner>{children}</Inner>
    </button>
  );
}
