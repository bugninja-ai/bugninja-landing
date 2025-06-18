import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-muted/50 py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/bugninja.svg"
              alt="Bugninja Logo"
              width={110}
              height={28}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 flex justify-center md:justify-start">
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
            <a href="#" className="hover:underline text-muted-foreground text-center lg:text-left">Home</a>
            <a href="#" className="hover:underline text-muted-foreground text-center lg:text-left">Features</a>
            <a href="#" className="hover:underline text-muted-foreground text-center lg:text-left">Pricing</a>
            <a href="#" className="hover:underline text-muted-foreground text-center lg:text-left">Articles</a>
            <a href="#" className="hover:underline text-muted-foreground text-center lg:text-left">FAQ</a>
          </nav>
        </div>
        {/* Social Media Links */}
        <div className="flex gap-4 items-center">
          <a href="#" aria-label="LinkedIn" className="hover:text-primary transition">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-primary transition">
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="text-left text-xs text-muted-foreground mt-8 w-full container mx-auto">
        © {new Date().getFullYear()} Bugninja. All rights reserved. 
        <span className="mx-2">•</span>
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <span className="mx-2">•</span>
        <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
      </div>
    </footer>
  );
} 