'use strict';

/**
 * author router
 */

module.exports = {
  routes: [
    // Read operations - public access
    {
      method: 'GET',
      path: '/authors',
      handler: 'author.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/authors/:id',
      handler: 'author.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/authors/slug/:slug',
      handler: 'author.findOne',
      config: {
        auth: false,
      },
    },
    // Write operations - require authentication
    {
      method: 'POST',
      path: '/authors',
      handler: 'author.create',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/authors/:id',
      handler: 'author.update',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/authors/:id',
      handler: 'author.delete',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
  ],
}; 