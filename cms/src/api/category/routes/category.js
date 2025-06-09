'use strict';

/**
 * category router
 */

module.exports = {
  routes: [
    // Read operations - public access
    {
      method: 'GET',
      path: '/categories',
      handler: 'category.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/categories/:id',
      handler: 'category.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/categories/slug/:slug',
      handler: 'category.findOne',
      config: {
        auth: false,
      },
    },
    // Write operations - require authentication
    {
      method: 'POST',
      path: '/categories',
      handler: 'category.create',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/categories/:id',
      handler: 'category.update',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/categories/:id',
      handler: 'category.delete',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
  ],
}; 