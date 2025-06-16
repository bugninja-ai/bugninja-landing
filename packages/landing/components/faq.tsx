'use client'

import React, { useRef, useEffect } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@bugninja/shared-ui/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const faqs = [
    {
      question: "What is BugNinja?",
      answer: "BugNinja is an AI-powered testing platform that helps you find and fix bugs automatically, saving you time and improving your product quality.",
    },
    {
      question: "How does the AI testing work?",
      answer: "Our AI explores your web app like a real user, generating test cases, running them, and reporting issues with detailed insights.",
    },
    {
      question: "Is there a free plan?",
      answer: "Yes! BugNinja offers a free plan with unlimited test runs and basic AI bug detection.",
    },
    {
      question: "Can I integrate BugNinja with my CI/CD pipeline?",
      answer: "Absolutely. BugNinja provides easy integration with popular CI/CD tools so you can automate testing in your workflow.",
    },
    {
      question: "How do I get support?",
      answer: "Pro users get priority email and chat support. Free users can access our community resources and documentation.",
    },
  ];

  // Create refs for each accordion content
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      if (window.location.hash === '#faq' && sectionRef.current) {
        // Add a small delay to ensure the DOM is ready
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Initialize refs array and animation tracking
    contentRefs.current = contentRefs.current.slice(0, faqs.length);
    hasAnimated.current = new Array(faqs.length).fill(false);
    itemRefs.current = itemRefs.current.slice(0, faqs.length);

    // GSAP ScrollTrigger animation for AccordionItems
    if (itemRefs.current.length) {
      gsap.set(itemRefs.current, { autoAlpha: 0, y: 40 });
      gsap.to(itemRefs.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }

    // Create GSAP context for content animation
    const ctx = gsap.context(() => {
      // Set up animation for each content
      contentRefs.current.forEach((content, index) => {
        if (!content) return;

        // Find the trigger element (the question)
        const trigger = content.previousElementSibling;
        if (!trigger) return;

        // Create timeline for this item
        const tl = gsap.timeline({ paused: true });
        
        // Initial state - only set opacity 0 if it's not the default open item
        if (index !== 0) {
          gsap.set(content, { opacity: 0 });
        }

        // Animation
        tl.to(content, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });

        // Watch for state changes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-state') {
              const state = trigger.getAttribute('data-state');
              
              // Skip animation for the first item on initial load
              if (index === 0 && !hasAnimated.current[0]) {
                if (state === 'open') {
                  gsap.set(content, { opacity: 1 });
                  hasAnimated.current[0] = true;
                }
                return;
              }

              // For all other interactions, animate normally
              if (state === 'open') {
                tl.play();
                hasAnimated.current[index] = true;
              } else {
                tl.reverse();
              }
            }
          });
        });

        observer.observe(trigger, { attributes: true });
      });
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      ctx.revert();
    };
  }, [faqs.length]);

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="container mx-auto px-4 border-l border-r py-20 scroll-mt-24"
    >
      <div className="flex flex-col xl:flex-row xl:items-start lg:justify-center xl:w-3/4 gap-1 mx-auto">
        <div className="w-full xl:w-1/2 py-4 flex md:justify-center xl:block">
          <H2Wrapper>
            <h2 className="display-font text-3xl font-bold text-center xl:text-left">Frequently Asked Questions</h2>
          </H2Wrapper>
        </div>
        <div className="w-full xl:w-1/2">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="border-b border-border py-3"
                ref={el => { itemRefs.current[idx] = el; }}
              >
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  ref={(el: HTMLDivElement | null) => {
                    contentRefs.current[idx] = el;
                  }}
                  className="text-muted-foreground text-base text-left"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 