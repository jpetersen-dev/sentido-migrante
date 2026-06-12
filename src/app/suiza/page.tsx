import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sentido Migrante | Suiza',
  description: 'Psicoterapia online para la comunidad hispanohablante en Suiza. Acompañamiento clínico adaptado y accesible en tu idioma.',
};

export default function SuizaPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 animate-in fade-in duration-500">
      {/* Header Container */}
      <div className="mb-8 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-bosque-dark bg-menta px-3 py-1 rounded-full mb-4 inline-block">
          Suiza / CHF
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-bluegrey-900 mb-4">
          Psicoterapia en tu propio idioma para hispanohablantes en Suiza
        </h1>
        <p className="text-bluegrey-700 font-sans leading-relaxed mb-6">
          Acompañamiento clínico de alto estándar y calidez humana. Evita las largas listas de espera locales y sana en tu lengua materna, bajo un precio de sesión transparente adaptado a la realidad suiza.
        </p>
      </div>

      {/* Pricing and Local Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-bosque mb-4">
              <Shield size={24} />
              <h2 className="text-xl font-bold font-display text-bluegrey-900">Encuadre y Copagos</h2>
            </div>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              El sistema de salud suizo cuenta con reglas particulares para copagos y franquicias. Nuestro acompañamiento está pensado para darte acceso clínico directo, inmediato y sin intermediarios.
            </p>
          </div>
          <span className="text-xs text-bluegrey-400 font-medium font-sans">Consulta la posibilidad de reembolso de tu seguro complementario.</span>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col justify-between bg-cream-50">
          <div>
            <div className="flex items-center gap-3 text-bosque mb-4">
              <Globe size={24} />
              <h2 className="text-xl font-bold font-display text-bluegrey-900">Costo de Sesión Preferencial</h2>
            </div>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              Ofrecemos una tarifa competitiva ajustada para la comunidad en Suiza.
            </p>
            <div className="text-4xl font-extrabold text-bosque-dark font-display mb-4">
              60 CHF <span className="text-sm font-normal text-bluegrey-500">/ sesión</span>
            </div>
          </div>
          <Link href="/agendar?country=CH" className="w-full py-3.5 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2">
            Agendar Sesión <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Additional localized resources list */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold font-display text-bluegrey-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-bosque" />
          ¿Por qué elegir Sentido Migrante en Suiza?
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-bluegrey-700 list-inside font-medium font-sans">
          <li className="flex items-start gap-2">✓ Atención en tu idioma nativo sin necesidad de traducir tu dolor.</li>
          <li className="flex items-start gap-2">✓ Especialistas experimentados en duelo y transición migratoria.</li>
          <li className="flex items-start gap-2">✓ Sin listas de espera de meses.</li>
          <li className="flex items-start gap-2">✓ Sesiones 100% online y confidenciales desde la comodidad de tu hogar.</li>
        </ul>
      </div>
    </div>
  );
}
