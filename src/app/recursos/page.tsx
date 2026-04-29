import Resources from '@/components/pages/Resources';
import { getResources } from '@/lib/strapi';

export const revalidate = 60;

export default async function Page() {
  const resourcesContent = await getResources();
  return <Resources resourcesContent={resourcesContent} />;
}
