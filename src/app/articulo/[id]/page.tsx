import Article from '@/components/pages/Article';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Article id={id} />;
}
