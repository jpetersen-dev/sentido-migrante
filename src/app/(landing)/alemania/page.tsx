import { Metadata } from 'next';
import Alemania from '@/components/pages/Alemania';

export const metadata: Metadata = {
  title: 'Psicoterapia en Alemania para Hispanohablantes | Sentido Migrante',
  description: 'Psicoterapia online en español para hispanohablantes en Alemania. Evita listas de espera del seguro público. Acompañamiento clínico inmediato.',
};

export default function AlemaniaPage() {
  return <Alemania />;
}
