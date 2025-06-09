'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        icon: true,
        parent: true,
        subcategories: true
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
        icon: true,
        parent: true,
        subcategories: true,
        articles: {
          populate: ['featuredImage', 'author', 'tags'],
          sort: 'publishDate:desc',
          limit: 10
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
})); 