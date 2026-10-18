import CtaButton from '../components/site/CtaButton';

export default function NotFoundPage() {
  return (
    <section className="page-shell flex min-h-[70vh] flex-col items-start justify-center py-32">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">404</span>
      <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
        This page has gone to press.
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary">
        We couldn’t find what you were looking for. The front page is still where the news lives.
      </p>
      <div className="mt-8">
        <CtaButton to="/" variant="dark">
          Back to the front page
        </CtaButton>
      </div>
    </section>
  );
}
