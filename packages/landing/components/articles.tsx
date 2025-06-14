import React from 'react';

const articles = [
  {
    image: '/images/article1.jpg',
    title: 'How AI is Changing Software Testing',
    description: 'Discover how artificial intelligence is revolutionizing the way we test and ship software products.',
    link: '#',
  },
  {
    image: '/images/article2.jpg',
    title: 'Best Practices for Automated QA',
    description: 'Learn the top strategies and tools for implementing effective automated quality assurance in your workflow.',
    link: '#',
  },
  {
    image: '/images/article3.jpg',
    title: 'Debugging in the Age of AI',
    description: 'Explore new debugging techniques and how AI can help you find and fix bugs faster than ever.',
    link: '#',
  },
];

export function Articles() {
  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-muted/50 rounded-2xl shadow p-6 flex-1 flex flex-col">
            <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-muted-foreground mb-4">{article.description}</p>
            <a href={article.link} className="text-primary font-medium hover:underline mt-auto">Read more →</a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">Show more</button>
      </div>
    </section>
  );
} 