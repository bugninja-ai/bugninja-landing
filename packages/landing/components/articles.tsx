"use client";
import React, { useRef, useEffect, useState } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { SecondaryButton } from './secondary-button';
import Link from 'next/link';
import { cn } from '@bugninja/shared-ui';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getArticles, getStrapiImageUrl } from '@/utils/strapi';
import type { Article } from '@/types/blog';
gsap.registerPlugin(ScrollTrigger);

export function Articles() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticlesData() {
      try {
        const response = await getArticles(1, 3);
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        // Fallback to empty array if fetch fails
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticlesData();
  }, []);

  useEffect(() => {
    // Only run animation when articles are loaded
    if (loading || !articles.length) return;
    
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
  }, [loading, articles]);

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed scroll-mt-32" id="blog">
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Read about automated testing</h2>
        </H2Wrapper>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, idx) => (
            <div 
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 flex-1 flex flex-col items-start border border-gray-100 animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
              <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
              <div className="h-4 bg-gray-300 rounded mb-4 w-2/3" />
              <div className="h-4 bg-gray-300 rounded w-20 mt-auto" />
            </div>
          ))
        ) : articles.length > 0 ? (
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
      <div className="flex justify-center mt-10">
        <SecondaryButton href="/blog">
          Show more
        </SecondaryButton>
      </div>
    </section>
  );
} 