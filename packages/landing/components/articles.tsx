"use client";
import React, { useRef, useEffect } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { SecondaryButton } from './secondary-button';
import Link from 'next/link';
import { cn } from '@bugninja/shared-ui';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    image: '/images/article1.jpg',
    title: 'How AI is Changing Software Testing',
    description: 'Discover how artificial intelligence is revolutionizing the way we test and ship software products.',
    link: '/blog/how-ai-is-changing-software-testing',
  },
  {
    image: '/images/article2.jpg',
    title: 'Best Practices for Automated QA',
    description: 'Learn the top strategies and tools for implementing effective automated quality assurance in your workflow.',
    link: '/blog/best-practices-for-automated-qa',
  },
  {
    image: '/images/article3.jpg',
    title: 'Debugging in the Age of AI',
    description: 'Explore new debugging techniques and how AI can help you find and fix bugs faster than ever.',
    link: '/blog/debugging-in-the-age-of-ai',
  },
];

export function Articles() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!cardRefs.current.length) return;
    gsap.set(cardRefs.current, { autoAlpha: 0, y: 40 });
    gsap.to(cardRefs.current, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRefs.current[0]?.parentElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed scroll-mt-32" id="blog">
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Read about automated testing</h2>
        </H2Wrapper>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {articles.map((article, idx) => (
          <Link 
            key={idx} 
            href={article.link}
            ref={el => { cardRefs.current[idx] = el || null; }}
            className={cn(
              "bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col items-start border border-gray-100",
              "transition-all duration-200 ease-out hover:border-primary-500"
            )}
          >
            <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
            </div>
            <h3 className="display-font text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-muted-foreground mb-4">{article.description}</p>
            <span className="text-primary-800 font-medium hover:underline mt-auto">Read more →</span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <SecondaryButton href="/blog">
          Show more
        </SecondaryButton>
      </div>
    </section>
  );
} 