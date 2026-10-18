import Hero from '../components/site/Hero';
import FeaturedStory from '../components/site/FeaturedStory';
import NewsFeed from '../components/site/NewsFeed';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStory />
      <NewsFeed id="latest" showStrip heading />
    </>
  );
}
