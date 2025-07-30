#!/usr/bin/env python3
"""
Streamlit Article Generator for Strapi CMS

A user-friendly web interface for generating and uploading SEO-optimized articles.
Designed for non-technical users to easily create content.
"""

import os
import sys
import json
import time
import requests
import streamlit as st
import tempfile
import shutil
from datetime import datetime
from openai import AzureOpenAI
from urllib.parse import urlparse

# Configuration - using Streamlit secrets
STRAPI_API_URL = st.secrets.get("STRAPI_API_URL", "http://localhost:1337")
STRAPI_API_TOKEN = st.secrets.get("STRAPI_API_TOKEN")
AZURE_OPENAI_API_KEY = st.secrets.get("AZURE_OPENAI_API_KEY")
AZURE_OPENAI_ENDPOINT = st.secrets.get("AZURE_OPENAI_ENDPOINT")

# Ensure we have the /api suffix for API calls if not already present
if STRAPI_API_URL and not STRAPI_API_URL.endswith("/api"):
    STRAPI_API_URL = STRAPI_API_URL + "/api"

# Headers for API requests
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {STRAPI_API_TOKEN}",
}

auth_header = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"}

# Initialize Azure OpenAI client (only if credentials are available)
client = None
if AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT:
    try:
        client = AzureOpenAI(
            api_key=AZURE_OPENAI_API_KEY,
            api_version="2024-07-01-preview",
            azure_endpoint=AZURE_OPENAI_ENDPOINT,
        )
    except Exception as e:
        st.error(f"Failed to initialize Azure OpenAI client: {e}")
        client = None

# System prompt for SEO content generation
SEO_SYSTEM_PROMPT = """
You are an expert SEO content writer with deep knowledge of creating high-traffic, engaging articles.

Your task is to create a comprehensive, SEO-optimized article based on the provided topic. 
Follow these guidelines:

1. NEVER use H1 headings in the content. ALWAYS start with H2 (##) markdown titles and use H3 (###), H4 (####) for subsections.
2. Include relevant keywords naturally throughout the text.
3. Create engaging, informative content that provides real value to readers.
4. Structure the content with clear sections, bullet points, and numbered lists where appropriate.
5. Include examples, case studies, or data points to support claims.
6. Add a compelling call-to-action.
7. Ensure the content is original and plagiarism-free.
8. Optimize for both search engines and human readers.
9. Include relevant internal and external linking opportunities.
10. Suggest meta title, meta description, and focus keywords that will maximize search visibility.
11. NEVER EVER generate placeholder URLs, you are a SEO expert, only use real URLs that I provide you with or things that you know. This is extremely important in the meta fields too.
12. ALWAYS use https://bugninja.ai as the base domain for all structured data and canonical URLs.
13. DO NOT GENERATE CTAs and references in the markdown article field since those are generated in another field.

IMPORTANT SEO CHARACTER LIMITS:
- Meta Title: Maximum 60 characters (will be truncated in search results if longer)
- Meta Description / Summary: Maximum 160 characters (will be truncated in search results if longer)
- URL/Slug: Keep under 75 characters, use hyphens between words
- Headlines (H2, H3): Keep under 70 characters for readability
- Focus Keywords: 3-5 keywords/phrases maximum, each keyword should be used at least twice in the content
- Every keyword that you list in the keywords field should be used in the content at least twice.

The output should be a JSON object with all the fields required by Strapi CMS, following the exact structure provided.
"""


def is_valid_url(url):
    """Validate if a string is a valid URL"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc]) and result.scheme in [
            "http",
            "https",
        ]
    except:
        return False


def check_password():
    """Returns `True` if the user had the correct password."""

    def password_entered():
        """Checks whether a password entered by the user is correct."""
        if st.session_state["password"] == st.secrets["password"]:
            st.session_state["password_correct"] = True
            del st.session_state["password"]  # Don't store password.
        else:
            st.session_state["password_correct"] = False

    # First run, show inputs for username + password.
    if "password_correct" not in st.session_state:
        st.text_input(
            "Password", type="password", on_change=password_entered, key="password"
        )
        return False
    # Password correct.
    elif st.session_state["password_correct"]:
        return True
    # Password incorrect, show input + error.
    else:
        st.text_input(
            "Password", type="password", on_change=password_entered, key="password"
        )
        st.error("😕 User not known or password incorrect")
        return False


def init_streamlit():
    """Initialize Streamlit page configuration"""
    st.set_page_config(
        page_title="Article Generator",
        page_icon="📝",
        layout="wide",
        initial_sidebar_state="collapsed",
    )

    st.title("📝 Article Generator for Bugninja Blog")
    st.markdown("Generate SEO-optimized articles for the Bugninja blog with ease!")
    st.markdown("---")


@st.cache_data(ttl=300)  # Cache for 5 minutes
def get_authors():
    """Get all authors from Strapi"""
    try:
        response = requests.get(f"{STRAPI_API_URL}/authors?populate=*", headers=headers)
        if response.status_code == 200:
            authors = response.json()
            if authors.get("data") and len(authors["data"]) > 0:
                return authors["data"]
        return []
    except Exception as e:
        st.error(f"Failed to fetch authors: {str(e)}")
        return []


def save_uploaded_image(uploaded_file):
    """Save uploaded image to temporary location and return path"""
    if uploaded_file is not None:
        # Create temporary file
        temp_dir = tempfile.mkdtemp()
        temp_path = os.path.join(temp_dir, uploaded_file.name)

        # Save uploaded file
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getvalue())

        return temp_path
    return None


def generate_seo_content(topic, author, cta_text, cta_link, references_list):
    """Generate SEO-optimized content using Azure OpenAI"""

    # Create a progress bar
    progress_bar = st.progress(0)
    status_text = st.empty()

    status_text.text("🧠 Connecting to AI...")
    progress_bar.progress(25)

    try:
        # Prepare references text from list
        references_text = ""
        if references_list and any(ref.strip() for ref in references_list):
            valid_refs = [ref.strip() for ref in references_list if ref.strip()]
            references_text = (
                f"\n\nInclude these references in the JSON:\n" + "\n".join(valid_refs)
            )

        # Prepare CTA text
        cta_instruction = ""
        if cta_text and cta_link:
            cta_instruction = (
                f"\n\nUse this CTA in the article:\nText: {cta_text}\nLink: {cta_link}"
            )

        status_text.text("🤖 Generating content...")
        progress_bar.progress(50)

        # Create the prompt
        json_template = """
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
            "canonicalURL": "https://bugninja.ai/blog/article-slug",
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

        full_prompt = f"""
        Create a complete SEO-optimized article based on this topic:
        
        {topic}
        
        Use the following REAL author information:
        - Name: {author['name']}
        - Role: {author['role']}
        - Email: {author['email']}
        - Bio: {author['bio']}
        - Expertise: {author['expertise']}
        
        {cta_instruction}
        {references_text}
        
        FIXED INSTRUCTIONS (MUST FOLLOW):
        1. Use H2 markdown titles (##) as the main headings in the content - NEVER use H1 (#)
        2. Use these base URLs to fill up the structuredData ld+json and SEO meta tags with canonicalURL:
           - Site: https://bugninja.ai  
           - Blog: https://bugninja.ai/blog
           - Set canonicalURL in SEO section to: https://bugninja.ai/blog/[article-slug]
        3. All structured data should use https://bugninja.ai as the base domain
        4. Meta tags should reference https://bugninja.ai/blog for the blog section
        
        Include all metadata, categories, and tags. Make sure to include structured data for SEO.
        
        Return a JSON object with the complete article structure following this EXACT format:
        
        {json_template}
        
        IMPORTANT: The keywords listed in the SEO section MUST appear at least twice in the article content.
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SEO_SYSTEM_PROMPT},
                {"role": "user", "content": full_prompt},
            ],
            temperature=0.7,
            max_tokens=4000,
        )

        status_text.text("✨ Processing response...")
        progress_bar.progress(75)

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
        seo_data = json.loads(json_str)

        # Ensure the author data is correct (replace with our real author data if needed)
        if "author" in seo_data:
            # Check if the author name matches our real author
            if seo_data["author"]["name"] != author["name"]:
                st.info(
                    f"⚠️ Replacing generated author with real author: {author['name']}"
                )
                seo_data["author"] = author
        else:
            st.info(f"⚠️ Adding missing author information: {author['name']}")
            seo_data["author"] = author

        # Validate and truncate SEO fields that exceed character limits
        if "seo" in seo_data:
            # Meta title should be max 60 characters
            if len(seo_data["seo"].get("metaTitle", "")) > 60:
                original_title = seo_data["seo"]["metaTitle"]
                seo_data["seo"]["metaTitle"] = original_title[:57] + "..."
                st.warning(
                    f"⚠️ Meta title truncated from {len(original_title)} to 60 characters"
                )

            # Meta description should be max 160 characters
            if len(seo_data["seo"].get("metaDescription", "")) > 160:
                original_desc = seo_data["seo"]["metaDescription"]
                seo_data["seo"]["metaDescription"] = original_desc[:157] + "..."
                st.warning(
                    f"⚠️ Meta description truncated from {len(original_desc)} to 160 characters"
                )

            # Slug should be under 75 characters
            if "article" in seo_data and len(seo_data["article"].get("slug", "")) > 75:
                original_slug = seo_data["article"]["slug"]
                seo_data["article"]["slug"] = original_slug[:72] + "..."
                st.warning(
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
                st.info("⚠️ Adding missing social media metadata...")
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
            st.info("⚠️ Adding missing structured data to SEO...")
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
                    "@id": f"https://bugninja.ai/blog/{seo_data['article']['slug']}",
                },
            }
        elif "structuredData" in seo_data["seo"]:
            # Ensure the author in structured data matches our real author
            if (
                seo_data["seo"]["structuredData"].get("author", {}).get("name")
                != author["name"]
            ):
                st.info(f"⚠️ Updating author in structured data to: {author['name']}")
                seo_data["seo"]["structuredData"]["author"] = {
                    "@type": "Person",
                    "name": author["name"],
                }

        # Ensure reading time is calculated if missing
        if "article" in seo_data and not seo_data["article"].get("readingTime"):
            word_count = len(seo_data["article"]["content"].split())
            seo_data["article"]["readingTime"] = max(
                1, word_count // 200
            )  # ~200 words per minute

        # Add CTA if provided
        if cta_text and cta_link:
            if "article" in seo_data:
                seo_data["article"]["ctas"] = [
                    {
                        "text": cta_text,
                        "url": cta_link,
                        "type": "primary",
                        "newTab": True,
                        "icon": "arrow-right",
                    }
                ]

        status_text.text("✅ Content generated successfully!")
        progress_bar.progress(100)

        time.sleep(1)  # Brief pause to show completion
        status_text.empty()
        progress_bar.empty()

        return seo_data

    except json.JSONDecodeError as e:
        st.error(f"❌ Error parsing AI response: {e}")
        return None
    except Exception as e:
        st.error(f"❌ Error generating content: {e}")
        return None


def display_article_preview(content):
    """Display the generated article in a beautiful format"""

    article = content["article"]
    seo = content["seo"]
    author = content["author"]

    # Main article info
    st.header("📰 Generated Article")

    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader(f"🎯 {article['title']}")
        st.caption(f"🔗 Slug: {article['slug']}")
        st.caption(
            f"⏱️ Reading time: {article.get('readingTime', 'Not specified')} minutes"
        )

    with col2:
        st.info(f"👤 **Author:** {author['name']}\n📧 **Role:** {author['role']}")

    # Summary
    st.markdown("### 📋 Summary")
    st.write(article["summary"])

    # SEO Information
    with st.expander("🔍 SEO Metadata", expanded=True):
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("**Meta Title:**")
            st.code(seo["metaTitle"])
            st.caption(f"Characters: {len(seo['metaTitle'])}/60")

            st.markdown("**Keywords:**")
            st.code(seo["keywords"])

        with col2:
            st.markdown("**Meta Description:**")
            st.code(seo["metaDescription"])
            st.caption(f"Characters: {len(seo['metaDescription'])}/160")

    # Categories and Tags
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("### 🏷️ Categories")
        for category in content["categories"]:
            st.markdown(f"🏷️ `{category['name']}`")

    with col2:
        st.markdown("### 🔖 Tags")
        for tag in content["tags"]:
            st.markdown(f"🔖 `{tag['name']}`")

    # Full Article Content
    st.markdown("### 📄 Article Content")

    # Display the full content in a nice container
    with st.container():
        st.markdown(article["content"])

    # CTAs
    if article.get("ctas"):
        st.markdown("### 🎯 Call to Actions")
        for cta in article["ctas"]:
            st.info(f"**{cta['text']}** → {cta['url']}")

    # References
    if article.get("references"):
        st.markdown("### 📚 References")
        for ref in article["references"]:
            st.markdown(
                f"- [{ref['title']}]({ref['url']}) - {ref.get('publisher', 'N/A')}"
            )


def upload_image(image_path, name=None, alt_text=None):
    """Upload an image to Strapi media library"""
    try:
        files = {
            "files": (os.path.basename(image_path), open(image_path, "rb"), "image/png")
        }

        data = {}
        if name or alt_text:
            file_info = {}
            if name:
                file_info["name"] = name
            if alt_text:
                file_info["alternativeText"] = alt_text
            data = {"fileInfo": json.dumps(file_info)}

        response = requests.post(
            f"{STRAPI_API_URL}/upload", headers=auth_header, files=files, data=data
        )

        if response.status_code == 200:
            uploaded_file = response.json()[0]
            return uploaded_file["id"]
        else:
            st.error(f"Failed to upload image: {response.text}")
            return None

    except Exception as e:
        st.error(f"Error uploading image: {e}")
        return None


def create_category(category_data):
    """Create a category in Strapi"""
    timestamp = int(time.time())
    unique_slug = f"{category_data['slug']}-{timestamp}"

    payload = {
        "data": {
            "name": category_data["name"],
            "slug": unique_slug,
            "description": category_data["description"],
        }
    }

    response = requests.post(
        f"{STRAPI_API_URL}/categories", headers=headers, json=payload
    )

    if response.status_code == 200:
        category = response.json()
        return category["data"]["id"]
    else:
        st.error(f"Failed to create category: {category_data['name']}")
        return None


def create_tag(tag_data):
    """Create a tag in Strapi"""
    timestamp = int(time.time())
    unique_slug = f"{tag_data['slug']}-{timestamp}"

    payload = {
        "data": {
            "name": tag_data["name"],
            "slug": unique_slug,
            "description": tag_data["description"],
        }
    }

    response = requests.post(f"{STRAPI_API_URL}/tags", headers=headers, json=payload)

    if response.status_code == 200:
        tag = response.json()
        return tag["data"]["id"]
    else:
        st.error(f"Failed to create tag: {tag_data['name']}")
        return None


def upload_to_strapi(content, author_id, image_path):
    """Upload the complete article to Strapi"""

    progress_bar = st.progress(0)
    status_text = st.empty()

    try:
        # Upload featured image
        status_text.text("📸 Uploading featured image...")
        progress_bar.progress(20)

        if not image_path or not os.path.exists(image_path):
            st.error("No valid image provided for upload")
            return False

        image_id = upload_image(
            image_path,
            f"{content['article']['slug']}_featured",
            f"Featured image for article: {content['article']['title']}",
        )

        if not image_id:
            st.error("Failed to upload featured image")
            return False

        # Create categories
        status_text.text("🏷️ Creating categories...")
        progress_bar.progress(40)

        category_ids = []
        for category in content["categories"]:
            category_id = create_category(category)
            if category_id:
                category_ids.append(category_id)

        # Create tags
        status_text.text("🔖 Creating tags...")
        progress_bar.progress(60)

        tag_ids = []
        for tag in content["tags"]:
            tag_id = create_tag(tag)
            if tag_id:
                tag_ids.append(tag_id)

        # Create article
        status_text.text("📝 Creating article...")
        progress_bar.progress(80)

        timestamp = int(time.time())
        unique_slug = f"{content['article']['slug']}-{timestamp}"
        current_date = datetime.now().isoformat()

        # Update structured data with dynamic values if it exists
        if "structuredData" in content["seo"]:
            # Update dates
            content["seo"]["structuredData"]["datePublished"] = current_date
            content["seo"]["structuredData"]["dateModified"] = current_date

            # Update headline and description
            content["seo"]["structuredData"]["headline"] = content["article"]["title"]
            content["seo"]["structuredData"]["description"] = content["article"][
                "summary"
            ]

            # Update mainEntityOfPage with final slug
            content["seo"]["structuredData"]["mainEntityOfPage"][
                "@id"
            ] = f"https://bugninja.ai/blog/{unique_slug}"

        # Update metaSocial with image ID
        if "metaSocial" in content["seo"]:
            for social in content["seo"]["metaSocial"]:
                social["image"] = image_id

        payload = {
            "data": {
                "title": content["article"]["title"],
                "slug": unique_slug,
                "summary": content["article"]["summary"],
                "content": content["article"]["content"],
                "author": author_id,
                "categories": category_ids,
                "tags": tag_ids,
                "readingTime": content["article"].get(
                    "readingTime", len(content["article"]["content"].split()) // 200 + 1
                ),
                "publishDate": current_date,
                "updateDate": current_date,
                "featured": True,
                "seo": content["seo"],
                "cta": content["article"].get("ctas", []),
                "references": content["article"].get("references", []),
                "featuredImage": image_id,
            }
        }

        response = requests.post(
            f"{STRAPI_API_URL}/articles", headers=headers, json=payload
        )

        if response.status_code == 200:
            status_text.text("✅ Article uploaded successfully!")
            progress_bar.progress(100)
            return True
        else:
            st.error(f"Failed to create article: {response.text}")
            return False

    except Exception as e:
        st.error(f"Error uploading to Strapi: {e}")
        return False


def main():
    """Main Streamlit app"""
    init_streamlit()

    # Check password protection
    if not check_password():
        st.stop()

    # Check for required secrets
    missing_secrets = []
    required_secrets = [
        "STRAPI_API_TOKEN",
        "AZURE_OPENAI_API_KEY",
        "AZURE_OPENAI_ENDPOINT",
    ]
    for secret in required_secrets:
        if not st.secrets.get(secret):
            missing_secrets.append(secret)

    if missing_secrets:
        st.error("🔧 Configuration Error")
        st.markdown("**Missing secrets in `.streamlit/secrets.toml`:**")
        for secret in missing_secrets:
            st.markdown(f"- `{secret}`")

        st.markdown("### 📝 Setup Instructions")
        st.markdown(
            "1. Create a `.streamlit/secrets.toml` file in the `scripts/cms` directory."
        )
        st.markdown("2. Add the missing secrets to this file:")

        st.code(
            f"""# Strapi Configuration
STRAPI_API_URL = "http://localhost:1337"
STRAPI_API_TOKEN = "your-strapi-api-token"

# Azure OpenAI Configuration  
AZURE_OPENAI_API_KEY = "your-azure-openai-key"
AZURE_OPENAI_ENDPOINT = "your-azure-openai-endpoint"

# App Password
password = "your-password"
"""
        )

        st.markdown("3. Restart the app.")
        st.stop()

    # Initialize session state
    if "generated_content" not in st.session_state:
        st.session_state.generated_content = None
    if "show_article" not in st.session_state:
        st.session_state.show_article = False
    if "references" not in st.session_state:
        st.session_state.references = [
            "https://bugninja.ai",
            "https://www.selenium.dev",
        ]
    if "uploaded_image_path" not in st.session_state:
        st.session_state.uploaded_image_path = None

    # Main page layout - organized in sections
    if not st.session_state.show_article:
        # Article Configuration Section
        with st.container():
            st.header("📝 Article Configuration")
            st.caption("Set up all the details for your article generation")

        # Create main sections in columns
        col1, col2 = st.columns([1, 1], gap="large")

        with col1:
            with st.container():
                # Author selection
                st.subheader("👤 Author Selection")
                authors = get_authors()

                if not authors:
                    st.error("❌ No authors found in CMS. Please add authors first.")
                    st.stop()

                author_options = {
                    f"{author['attributes']['name']} ({author['attributes'].get('role', 'No role')})": author
                    for author in authors
                }
                selected_author_key = st.selectbox(
                    "Select Author",
                    list(author_options.keys()),
                    help="Choose the author for this article",
                )
                selected_author_data = author_options[selected_author_key]

                # Convert author data to the format expected by the generator
                selected_author = {
                    "id": selected_author_data["id"],
                    "name": selected_author_data["attributes"]["name"],
                    "slug": selected_author_data["attributes"]["slug"],
                    "email": selected_author_data["attributes"].get("email", ""),
                    "bio": selected_author_data["attributes"].get("bio", ""),
                    "role": selected_author_data["attributes"].get("role", ""),
                    "expertise": selected_author_data["attributes"].get(
                        "expertise", ""
                    ),
                }

                # Show selected author info
                with st.expander("👤 Author Details", expanded=False):
                    st.write(f"**Name:** {selected_author['name']}")
                    st.write(f"**Role:** {selected_author['role']}")
                    st.write(f"**Email:** {selected_author['email']}")
                    if selected_author["bio"]:
                        st.write(f"**Bio:** {selected_author['bio']}")

        with col2:
            with st.container():
                # CTA Configuration
                st.subheader("🎯 Call to Action")
                cta_text = st.text_input(
                    "CTA Text",
                    value="Try Bugninja for free",
                    help="The text for your call-to-action button",
                )
                cta_link = st.text_input(
                    "CTA Link",
                    value="https://bugninja.ai",
                    help="Where the CTA button should link to",
                )

                # CTA Preview
                if cta_text and cta_link:
                    with st.expander("🎯 CTA Preview", expanded=False):
                        st.info(f"**{cta_text}** → {cta_link}")

        st.divider()

        # References Section
        with st.container():
            st.subheader("📚 Reference URLs")
            st.caption("Add reference URLs that will be included in the article")

            # Create columns for better reference layout
            ref_col1, ref_col2 = st.columns([4, 1])

            with ref_col1:
                # Display existing references
                for i, ref in enumerate(st.session_state.references):
                    col_ref, col_del = st.columns([5, 1])
                    with col_ref:
                        new_ref = st.text_input(
                            f"Reference {i+1}",
                            value=ref,
                            key=f"ref_{i}",
                            help="Enter a valid URL",
                            label_visibility="collapsed" if i > 0 else "visible",
                        )
                        # Update the reference in session state
                        if new_ref != ref:
                            st.session_state.references[i] = new_ref

                        # Validate URL
                        if new_ref.strip() and not is_valid_url(new_ref.strip()):
                            st.error(f"❌ Invalid URL format for Reference {i+1}")

                    with col_del:
                        if st.button("🗑️", key=f"del_{i}", help="Delete this reference"):
                            st.session_state.references.pop(i)
                            st.rerun()

            with ref_col2:
                # Add new reference button
                st.write("")  # Add some spacing
                if st.button(
                    "➕ Add Reference",
                    help="Add a new reference URL",
                    use_container_width=True,
                ):
                    st.session_state.references.append("")
                    st.rerun()

        st.divider()

        # Image upload section
        with st.container():
            st.subheader("🖼️ Featured Image")
            st.caption(
                "Upload an image that will be used as the main visual for your article"
            )

            image_col1, image_col2 = st.columns([2, 1], gap="large")

            with image_col1:
                uploaded_file = st.file_uploader(
                    "Upload Featured Image",
                    type=["png", "jpg", "jpeg", "gif", "webp"],
                    help="Upload an image file for the article's featured image",
                )

                # Save uploaded image and store path
                if uploaded_file is not None:
                    st.session_state.uploaded_image_path = save_uploaded_image(
                        uploaded_file
                    )
                    st.success(f"✅ Image uploaded: {uploaded_file.name}")
                elif st.session_state.uploaded_image_path is None:
                    st.warning("⚠️ Please upload a featured image for your article")

            with image_col2:
                # Show image preview
                if uploaded_file is not None:
                    st.image(
                        uploaded_file,
                        caption="Featured Image Preview",
                        use_column_width=True,
                    )
                else:
                    st.info("📷 Image preview will appear here after upload")

        st.divider()

        # Topic Input Section
        with st.container():
            st.subheader("💭 Article Topic & Instructions")
            st.caption(
                "Describe what you want the article to be about. Be as detailed as possible."
            )

            # Load default content from SELENIUM_VS_BUGNINJA.md
            default_topic = """# ARTICLE TOPIC:
I want you to generate an article about Bugninja And selenium in which you compare our custom solution for AI based automated testing and it's advantages over selenium I want you to highlight features like self healing, and the fact that test managers and QA did not have to bother anymore with Test maintenance because we can detect if there is an update on the interface. You should also include that we do provide a playback function and that you can upload any sort of data like words, PDFs Excel gherkin to generate test case cases.

You may also want to create a table as a summary to higligh features. Make it informative not only marketingish.  

bugninja also supports:
CI/CD integration
Priority email & chat support
Unlimited runs
Test cases from Word, PDF, Excel, etc.
Scheduled runs"""

            topic = st.text_area(
                "Article Topic & Instructions",
                value=default_topic,
                height=300,
                help="Describe what you want the article to be about. Be as detailed as possible.",
                label_visibility="collapsed",
            )

        # Generate Button Section
        st.markdown("---")

        # Center the generate button
        col1, col2, col3 = st.columns([2, 2, 2])

        with col2:
            if st.button(
                "🚀 Generate Article",
                type="primary",
                use_container_width=True,
                help="Generate your SEO-optimized article",
            ):
                # Validation checks
                validation_errors = []

                if not topic.strip():
                    validation_errors.append("Please provide a topic for the article!")

                if not client:
                    validation_errors.append(
                        "Azure OpenAI client not initialized. Please check your environment variables."
                    )

                if not st.session_state.uploaded_image_path:
                    validation_errors.append(
                        "Please upload a featured image for your article!"
                    )

                # Validate references
                valid_references = []
                for i, ref in enumerate(st.session_state.references):
                    if ref.strip():
                        if is_valid_url(ref.strip()):
                            valid_references.append(ref.strip())
                        else:
                            validation_errors.append(
                                f"Reference {i+1} is not a valid URL"
                            )

                if validation_errors:
                    st.error("❌ Please fix the following issues:")
                    for error in validation_errors:
                        st.error(f"• {error}")
                else:
                    with st.spinner("Generating your article..."):
                        content = generate_seo_content(
                            topic, selected_author, cta_text, cta_link, valid_references
                        )

                        if content:
                            st.session_state.generated_content = content
                            st.session_state.selected_author = selected_author
                            st.session_state.show_article = True
                            st.rerun()
                        else:
                            st.error("Failed to generate article. Please try again.")

    else:
        # Show generated article
        if st.session_state.generated_content:
            display_article_preview(st.session_state.generated_content)

            st.divider()

            # Action buttons
            col1, col2, col3 = st.columns([1, 1, 1])

            with col1:
                if st.button(
                    "🗑️ Discard & Start Over", type="secondary", use_container_width=True
                ):
                    st.session_state.generated_content = None
                    st.session_state.show_article = False
                    st.session_state.uploaded_image_path = None
                    st.rerun()

            with col3:
                if st.button(
                    "📤 Upload to CMS", type="primary", use_container_width=True
                ):
                    if not st.session_state.uploaded_image_path:
                        st.error(
                            "No uploaded image found. Please go back and upload an image."
                        )
                    else:
                        with st.spinner("Uploading to CMS..."):
                            success = upload_to_strapi(
                                st.session_state.generated_content,
                                st.session_state.selected_author["id"],
                                st.session_state.uploaded_image_path,
                            )

                            if success:
                                st.success("🎉 Article successfully uploaded to CMS!")
                                st.balloons()
                                time.sleep(2)
                                # Reset for next article
                                st.session_state.generated_content = None
                                st.session_state.show_article = False
                                st.session_state.uploaded_image_path = None
                                st.rerun()
                            else:
                                st.error(
                                    "❌ Failed to upload article. Please try again."
                                )


if __name__ == "__main__":
    main()
