import React from 'react';

export function BentoGrid() {
  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-white border-opacity-[0.05]">
      <h2 className="text-3xl font-bold text-center mb-12">Explore BugNinja in a whole new way.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column (vertical stack) */}
        <div className="flex flex-col gap-4 md:row-span-2 bg-muted/50 rounded-2xl p-6 justify-center">
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Image</span>
          </div>
          <div className="font-semibold">Intelligent Test Reports</div>
          <div className="text-sm text-muted-foreground text-center">Get detailed insights with screenshots, error logs, and actionable recommendations that help you fix issues faster than ever.</div>
        </div>

        {/* Middle column (top) */}
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Image</span>
          </div>
          <div className="font-semibold">Automated test case generation</div>
          <div className="text-sm text-muted-foreground text-center">Create smart test cases for your webapp automatically, finding bugs and edge cases that humans usually miss.</div>
        </div>

        {/* Right column (top) */}
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Image</span>
          </div>
          <div className="font-semibold">Fully automatic AI navigation</div>
          <div className="text-sm text-muted-foreground text-center">Bugninja explores your website like a real user, automatically discovering all pages, forms, and interactive elements without any setup.</div>
        </div>

        {/* Middle column (bottom) */}
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Image</span>
          </div>
          <div className="font-semibold">Complete E2E Testing</div>
          <div className="text-sm text-muted-foreground text-center">Test entire user workflows from login to checkout automatically, ensuring critical business processes work flawlessly every time.</div>
        </div>

        {/* Right column (bottom) */}
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-muted-foreground">Image</span>
          </div>
          <div className="font-semibold">Find edge cases</div>
          <div className="text-sm text-muted-foreground text-center">Bugninja can find the most annoying edge-cases that your users would see but never happen in a development environment.</div>
        </div>
      </div>
    </section>
  );
} 