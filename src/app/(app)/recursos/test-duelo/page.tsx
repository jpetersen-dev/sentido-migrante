import { Metadata } from 'next';
import TestDuelo from '@/components/pages/TestDuelo';

export const metadata: Metadata = {
  title: 'Test de Duelo Migratorio y Síndrome de Ulises | Sentido Migrante',
  description: 'Evalúa tu nivel de estrés por desarraigo y duelo migratorio de forma confidencial con nuestro cuestionario clínico interactivo.',
};

export default function TestDueloPage() {
  return <TestDuelo />;
}
