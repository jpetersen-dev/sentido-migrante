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
            {heroContent.titleMain} <br className="hidden sm:block"/><span className="text-olivo-dark">{heroContent.titleHighlight}</span>
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
              className="px-8 py-4 bg-olivo-dark hover:bg-bosque-dark text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_5px_15px_rgba(81,103,80,0.3)] hover:shadow-[0_8px_25px_rgba(81,103,80,0.5)] hover:-translate-y-0.5 active:scale-95"
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

      {/* Services summary with dynamic modals */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
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
                    <button className="text-sm font-bold text-white bg-bosque hover:bg-bosque-dark px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                      Agendar <MoveRight size={14}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
                  <span className="text-sm font-bold text-bosque uppercase tracking-widest">{teamData[selectedPro].role}</span>
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

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-bluegrey-900">Lo que dicen nuestros pacientes</h2>
          <p className="text-bluegrey-600 font-light text-lg max-w-2xl">Experiencias reales de quienes han dado el paso para cuidar su salud mental a la distancia.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testinomialsData.slice(0, 6).map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-cream-200 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group">
              <Quote className="absolute top-8 right-8 text-cream-200 w-12 h-12 -z-0 rotate-180 transition-transform duration-500 group-hover:scale-110 group-hover:text-cream-300" />
              <div className="relative z-10 flex-1 flex flex-col">
                <p className="text-bluegrey-800 font-light text-[15px] leading-relaxed mb-8 flex-1">"{review.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-cream-100 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-bluegrey-50 border border-cream-200 flex items-center justify-center text-bluegrey-600 font-bold text-sm shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-bluegrey-900 text-sm">{review.author}</span>
                    <span className="text-bluegrey-500 text-xs font-medium uppercase tracking-wider">{review.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles preview */}
      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-bluegrey-900 font-display">Recursos</h2>
            <p className="text-bluegrey-600 font-medium">Artículos y herramientas para ti</p>
          </div>
          <Link href="/recursos" className="text-bosque font-bold text-sm hidden sm:block hover:underline">Ver todos</Link>
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
      </section>
      
      {/* Descubre Section */}
      <DescubreSection onOpenPro={setSelectedPro} teamData={teamData} />
    </div>
  );
}
