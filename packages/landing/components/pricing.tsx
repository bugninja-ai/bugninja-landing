"use client";
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { H2Wrapper } from './h2-wrapper';
import { CTAButtonOnPrimary } from './cta-button';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import { SecondaryButton } from './secondary-button';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const router = useRouter();
  const freeRef = useRef<HTMLDivElement>(null);
  const paidRef = useRef<HTMLDivElement>(null);

  const handleBookMeeting = () => {
    router.push('/book-meeting');
  };

  useEffect(() => {
    const cards = [freeRef.current, paidRef.current];
    const validCards = cards.filter(card => card !== null);
    
    if (!validCards.length) return;
    
    gsap.set(validCards, { autoAlpha: 0, y: 40 });
    gsap.to(validCards, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: validCards[0]?.parentElement,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed bg-muted/50" id="pricing">
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
          <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> AI bug detection</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> 20 test cases</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> 10 runs / month</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Community support</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Email notifications</li>
          </ul>
          <div className="flex-1 flex items-end">
            <SecondaryButton className="h-14" onClick={handleBookMeeting}>Get started</SecondaryButton>
          </div>
        </div>
        {/* Paid Plan */}
        <div ref={paidRef} className="flex flex-col bg-primary-700 text-primary-foreground rounded-2xl p-8 items-center shadow-lg">
          <h3 className="display-font text-2xl font-semibold mb-2">Pro</h3>
          <div className="display-font text-4xl font-bold mb-4">$299<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 space-y-2 text-center">
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> CI/CD integration</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Priority email & chat support</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Unlimited runs</li>
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Test cases from Word, PDF, Excel, etc.</li>            
            <li className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Scheduled runs</li>            
          </ul>
          <div className="flex-1 w-full flex items-end">
            <CTAButtonOnPrimary className="w-full h-14" onClick={handleBookMeeting}>Subscribe to Pro</CTAButtonOnPrimary>
          </div>
        </div>
      </div>
    </section>
  );
} 