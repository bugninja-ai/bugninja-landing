'use strict';

/**
 * tag router
 */

module.exports = {
  routes: [
    // Read operations - public access
    {
      method: 'GET',
      path: '/tags',
      handler: 'tag.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/tags/:id',
      handler: 'tag.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/tags/slug/:slug',
      handler: 'tag.findOne',
      config: {
        auth: false,
      },
    },
    // Write operations - require authentication
    {
      method: 'POST',
      path: '/tags',
      handler: 'tag.create',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/tags/:id',
      handler: 'tag.update',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/tags/:id',
      handler: 'tag.delete',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
  ],
}; 