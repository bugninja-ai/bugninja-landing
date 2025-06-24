export interface StrapiImage {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string;
        width: number;
        height: number;
        formats: {
          thumbnail: { url: string; width: number; height: number };
          small: { url: string; width: number; height: number };
          medium: { url: string; width: number; height: number };
          large: { url: string; width: number; height: number };
        };
      };
    };
  }
  
  export interface SocialLink {
    id: number;
    platform: string;
    url: string;
  }
  
  export interface StrapiAuthor {
    id: number;
    name: string;
    slug: string;
    email?: string;
    bio?: string;
    role?: string;
    profilePicture?: StrapiImage | { url: string };
    expertise?: string;
    socialLinks?: SocialLink[];
  }
  
  export interface StrapiTag {
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  }
  
  export interface StrapiSEO {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaRobots: string;
    canonicalURL: string;
    preventIndexing: boolean;
    structuredData: {
      "@context": string;
      "@type": string;
      headline: string;
      description: string;
      author: {
        "@type": string;
        name: string;
      };
      datePublished: string;
      dateModified: string;
      image: string;
      mainEntityOfPage: {
        "@type": string;
        "@id": string;
      };
      publisher: {
        "@type": string;
        name: string;
        logo: {
          "@type": string;
          url: string;
        };
      };
    };
  }
  
  export interface Reference {
    id: number;
    title: string;
    description: string;
    url: string;
    authors: string;
    publisher: string;
    publishDate: string;
    referenceType: string;
  }
  
  export interface CTA {
    id: number;
    text: string;
    url: string;
    type: string;
    icon: string;
    newTab: boolean;
  }
  
  export interface StrapiCategory {
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  }
  
  export interface Article {
    id: number;
    attributes: {
      title: string;
      slug: string;
      summary: string;
      content: string;
      readingTime: number;
      publishDate: string;
      updateDate: string;
      featured: boolean;
      featuredImage: StrapiImage;
      seo: StrapiSEO;
      references: Reference[];
      cta: CTA[];
      createdAt: string;
      updatedAt: string;
      author?: StrapiAuthor;
      tags?: { data: StrapiTag[] };
      categories?: { data: StrapiCategory[] };
    };
  }
  
  export interface PaginationMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
  
  export interface ArticleListResponse {
    data: Article[];
    meta: PaginationMeta;
  }
  
  export interface SingleArticleResponse {
    data: Article;
    meta: {};
  } 