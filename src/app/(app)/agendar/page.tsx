import { Suspense } from 'react';
import Booking from '@/components/pages/Booking';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] text-bluegrey-600">
        <div className="w-12 h-12 border-4 border-bosque border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-semibold text-sm">Cargando agendamiento...</p>
      </div>
    }>
      <Booking />
    </Suspense>
  );
}

