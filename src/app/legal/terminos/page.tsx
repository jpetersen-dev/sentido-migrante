import { Metadata } from 'next';
import { ShieldAlert, Scale, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Sentido Migrante',
  description: 'Términos y condiciones legales de la plataforma de psicoterapia Sentido Migrante.',
};

export default function TerminosPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 max-w-3xl mx-auto animate-in fade-in duration-500">
      {/* Title block */}
      <div className="mb-8 border-b border-cream-200 pb-6">
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-2">Términos y Condiciones</h1>
        <p className="text-bluegrey-500 text-xs font-sans">Última actualización: 11 de junio de 2026</p>
      </div>

      {/* Terms list */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-6 font-sans text-bluegrey-700 leading-relaxed text-sm">
        
        {/* Section 1: Chile Jurisdiction */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-900 flex items-center gap-2">
            <Scale size={20} className="text-bosque" />
            1. Jurisdicción y Regulación Aplicable
          </h2>
          <p>
            Los presentes términos y condiciones se rigen bajo las leyes vigentes de la República de Chile. Cualquier controversia o disputa judicial que surja en relación con el uso de este portal web, agendamiento de citas o pago de servicios de psicoterapia será sometida a la jurisdicción exclusiva de los tribunales de la ciudad de Santiago de Chile.
          </p>
        </section>

        {/* Section 2: VAT Exemption */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-950 flex items-center gap-2">
            <ShieldAlert size={20} className="text-bosque" />
            2. Facturación y Exención de IVA (Chile)
          </h2>
          <p>
            De acuerdo con la legislación tributaria aplicable en la República de Chile, las consultas médicas y de psicología clínica prestadas por psicólogos profesionales y centros debidamente acreditados califican como prestaciones sanitarias profesionales exentas del Impuesto al Valor Agregado (IVA). Los precios de las sesiones expuestos en este sitio web corresponden al valor total final a pagar por el paciente.
          </p>
        </section>

        {/* Section 3: 12 Hours Rule */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-950 flex items-center gap-2">
            <HelpCircle size={20} className="text-bosque" />
            3. Regla de 12 Horas para Cancelaciones y Cambios
          </h2>
          <p>
            Para asegurar la disponibilidad y respeto del tiempo de los profesionales clínicos, cualquier solicitud de reprogramación o cancelación de sesión deberá comunicarse con un mínimo de <strong>12 horas de anticipación</strong>. Si el paciente no asiste a la sesión programada o solicita una reprogramación fuera de este límite de 12 horas, la sesión se considerará efectuada y se cobrará al 100% de su valor, sin derecho a devolución ni reagendamiento gratuito.
          </p>
        </section>
      </div>
    </div>
  );
}
