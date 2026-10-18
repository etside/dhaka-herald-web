import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import ArticleDetail from '../components/site/ArticleDetail';
import CtaButton from '../components/site/CtaButton';

export default function ArticlePage() {
  const { id } = useParams();
  const article = ARTICLES.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <section className="page-shell flex min-h-[70vh] flex-col items-start justify-center py-32">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep dark:text-signal">404</span>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
          That story has moved.
        </h1>
        <p className="mt-4 max-w-xl text-text-secondary">
          The article you were looking for is no longer at this address. Head back to the front page.
        </p>
        <div className="mt-8">
          <CtaButton to="/" variant="dark">
            Back to the front page
          </CtaButton>
        </div>
        <Link to="/" className="mt-6 text-sm font-semibold text-text-muted hover:text-gold-deep">
          Or browse the latest stories
        </Link>
      </section>
    );
  }

  return <ArticleDetail article={article} />;
}
