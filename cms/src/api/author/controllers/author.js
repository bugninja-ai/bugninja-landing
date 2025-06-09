'use strict';

/**
 * author controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::author.author', ({ strapi }) => ({
  async find(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        profilePicture: true,
        socialLinks: true
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        profilePicture: true,
        socialLinks: true,
        articles: {
          populate: ['featuredImage', 'categories', 'tags'],
          sort: 'publishDate:desc',
          limit: 10
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
})); 