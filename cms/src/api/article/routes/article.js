'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::article.article', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});

// Add custom routes
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/findBySlug/:slug',
      handler: 'article.findBySlug',
      config: {
        auth: false,
      },
    },
    // Keep the default routes
    {
      method: 'GET',
      path: '/articles',
      handler: 'article.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/:id',
      handler: 'article.findOne',
      config: {
        auth: false,
      },
    },
    // Write operations - require authentication
    {
      method: 'POST',
      path: '/articles',
      handler: 'article.create',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/articles/:id',
      handler: 'article.update',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/articles/:id',
      handler: 'article.delete',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
  ],
}; 