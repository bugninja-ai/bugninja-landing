'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';

interface FAQItemProps {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}

function FAQAccordion({ question, answer, open, onClick }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let ctx = gsap.context && gsap.context(() => {}, el);
    if (open) {
      // Set height to 0 first if not already
      gsap.set(el, { height: 0, opacity: 0 });
      // Animate to scrollHeight
      gsap.to(el, {
        height: el.scrollHeight,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          el.style.height = 'auto';
        },
      });
    } else {
      // Animate to height 0
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
    return () => ctx && ctx.revert && ctx.revert();
  }, [open]);

  // Custom cursor: Eyes emoji on closed, default on open
  // SVG: 32x32, circle with bg-muted/30, eyes emoji centered
  const eyesCursorSvg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
      <circle cx='20' cy='20' r='20' fill='rgba(100,116,139,0.8)' />
      <text x='20' y='23' font-size='18' text-anchor='middle' dominant-baseline='middle'>👀</text>
    </svg>
  `);
  const buttonStyle = open
    ? { cursor: 'default' }
    : { cursor: `url("data:image/svg+xml;utf8,${eyesCursorSvg}") 16 16, pointer` };

  return (
    <div className="border-b border-muted py-8">
      <button
        className="w-full text-left flex justify-between items-center font-medium text-lg focus:outline-none"
        onClick={onClick}
        aria-expanded={open}
        style={buttonStyle}
      >
        <span>{question}</span>
        <span className="ml-2 text-primary">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ height: open ? 'auto' : 0, overflow: 'hidden', opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div className="mt-2 text-muted-foreground text-base">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
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
  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-white border-opacity-[0.05]">
      <div className="flex flex-row items-start w-full gap-1">
        <div className="w-1/2 flex">
          <h2 className="text-3xl font-bold text-left">Frequently Asked Questions</h2>
        </div>
        <div className="w-1/2 divide-y divide-muted">
          {faqs.map((faq, idx) => (
            <FAQAccordion
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === idx}
              onClick={() => setOpenIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 