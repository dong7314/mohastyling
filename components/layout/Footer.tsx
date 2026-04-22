'use client';

import { FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl mb-4">Moha Styling</h3>
            <p className="text-neutral-400 text-sm">
              서울 동대문구 전농로 195 2층
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              0507-1375-2919
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/mohastyling"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="mailto:contact@mohastyling.com"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        {/* Hidden admin login */}
        <Link
          href="/admin/login"
          className="block mt-12 text-center text-neutral-700 text-xs hover:text-neutral-500 transition-colors"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
