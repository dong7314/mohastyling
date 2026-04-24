"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "profile", href: "/profile" },
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
  { name: "service", href: "/service" },
  { name: "studio", href: "/studio" },
  { name: "all in one", href: "/all-in-one" },
];

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hide header on landing page
  if (pathname === "/") {
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
          style={{ letterSpacing: "1px" }}
        >
          Moha Styling
        </Link>
        <ul className="flex gap-6">
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
      </nav>
    </motion.header>
  );
}
