'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Common/Header/Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideHeaderPaths = ['/sign-in', '/admin', '/teacher', '/student'];
  const showHeader = !hideHeaderPaths.some(path => pathname?.startsWith(path));

  // Determine background class based on pathname
  const getBackgroundClass = () => {
    if (pathname === '/') return 'bg-home';
    if (pathname.startsWith('/about')) return 'bg-about';
    if (pathname.startsWith('/academics')) return 'bg-academics';
    if (pathname.startsWith('/land_students')) return 'bg-land_students';
    if (pathname.startsWith('/faculty')) return 'bg-faculty';
    if (pathname.startsWith('/innovation_initiatives')) return 'bg-innovation_initiatives';
    return 'bg-default';
  };

  return (
    <div className={`${getBackgroundClass()} min-h-screen`}>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
