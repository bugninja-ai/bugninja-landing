'use client'

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@bugninja/shared-ui';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Article } from '@/types/blog';

gsap.registerPlugin(ScrollTrigger);

interface ArticlesClientProps {
  articles: Article[];
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only run animation when articles are available
    if (!articles.length) return;
    
    // Filter out null values and ensure we have valid elements
    const validRefs = cardRefs.current.filter(ref => ref !== null);
    if (!validRefs.length) return;
    
    gsap.set(validRefs, { autoAlpha: 0, y: 40 });
    gsap.to(validRefs, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: validRefs[0]?.parentElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, [articles]);

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      {articles.length > 0 ? (
        articles.map((article, idx) => {
          return (
            <div 
              key={article.id}
              ref={el => { cardRefs.current[idx] = el || null; }}
              className={cn(
                "bg-gray-50 rounded-2xl p-6 flex-1 flex flex-col items-start border border-gray-100",
                "transition-all duration-200 ease-out hover:border-dashed hover:border-border hover:border-gray-300"
              )}
            >
              <h3 className="display-font text-xl font-semibold mb-3 leading-tight">{article.attributes.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">{article.attributes.summary}</p>
              <Button size="default" className="mt-auto" asChild>
                <Link href={`/blog/${article.attributes.slug}`}>
                  Read more →
                </Link>
              </Button>
            </div>
          );
        })
      ) : (
        // No articles fallback
        <div className="text-center text-muted-foreground">
          No articles available at the moment.
        </div>
      )}
    </div>
  );
} 