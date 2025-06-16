"use client";
import React, { useRef, useEffect } from 'react';
import { H2Wrapper } from './h2-wrapper';
import { CTAButtonOnPrimary } from './cta-button';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import { SecondaryButton } from './secondary-button';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const freeRef = useRef<HTMLDivElement>(null);
  const paidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = [freeRef.current, paidRef.current];
    gsap.set(cards, { autoAlpha: 0, y: 40 });
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: freeRef.current?.parentElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r bg-muted/50" id="pricing">
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="text-3xl font-bold">Pricing</h2>
        </H2Wrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:w-3/4 mx-auto">
        {/* Free Plan */}
        <div ref={freeRef} className="flex flex-col rounded-2xl p-8 items-center">
          <h3 className="display-font text-2xl font-semibold mb-2">Free</h3>
          <div className="display-font text-4xl font-bold mb-4">$0<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 space-y-2 text-center text-muted-foreground">
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Unlimited test runs</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Basic AI bug detection</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Community support</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Email notifications</li>
          </ul>
          <SecondaryButton>Get Started</SecondaryButton>
        </div>
        {/* Paid Plan */}
        <div ref={paidRef} className="flex flex-col bg-primary-700 text-primary-foreground rounded-2xl p-8 items-center shadow-lg">
          <h3 className="display-font text-2xl font-semibold mb-2">Pro</h3>
          <div className="display-font text-4xl font-bold mb-4">$49<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 space-y-2 text-center">
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Everything in Free</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Advanced AI bug detection</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Priority email & chat support</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Team collaboration</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Custom integrations</li>
          </ul>
          <CTAButtonOnPrimary>Subcribe to PRO</CTAButtonOnPrimary>
        </div>
      </div>
    </section>
  );
} 