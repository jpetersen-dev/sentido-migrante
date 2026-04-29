import { servicesData, teamData, testinomialsData, heroContent, resourcesContent } from '@/data/content';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export async function fetchFromStrapi(endpoint: string, fallback: any) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`, // Configurar token de acceso
      },
    });
    
    if (!res.ok) {
      return fallback;
    }
    
    const data = await res.json();
    // En Strapi v5, la respuesta suele venir en un array `data` u objeto `data`. 
    // Para simplificar y evitar que la app falle si los datos no tienen el formato exacto aún,
    // devolvemos fallback si data.data está vacío o no es un array en endpoints de colección.
    if (!data.data || (Array.isArray(data.data) && data.data.length === 0)) {
      return fallback;
    }
    
    return data.data;
  } catch (error) {
    // Si Strapi no está corriendo o hay error de red, usa el contenido estático
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
