"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "portfolio",
    href: "/portfolio",
    hasDropdown: true,
    children: [
      { name: "Food", href: "/portfolio/food" },
      { name: "Product", href: "/portfolio/product" },
      { name: "Cosmetics", href: "/portfolio/cosmetics" },
      { name: "Life Style", href: "/portfolio/lifestyle" },
      { name: "Movie", href: "/portfolio/movie" },
    ],
  },
  { name: "profile", href: "/profile" },
  { name: "service", href: "/service" },
  { name: "studio", href: "/studio" },
  { name: "all in one", href: "/all-in-one" },
];

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Hide header on landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 liquid-glass"
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/portfolio"
          className="shrink-0 font-open-sans text-2xl font-semibold tracking-tight text-neutral-900 hover:text-accent transition-colors"
          style={{ letterSpacing: "1px" }}
        >
          Moha Styling
        </Link>
        <ul className="hidden min-[760px]:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors inline-block",
                      pathname?.startsWith("/portfolio")
                        ? "text-accent"
                        : "text-neutral-700 hover:text-accent",
                    )}
                  >
                    {item.name}
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden"
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2.5 text-xs transition-colors",
                              pathname === child.href
                                ? "bg-neutral-50 text-accent font-medium"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-accent",
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-accent"
                      : "text-neutral-700 hover:text-accent",
                  )}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-[760px]:hidden inline-flex size-8 shrink-0 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-white/60 hover:text-accent"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          title={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="min-[760px]:hidden border-t border-white/50 bg-white/90 backdrop-blur-xl shadow-lg"
          >
            <div className="mx-auto w-full max-w-[1400px] px-4 py-3 sm:px-6">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isPortfolio = item.href === "/portfolio";
                  const active = isPortfolio
                    ? pathname?.startsWith("/portfolio")
                    : pathname === item.href;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-neutral-100 text-accent"
                            : "text-neutral-800 hover:bg-neutral-100 hover:text-accent",
                        )}
                      >
                        {item.name}
                      </Link>

                      {item.children && (
                        <div className="grid grid-cols-2 gap-1 px-3 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "rounded-md px-3 py-2 text-xs transition-colors",
                                pathname === child.href
                                  ? "bg-neutral-50 text-accent font-medium"
                                  : "text-neutral-600 hover:bg-neutral-50 hover:text-accent",
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
