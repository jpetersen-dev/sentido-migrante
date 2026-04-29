import Services from '@/components/pages/Services';
import { getServices } from '@/lib/strapi';

export const revalidate = 60;

export default async function Page() {
  const servicesData = await getServices();
  return <Services servicesData={servicesData} />;
}
