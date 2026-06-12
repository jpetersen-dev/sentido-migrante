import Home from '@/components/pages/Home';
import { getServices, getTeam, getTestimonials, getHeroContent, getResources } from '@/lib/strapi';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function Page() {
  const [servicesData, teamData, testinomialsData, heroContent, resourcesContent] = await Promise.all([
    getServices(),
    getTeam(),
    getTestimonials(),
    getHeroContent(),
    getResources()
  ]);

  return (
    <Home 
      servicesData={servicesData} 
      teamData={teamData} 
      testinomialsData={testinomialsData} 
      heroContent={heroContent} 
      resourcesContent={resourcesContent} 
    />
  );
}
