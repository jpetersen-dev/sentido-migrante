"use client";

import { Calendar as CalendarIcon, Clock, MoveRight, X, Quote, User, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DescubreSection from '@/components/DescubreSection';

// Map string names from Strapi to actual Lucide components
const IconMap: Record<string, any> = {
  User,
  Users,
  Globe
};

export default function Home({
  servicesData,
  teamData,
  testinomialsData,
  heroContent,
  resourcesContent
}: {
  servicesData: any[];
  teamData: any[];
  testinomialsData: any[];
  heroContent: any;
  resourcesContent: any[];
}) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedPro, setSelectedPro] = useState<number | null>(null);
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (!testinomialsData || testinomialsData.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testinomialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testinomialsData]);
  
  // Resources dots sync
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollWidth > clientWidth) {
        setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
      }
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 relative">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden rounded-b-3xl md:rounded-3xl mt-0 md:mt-6 bg-bluegrey-50 text-bluegrey-900 border-b md:border border-cream-200 shadow-inner">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-bluegrey-50/80"></div>
        
        <div className="relative px-6 pt-16 pb-16 md:py-24 flex flex-col items-start max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-6 text-[0.65rem] font-bold tracking-widest text-bosque-dark uppercase bg-menta rounded-full glass shadow-sm"
          >
            {heroContent.badge}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.05] tracking-tight mb-6 text-balance drop-shadow-sm text-bluegrey-900"
          >
            {heroContent.titleMain} <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-bosque-dark to-suculenta">{heroContent.titleHighlight}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-bluegrey-600 mb-10 max-w-lg md:max-w-xl leading-relaxed font-light"
          >
            {heroContent.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/agendar" 
              className="px-8 py-4 bg-gradient-to-br from-bosque-dark via-bosque to-olivo hover:from-bosque hover:via-olivo-dark hover:to-olivo text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_5px_15px_rgba(81,103,80,0.3)] hover:shadow-[0_8px_25px_rgba(81,103,80,0.5)] hover:-translate-y-0.5 active:scale-95"
            >
              <CalendarIcon size={20} />
              <span>{heroContent.ctaText}</span>
            </Link>
            <button 
              onClick={() => {
                const el = document.getElementById('descubre');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white hover:bg-cream-50 backdrop-blur-sm border border-cream-200 text-bluegrey-800 focus:outline-none focus:ring-2 focus:ring-olivo/30 hover:border-suculenta font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <span>{heroContent.ctaSecondaryText}</span>
              <MoveRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Manifesto — Hall de recepción */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        {/* Subtle warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 -z-10" />
        
        {/* Decorative floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-[5]">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-suculenta/20"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-menta/30"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-suculenta/[0.04] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6">
          {/* Decorative accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-bosque-dark to-suculenta rounded-full mb-10"
          />

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight text-bluegrey-900 max-w-3xl mb-12 text-balance"
          >
            Sánate en el idioma donde viven{' '}
            <span className="relative inline-block">
              <span className="relative z-10">tus emociones.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-1 left-0 w-full h-3 bg-menta/60 -z-0 origin-left rounded-sm"
              />
            </span>
          </motion.h2>

          {/* Two-column text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-bluegrey-700 leading-relaxed font-light"
            >
              Migrar es mucho más que cambiar de coordenadas; es una reconfiguración radical de quién eres. En el sistema de salud europeo, a menudo te enfrentas a listas de espera interminables o a una frialdad clínica que no comprende tus códigos.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-bluegrey-700 leading-relaxed font-light"
            >
              En <strong className="font-bold text-bluegrey-900">Sentido Migrante</strong>, creemos que la psicoterapia profunda solo ocurre cuando no hay barreras. No solo hablamos tu idioma, compartimos tu raíz. Desde el Análisis Existencial y el Psicoanálisis, te acompañamos a habitar tu nueva realidad en Europa, no solo como un superviviente, sino con un{' '}
              <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-bosque-dark to-suculenta">propósito claro</strong>.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services summary with dynamic modals */}
      <section className="w-full bg-cream-100 py-24 border-y border-cream-200">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-bluegrey-900 font-display tracking-tight">Nuestros Servicios</h2>
            <p className="text-bluegrey-600 font-light text-lg">Terapias adaptadas a tu momento vital</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((srv, i) => {
            const Icon = typeof srv.icon === 'string' ? IconMap[srv.icon] : srv.icon;
            return (
              <motion.div 
                key={i} 
                onClick={() => setSelectedService(i)}
                className="bg-white rounded-3xl shadow-sm border border-cream-200 flex flex-col hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
              >
                <div className="relative h-48 w-full bg-bluegrey-100 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm text-bluegrey-800">
                     <Icon size={20} strokeWidth={2} />
                  </div>
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-bluegrey-900 leading-tight flex-1">{srv.title}</h3>
                    <div className="px-2.5 py-1 bg-menta border border-menta text-bosque-dark rounded-lg text-sm font-semibold shrink-0">
                      {srv.price}
                    </div>
                  </div>
                  <p className="text-sm text-bluegrey-600 leading-relaxed font-medium mb-6">
                    {srv.desc}
                  </p>
                  
                  <div className="h-px w-full bg-cream-200 mt-auto mb-4"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-bluegrey-500 font-medium text-sm">
                      <Clock size={16} />
                      <span>{srv.duration}</span>
                    </div>
                    <button className="text-sm font-bold text-white bg-gradient-to-r from-bosque-dark to-olivo hover:from-bosque hover:to-olivo-dark px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                      Agendar <MoveRight size={14}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bluegrey-900/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/85 backdrop-blur-2xl border border-white/60 rounded-[2rem] max-w-lg w-full flex flex-col relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-44 w-full bg-bluegrey-200">
                <img src={servicesData[selectedService].image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                <button 
                  className="absolute top-4 right-4 p-2 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full text-bluegrey-900 transition-colors"
                  onClick={() => setSelectedService(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pb-8 pt-0 flex flex-col relative">
                <div className={`absolute -top-10 left-8 p-3 rounded-2xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-white/60 ${servicesData[selectedService].color}`}>
                  {(() => {
                    const Icon = typeof servicesData[selectedService].icon === 'string' 
                      ? IconMap[servicesData[selectedService].icon] 
                      : servicesData[selectedService].icon;
                    return <Icon size={32} strokeWidth={1.5} />;
                  })()}
                </div>

                <div className="mt-8">
                  <h3 className="text-3xl font-bold text-bluegrey-900 font-display leading-tight mb-3">
                    {servicesData[selectedService].title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-bluegrey-500 mb-6">
                    <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg shadow-sm border border-white/50 text-sm">
                      <Clock size={16} className="text-bosque" />
                      <span className="font-semibold text-bluegrey-700">{servicesData[selectedService].duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-menta/60 px-3 py-1.5 rounded-lg shadow-sm border border-menta text-sm">
                      <span className="font-bold text-bosque-dark">{servicesData[selectedService].price}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-cream-200 mb-6 relative">
                    <div className="absolute right-0 top-0 h-full w-1/4 bg-white"></div>
                  </div>

                  <p className="text-bluegrey-600 leading-relaxed font-light text-[15px]">
                    {servicesData[selectedService].fullDesc}
                  </p>
                </div>
                
                <Link href={`/agendar?service=${servicesData[selectedService].title}`} className="mt-8 w-full py-4 bg-bosque/90 backdrop-blur-sm border border-olivo hover:bg-bosque-dark text-white font-bold rounded-xl text-center shadow-lg shadow-bosque-dark/20 active:scale-95 transition-all">
                  Seleccionar profesionales
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPro !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-bluegrey-900/60 backdrop-blur-sm"
            onClick={() => setSelectedPro(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/85 backdrop-blur-2xl border border-white/60 rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 max-w-lg w-full flex flex-col gap-6 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 p-2 bg-cream-100/50 hover:bg-cream-100 rounded-full text-bluegrey-500 hover:text-bluegrey-900 transition-colors"
                onClick={() => setSelectedPro(null)}
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-md">
                   <img src={teamData[selectedPro].img} alt="" className="w-full h-full object-cover"/>
                 </div>
                 <div className="flex flex-col">
                   <h3 className="text-2xl font-bold text-bluegrey-900 font-display">
                     {teamData[selectedPro].name}
                   </h3>
                   <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-bosque-dark to-suculenta uppercase tracking-widest">{teamData[selectedPro].role}</span>
                 </div>
               </div>
              <div className="h-px w-full bg-cream-200"></div>
              <p className="text-bluegrey-700 leading-relaxed font-medium">
                {teamData[selectedPro].bio}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials - Interactive Carousel */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-menta/50 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, -50, 0] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] bg-suculenta/40 rounded-full blur-[80px]" 
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-6xl mx-auto relative z-10">
           {/* Left side: Heading and avatars */}
           <div className="lg:w-1/3 flex flex-col gap-6 w-full">
             <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-bluegrey-900">
               Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-suculenta to-bosque-dark">nuestros pacientes</span>
             </h2>
             <p className="text-bluegrey-600 font-light text-lg">
               Personas que encontraron su espacio seguro estando lejos de casa.
             </p>
             
             <div className="flex flex-wrap gap-3 mt-4">
                {testinomialsData.map((t, i) => (
                   <button 
                     key={i}
                     onClick={() => setActiveTestimonial(i)}
                     className={`relative h-12 rounded-full px-4 transition-all duration-300 flex items-center justify-center font-bold text-sm overflow-hidden ${activeTestimonial === i ? 'bg-bosque text-white shadow-md' : 'bg-white/80 backdrop-blur-sm text-bluegrey-500 hover:bg-cream-100 hover:text-bluegrey-800 shadow-sm border border-cream-200'}`}
                     style={{ width: activeTestimonial === i ? 'auto' : '48px', padding: activeTestimonial === i ? '0 1rem' : '0' }}
                   >
                     {activeTestimonial === i ? (
                       <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 whitespace-nowrap">
                         <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">{t.author.charAt(0)}</div>
                         <span>{t.author}</span>
                       </motion.div>
                     ) : (
                       <span>{t.author.charAt(0)}</span>
                     )}
                   </button>
                ))}
             </div>
           </div>

           {/* Right side: Active Testimonial Card */}
           <div className="lg:w-2/3 relative w-full h-[400px] md:h-[350px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTestimonial}
                 initial={{ opacity: 0, scale: 0.95, x: 20 }}
                 animate={{ opacity: 1, scale: 1, x: 0 }}
                 exit={{ opacity: 0, scale: 0.95, x: -20 }}
                 transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                 className="absolute inset-0 bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col"
               >
                 <Quote className="text-olivo/10 w-24 h-24 absolute top-4 right-6 rotate-180" />
                 <p className="text-xl md:text-2xl font-display font-medium text-bluegrey-800 leading-relaxed text-balance flex-1 relative z-10 italic">
                   "{testinomialsData[activeTestimonial]?.text}"
                 </p>
                 <div className="flex items-center gap-4 mt-8 relative z-10 border-t border-cream-200/50 pt-6">
                   <div className="w-12 h-12 rounded-full bg-menta/50 border border-menta flex items-center justify-center text-bosque-dark font-bold text-lg shrink-0">
                     {testinomialsData[activeTestimonial]?.author.charAt(0)}
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-bluegrey-900 text-lg">{testinomialsData[activeTestimonial]?.author}</span>
                     <span className="text-bosque font-semibold text-xs uppercase tracking-widest">{testinomialsData[activeTestimonial]?.location}</span>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </section>

      {/* Articles preview */}
      <section className="w-full bg-cream-50 py-20 border-t border-cream-200 mt-12">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold text-bluegrey-900 font-display">Recursos</h2>
              <p className="text-bluegrey-600 font-medium">Artículos y herramientas para ti</p>
            </div>
            <Link href="/recursos" className="font-bold text-sm hidden sm:block hover:underline text-transparent bg-clip-text bg-gradient-to-r from-bosque-dark to-suculenta hover:from-bosque hover:to-olivo">Ver todos</Link>
          </div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar"
          >
          {resourcesContent.map((item, i) => (
            <div key={i} className="min-w-[280px] max-w-[300px] shrink-0 bg-white rounded-[2rem] shadow-sm border border-cream-200 overflow-hidden snap-start hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-40 bg-bluegrey-200 relative">
                <div className={`absolute inset-0 ${item.color} opacity-40 mix-blend-multiply`}></div>
                <img src={`https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop&sig=${i}`} alt="Articulo" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest self-start px-2 py-1 rounded-md bg-cream-100 text-bluegrey-600">{item.category}</span>
                <h4 className="font-bold text-bluegrey-900 leading-tight text-lg">{item.title}</h4>
                <div className="flex items-center gap-1 text-xs text-bluegrey-400 font-medium mt-1">
                  <Clock size={12} />
                  <span>{item.time} lectura</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
             {[0, 1, 2].map(idx => {
               // Basic logic for 3 elements.
               const isActive = Math.abs(scrollProgress - (idx / 2)) < 0.25; 
               return (
                 <div key={idx} className={`h-2 rounded-full transition-all ${isActive ? 'w-6 bg-bosque' : 'w-2 bg-cream-300'}`} />
               )
             })}
          </div>
        </div>
      </section>
      
      {/* Descubre Section */}
      <DescubreSection onOpenPro={setSelectedPro} teamData={teamData} />
    </div>
  );
}
