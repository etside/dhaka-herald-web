import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout() {
  const location = useLocation();
  const transparentAtTop = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <SiteHeader transparentAtTop={transparentAtTop} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
