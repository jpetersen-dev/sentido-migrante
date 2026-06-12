import { Metadata } from 'next';
import Suiza from '@/components/pages/Suiza';

export const metadata: Metadata = {
  title: 'Psicoterapia en Suiza para Hispanohablantes | Sentido Migrante',
  description: 'Psicoterapia online en español para la comunidad migrante en Suiza. Consulta psicológica inmediata para el duelo migratorio y adaptación cultural.',
};

export default function SuizaPage() {
  return <Suiza />;
}
