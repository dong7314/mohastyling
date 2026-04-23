'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'profile', href: '/about' },
  { name: 'portfolio', href: '/portfolio' },
  { name: 'service', href: '/service' },
  { name: 'studio', href: '/studio' },
  { name: 'all in one', href: '/all-in-one' },
];

export function Header() {
  const pathname = usePathname();

  // Hide header on landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 liquid-glass"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/home"
          className="font-open-sans text-2xl font-semibold tracking-tight text-neutral-900 hover:text-accent transition-colors"
          style={{ letterSpacing: '2px' }}
        >
          Moha Styling
        </Link>
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-accent"
                    : "text-neutral-700 hover:text-accent"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
