import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedCallToAction extends Schema.Component {
  collectionName: 'components_shared_call_to_actions';
  info: {
    displayName: 'Call to Action';
    description: 'Buttons and links for user engagement';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['primary', 'secondary', 'tertiary', 'link']> &
      Attribute.DefaultTo<'primary'>;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    icon: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'Meta Social';
    description: 'Social media metadata for sharing';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SharedReference extends Schema.Component {
  collectionName: 'components_shared_references';
  info: {
    displayName: 'Reference';
    description: 'Citations and sources for articles';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String;
    authors: Attribute.String;
    publisher: Attribute.String;
    publishDate: Attribute.Date;
    description: Attribute.Text;
    referenceType: Attribute.Enumeration<
      [
        'Website',
        'Book',
        'Journal',
        'Article',
        'Research Paper',
        'Video',
        'Podcast',
        'Interview',
        'Other'
      ]
    > &
      Attribute.DefaultTo<'Website'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    description: 'Search Engine Optimization metadata';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index, follow'>;
    canonicalURL: Attribute.String;
    preventIndexing: Attribute.Boolean & Attribute.DefaultTo<false>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    structuredData: Attribute.JSON;
  };
}

export interface SharedSocialLink extends Schema.Component {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    description: 'Links to social media profiles';
  };
  attributes: {
    platform: Attribute.Enumeration<
      [
        'Twitter',
        'Facebook',
        'Instagram',
        'LinkedIn',
        'YouTube',
        'GitHub',
        'Website',
        'Medium',
        'TikTok',
        'Other'
      ]
    > &
      Attribute.Required;
    url: Attribute.String & Attribute.Required;
    username: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.call-to-action': SharedCallToAction;
      'shared.meta-social': SharedMetaSocial;
      'shared.reference': SharedReference;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
