import { ArticleListResponse, SingleArticleResponse, StrapiAuthor } from '@/types/blog';

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
    // Use PUBLIC_URL for client-side requests, INTERNAL_URL for server-side
    const isClientSide = typeof window !== 'undefined';
    const baseUrl = isClientSide ? PUBLIC_URL : INTERNAL_URL;
    const url = `${baseUrl}/api/${endpoint}`;
    
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
 * Get ALL articles without pagination limits
 */
export async function getAllArticles(): Promise<ArticleListResponse> {
  return fetchAPI<ArticleListResponse>(
    `articles?populate=*&sort[0]=publishDate:desc&pagination[pageSize]=-1`
  );
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<SingleArticleResponse> {
  // URL decode the slug in case it's encoded
  const decodedSlug = decodeURIComponent(slug);
  
  console.log(`🔍 getArticleBySlug looking for: "${decodedSlug}"`);
  
  // Use the SAME API call as getAllArticles to ensure consistency
  const allArticles = await fetchAPI<ArticleListResponse>(
    `articles?populate=*&sort[0]=publishDate:desc&pagination[pageSize]=-1`
  );
  
  console.log(`📝 getArticleBySlug found ${allArticles.data.length} articles:`);
  allArticles.data.forEach(article => {
    console.log(`   ID: ${article.id}, Slug: "${article.attributes.slug}"`);
  });
  
  // Find the article by slug manually
  const matchingArticle = allArticles.data.find(article => 
    article.attributes.slug === decodedSlug
  );
  
  if (!matchingArticle) {
    console.log(`❌ getArticleBySlug: No match found for "${decodedSlug}"`);
    throw new Error(`Article with slug "${decodedSlug}" not found`);
  }
  
  console.log(`✅ getArticleBySlug: Found article ID ${matchingArticle.id}`);
  
  // Fetch the full article by ID with all populated fields including author details
  const fullArticle = await fetchAPI<{data: {id: string, attributes: any}}>(
    `articles/${matchingArticle.id}?populate%5Bauthor%5D%5Bfields%5D%5B0%5D=name&populate%5Bauthor%5D%5Bfields%5D%5B1%5D=slug&populate%5Bauthor%5D%5Bfields%5D%5B2%5D=role&populate%5Bauthor%5D%5Bfields%5D%5B3%5D=expertise&populate%5Bauthor%5D%5Bpopulate%5D%5BprofilePicture%5D=%2A`
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

export async function getAuthorBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  
  // Get all authors with their slugs to find the matching one
  const allAuthors = await fetchAPI<any>(
    `authors?fields[0]=slug&fields[1]=id`
  );
  
  const matchingAuthor = allAuthors.data.find((author: any) => author.attributes.slug === decodedSlug);
  if (!matchingAuthor) return null;
  
  // Fetch the full author by ID with all populated fields
  const fullAuthor = await fetchAPI<any>(
    `authors/${matchingAuthor.id}?populate[profilePicture]=*&populate[socialLinks]=*&populate[articles][fields][0]=id`
  );
  
  // Return the flat author object
  return {
    id: fullAuthor.data.id,
    ...fullAuthor.data.attributes,
  };
}

export async function getArticlesByAuthor(authorSlug: string): Promise<ArticleListResponse> {
  // Get all articles first, then filter client-side since Strapi filtering is broken
  const response = await fetchAPI<ArticleListResponse>(
    `articles?` +
    `populate[author][populate][profilePicture]=*&` +
    `populate[featuredImage]=*&` +
    `populate[categories]=*&` +
    `populate[tags]=*&` +
    `sort[0]=publishDate:desc`
  );

  if (!response || !response.data) {
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } }
    };
  }

  // Filter articles client-side by author slug since Strapi filtering is broken
  const filteredArticles = response.data.filter(article => {
    // Handle the actual API response structure where author is wrapped in data
    const authorData = (article.attributes as any)?.author?.data;
    const articleAuthorSlug = authorData?.attributes?.slug;
    return articleAuthorSlug === authorSlug;
  });

  return {
    data: filteredArticles,
    meta: {
      pagination: {
        page: 1,
        pageSize: filteredArticles.length,
        pageCount: 1,
        total: filteredArticles.length
      }
    }
  };
} 