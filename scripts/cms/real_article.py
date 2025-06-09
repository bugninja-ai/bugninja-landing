#!/usr/bin/env python3
"""
SEO Article Generator for Strapi CMS

This script:
1. Takes a topic from command line input
2. Uses Azure OpenAI to generate a complete SEO-optimized article with all metadata
3. Displays the generated content for review
4. Uploads the approved content to Strapi CMS
"""

import os
import sys
import json
import time
import argparse
import requests
from datetime import datetime
from dotenv import load_dotenv
from openai import AzureOpenAI

# Load environment variables
load_dotenv()

# Configuration
STRAPI_API_URL = os.getenv("STRAPI_API_URL")
STRAPI_API_TOKEN = os.getenv("STRAPI_API_TOKEN")
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")

# Headers for API requests
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {STRAPI_API_TOKEN}",
}

# Auth header without Content-Type (for file uploads)
auth_header = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"}

# Initialize Azure OpenAI client
client = AzureOpenAI(
    api_key=AZURE_OPENAI_API_KEY,
    api_version="2024-07-01-preview",
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
)

# System prompt for SEO content generation
SEO_SYSTEM_PROMPT = """
You are an expert SEO content writer with deep knowledge of creating high-traffic, engaging articles.

Your task is to create a comprehensive, SEO-optimized article based on the provided topic. 
Follow these guidelines:

1. NEVER use H1 headings in the content. Start with H2 and use H3, H4 for subsections.
2. Include relevant keywords naturally throughout the text.
3. Create engaging, informative content that provides real value to readers.
4. Structure the content with clear sections, bullet points, and numbered lists where appropriate.
5. Include examples, case studies, or data points to support claims.
6. Add a compelling call-to-action.
7. Ensure the content is original and plagiarism-free.
8. Optimize for both search engines and human readers.
9. Include relevant internal and external linking opportunities.
10. Suggest meta title, meta description, and focus keywords that will maximize search visibility.
11. NEVER EVER generate placeholder URLs, you are a SEO expert, only use real URLs, that I provide you with or things that you know. This is extremely important in the meta field too.
12. DO NOT GENERATE CTAs and references in the markdown article field since those are generated in another field.

IMPORTANT SEO CHARACTER LIMITS:
- Meta Title: Maximum 60 characters (will be truncated in search results if longer)
- Meta Description: Maximum 160 characters (will be truncated in search results if longer)
- URL/Slug: Keep under 75 characters, use hyphens between words
- Headlines (H2, H3): Keep under 70 characters for readability
- Focus Keywords: 3-5 keywords/phrases maximum, each keyword should be used at least twice in the content

The output should be a JSON object with all the fields required by Strapi CMS, following the exact structure provided.
"""

# Example JSON structure to guide the AI
JSON_STRUCTURE = """
{
  "article": {
    "title": "SEO-optimized title with primary keyword",
    "slug": "url-friendly-slug-with-keyword",
    "summary": "Compelling 1-2 sentence summary with primary keyword",
    "content": "Full markdown content with H2 and H3 headings (NO H1), lists, examples, etc.",
    "readingTime": 5,
    "ctas": [
      {
        "text": "Call to Action Text",
        "url": "https://example.com/action",
        "type": "primary",
        "newTab": true,
        "icon": "arrow-right"
      }
    ],
    "references": [
      {
        "title": "Reference Title",
        "url": "https://example.com/reference",
        "authors": "Reference Authors",
        "publisher": "Publisher Name",
        "publishDate": "2023-01-01",
        "description": "Reference description",
        "referenceType": "Website"
      }
    ]
  },
  "seo": {
    "metaTitle": "Keyword-Rich Title Under 60 Characters",
    "metaDescription": "Compelling meta description with primary keyword that stays under 160 characters for optimal display in search results.",
    "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
    "metaRobots": "index, follow",
    "canonicalURL": "https://example.com/canonical-url",
    "preventIndexing": false,
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Article headline (same as title)",
      "description": "Article description (same as summary)",
      "image": "URL to the featured image (will be filled automatically)",
      "datePublished": "Publication date (will be filled automatically)",
      "dateModified": "Last update date (will be filled automatically)",
      "author": {
        "@type": "Person",
        "name": "Author name (will be filled automatically)"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "URL to the article (will be filled automatically)"
      }
    },
    "metaSocial": [
      {
        "socialNetwork": "Facebook",
        "title": "Facebook Title",
        "description": "Facebook Description",
        "image": "Image ID for Facebook sharing (will be filled automatically with featured image)"
      },
      {
        "socialNetwork": "Twitter",
        "title": "Twitter Title",
        "description": "Twitter Description",
        "image": "Image ID for Twitter sharing (will be filled automatically with featured image)"
      }
    ]
  },
  "author": {
    "name": "Author Name",
    "slug": "author-slug",
    "email": "author@example.com",
    "bio": "Author biography with expertise and credentials",
    "role": "Author Role",
    "expertise": "Author Expertise",
    "socialLinks": [
      {
        "platform": "Twitter",
        "url": "https://twitter.com/username",
        "username": "username"
      },
      {
        "platform": "LinkedIn",
        "url": "https://linkedin.com/in/username",
        "username": "username"
      }
    ]
  },
  "categories": [
    {
      "name": "Primary Category",
      "slug": "primary-category",
      "description": "Category description"
    },
    {
      "name": "Secondary Category",
      "slug": "secondary-category",
      "description": "Category description"
    }
  ],
  "tags": [
    {
      "name": "Primary Tag",
      "slug": "primary-tag",
      "description": "Tag description"
    },
    {
      "name": "Secondary Tag",
      "slug": "secondary-tag",
      "description": "Tag description"
    }
  ]
}
"""


def generate_seo_content(topic, author):
    """Generate SEO-optimized content using Azure OpenAI"""
    print(f"🧠 Generating SEO-optimized content for topic: {topic}...")

    try:
        # Create a modified JSON structure with the real author information
        author_json = json.dumps(
            {
                "name": author["name"],
                "slug": author["slug"],
                "email": author["email"],
                "bio": author["bio"],
                "role": author["role"],
                "expertise": author["expertise"],
                "socialLinks": author.get("socialLinks", []),
            },
            indent=2,
        )

        response = client.chat.completions.create(
            model="gpt-4",  # Use your deployed model name on Azure
            messages=[
                {"role": "system", "content": SEO_SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Create a complete SEO-optimized article about '{topic}'. Use the following REAL author information - this is important for SEO:\n\n{author_json}\n\nInclude all metadata, categories, and tags. Make sure to include structured data for SEO. Follow this JSON structure: {JSON_STRUCTURE}",
                },
            ],
            temperature=0.7,
            max_tokens=4000,
        )

        # Extract the JSON content from the response
        content = response.choices[0].message.content

        # Find JSON content between triple backticks if present
        if "```json" in content and "```" in content.split("```json", 1)[1]:
            json_str = content.split("```json", 1)[1].split("```", 1)[0].strip()
        elif "```" in content and "```" in content.split("```", 1)[1]:
            json_str = content.split("```", 1)[1].split("```", 1)[0].strip()
        else:
            json_str = content

        # Clean up any non-JSON text
        json_str = json_str.strip()
        if not json_str.startswith("{"):
            json_str = json_str[json_str.find("{") :]
        if not json_str.endswith("}"):
            json_str = json_str[: json_str.rfind("}") + 1]

        # Parse the JSON
        try:
            seo_data = json.loads(json_str)

            # Ensure the author data is correct (replace with our real author data if needed)
            if "author" in seo_data:
                # Check if the author name matches our real author
                if seo_data["author"]["name"] != author["name"]:
                    print(
                        f"⚠️ Replacing generated author with real author: {author['name']}"
                    )
                    seo_data["author"] = author
            else:
                print(f"⚠️ Adding missing author information: {author['name']}")
                seo_data["author"] = author

            # Validate and truncate SEO fields that exceed character limits
            if "seo" in seo_data:
                # Meta title should be max 60 characters
                if len(seo_data["seo"].get("metaTitle", "")) > 60:
                    original_title = seo_data["seo"]["metaTitle"]
                    seo_data["seo"]["metaTitle"] = original_title[:57] + "..."
                    print(
                        f"⚠️ Meta title truncated from {len(original_title)} to 60 characters"
                    )

                # Meta description should be max 160 characters
                if len(seo_data["seo"].get("metaDescription", "")) > 160:
                    original_desc = seo_data["seo"]["metaDescription"]
                    seo_data["seo"]["metaDescription"] = original_desc[:157] + "..."
                    print(
                        f"⚠️ Meta description truncated from {len(original_desc)} to 160 characters"
                    )

                # Slug should be under 75 characters
                if (
                    "article" in seo_data
                    and len(seo_data["article"].get("slug", "")) > 75
                ):
                    original_slug = seo_data["article"]["slug"]
                    seo_data["article"]["slug"] = original_slug[:72] + "..."
                    print(
                        f"⚠️ Slug truncated from {len(original_slug)} to 75 characters"
                    )

                # Ensure metaSocial entries have image placeholders
                if "metaSocial" in seo_data["seo"]:
                    for social in seo_data["seo"]["metaSocial"]:
                        if "image" not in social:
                            social["image"] = (
                                "placeholder-will-be-replaced-with-featured-image"
                            )
                else:
                    # Create default metaSocial entries if missing
                    seo_data["seo"]["metaSocial"] = [
                        {
                            "socialNetwork": "Facebook",
                            "title": seo_data["seo"].get(
                                "metaTitle", seo_data["article"]["title"]
                            ),
                            "description": seo_data["seo"].get(
                                "metaDescription", seo_data["article"]["summary"]
                            ),
                            "image": "placeholder-will-be-replaced-with-featured-image",
                        },
                        {
                            "socialNetwork": "Twitter",
                            "title": seo_data["seo"].get(
                                "metaTitle", seo_data["article"]["title"]
                            ),
                            "description": seo_data["seo"].get(
                                "metaDescription", seo_data["article"]["summary"]
                            ),
                            "image": "placeholder-will-be-replaced-with-featured-image",
                        },
                    ]

            # Ensure structured data exists in SEO
            if "seo" in seo_data and not seo_data["seo"].get("structuredData"):
                print("⚠️ Adding missing structured data to SEO...")
                seo_data["seo"]["structuredData"] = {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": seo_data["article"]["title"],
                    "description": seo_data["article"]["summary"],
                    "datePublished": datetime.now().isoformat(),
                    "dateModified": datetime.now().isoformat(),
                    "author": {"@type": "Person", "name": author["name"]},
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": f"https://yourwebsite.com/blog/{seo_data['article']['slug']}",
                    },
                }
            elif "structuredData" in seo_data["seo"]:
                # Ensure the author in structured data matches our real author
                if (
                    seo_data["seo"]["structuredData"].get("author", {}).get("name")
                    != author["name"]
                ):
                    print(f"⚠️ Updating author in structured data to: {author['name']}")
                    seo_data["seo"]["structuredData"]["author"] = {
                        "@type": "Person",
                        "name": author["name"],
                    }

            return seo_data
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing JSON: {e}")
            print(f"Raw content: {json_str}")
            return None

    except Exception as e:
        print(f"❌ Error generating content: {e}")
        return None


def upload_image(image_path, name=None, alt_text=None):
    """Upload an image to Strapi media library with alternative text"""
    print(f"📤 Uploading image: {image_path}")

    # Prepare the file for upload
    files = {
        "files": (os.path.basename(image_path), open(image_path, "rb"), "image/png")
    }

    # Add name and alternative text if provided
    data = {}
    if name or alt_text:
        file_info = {}
        if name:
            file_info["name"] = name
        if alt_text:
            file_info["alternativeText"] = alt_text
        data = {"fileInfo": json.dumps(file_info)}

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/upload", headers=auth_header, files=files, data=data
    )

    # Check if the request was successful
    if response.status_code == 200:
        uploaded_file = response.json()[0]
        print(f"✅ Uploaded image: {uploaded_file['name']} (ID: {uploaded_file['id']})")
        return uploaded_file["id"]
    else:
        print(f"❌ Failed to upload image: {image_path}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def get_authors():
    """Get all authors from Strapi"""
    print("📚 Fetching existing authors from Strapi...")

    response = requests.get(f"{STRAPI_API_URL}/authors?populate=*", headers=headers)

    if response.status_code == 200:
        authors = response.json()
        if authors.get("data") and len(authors["data"]) > 0:
            print(f"✅ Found {len(authors['data'])} existing authors")
            return authors["data"]
        else:
            print("⚠️ No existing authors found")
            return []
    else:
        print(f"❌ Failed to fetch authors")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return []


def select_author(generated_author, existing_authors):
    """Select an author from existing authors or create a new one"""
    if not existing_authors:
        print("No existing authors found. Creating a new author.")
        # Upload a profile picture for the new author
        print("📸 A profile picture is required for the new author.")
        profile_image_path = select_image()
        profile_image_id = upload_image(
            profile_image_path,
            f"{generated_author['name']}_profile",
            f"Profile picture of {generated_author['name']}, {generated_author['role']}",
        )
        return create_author(generated_author, profile_image_id)

    print("\n👤 Available Authors:")
    for i, author in enumerate(existing_authors):
        print(
            f"{i+1}. {author['attributes']['name']} - {author['attributes'].get('role', 'No role specified')}"
        )

    print(f"{len(existing_authors)+1}. Create new author: {generated_author['name']}")

    while True:
        try:
            choice = input(
                "\nSelect an author by number (or press Enter for the first author): "
            )
            if choice.strip() == "":
                # Default to the first author
                selected_index = 0
            else:
                selected_index = int(choice) - 1

            if 0 <= selected_index < len(existing_authors):
                selected_author = existing_authors[selected_index]
                print(f"✅ Selected author: {selected_author['attributes']['name']}")
                return selected_author["id"]
            elif selected_index == len(existing_authors):
                print(f"Creating new author: {generated_author['name']}")
                # Upload a profile picture for the new author
                print("📸 A profile picture is required for the new author.")
                profile_image_path = select_image()
                profile_image_id = upload_image(
                    profile_image_path,
                    f"{generated_author['name']}_profile",
                    f"Profile picture of {generated_author['name']}, {generated_author['role']}",
                )
                return create_author(generated_author, profile_image_id)
            else:
                print("❌ Invalid selection. Please try again.")
        except ValueError:
            print("❌ Please enter a valid number.")


def create_author(author_data, profile_image_id=None):
    """Create an author in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{author_data['slug']}-{timestamp}"

    # Prepare the author data
    payload = {
        "data": {
            "name": author_data["name"],
            "slug": unique_slug,
            "email": author_data["email"],
            "bio": author_data["bio"],
            "role": author_data["role"],
            "expertise": author_data["expertise"],
            "socialLinks": author_data.get("socialLinks", []),
        }
    }

    # Add profile picture if provided
    if profile_image_id:
        payload["data"]["profilePicture"] = profile_image_id

    # Send the request
    response = requests.post(f"{STRAPI_API_URL}/authors", headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        author = response.json()
        print(f"✅ Created author: {author_data['name']} (ID: {author['data']['id']})")
        return author["data"]["id"]
    else:
        print(f"❌ Failed to create author: {author_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def get_categories():
    """Get all categories from Strapi"""
    print("📚 Fetching existing categories from Strapi...")

    response = requests.get(f"{STRAPI_API_URL}/categories?populate=*", headers=headers)

    if response.status_code == 200:
        categories = response.json()
        if categories.get("data") and len(categories["data"]) > 0:
            print(f"✅ Found {len(categories['data'])} existing categories")
            return categories["data"]
        else:
            print("⚠️ No existing categories found")
            return []
    else:
        print(f"❌ Failed to fetch categories")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return []


def select_or_create_categories(generated_categories, existing_categories):
    """Select from existing categories or create new ones"""
    selected_category_ids = []

    if not existing_categories:
        print("No existing categories found. Creating new categories.")
        for category in generated_categories:
            category_id = create_category(category)
            if category_id:
                selected_category_ids.append(category_id)
        return selected_category_ids

    # Map existing categories by name (case insensitive) for easy lookup
    existing_category_map = {
        c["attributes"]["name"].lower(): c for c in existing_categories
    }

    for category in generated_categories:
        category_name = category["name"]
        category_name_lower = category_name.lower()

        # Check if a similar category already exists
        if category_name_lower in existing_category_map:
            existing_category = existing_category_map[category_name_lower]
            print(
                f"✅ Using existing category: {existing_category['attributes']['name']} (ID: {existing_category['id']})"
            )
            selected_category_ids.append(existing_category["id"])
        else:
            # Create new category
            print(f"Creating new category: {category_name}")
            category_id = create_category(category)
            if category_id:
                selected_category_ids.append(category_id)

    return selected_category_ids


def create_category(category_data):
    """Create a category in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{category_data['slug']}-{timestamp}"

    # Prepare the category data
    payload = {
        "data": {
            "name": category_data["name"],
            "slug": unique_slug,
            "description": category_data["description"],
        }
    }

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/categories", headers=headers, json=payload
    )

    # Check if the request was successful
    if response.status_code == 200:
        category = response.json()
        print(
            f"✅ Created category: {category_data['name']} (ID: {category['data']['id']})"
        )
        return category["data"]["id"]
    else:
        print(f"❌ Failed to create category: {category_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def get_tags():
    """Get all tags from Strapi"""
    print("📚 Fetching existing tags from Strapi...")

    response = requests.get(f"{STRAPI_API_URL}/tags?populate=*", headers=headers)

    if response.status_code == 200:
        tags = response.json()
        if tags.get("data") and len(tags["data"]) > 0:
            print(f"✅ Found {len(tags['data'])} existing tags")
            return tags["data"]
        else:
            print("⚠️ No existing tags found")
            return []
    else:
        print(f"❌ Failed to fetch tags")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return []


def select_or_create_tags(generated_tags, existing_tags):
    """Select from existing tags or create new ones"""
    selected_tag_ids = []

    if not existing_tags:
        print("No existing tags found. Creating new tags.")
        for tag in generated_tags:
            tag_id = create_tag(tag)
            if tag_id:
                selected_tag_ids.append(tag_id)
        return selected_tag_ids

    # Map existing tags by name (case insensitive) for easy lookup
    existing_tag_map = {t["attributes"]["name"].lower(): t for t in existing_tags}

    for tag in generated_tags:
        tag_name = tag["name"]
        tag_name_lower = tag_name.lower()

        # Check if a similar tag already exists
        if tag_name_lower in existing_tag_map:
            existing_tag = existing_tag_map[tag_name_lower]
            print(
                f"✅ Using existing tag: {existing_tag['attributes']['name']} (ID: {existing_tag['id']})"
            )
            selected_tag_ids.append(existing_tag["id"])
        else:
            # Create new tag
            print(f"Creating new tag: {tag_name}")
            tag_id = create_tag(tag)
            if tag_id:
                selected_tag_ids.append(tag_id)

    return selected_tag_ids


def create_tag(tag_data):
    """Create a tag in Strapi"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{tag_data['slug']}-{timestamp}"

    # Prepare the tag data
    payload = {
        "data": {
            "name": tag_data["name"],
            "slug": unique_slug,
            "description": tag_data["description"],
        }
    }

    # Send the request
    response = requests.post(f"{STRAPI_API_URL}/tags", headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        tag = response.json()
        print(f"✅ Created tag: {tag_data['name']} (ID: {tag['data']['id']})")
        return tag["data"]["id"]
    else:
        print(f"❌ Failed to create tag: {tag_data['name']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def create_article(
    article_data, seo_data, author_id, category_ids, tag_ids, image_id=None
):
    """Create an article in Strapi with all fields including SEO and CTAs"""
    # Add timestamp to make slug unique
    timestamp = int(time.time())
    unique_slug = f"{article_data['slug']}-{timestamp}"

    # Current date in ISO format
    current_date = datetime.now().isoformat()

    # Update structured data with dynamic values if it exists
    if "structuredData" in seo_data:
        # Update dates
        seo_data["structuredData"]["datePublished"] = current_date
        seo_data["structuredData"]["dateModified"] = current_date

        # Update headline and description
        seo_data["structuredData"]["headline"] = article_data["title"]
        seo_data["structuredData"]["description"] = article_data["summary"]

        # TODO: Update mainEntityOfPage
        # # Update mainEntityOfPage
        # seo_data["structuredData"]["mainEntityOfPage"][
        #     "@id"
        # ] = f"https://yourwebsite.com/blog/{unique_slug}"

        # Image will be updated in the upload_to_strapi function

    # Ensure metaSocial entries have the correct image ID
    if "metaSocial" in seo_data and image_id:
        for social in seo_data["metaSocial"]:
            social["image"] = image_id

    # Prepare the article data
    payload = {
        "data": {
            "title": article_data["title"],
            "slug": unique_slug,
            "summary": article_data["summary"],
            "content": article_data["content"],
            "author": author_id,
            "categories": category_ids,
            "tags": tag_ids,
            "readingTime": article_data.get(
                "readingTime", len(article_data["content"].split()) // 200 + 1
            ),
            "publishDate": current_date,
            "updateDate": current_date,
            "featured": True,
            "seo": seo_data,
            "cta": article_data.get("ctas", []),
            "references": article_data.get("references", []),
        }
    }

    # Add featured image if provided
    if image_id:
        payload["data"]["featuredImage"] = image_id
    else:
        print(
            "⚠️ Warning: No featured image provided. Article may not display correctly."
        )

    # Send the request
    response = requests.post(
        f"{STRAPI_API_URL}/articles", headers=headers, json=payload
    )

    # Check if the request was successful
    if response.status_code == 200:
        article = response.json()
        print(
            f"✅ Created article: {article_data['title']} (ID: {article['data']['id']})"
        )
        return article["data"]["id"]
    else:
        print(f"❌ Failed to create article: {article_data['title']}")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        return None


def display_content(content):
    """Display the generated content in a readable format"""
    print("\n" + "=" * 80)
    print("📝 GENERATED CONTENT PREVIEW")
    print("=" * 80 + "\n")

    # Article basics
    article = content["article"]
    print(f"📌 TITLE: {article['title']}")
    print(f"🔗 SLUG: {article['slug']}")
    print(f"⏱️ READING TIME: {article.get('readingTime', 'Not specified')} minutes\n")

    print(f"📋 SUMMARY:\n{article['summary']}\n")

    # SEO data
    seo = content["seo"]
    print("🔍 SEO METADATA:")
    print(f"  Title: {seo['metaTitle']}")
    print(f"  Description: {seo['metaDescription']}")
    print(f"  Keywords: {seo['keywords']}")

    # Structured Data
    if "structuredData" in seo:
        print("\n🔖 STRUCTURED DATA (LD+JSON):")
        print(f"  Type: {seo['structuredData'].get('@type', 'Not specified')}")
        print(f"  Headline: {seo['structuredData'].get('headline', 'Not specified')}")
    else:
        print("\n⚠️ No structured data found in SEO metadata")

    # Social Media Metadata
    if "metaSocial" in seo:
        print("\n📱 SOCIAL MEDIA METADATA:")
        for social in seo["metaSocial"]:
            print(f"  {social['socialNetwork']}:")
            print(f"    Title: {social['title']}")
            print(f"    Description: {social['description']}")
            if "image" in social:
                print(
                    f"    Image: {social['image']} (Will be replaced with featured image)"
                )
            else:
                print(f"    ⚠️ No image specified for {social['socialNetwork']}")
    else:
        print("\n⚠️ No social media metadata found")

    # Author
    author = content["author"]
    print(f"\n👤 AUTHOR: {author['name']} ({author['role']})")
    print(f"  Expertise: {author['expertise']}\n")

    # Categories and Tags
    print("🏷️ CATEGORIES:")
    for category in content["categories"]:
        print(f"  - {category['name']}")

    print("\n🔖 TAGS:")
    for tag in content["tags"]:
        print(f"  - {tag['name']}")

    # Content preview (first 500 chars)
    print("\n📄 CONTENT PREVIEW:")
    preview = (
        article["content"][:500] + "..."
        if len(article["content"]) > 500
        else article["content"]
    )
    print(preview)

    print("\n" + "=" * 80)


def get_available_images():
    """Get a list of available images in the images directory"""
    images_dir = os.path.join(os.path.dirname(__file__), "images")
    if not os.path.exists(images_dir):
        print("⚠️ Images directory not found. Using test.png as fallback.")
        return ["test.png"]

    image_files = [
        f
        for f in os.listdir(images_dir)
        if os.path.isfile(os.path.join(images_dir, f))
        and f.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp"))
    ]

    if not image_files:
        print("⚠️ No images found in images directory. Using test.png as fallback.")
        return ["test.png"]

    return image_files


def select_image():
    """Let the user select an image from available images"""
    image_files = get_available_images()

    print("\n🖼️ Available Images:")
    for i, image in enumerate(image_files):
        print(f"{i+1}. {image}")

    while True:
        try:
            choice = input("\nSelect an image by number: ")
            selected_index = int(choice) - 1

            if 0 <= selected_index < len(image_files):
                selected_image = image_files[selected_index]

                # Determine the full path
                if selected_image == "test.png":
                    image_path = os.path.join(os.path.dirname(__file__), selected_image)
                else:
                    image_path = os.path.join(
                        os.path.dirname(__file__), "images", selected_image
                    )

                print(f"✅ Selected image: {selected_image}")
                return image_path
            else:
                print("❌ Invalid selection. Please try again.")
        except ValueError:
            print("❌ Please enter a valid number.")


def upload_to_strapi(content, selected_author, image_path=None):
    """Upload the generated content to Strapi"""
    print("\n🚀 Starting upload to Strapi...\n")

    # If no image path provided, prompt user to select one
    if not image_path:
        print("📸 A featured image is required for the article.")
        image_path = select_image()

    # Upload featured image
    image_id = upload_image(
        image_path,
        f"{content['article']['slug']}_featured",
        f"Featured image for article: {content['article']['title']}",
    )

    if not image_id:
        print("❌ Failed to upload image. Exiting.")
        return False

    # TODO: Update structured data with image URL (placeholder, will be replaced in frontend)
    # # Update structured data with image URL (placeholder, will be replaced in frontend)
    # if "structuredData" in content["seo"]:
    #     content["seo"]["structuredData"][
    #         "image"
    #     ] = f"https://example.com/uploads/image-{image_id}.png"

    # Update metaSocial entries with the image ID
    if "metaSocial" in content["seo"]:
        for social in content["seo"]["metaSocial"]:
            social["image"] = image_id
            print(
                f"✅ Updated {social['socialNetwork']} social image with ID: {image_id}"
            )

    # Handle author - use the pre-selected author
    author_id = None

    # If the author has an ID, it's an existing author
    if "id" in selected_author:
        author_id = selected_author["id"]
        print(
            f"✅ Using pre-selected author: {selected_author['name']} (ID: {author_id})"
        )
    else:
        # Need to create the author with a profile picture
        print(f"📸 Uploading profile picture for author: {selected_author['name']}")
        profile_image_path = select_image()
        profile_image_id = upload_image(
            profile_image_path,
            f"{selected_author['name']}_profile",
            f"Profile picture of {selected_author['name']}, {selected_author['role']}",
        )

        author_id = create_author(selected_author, profile_image_id)
        if not author_id:
            print("❌ Failed to create author. Exiting.")
            return False

        print(f"✅ Created author: {selected_author['name']} (ID: {author_id})")

    # Get existing categories and select or create new ones
    existing_categories = get_categories()
    category_ids = select_or_create_categories(
        content["categories"], existing_categories
    )

    # Get existing tags and select or create new ones
    existing_tags = get_tags()
    tag_ids = select_or_create_tags(content["tags"], existing_tags)

    # Create article
    print("📝 Creating article...")
    article_id = create_article(
        content["article"], content["seo"], author_id, category_ids, tag_ids, image_id
    )

    if article_id:
        print("\n✨ Content upload complete!")
        print(f"✅ Created article: {content['article']['title']}")
        print(f"✅ Used author: {selected_author['name']} (ID: {author_id})")
        print(f"✅ Used {len(category_ids)} categories")
        print(f"✅ Used {len(tag_ids)} tags")
        print(f"✅ Featured image: ID {image_id}")
        return True
    else:
        print("❌ Failed to create article.")
        return False


def main():
    """Main function to generate and upload SEO content"""
    # Read topic from SEO_INSTRUCT.md
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, "SEO_INSTRUCT.md")

    try:
        with open(input_file, "r") as f:
            topic = f.read().strip()
    except FileNotFoundError:
        print(
            f"❌ Error: {input_file} not found. Please create this file with your SEO topic."
        )
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error reading {input_file}: {str(e)}")
        sys.exit(1)

    if not topic:
        print("❌ Error: SEO_INSTRUCT.md is empty. Please add your topic to the file.")
        sys.exit(1)

    print(f"📖 Read topic from {input_file}: {topic}")

    # Get existing authors
    existing_authors = get_authors()
    selected_author = None

    if existing_authors:
        print("\nAvailable Authors:")
        for i, author in enumerate(existing_authors):
            print(
                f"{i+1}. {author['attributes']['name']} - {author['attributes'].get('role', 'No role specified')}"
            )
        print(f"{len(existing_authors)+1}. Create a new author")

        while True:
            try:
                choice = input(
                    "\nSelect an author by number (or press Enter to create a new author): "
                )
                if choice.strip() == "":
                    # Default to creating a new author
                    break
                else:
                    selected_index = int(choice) - 1

                if 0 <= selected_index < len(existing_authors):
                    author_attrs = existing_authors[selected_index]["attributes"]
                    selected_author = {
                        "id": existing_authors[selected_index]["id"],
                        "name": author_attrs["name"],
                        "slug": author_attrs["slug"],
                        "email": author_attrs.get(
                            "email",
                            f"{author_attrs['name'].lower().replace(' ', '.')}@example.com",
                        ),
                        "bio": author_attrs.get("bio", f"Expert in {topic}"),
                        "role": author_attrs.get("role", "Content Writer"),
                        "expertise": author_attrs.get("expertise", topic.title()),
                    }
                    print(f"✅ Selected author: {selected_author['name']}")
                    break
                elif selected_index == len(existing_authors):
                    # Create new author - will be handled below
                    break
                else:
                    print("❌ Invalid selection. Please try again.")
            except ValueError:
                print("❌ Please enter a valid number.")

    # If no author selected, prompt for new author details
    if not selected_author:
        print("\n📝 Let's create a new author for this article.")
        author_name = input("Enter author name: ")
        author_role = input(
            "Enter author role (e.g., Content Writer, SEO Specialist): "
        )
        author_expertise = (
            input(f"Enter author expertise (default: {topic.title()}): ")
            or topic.title()
        )
        author_email = (
            input(
                f"Enter author email (default: {author_name.lower().replace(' ', '.')}@example.com): "
            )
            or f"{author_name.lower().replace(' ', '.')}@example.com"
        )
        author_bio = (
            input(f"Enter author bio (or press Enter for default): ")
            or f"Expert in {author_expertise} with years of experience in creating valuable content about {topic}."
        )

        # Create slug from name
        author_slug = author_name.lower().replace(" ", "-")

        selected_author = {
            "name": author_name,
            "slug": author_slug,
            "email": author_email,
            "bio": author_bio,
            "role": author_role,
            "expertise": author_expertise,
            "socialLinks": [],
        }

        # Ask for social links
        add_social = input(
            "\nWould you like to add social media links for this author? (y/n): "
        ).lower()
        if add_social in ["y", "yes"]:
            platforms = ["Twitter", "LinkedIn", "Facebook", "Instagram"]
            for platform in platforms:
                add_platform = input(f"Add {platform}? (y/n): ").lower()
                if add_platform in ["y", "yes"]:
                    username = input(f"Enter {platform} username: ")
                    url = f"https://{platform.lower()}.com/{username}"
                    if platform == "LinkedIn":
                        url = f"https://linkedin.com/in/{username}"

                    selected_author["socialLinks"].append(
                        {"platform": platform, "url": url, "username": username}
                    )

        print(f"✅ Created author profile for: {selected_author['name']}")

    # Now generate content with the selected author
    print(f"\n🧠 Generating SEO-optimized content for topic: {topic}...")
    print(f"👤 Using author: {selected_author['name']}")

    # Generate content
    content = generate_seo_content(topic, selected_author)
    if not content:
        print("❌ Failed to generate content. Exiting.")
        sys.exit(1)

    # Display the generated content
    display_content(content)

    # Ask for confirmation
    confirmation = input(
        "\nDo you want to upload this content to Strapi? (y/n): "
    ).lower()
    if confirmation in ["y", "yes"]:
        # Upload to Strapi
        success = upload_to_strapi(content, selected_author)
        if success:
            print("\n🎉 Article successfully uploaded to Strapi CMS!")
        else:
            print("\n❌ There was an issue uploading to Strapi.")
    else:
        print("\n✋ Upload cancelled.")
        # Save to file option
        save_option = input(
            "Would you like to save the generated content to a file instead? (y/n): "
        ).lower()
        if save_option in ["y", "yes"]:
            filename = f"seo_article_{int(time.time())}.json"
            with open(filename, "w") as f:
                json.dump(content, f, indent=2)
            print(f"✅ Content saved to {filename}")


if __name__ == "__main__":
    main()
