"use client";
import React, { useRef, useEffect } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { FeatureCard } from './section-features/feature-card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Intelligent Test Reports",
    description: (<>
      Get detailed insights with screenshots, error logs, and actionable recommendations that help you fix issues faster than ever.
    </>),
    isLarge: true,
    imageAspectRatio: 'vertical' as const,
    imageSrc: '/feature1.png'
  },
  {
    title: "Automated test case generation",
    description: (<>
      Create <span className="bg-primary-500 text-white dark:bg-primary-500 dark:text-white px-1 rounded">smart test casess</span> for your webapp automatically, finding bugs and edge case that humans usually miss.
    </>),
    imageAspectRatio: '16:9' as const
  },
  {
    title: "Fully automatic AI navigation",
    description: (<>
      Bugninja <span className="bg-primary-500 text-white dark:bg-primary-500 dark:text-white px-1 rounded">explores your website like a real user</span>, automatically discovering all pages, forms, and interactive elements without any setup.
    </>),
    imageAspectRatio: '16:9' as const,
    imageSrc: '/feature3.png'
  },
  {
    title: "Complete E2E Testing",
    description: (<>
      <span className="bg-primary-500 text-white dark:bg-primary-500 dark:text-white px-1 rounded">Test entire user workflowss</span>  from login to checkout automatically, ensuring critical business processework flawlessly every time.
    </>),
    imageAspectRatio: '16:9' as const,
    imageSrc: '/feature4.png'
  },
  {
    title: "Find edge cases",
    description: (<>
      Bugninja can  <span className="bg-primary-500 text-white dark:bg-primary-500 dark:text-white px-1 rounded">find the most annoying </span> edge-cases that your users would see but never happen in a development environment.
    </>),
    imageAspectRatio: '16:9' as const
  }
];

export function SectionFeatures() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Filter out null values and ensure we have valid elements
    const validRefs = cardRefs.current.filter(ref => ref !== null);
    if (!validRefs.length) return;
    
    gsap.set(validRefs, { autoAlpha: 0, y: 40 });
    gsap.to(validRefs, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: validRefs[0]?.parentElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed" id="features">
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Explore our features</h2>
        </H2Wrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            ref={el => { cardRefs.current[index] = el || null; }}
            title={feature.title}
            description={feature.description}
            isLarge={feature.isLarge}
            imageAspectRatio={feature.imageAspectRatio}
            imageSrc={feature.imageSrc}
          />
        ))}
      </div>
    </section>
  );
} 