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
  // First, find the article by slug to get the ID
  const listResponse = await fetchAPI<ArticleListResponse>(
    `articles?filters[slug][$eq]=${slug}&fields[0]=id`
  );
  
  if (!listResponse.data.length) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  const articleId = listResponse.data[0].id;
  
  // Then fetch the full article by ID with all populated fields
  const fullArticle = await fetchAPI<{data: {id: string, attributes: any}}>(
    `articles/${articleId}?populate=*`
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
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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