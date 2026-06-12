import { Metadata } from 'next';
import { Download, Shield, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guía de Bienestar Emocional para Migrantes | Sentido Migrante',
  description: 'Descarga de forma gratuita nuestra guía para cuidar tu salud mental y adaptarte a tu nuevo hogar en Europa.',
};

export default function GuiaBienestarPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 animate-in fade-in duration-500 max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-bosque bg-menta px-3 py-1 rounded-full mb-4 inline-block font-sans">
          E-Book Descargable Gratis
        </span>
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-3">
          Guía de Bienestar Emocional para Migrantes
        </h1>
        <p className="text-bluegrey-600 font-sans leading-relaxed text-sm">
          Herramientas y consejos prácticos elaborados por psicólogos clínicos para afrontar la soledad, el choque cultural y organizar tu estabilidad emocional en Europa.
        </p>
      </div>

      {/* Guide Ebook Scaffolding Grid */}
      <div className="bg-white rounded-3xl border border-cream-200 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        {/* Book Visual representation placeholder */}
        <div className="w-full md:w-1/3 aspect-[3/4] bg-cream-100 rounded-2xl border border-cream-200 flex flex-col items-center justify-center p-6 shadow-inner text-center shrink-0">
          <BookOpen size={48} className="text-bosque mb-3" />
          <span className="text-xs font-bold font-display text-bluegrey-700 leading-tight">GUÍA DE BIENESTAR</span>
          <span className="text-[10px] text-bluegrey-400 mt-2 font-sans">Edición Europa</span>
        </div>

        {/* Lead Capture Form */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-display text-bluegrey-900 mb-3">¿Qué encontrarás en este manual?</h3>
            <ul className="text-xs text-bluegrey-600 space-y-2 font-medium font-sans">
              <li className="flex items-start gap-1.5">✓ Claves para comprender el proceso del duelo migratorio.</li>
              <li className="flex items-start gap-1.5">✓ Ejercicios diarios de arraigo y grounding.</li>
              <li className="flex items-start gap-1.5">✓ Estrategias para construir una red de apoyo desde cero.</li>
            </ul>
          </div>

          <form className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Nombre completo" 
              required
              className="w-full px-4 py-3 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all font-sans text-sm"
            />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              required
              className="w-full px-4 py-3 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all font-sans text-sm"
            />
            <button className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2 font-sans">
              <Download size={18} /> Descargar Guía Gratuita
            </button>
          </form>
        </div>
      </div>

      {/* Compliance note */}
      <div className="mt-6 flex items-start gap-2 text-xs text-bluegrey-500 max-w-md mx-auto">
        <Shield size={18} className="text-bluegrey-400 shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed">
          Respetamos tu privacidad al 100%. Podrás darte de baja de nuestros recursos educativos con un solo clic en cualquier momento. Cumplimos con el RGPD.
        </p>
      </div>
    </div>
  );
}
