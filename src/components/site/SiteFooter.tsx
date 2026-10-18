import { useState } from 'react';
import { Link } from 'react-router-dom';

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Sections',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Politics', to: '/section/Politics' },
      { label: 'World', to: '/section/World' },
      { label: 'Business', to: '/section/Business' },
      { label: 'Technology', to: '/section/Technology' },
      { label: 'Opinion', to: '/section/Opinion' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Economy', to: '/section/Economy' },
      { label: 'Sports', to: '/section/Sports' },
      { label: 'Culture', to: '/section/Culture' },
      { label: 'Environment', to: '/section/Environment' },
      { label: 'Health', to: '/section/Health' },
      { label: 'Education', to: '/section/Education' },
    ],
  },
  {
    title: 'The Desk',
    links: [
      { label: 'About Us', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Advertise', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms of Use', to: '/' },
    ],
  },
];

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-v1-dark bg-v1-black text-white">
      <div className="mx-auto w-full max-w-[1512px] px-6 py-16 sm:px-10 lg:px-28 lg:py-[70px] xl:px-[173px]">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
          <div className="flex w-full max-w-md flex-col items-start gap-6">
            <Link to="/" aria-label="Dhaka Heralds — home" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-v1-gold text-base font-black text-v1-black">
                DH
              </span>
              <span className="font-headline text-2xl font-black tracking-tight text-v1-gold">Dhaka Heralds</span>
            </Link>

            <p className="text-sm leading-relaxed text-white/50">
              Breaking news and in-depth reporting from Bangladesh — every morning, in full frame.
            </p>

            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <label htmlFor="footer-email" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                The morning briefing
              </label>
              <div className="flex items-center gap-2 rounded-[16px] border border-white/10 bg-white/5 p-1.5 pl-4 backdrop-blur">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-v1-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-v1-black transition-transform hover:scale-[1.03]"
                >
                  {done ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              {done && <p className="mt-2 text-xs text-v1-gold">Thanks — you’re on the list.</p>}
            </form>

            <ul aria-label="Social media" className="flex items-center gap-4">
              {['X', 'Facebook', 'Instagram', 'YouTube'].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm font-semibold text-white/50 transition-colors hover:text-v1-gold"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="flex w-full flex-col gap-10 sm:flex-row sm:gap-16 xl:w-auto xl:justify-end xl:gap-20">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{col.title}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="whitespace-nowrap text-base text-white/60 transition-colors hover:text-v1-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dhaka Heralds. All rights reserved.</p>
          <p className="text-white/30">Made in Dhaka · Bengali-first newsroom</p>
        </div>
      </div>
    </footer>
  );
}
