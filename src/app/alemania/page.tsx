import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sentido Migrante | Alemania',
  description: 'Psicoterapia online para la comunidad hispanohablante en Alemania. Acompañamiento clínico de alto estándar en tu propio idioma.',
};

export default function AlemaniaPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 animate-in fade-in duration-500">
      {/* Header Container */}
      <div className="mb-8 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-bosque-dark bg-menta px-3 py-1 rounded-full mb-4 inline-block">
          Alemania / EUR
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-bluegrey-900 mb-4">
          Psicoterapia en tu propio idioma para hispanohablantes en Alemania
        </h1>
        <p className="text-bluegrey-700 font-sans leading-relaxed mb-6">
          Acompañamiento clínico de primer nivel sin la barrera de las listas de espera tradicionales en Alemania. Espacio terapéutico empático y confidencial en tu lengua materna.
        </p>
      </div>

      {/* Pricing and Local Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-bosque mb-4">
              <Shield size={24} />
              <h2 className="text-xl font-bold font-display text-bluegrey-900">Listas de Espera y Cobertura</h2>
            </div>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              En Alemania, la espera promedio en el sistema de salud pública (Gesetzliche Krankenkasse) para acceder a terapia puede superar las 26 semanas. Ofrecemos una alternativa de consulta privada inmediata.
            </p>
          </div>
          <span className="text-xs text-bluegrey-400 font-medium font-sans">Ideal para quienes necesitan un soporte inmediato sin burocracia.</span>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col justify-between bg-cream-50">
          <div>
            <div className="flex items-center gap-3 text-bosque mb-4">
              <Globe size={24} />
              <h2 className="text-xl font-bold font-display text-bluegrey-900">Costo de Sesión Preferencial</h2>
            </div>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              Precio adaptado para brindar accesibilidad a los migrantes de habla hispana en Alemania.
            </p>
            <div className="text-4xl font-extrabold text-bosque-dark font-display mb-4">
              60 EUR <span className="text-sm font-normal text-bluegrey-500">/ sesión</span>
            </div>
          </div>
          <Link href="/agendar?country=DE" className="w-full py-3.5 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2">
            Agendar Sesión <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Localized advantages list */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold font-display text-bluegrey-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-bosque" />
          ¿Por qué elegir Sentido Migrante en Alemania?
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-bluegrey-700 list-inside font-medium font-sans">
          <li className="flex items-start gap-2">✓ Psicoterapeutas de habla hispana con experiencia transcultural.</li>
          <li className="flex items-start gap-2">✓ Tratamiento enfocado en las crisis del desarraigo y biculturalidad.</li>
          <li className="flex items-start gap-2">✓ Atención ágil y sin esperas burocráticas del seguro público.</li>
          <li className="flex items-start gap-2">✓ Resguardo absoluto de la confidencialidad de tu historial de salud.</li>
        </ul>
      </div>
    </div>
  );
}
