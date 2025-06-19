import React from 'react';
import { H2Wrapper } from './h2-wrapper';

export function AboutUs() {
  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed scroll-mt-20" id="about">
      <div className="flex justify-center mb-8">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Why Bugninja works?</h2>
        </H2Wrapper>
      </div>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
        Instead of generating fragile test scripts that break with every UI change, our AI intelligently navigates your product like a real user and creates test cases based on actual user behavior. This approach eliminates the constant maintenance nightmare while delivering more reliable testing that adapts to your application.
      </p>
    </section>
  );
} 