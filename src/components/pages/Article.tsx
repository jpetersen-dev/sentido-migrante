"use client";

import { ArrowLeft, Clock, Share2, Bookmark, Quote, MoveRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { resourcesContent } from '@/data/content';

export default function Article({ id }: { id?: string }) {
  const router = useRouter();
  
  // En un caso real, buscaríamos por ID. Aquí usamos el índice o fallback.
  const resourceIndex = id ? parseInt(id) : 0;
  const data = resourcesContent[resourceIndex] || resourcesContent[0];

  // Helper para calcular tiempo de lectura (Duplicado aquí para simplicidad, idealmente en utils)
  const calculateReadingTime = (text: string) => {
    if (!text) return "3 min";
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min`;
  };

  const readingTime = calculateReadingTime(data.content || data.title);

  return (
    <div className="flex flex-col w-full pb-20 bg-[#FDFCFB] min-h-screen">
      {/* Top Navigation - Fixed or sticky */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-bluegrey-600 hover:text-bosque-dark transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Volver a Recursos</span>
          </button>
          
          <div className="flex gap-4">
            <button className="text-bluegrey-400 hover:text-suculenta transition-colors">
              <Bookmark size={20} />
            </button>
            <button className="text-bluegrey-400 hover:text-suculenta transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Widescreen Focus */}
      <header className="w-full max-w-5xl mx-auto px-6 pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-suculenta/10 text-suculenta rounded-full text-[10px] font-bold uppercase tracking-widest border border-suculenta/20">
              {data.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-bluegrey-400 font-medium">
              <Clock size={14} className="text-suculenta" />
              <span>{readingTime} de lectura</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-display text-bluegrey-900 leading-[1.1] tracking-tight">
            {data.title}
          </h1>

          <p className="text-xl md:text-2xl text-bluegrey-600 font-light leading-relaxed max-w-3xl italic border-l-4 border-suculenta pl-6 my-4">
            {data.description || "Explorando la resiliencia y el bienestar en el camino migratorio."}
          </p>

          <div className="relative aspect-[21/9] w-full rounded-[32px] overflow-hidden shadow-2xl mt-4">
            <img 
              src={`https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600&auto=format&fit=crop&sig=${resourceIndex}`} 
              alt={data.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-16">
        {/* Author Badge */}
        <div className="flex items-center gap-4 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-cream-100">
          <div className="w-14 h-14 rounded-full bg-menta overflow-hidden border-2 border-white shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" 
              alt="Autor" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-bluegrey-900 text-lg leading-tight">Sentido Migrante Editorial</span>
            <span className="text-sm font-medium text-bluegrey-400 uppercase tracking-widest mt-0.5">Psicología Clínica · Mayo 2024</span>
          </div>
        </div>

        {/* Rich Text Area */}
        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-bluegrey-900 prose-p:text-bluegrey-700 prose-p:leading-relaxed prose-strong:text-bluegrey-900">
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-suculenta first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
            {data.description || "El proceso de adaptación en un nuevo país es una montaña rusa de emociones. Desde la euforia inicial hasta el inevitable choque cultural, cada paso requiere una profunda gestión de nuestras expectativas y necesidades emocionales."}
          </p>

          <p>
            {data.content || "En este artículo exploramos cómo construir una red de apoyo sólida desde cero, la importancia de validar nuestras propias emociones y cuándo es el momento adecuado para buscar acompañamiento profesional especializado en nuestra lengua materna."}
          </p>

          <div className="my-14 p-10 bg-suculenta/5 border-l-4 border-suculenta rounded-r-3xl italic text-2xl text-bosque-dark font-display quote-card relative overflow-hidden group shadow-sm">
            <Quote className="absolute -top-4 -right-4 w-32 h-32 opacity-5 rotate-12 transition-transform group-hover:scale-110" />
            "No estamos 'allá' ni estamos 'aquí'. Estamos en el camino, y ese camino es nuestro nuevo hogar. Aprender a habitarlo con paz es la clave del bienestar."
          </div>

          <h3>Estrategias de Adaptación Activa</h3>
          <p>
            Muchos migrantes cometen el error de esperar a "estar listos" para integrarse. La realidad es que la integración es un músculo que se entrena con pequeñas acciones cotidianas. 
          </p>
          
          <ul>
            <li><strong>Rutinas Ancla:</strong> Mantén pequeños hábitos de tu país de origen para dar seguridad a tu sistema nervioso.</li>
            <li><strong>Exposición Gradual:</strong> No intentes entender todo el primer día. Celebra las pequeñas victorias idiomáticas.</li>
            <li><strong>Espacios de Validación:</strong> Conecta con personas que estén pasando por lo mismo. Sentirte entendido es una medicina poderosa.</li>
          </ul>

          <div className="mt-16 p-8 rounded-[32px] bg-bosque-dark text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-suculenta/20 blur-[60px] rounded-full" />
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-suculenta/20 flex items-center justify-center text-suculenta text-xs italic font-display">i</span>
              Nota del Especialista
            </h4>
            <p className="text-cream-100/80 text-base leading-relaxed">
              Recuerda que el duelo migratorio es un proceso cíclico. Es normal sentir nostalgia en fechas señaladas. Lo importante es no permitir que esa nostalgia se convierta en un ancla que te impida avanzar.
            </p>
          </div>
        </article>

        {/* Engagement / Footer */}
        <footer className="mt-24 pt-12 border-t border-cream-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-bold text-bluegrey-900 text-xl font-display">¿Te gustaría profundizar en este tema?</h4>
              <p className="text-bluegrey-500 max-w-sm">Agenda una sesión personalizada para trabajar tus desafíos específicos.</p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="/agendar" className="px-8 py-3 bg-suculenta text-bosque-dark font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Agendar Sesión
                </Link>
                <button className="p-3 text-bluegrey-400 hover:text-suculenta transition-colors border border-cream-200 rounded-2xl">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 bg-cream-50/50 p-8 rounded-[32px] border border-cream-100 min-w-[280px]">
              <span className="text-xs font-bold text-bluegrey-400 uppercase tracking-[0.2em]">Síguenos para más</span>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-bluegrey-600 hover:text-suculenta">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-bluegrey-600 hover:text-suculenta">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-bluegrey-600 hover:text-suculenta">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
