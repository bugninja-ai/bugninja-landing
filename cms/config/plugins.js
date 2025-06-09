module.exports = {
  seo: {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::article.article',
          metaTitleAttribute: 'title',
          metaDescriptionAttribute: 'summary',
          metaImageAttribute: 'featuredImage',
          titleAttribute: 'title',
          slugAttribute: 'slug',
          descriptionAttribute: 'summary',
          imageAttribute: 'featuredImage',
        },
        {
          uid: 'api::category.category',
          metaTitleAttribute: 'name',
          metaDescriptionAttribute: 'description',
          titleAttribute: 'name',
          slugAttribute: 'slug',
          descriptionAttribute: 'description',
        },
        {
          uid: 'api::tag.tag',
          metaTitleAttribute: 'name',
          metaDescriptionAttribute: 'description',
          titleAttribute: 'name',
          slugAttribute: 'slug',
          descriptionAttribute: 'description',
        },
        {
          uid: 'api::author.author',
          metaTitleAttribute: 'name',
          metaDescriptionAttribute: 'bio',
          metaImageAttribute: 'profilePicture',
          titleAttribute: 'name',
          slugAttribute: 'slug',
          descriptionAttribute: 'bio',
          imageAttribute: 'profilePicture',
        },
      ],
    },
  },
}; 