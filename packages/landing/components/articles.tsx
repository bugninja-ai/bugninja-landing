import React from 'react';
import { H2Wrapper } from './h2-wrapper';
import { SecondaryButton } from './secondary-button';
import Link from 'next/link';
import { cn } from '@bugninja/shared-ui';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import { getArticles } from '@/utils/strapi';
import type { Article } from '@/types/blog';
import { ArticlesClient } from './articles-client';

export async function Articles() {
  let articles: Article[] = [];

      try {
        const response = await getArticles(1, 3);
    articles = response.data;
      } catch (error) {
        console.error('Failed to fetch articles:', error);
    articles = [];
  }

  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-dashed scroll-mt-32" id="blog">
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Read about automated testing</h2>
        </H2Wrapper>
      </div>
      
      <ArticlesClient articles={articles} />
      
      <div className="flex justify-center mt-10">
        <SecondaryButton href="/blog">
          Show more
        </SecondaryButton>
      </div>
    </section>
  );
} 