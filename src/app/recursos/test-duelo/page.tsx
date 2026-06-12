import { Metadata } from 'next';
import { Shield, HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Test del Síndrome de Ulises | Sentido Migrante',
  description: 'Evalúa tu nivel de duelo migratorio y estrés por desarraigo con nuestro cuestionario interactivo clínico del Síndrome de Ulises.',
};

export default function TestDueloPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 animate-in fade-in duration-500 max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-bosque bg-menta px-3 py-1 rounded-full mb-4 inline-block font-sans">
          Cuestionario Clínico
        </span>
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-3">
          Test de Duelo Migratorio (Síndrome de Ulises)
        </h1>
        <p className="text-bluegrey-600 font-sans leading-relaxed text-sm">
          El Síndrome de Ulises es el estrés extremo asociado a la migración. Completa esta autoevaluación confidencial de forma gratuita para entender tu nivel de desgaste emocional actual.
        </p>
      </div>

      {/* Test Interactive Skeleton Container */}
      <div className="bg-white rounded-3xl border border-cream-200 p-8 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
        <div className="p-4 rounded-full bg-cream-50 text-bosque mb-6">
          <HelpCircle size={40} />
        </div>
        
        <p className="text-bluegrey-500 mb-6 text-center font-medium font-sans max-w-md">
          Este test consta de preguntas diseñadas para evaluar factores como el aislamiento, la nostalgia, la presión cultural y el bienestar somático.
        </p>

        {/* Lead capture / start button */}
        <div className="w-full flex flex-col gap-4 max-w-sm">
          <input 
            type="text" 
            placeholder="Tu nombre (opcional)" 
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all font-sans text-sm"
          />
          <input 
            type="email" 
            placeholder="Tu correo electrónico (para recibir el reporte)" 
            required
            className="w-full px-4 py-3 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all font-sans text-sm"
          />
          <button className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2 font-sans">
            Comenzar Autoevaluación <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Consent & Compliance */}
      <div className="mt-6 flex items-start gap-2 text-xs text-bluegrey-500 max-w-md mx-auto">
        <Shield size={18} className="text-bluegrey-400 shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed">
          Tus respuestas son estrictamente confidenciales. Al enviar tus datos consientes el procesamiento de tu información de conformidad con nuestra Política de Privacidad (cumplimiento RGPD).
        </p>
      </div>
    </div>
  );
}
