import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-muted/50 py-10 px-4 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src="/images/logo-placeholder.png" alt="BugNinja Logo" className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 mb-2" />
          <span className="font-bold text-lg">BugNinja</span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <a href="#" className="hover:underline text-muted-foreground">Home</a>
          <a href="#" className="hover:underline text-muted-foreground">Features</a>
          <a href="#" className="hover:underline text-muted-foreground">Pricing</a>
          <a href="#" className="hover:underline text-muted-foreground">Articles</a>
          <a href="#" className="hover:underline text-muted-foreground">FAQ</a>
        </nav>
        {/* Social Media Links */}
        <div className="flex gap-4 items-center">
          <a href="#" aria-label="Twitter" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.11 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.17 3.01 4.09 3.05A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.36 0 12.94-6.93 12.94-12.94 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a9.1 9.1 0 0 1-2.6.71z"></path></svg></a>
          <a href="#" aria-label="GitHub" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z"></path></svg></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-primary transition"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} BugNinja. All rights reserved.</div>
    </footer>
  );
} 