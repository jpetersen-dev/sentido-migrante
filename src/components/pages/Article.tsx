"use client";

import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Article() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-12 bg-white min-h-screen">
      {/* Header Image & Top Nav */}
      <div className="relative h-64 md:h-96 w-full">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" 
          alt="Paisaje suizo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/recursos')} 
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-sm">
              <Bookmark size={20} />
            </button>
            <button className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-sm">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.65rem] font-bold text-white uppercase tracking-widest bg-bosque/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
              Expatriación
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-md">
              <Clock size={12} />
              <span>7 min de lectura</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight mb-2">
            El Duelo Migratorio: Navegando la Ansiedad Lejos de Casa
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 md:py-16">
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-cream-200">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" 
            alt="Lic. Martín Suárez" 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-bold text-bluegrey-900">Lic. Martín Suárez</span>
            <span className="text-sm font-medium text-bluegrey-500">Psicólogo Clínico · 12 de Octubre, 2023</span>
          </div>
        </div>

        <div className="prose prose-lg prose-bluegrey max-w-none">
          <p className="text-xl font-light leading-relaxed text-bluegrey-700 mb-8">
            Mudarse a un nuevo país suele presentarse como una aventura emocionante, un salto hacia 
            nuevas oportunidades y crecimiento personal. Sin embargo, detrás de las fotos en 
            redes sociales, existe un proceso emocional profundo y a menudo silencioso: el duelo migratorio.
          </p>

          <h2 className="text-2xl font-bold font-display text-bluegrey-900 mt-10 mb-4">¿Qué es el duelo migratorio?</h2>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            A diferencia de otros tipos de duelo, el duelo migratorio es parcial, recurrente y múltiple. 
            Es parcial porque el país de origen no desaparece y la posibilidad de volver siempre está presente. 
            Es recurrente porque se reactiva en fechas señaladas (Navidad, cumpleaños, eventos familiares). 
            Y es múltiple porque implica muchas pérdidas simultáneas: la lengua, la cultura, la familia, el estatus social y los paisajes conocidos.
          </p>

          <h2 className="text-2xl font-bold font-display text-bluegrey-900 mt-10 mb-4">La ansiedad como compañera de viaje</h2>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            La incertidumbre constante de los primeros meses (o años) puede desencadenar episodios significativos de ansiedad. 
            Al enfrentarnos a un sistema burocrático diferente, la barrera del idioma, o el simple hecho de no saber cómo 
            funciona el sistema de salud o el transporte público, nuestro sistema de alerta se mantiene hiperactivo.
          </p>
          <ul className="list-disc pl-6 text-bluegrey-600 font-light leading-relaxed space-y-2 mb-8">
            <li><strong>Fatiga cognitiva:</strong> El esfuerzo constante por entender y hacerse entender en otro idioma agota nuestros recursos mentales.</li>
            <li><strong>Síndrome del impostor:</strong> Sentir que no estamos a la altura en el nuevo entorno profesional.</li>
            <li><strong>Culpa del superviviente:</strong> Sensación de culpa por estar en un "lugar mejor" o por perderse momentos importantes en la vida de los seres queridos.</li>
          </ul>

          <div className="bg-menta border-l-4 border-olivo p-6 rounded-r-2xl my-10">
            <p className="text-bosque-dark font-medium italic">
              "Validar tus emociones es el primer paso indispensable. Sentirse triste, abrumado o ansioso en un país nuevo no significa que hayas fracasado en tu proyecto migratorio."
            </p>
          </div>

          <h2 className="text-2xl font-bold font-display text-bluegrey-900 mt-10 mb-4">Estrategias para transitarlo saludablemente</h2>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            <strong>1. Acepta y normaliza tus emociones:</strong> Permítete estar triste. El choque cultural es real y la fase de desilusión (después de la "luna de miel" inicial) es una parte completamente normal de la adaptación.
          </p>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            <strong>2. Construye tu "familia de adopción":</strong> Conecta con otros expatriados. Las comunidades de hispanohablantes suelen ser un gran apoyo inicial porque validan nuestra experiencia ("a mí también me pasa"), pero también intenta abrirte paulatinamente a locales para integrarte de forma más profunda.
          </p>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            <strong>3. Busca espacios de familiaridad:</strong> Escucha música de tu país, cocina recetas familiares, mantén vivas pequeñas tradiciones. Estos anclajes proporcionan seguridad emocional.
          </p>

          <h2 className="text-2xl font-bold font-display text-bluegrey-900 mt-10 mb-4">Cuándo buscar ayuda profesional</h2>
          <p className="text-bluegrey-600 font-light leading-relaxed mb-6">
            Si notas que la ansiedad te paraliza, que el aislamiento social es cada vez mayor, o que la tristeza interfiere con tus responsabilidades diarias, puede ser el momento de buscar acompañamiento terapéutico. En Sentido Migrante, entendemos estas dinámicas de primera mano y estamos aquí para acompañarte en tu idioma y desde tu marco cultural.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-16 pt-10 border-t border-cream-200 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="font-bold text-bluegrey-900 font-display">¿Te ha parecido útil?</span>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-cream-50 hover:bg-menta text-bluegrey-600 hover:text-bosque-dark font-medium rounded-xl transition-colors border border-cream-200 hover:border-suculenta">Sí</button>
                    <button className="px-4 py-2 bg-cream-50 hover:bg-cream-100 text-bluegrey-600 font-medium rounded-xl transition-colors border border-cream-200">No mucho</button>
                </div>
            </div>
            
            <button onClick={() => router.push('/agendar')} className="w-full sm:w-auto px-8 py-3 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98]">
                Agendar una sesión
            </button>
        </div>
      </div>
    </div>
  );
}
