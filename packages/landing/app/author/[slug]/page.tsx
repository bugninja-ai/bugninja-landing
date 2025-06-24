import { getAuthorBySlug, getStrapiImageUrl, getArticlesByAuthor } from '@/utils/strapi';
import { SocialLink } from '@/types/blog';
import Image from 'next/image';
import { Divider } from '@/components/divider';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Footer } from '@/components/footer';
import { CTASection } from '@/components/cta-section';
import { Linkedin, Instagram, Twitter, Facebook, Globe, Github } from 'lucide-react';
import { AuthorArticlesGrid } from '@/components/blog/author-articles-grid';
import { Metadata, Viewport } from 'next';

const socialIcons: { [key: string]: React.ComponentType<any> } = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
  website: Globe,
};

interface AuthorPageProps {
  params: { slug: string };
}

// Generate metadata for the page
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return {};

  const { name, role, bio, profilePicture, socialLinks } = author;

  // Get profile picture URL
  const profilePicUrl = profilePicture?.data?.attributes?.url 
    ? getStrapiImageUrl(profilePicture.data.attributes.url)
    : profilePicture?.url 
    ? getStrapiImageUrl(profilePicture.url)
    : '/blog/default-author.jpg';

  // Find social media profiles
  const findSocialLink = (platform: string) => 
    socialLinks?.find((link: SocialLink) => link.platform.toLowerCase() === platform.toLowerCase())?.url;

  // Base URL for all canonical URLs
  const baseUrl = 'https://bugninja.ai';
  const canonicalUrl = `${baseUrl}/author/${params.slug}`;

  // Create schema.org Person markup
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: bio,
    image: profilePicUrl,
    url: canonicalUrl,
    sameAs: socialLinks?.map((link: SocialLink) => link.url) || [],
  };

  return {
    title: `${name} - ${role || 'Author'} | Bugninja`,
    description: bio?.substring(0, 160) || `Articles and insights from ${name}, ${role || 'Author'} at Bugninja.`,
    openGraph: {
      type: 'profile',
      title: `${name} - ${role || 'Author'}`,
      description: bio?.substring(0, 160) || `Articles and insights from ${name}, ${role || 'Author'} at Bugninja.`,
      images: [{ url: profilePicUrl }],
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary',
      title: `${name} - ${role || 'Author'}`,
      description: bio?.substring(0, 160) || `Articles and insights from ${name}, ${role || 'Author'} at Bugninja.`,
      images: [profilePicUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'schema': JSON.stringify(personSchema),
    }
  };
}

// Generate viewport configuration
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    notFound();
  }
  
  const { name, role, bio, profilePicture, socialLinks } = author;
  
  // Fetch author's articles using slug directly
  const articlesResponse = await getArticlesByAuthor(params.slug);
  const articles = Array.isArray(articlesResponse?.data) ? articlesResponse.data : [];
  const hasArticles = articles.length > 0;
  
  // Handle profile picture URL correctly
  const getProfilePicUrl = () => {
    if (profilePicture?.data?.attributes?.url) {
      return getStrapiImageUrl(profilePicture.data.attributes.url);
    }
    if (profilePicture?.url) {
      return getStrapiImageUrl(profilePicture.url);
    }
    return '/blog/default-author.jpg';
  };

  const profilePicUrl = getProfilePicUrl();

  return (
    <div className="flex min-h-screen flex-col bg-white gap-0">
      <PageHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 border-l border-r border-dashed border-border bg-white">
          <article className="mx-auto max-w-4xl">
            <div className="flex items-center mb-10">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mr-6">
                <Image src={profilePicUrl} alt={`Profile picture of ${name}`} fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
                {role && <p className="text-lg text-gray-600">{role}</p>}
              </div>
            </div>
            {bio && (
              <div className="text-xl text-gray-700 leading-relaxed mb-8">
                <div dangerouslySetInnerHTML={{ __html: bio }} />
              </div>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with {name.split(' ')[0]}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link: SocialLink) => {
                    const platform = link.platform.toLowerCase();
                    const Icon = socialIcons[platform] || Globe;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        </section>
        <Divider />
        {hasArticles && (
          <>
            <AuthorArticlesGrid articles={articles} />
            <Divider />
          </>
        )}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 