import { servicesData, teamData, testinomialsData, heroContent, resourcesContent } from '@/data/content';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Merges a Strapi item with a static fallback item.
 * Guarantees that no keys present in fallback will be set to null/undefined/empty
 * and resolves relative image URLs from Strapi's media library.
 */
function mergeItem(item: any, fallbackItem: any) {
  if (!item) return fallbackItem;

  // Resolve image URL from Strapi v4/v5 media structures
  let image = item.image || item.img;
  if (image) {
    if (typeof image === 'object') {
      const url = image.url || image.data?.attributes?.url || image.data?.url;
      image = url ? (url.startsWith('/') ? `${STRAPI_URL}${url}` : url) : undefined;
    } else if (typeof image === 'string' && image.startsWith('/')) {
      image = `${STRAPI_URL}${image}`;
    }
  }

  // Create a base from the fallback item to ensure all keys are present with valid defaults
  const merged = { ...fallbackItem };

  // Overwrite only with valid, non-null/non-empty properties from Strapi
  for (const key in fallbackItem) {
    if (Object.prototype.hasOwnProperty.call(fallbackItem, key)) {
      if (item[key] !== undefined && item[key] !== null && item[key] !== '') {
        merged[key] = item[key];
      }
    }
  }

  // Resolve synonyms and media mappings
  if (image) {
    if (merged.image !== undefined) merged.image = image;
    if (merged.img !== undefined) merged.img = image;
  }

  // Map description variations
  if (fallbackItem.desc && (item.description || item.desc)) {
    merged.desc = item.desc || item.description;
  }

  if (fallbackItem.fullDesc && (item.fullDescription || item.fullDesc)) {
    merged.fullDesc = item.fullDesc || item.fullDescription;
  }

  return merged;
}

export async function fetchFromStrapi(endpoint: string, fallback: any) {
  const controller = new AbortController();
  // 4 second timeout: ensures cold-starts on Render don't hang Next.js/Vercel serverless requests
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.warn(`[Strapi] Failed to fetch '${endpoint}' (${res.status}). Falling back to static data.`);
      return fallback;
    }
    
    const data = await res.json();
    
    if (!data || !data.data || (Array.isArray(data.data) && data.data.length === 0)) {
      return fallback;
    }
    
    // Handle list endpoint vs single type endpoint
    if (Array.isArray(data.data)) {
      return data.data.map((item: any, index: number) => {
        const fallbackItem = Array.isArray(fallback) 
          ? (fallback[index] || fallback[0]) 
          : fallback;
        
        // Handle Strapi v4 nested attributes or v5 root level
        const fields = item.attributes ? { id: item.id, ...item.attributes } : item;
        return mergeItem(fields, fallbackItem);
      });
    } else {
      const fields = data.data.attributes ? { id: data.data.id, ...data.data.attributes } : data.data;
      return mergeItem(fields, fallback);
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn(`[Strapi] Timeout fetching '${endpoint}' (4s limit reached). Using static fallback.`);
    } else {
      console.warn(`[Strapi] Network error fetching '${endpoint}':`, error.message || error);
    }
    return fallback;
  }
}

export async function getServices() {
  return await fetchFromStrapi('services', servicesData);
}

export async function getTeam() {
  return await fetchFromStrapi('team-members', teamData);
}

export async function getTestimonials() {
  return await fetchFromStrapi('testimonials', testinomialsData);
}

export async function getHeroContent() {
  return await fetchFromStrapi('hero-content', heroContent);
}

export async function getResources() {
  return await fetchFromStrapi('resources', resourcesContent);
}
