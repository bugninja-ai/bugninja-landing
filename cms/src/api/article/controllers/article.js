'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    // Get pagination parameters from the query
    const { page = 1, pageSize = 25 } = ctx.query;

    // Get articles with relations using entityService
    const articles = await strapi.entityService.findMany('api::article.article', {
      populate: ['featuredImage', 'author.profilePicture', 'categories', 'tags'],
      start: (page - 1) * pageSize,
      limit: pageSize,
    });

    // Get total count for pagination
    const total = await strapi.entityService.count('api::article.article', {
      populate: ['featuredImage', 'author.profilePicture', 'categories', 'tags']
    });

    // Transform the response to include only necessary fields
    const transformedData = articles.map(article => ({
      id: article.id,
      attributes: {
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        publishDate: article.publishDate,
        updateDate: article.updateDate,
        readingTime: article.readingTime,
        featured: article.featured,
        featuredImage: {
          data: article.featuredImage ? {
            id: article.featuredImage.id,
            attributes: {
              url: article.featuredImage.url,
              formats: article.featuredImage.formats
            }
          } : null
        },
        author: {
          data: article.author ? {
            id: article.author.id,
            attributes: {
              name: article.author.name,
              slug: article.author.slug,
              role: article.author.role,
              profilePicture: {
                data: article.author.profilePicture ? {
                  id: article.author.profilePicture.id,
                  attributes: {
                    url: article.author.profilePicture.url,
                    formats: article.author.profilePicture.formats
                  }
                } : null
              }
            }
          } : null
        },
        categories: {
          data: article.categories?.map(category => ({
            id: category.id,
            attributes: {
              name: category.name,
              slug: category.slug
            }
          })) || []
        },
        tags: {
          data: article.tags?.map(tag => ({
            id: tag.id,
            attributes: {
              name: tag.name,
              slug: tag.slug,
              color: tag.color
            }
          })) || []
        }
      }
    }));

    return {
      data: transformedData,
      meta: {
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          pageCount: Math.ceil(total / pageSize),
          total
        }
      }
    };
  },
  
  async findOne(ctx) {
    // Get the ID from the URL params
    const { id } = ctx.params;
    
    // Get the article with all its relations
    const article = await strapi.entityService.findOne('api::article.article', id, {
      populate: {
        author: {
          populate: ['profilePicture']
        },
        categories: true,
        tags: true,
        featuredImage: true,
        gallery: true,
        seo: true,
        references: true,
        cta: true
      },
    });
    
    return {
      data: {
        id,
        attributes: article
      }
    };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;

    // Find the article by slug
    const articles = await strapi.entityService.findMany('api::article.article', {
      filters: { slug },
      populate: {
        author: {
          populate: ['profilePicture']
        },
        categories: true,
        tags: true,
        featuredImage: true,
        gallery: true,
        seo: true,
        references: true,
        cta: true
      },
    });

    if (!articles || articles.length === 0) {
      return ctx.notFound('Article not found');
    }

    return {
      data: {
        id: articles[0].id,
        attributes: articles[0]
      }
    };
  }
})); 