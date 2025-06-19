import { ArticleListResponse, SingleArticleResponse } from '@/types/blog';

// URL for browser-side requests (images, client-side fetching)
const PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// URL for server-side requests (getStaticProps, getServerSideProps)
const INTERNAL_URL = process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Base function to fetch data from Strapi
 */
async function fetchAPI<T>(endpoint: string, options = {}): Promise<T> {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    // Use internal URL for server-side requests
    const url = `${INTERNAL_URL}/api/${endpoint}`;
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`An error occurred while fetching the data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all articles with pagination
 */
export async function getArticles(page = 1, pageSize = 10): Promise<ArticleListResponse> {
  return fetchAPI<ArticleListResponse>(
    `articles?populate=*&sort[0]=publishDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<SingleArticleResponse> {
  // URL decode the slug in case it's encoded
  const decodedSlug = decodeURIComponent(slug);
  
  // Get all articles with basic fields to find the matching slug
  // Note: Using manual filtering instead of Strapi filters due to potential encoding issues
  const allArticles = await fetchAPI<ArticleListResponse>(
    `articles?fields[0]=slug&fields[1]=id`
  );
  
  // Find the article by slug manually
  const matchingArticle = allArticles.data.find(article => 
    article.attributes.slug === decodedSlug
  );
  
  if (!matchingArticle) {
    throw new Error(`Article with slug "${decodedSlug}" not found`);
  }
  
  // Fetch the full article by ID with all populated fields
  const fullArticle = await fetchAPI<{data: {id: string, attributes: any}}>(
    `articles/${matchingArticle.id}?populate=*`
  );

  return {
    data: {
      id: parseInt(fullArticle.data.id),
      attributes: fullArticle.data.attributes
    },
    meta: {},
  };
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit = 3): Promise<ArticleListResponse> {
  return fetchAPI<ArticleListResponse>(
    `articles?filters[featured][$eq]=true&populate=*&sort[0]=publishDate:desc&pagination[pageSize]=${limit}`
  );
}

/**
 * Helper function to get the full URL for a Strapi image
 */
export function getStrapiImageUrl(path: string): string {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  // Use PUBLIC_URL for images so the browser can access them
  return `${PUBLIC_URL}${path}`;
}

/**
 * Helper function to format a date string
 * Uses UTC to ensure consistent formatting between server and client
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Helper function to get meta tags for SEO
 */
export function getMetaTags(seo: any) {
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    robots: seo?.metaRobots,
    canonical: seo?.canonicalURL,
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: [{ url: seo?.structuredData?.image }],
    },
    structuredData: seo?.structuredData,
  };
} 