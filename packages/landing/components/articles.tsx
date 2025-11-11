import React from 'react';
import { H2Wrapper } from './h2-wrapper';
import { SecondaryButton } from './secondary-button';
import Link from 'next/link';
import { cn } from '@bugninja/shared-ui';
import { Button } from '@bugninja/shared-ui/components/ui/button';
import { getAllArticles } from '@/utils/strapi';
import type { Article } from '@/types/blog';
import { ArticlesClient } from './articles-client';

export async function Articles() {
  let articles: Article[] = [];

      try {
    // Get all articles and sort by date to get the 3 most recent
    const response = await getAllArticles();
    const sortedArticles = response.data.sort((a, b) => {
      const dateA = new Date(a.attributes.publishDate || a.attributes.createdAt);
      const dateB = new Date(b.attributes.publishDate || b.attributes.createdAt);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
    
    // Take only the 3 most recent articles
    articles = sortedArticles.slice(0, 3);
    
    console.log(`🏠 Homepage: Showing ${articles.length} most recent articles`);
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