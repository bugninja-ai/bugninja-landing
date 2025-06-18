"use client";
import React, { useRef, useEffect, useState } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { SecondaryButton } from './secondary-button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@bugninja/shared-ui';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getArticles, getStrapiImageUrl } from '@/utils/strapi';
import type { Article } from '@/types/blog';
gsap.registerPlugin(ScrollTrigger);

export function Articles() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
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
              className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col items-start border border-gray-100 animate-pulse"
            >
              <div className="w-full aspect-square mb-4 rounded-lg bg-gray-300" />
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
              <div className="h-4 bg-gray-300 rounded mb-1 w-full" />
              <div className="h-4 bg-gray-300 rounded mb-4 w-2/3" />
              <div className="h-4 bg-gray-300 rounded w-20 mt-auto" />
            </div>
          ))
        ) : articles.length > 0 ? (
          articles.map((article, idx) => {
            const imageUrl = article.attributes.featuredImage?.data?.attributes?.url 
              ? getStrapiImageUrl(article.attributes.featuredImage.data.attributes.url)
              : '/feature1.png'; // fallback image
            
            return (
              <Link 
                key={article.id} 
                href={`/blog/${article.attributes.slug}`}
                ref={el => { cardRefs.current[idx] = el || null; }}
                className={cn(
                  "bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col items-start border border-gray-100",
                  "transition-all duration-200 ease-out hover:border-primary-500"
                )}
              >
                <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                  <Image 
                    src={imageUrl} 
                    alt={article.attributes.title} 
                    fill
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="display-font text-xl font-semibold mb-2">{article.attributes.title}</h3>
                <p className="text-muted-foreground mb-4">{article.attributes.summary}</p>
                <span className="text-primary-800 font-medium hover:underline mt-auto">Read more →</span>
              </Link>
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