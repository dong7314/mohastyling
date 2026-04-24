'use client';

import { FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h3 className="font-open-sans text-2xl font-semibold tracking-tight text-white mb-4" style={{ letterSpacing: '1px' }}>
              Moha Styling
            </h3>
            <p className="text-neutral-400 text-sm">
              서울 동대문구 전농로 195 2층
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              Phone: 0507-1375-2919
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              Email: stylist_sujeong@naver.com
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              Business Number: 884-76-00494
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
              href="mailto:stylist_sujeong@naver.com"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div className="mt-8 relative">
          <p className="text-neutral-600 text-xs text-center">
            &copy; {new Date().getFullYear()} Moha Styling. All rights reserved.
          </p>
          {/* Hidden admin login */}
          <Link
            href="/admin/login"
            className="absolute bottom-0 left-6 px-2 py-15 rounded-full border border-neutral-700 text-neutral-600 text-[11px] hover:border-neutral-500 hover:text-neutral-500 hover:bg-neutral-800/30 transition-all"
            aria-label="Admin Login"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
