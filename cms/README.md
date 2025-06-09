# Strapi CMS API Documentation

This document provides a practical guide for developers on how to use the Strapi CMS API to implement a blog.

## API Endpoints

### Articles

#### Get All Articles

```
GET /api/articles?populate=*
```

Response structure:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Article Title",
        "slug": "article-slug",
        "summary": "Brief summary of the article",
        "content": "Full markdown content...",
        "readingTime": 5,
        "publishDate": "2023-05-15T10:30:00.000Z",
        "updateDate": "2023-05-16T14:20:00.000Z",
        "featured": true,
        "createdAt": "2023-05-15T10:00:00.000Z",
        "updatedAt": "2023-05-16T14:20:00.000Z",
        "featuredImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "image.jpg",
              "alternativeText": "Description of the image",
              "url": "/uploads/image.jpg",
              "width": 1200,
              "height": 800,
              "formats": {
                "thumbnail": { "url": "/uploads/thumbnail_image.jpg" },
                "small": { "url": "/uploads/small_image.jpg" },
                "medium": { "url": "/uploads/medium_image.jpg" },
                "large": { "url": "/uploads/large_image.jpg" }
              }
            }
          }
        },
        "author": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Author Name",
              "slug": "author-slug",
              "email": "author@example.com",
              "bio": "Author biography",
              "role": "Author Role",
              "expertise": "Author Expertise",
              "profilePicture": {
                "data": {
                  "attributes": {
                    "url": "/uploads/author.jpg",
                    "alternativeText": "Author profile picture"
                  }
                }
              }
            }
          }
        },
        "categories": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "name": "Category Name",
                "slug": "category-slug",
                "description": "Category description"
              }
            }
          ]
        },
        "tags": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "name": "Tag Name",
                "slug": "tag-slug",
                "description": "Tag description"
              }
            }
          ]
        },
        "seo": {
          "metaTitle": "SEO Title",
          "metaDescription": "SEO Description",
          "keywords": "keyword1, keyword2, keyword3",
          "metaRobots": "index, follow",
          "canonicalURL": "https://example.com/article-slug",
          "preventIndexing": false,
          "metaSocial": [
            {
              "socialNetwork": "Facebook",
              "title": "Facebook Title",
              "description": "Facebook Description",
              "image": {
                "data": {
                  "attributes": {
                    "url": "/uploads/social.jpg"
                  }
                }
              }
            },
            {
              "socialNetwork": "Twitter",
              "title": "Twitter Title",
              "description": "Twitter Description",
              "image": {
                "data": {
                  "attributes": {
                    "url": "/uploads/social.jpg"
                  }
                }
              }
            }
          ]
        },
        "cta": [
          {
            "text": "Call to Action Text",
            "url": "https://example.com/action",
            "type": "primary",
            "newTab": true,
            "icon": "arrow-right"
          }
        ],
        "references": [
          {
            "title": "Reference Title",
            "url": "https://example.com/reference",
            "authors": "Reference Authors",
            "publisher": "Publisher Name",
            "publishDate": "2023-01-01",
            "description": "Reference description",
            "referenceType": "Website"
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

#### Get Single Article by Slug

```
GET /api/articles?filters[slug][$eq]=article-slug&populate=*
```

Response structure is the same as above but with a single article in the data array.

#### Common Query Parameters

- `populate=*`: Include all relations
- `sort[0]=publishDate:desc`: Sort by publish date (descending)
- `filters[featured]=true`: Filter featured articles only
- `pagination[page]=1&pagination[pageSize]=10`: Pagination

### Categories

```
GET /api/categories?populate=*
```

Response structure:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Category Name",
        "slug": "category-slug",
        "description": "Category description",
        "icon": {
          "data": {
            "attributes": {
              "url": "/uploads/icon.jpg",
              "alternativeText": "Category icon"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

### Tags

```
GET /api/tags?populate=*
```

Response structure:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Tag Name",
        "slug": "tag-slug",
        "description": "Tag description"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 9
    }
  }
}
```

### Authors

```
GET /api/authors?populate=*
```

Response structure:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Author Name",
        "slug": "author-slug",
        "email": "author@example.com",
        "bio": "Author biography",
        "role": "Author Role",
        "expertise": "Author Expertise",
        "profilePicture": {
          "data": {
            "attributes": {
              "url": "/uploads/author.jpg",
              "alternativeText": "Author profile picture"
            }
          }
        },
        "socialLinks": [
          {
            "platform": "Twitter",
            "url": "https://twitter.com/username",
            "username": "username"
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## Authentication

To access the API, include an API token in your request headers:

```javascript
const headers = {
  Authorization: `Bearer YOUR_API_TOKEN`
};

fetch('http://localhost:1337/api/articles', { headers })
  .then(response => response.json())
  .then(data => console.log(data));
```

## Implementing a Blog

### Basic API Client

```javascript
// api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function fetchAPI(endpoint, params = {}) {
  const mergedParams = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    ...params,
  };

  const response = await fetch(`${API_URL}/api/${endpoint}`, mergedParams);
  const data = await response.json();
  return data;
}

// Get all articles
export async function getArticles(page = 1, pageSize = 10) {
  return fetchAPI(
    `articles?populate=*&sort[0]=publishDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

// Get article by slug
export async function getArticleBySlug(slug) {
  const data = await fetchAPI(
    `articles?filters[slug][$eq]=${slug}&populate=*`
  );
  return data.data[0];
}

// Get articles by category
export async function getArticlesByCategory(categorySlug, page = 1, pageSize = 10) {
  return fetchAPI(
    `articles?filters[categories][slug][$eq]=${categorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

// Get articles by tag
export async function getArticlesByTag(tagSlug, page = 1, pageSize = 10) {
  return fetchAPI(
    `articles?filters[tags][slug][$eq]=${tagSlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

// Get articles by author
export async function getArticlesByAuthor(authorSlug, page = 1, pageSize = 10) {
  return fetchAPI(
    `articles?filters[author][slug][$eq]=${authorSlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

// Get categories
export async function getCategories() {
  return fetchAPI('categories?populate=*');
}

// Get tags
export async function getTags() {
  return fetchAPI('tags?populate=*');
}

// Get authors
export async function getAuthors() {
  return fetchAPI('authors?populate=*');
}
```

## SEO Implementation

The SEO component in our Strapi CMS includes:

- `metaTitle`: Title for search engines (max 60 characters)
- `metaDescription`: Description for search engines (max 160 characters)
- `keywords`: Comma-separated keywords
- `metaRobots`: Control how search engines index your content
- `canonicalURL`: Canonical URL for duplicate content
- `preventIndexing`: Boolean to prevent indexing
- `metaSocial`: Social media metadata for Facebook and Twitter

When implementing SEO in your frontend, make sure to include all these fields in your head metadata.

## Structured Data (LD+JSON)

Structured data helps search engines understand the content of your page and can enhance your search results with rich snippets. For blog articles, we use the `Article` schema type in JSON-LD format.

### Implementation in Frontend

Add the following script to your article pages:

```jsx
// Example implementation in Next.js article page
import Head from 'next/head';

export default function ArticlePage({ article }) {
  const { 
    title, 
    summary, 
    content, 
    publishDate, 
    updateDate, 
    author, 
    featuredImage 
  } = article.attributes;
  
  // Format dates for structured data
  const publishedDate = new Date(publishDate).toISOString();
  const modifiedDate = updateDate ? new Date(updateDate).toISOString() : publishedDate;
  
  // Create structured data object
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": summary,
    "image": featuredImage.data ? 
      `${process.env.NEXT_PUBLIC_API_URL}${featuredImage.data.attributes.url}` : 
      null,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": author.data.attributes.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Organization Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourwebsite.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourwebsite.com/blog/${article.attributes.slug}`
    }
  };

  return (
    <>
      <Head>
        {/* Other meta tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* Article content */}
    </>
  );
}
```

### Schema Types

Depending on your content, you might want to use different schema types:

- `Article`: General article content
- `BlogPosting`: Specifically for blog posts
- `NewsArticle`: For news content
- `TechArticle`: For technical documentation

### Testing Structured Data

Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate your structured data implementation.

## Image Handling

When displaying images from the API, always include the full URL by prepending the API URL:

```javascript
const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${image.data.attributes.url}`;
```

Always use the `alternativeText` field for the image's alt attribute:

```javascript
<img 
  src={imageUrl}
  alt={image.data.attributes.alternativeText || 'Fallback description'}
/>
```

---

This documentation is maintained by the development team. 