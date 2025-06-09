'use strict';

/**
 * tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tag.tag', ({ strapi }) => ({
  async find(ctx) {
    // Default query
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        articles: {
          populate: ['featuredImage', 'author', 'categories'],
          sort: 'publishDate:desc',
          limit: 10
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
})); 