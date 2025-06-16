import React from 'react';
import { H2Wrapper } from './h2-wrapper';

export function AboutUs() {
  return (
    <section className="container mx-auto py-20 px-4 border-l border-r scroll-mt-20" id="about">
      <div className="flex justify-center mb-8">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">About BugNinja</h2>
        </H2Wrapper>
      </div>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        BugNinja is a passionate team of engineers and innovators dedicated to making software testing effortless and intelligent. Our mission is to empower developers and teams to deliver flawless products faster, with the help of cutting-edge AI and automation. We believe in transparency, collaboration, and building tools that truly make a difference.
      </p>
    </section>
  );
} 