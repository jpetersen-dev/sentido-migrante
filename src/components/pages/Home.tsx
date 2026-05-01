"use client";

import { Calendar as CalendarIcon, Clock, MoveRight, ArrowLeft, X, Quote, User, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  const windowRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: windowScroll } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"]
  });

  // Resources dots sync
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-multiply"></div>
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
            {heroContent.titleMain} <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-bosque-dark to-suculenta">{heroContent.titleHighlight}</span>
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
      <section className="relative w-full py-24 md:py-32 bg-[#F1F0EC]">
        {/* Subtle texture and color depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-menta/30 via-transparent to-suculenta/20 -z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

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

      {/* Window: Serenity Transition */}
      <section className="relative h-[40vh] min-h-[300px] w-screen ml-[calc(50%-50vw)] overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop')" }}></div>
        <div className="absolute inset-0 bg-bosque-dark/20 backdrop-brightness-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F0EC] via-transparent to-white"></div>
      </section>


      {/* Services summary with dynamic modals */}
      <section className="w-full py-24 border-y border-cream-200/60 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/60 to-transparent pointer-events-none -z-10" />
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
                        Agendar <MoveRight size={14} />
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
                  <img src={teamData[selectedPro].img} alt="" className="w-full h-full object-cover" />
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


      {/* Photographic Transition / Divider */}
      <section 
        ref={windowRef}
        className="relative h-[65vh] min-h-[450px] flex items-center justify-center w-screen ml-[calc(50%-50vw)] z-0" 
        style={{ clipPath: "inset(0)" }}
      >
        {/* Fixed Background for true Parallax */}
        <motion.div 
          style={{ 
            scale: useTransform(windowScroll, [0, 1], [1, 1.45]),
            opacity: useTransform(windowScroll, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
          }}
          className="fixed inset-0 w-screen h-screen z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop" 
            alt="Naturaleza serena"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-bosque-dark/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bluegrey-900/90 via-bluegrey-900/30 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/50 via-transparent to-transparent z-10"></div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-16 h-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-suculenta shadow-[0_0_15px_rgba(162,188,151,0.8)]"></div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-display text-white mb-6 drop-shadow-lg text-balance leading-tight"
          >
            Un espacio seguro para tu mente <br className="hidden md:block"/>y tu historia.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-cream-50 font-light drop-shadow-md max-w-2xl text-balance"
          >
            Tómate un momento. Respira. Estás exactamente donde necesitas estar.
          </motion.p>
        </div>
      </section>

      {/* Testimonials - 3D Stack Carousel */}
      <section className="py-32 px-6 relative bg-cream-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-menta/30 via-transparent to-suculenta/20 pointer-events-none -z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center mb-16">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-bosque mb-2">Voces que sanan</span>
            <h2 className="text-4xl md:text-6xl font-bold text-bluegrey-900 font-display tracking-tight mb-4">Experiencias Compartidas</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-suculenta to-menta rounded-full mb-6"></div>
            <p className="text-bluegrey-600 max-w-2xl text-lg font-light">Testimonios de quienes han encontrado su camino con nosotros.</p>
          </div>
        </div>

        <div className="relative h-[600px] md:h-[500px] max-w-5xl mx-auto perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center">
            {testinomialsData.map((t, i) => {
              const isActive = i === activeTestimonial;
              const isPrev = i === (activeTestimonial - 1 + testinomialsData.length) % testinomialsData.length;
              const isNext = i === (activeTestimonial + 1) % testinomialsData.length;
              
              if (!isActive && !isPrev && !isNext) return null;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -180 : 180,
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.3,
                    rotateY: isActive ? 0 : isPrev ? 25 : -25,
                    z: isActive ? 100 : 0,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      setActiveTestimonial((prev) => (prev - 1 + testinomialsData.length) % testinomialsData.length);
                    } else if (info.offset.x < -100) {
                      setActiveTestimonial((prev) => (prev + 1) % testinomialsData.length);
                    }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className={`absolute w-[95%] max-w-2xl p-4 md:p-8 rounded-[3rem] cursor-grab active:cursor-grabbing preserve-3d
                    ${isActive ? 'z-30' : 'z-10'}`}
                >
                  {/* Card Content with Overlapping Transparency + Blend Mode */}
                  <div className={`relative w-full h-full p-8 md:p-12 rounded-[3rem] border-2 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-colors duration-500 will-change-transform transform-gpu ${
                    isActive ? 'backdrop-blur-lg' : ''
                  } ${
                    i % 4 === 0 ? 'bg-suculenta/70 border-suculenta/30 text-white' : 
                    i % 4 === 1 ? 'bg-menta/70 border-menta/30 text-bosque-dark' : 
                    i % 4 === 2 ? 'bg-olivo/70 border-olivo/30 text-white' : 
                    'bg-bluegrey-700/70 border-bluegrey-600/30 text-white'
                  }`}
                  style={{ mixBlendMode: 'multiply', transform: 'translateZ(0)' }}
                  >
                    <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    
                    {/* Vivid Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none ${
                      i % 4 === 0 ? 'from-white/40 to-transparent' : 
                      i % 4 === 1 ? 'from-bosque/20 to-transparent' : 
                      i % 4 === 2 ? 'from-white/40 to-transparent' : 
                      'from-white/20 to-transparent'
                    }`} />
                    
                    <Quote className={`w-24 h-24 absolute -top-4 -left-4 rotate-12 opacity-10 ${
                      i % 4 === 1 ? 'text-bosque-dark' : 'text-white'
                    }`} />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <p className="text-xl md:text-2xl font-display italic leading-relaxed mb-8 text-balance">
                        "{t.text}"
                      </p>
                      
                      <div className={`flex items-center gap-4 mt-auto border-t pt-6 ${
                        i % 4 === 1 ? 'border-bosque-dark/10' : 'border-white/20'
                      }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md ${
                          i % 4 === 1 ? 'bg-bosque-dark text-white' : 'bg-white text-bluegrey-900'
                        }`}>
                          {t.author.charAt(0)}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-bold">{t.author}</span>
                          <span className={`text-xs font-semibold uppercase tracking-widest ${
                            i % 4 === 1 ? 'text-bosque' : 'text-white/80'
                          }`}>{t.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Progress (Dots only, no buttons) */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
            {testinomialsData.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTestimonial(i)}
                className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${i === activeTestimonial ? 'w-10 bg-bosque' : 'w-2.5 bg-white border border-cream-200'}`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Articles preview */}
      <section className="w-full py-32 bg-bosque-dark relative overflow-hidden">
        {/* Sophisticated Gradient Background - Optimized for ultra-smooth performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-bosque-dark via-bosque-dark to-bluegrey-900 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-10%,rgba(162,188,151,0.15),transparent_50%),radial-gradient(circle_at_10%_80%,rgba(181,114,138,0.1),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(170,186,174,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-suculenta">Biblioteca de Bienestar</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-display tracking-tight">Recursos para ti</h2>
            </div>
            <Link href="/recursos" className="group flex items-center gap-2 text-sm font-bold text-suculenta hover:text-white transition-all pb-2 border-b border-suculenta/30 hover:border-white">
              Ver todos <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar"
          >
            {resourcesContent.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                onClick={() => setSelectedResource(i)}
                className={`min-w-[300px] max-w-[320px] shrink-0 rounded-[2.5rem] shadow-xl border border-white/5 overflow-hidden snap-start cursor-pointer transition-all duration-500 group ${
                  i % 4 === 0 ? 'bg-suculenta/10' : 
                  i % 4 === 1 ? 'bg-menta/20' : 
                  i % 4 === 2 ? 'bg-olivo/15' : 
                  'bg-white/5'
                }`}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className={`absolute inset-0 ${item.color} opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity z-10`}></div>
                  <img src={`https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop&sig=${i}`} alt="Articulo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-bosque-dark shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex flex-col gap-4">
                  <h4 className="font-bold text-white leading-tight text-xl group-hover:text-suculenta transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-white/50 font-medium">
                      <Clock size={14} className="text-suculenta" />
                      <span>{item.time}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-suculenta group-hover:text-bosque-dark transition-all">
                      <MoveRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Progress Bar */}
          <div className="w-full max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden mt-4">
            <motion.div 
              className="h-full bg-suculenta"
              style={{ width: `${(scrollProgress * 100) || 0}%` }}
            />
          </div>
        </div>
      </section>


      {/* Descubre Section */}
      <DescubreSection onOpenPro={setSelectedPro} teamData={teamData} />

      {/* Resource Modal */}
      <AnimatePresence>
        {selectedResource !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="fixed inset-0 bg-bosque-dark/40 backdrop-blur-sm z-[100] transform-gpu"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[110] bg-white/80 backdrop-blur-lg border-t border-white/40 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] overflow-hidden transform-gpu"
            >
              <div className="w-16 h-1.5 bg-bluegrey-200 rounded-full mx-auto my-6 shrink-0" />
              
              <div className="px-8 pb-12 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-suculenta/20 text-suculenta text-[0.7rem] font-bold uppercase tracking-widest border border-suculenta/20">
                      {resourcesContent[selectedResource].category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-bluegrey-400 font-bold">
                      <Clock size={14} />
                      <span>{resourcesContent[selectedResource].time} de lectura</span>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold text-bluegrey-900 font-display leading-[1.1] mb-8">
                    {resourcesContent[selectedResource].title}
                  </h2>

                  <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-10 shadow-2xl">
                    <img 
                      src={`https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop&sig=${selectedResource}`} 
                      className="w-full h-full object-cover" 
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="prose prose-bluegrey prose-lg max-w-none">
                    <p className="text-xl text-bluegrey-700 leading-relaxed font-light mb-8 italic border-l-4 border-suculenta pl-6">
                      {resourcesContent[selectedResource].description}
                    </p>
                    <p className="text-bluegrey-600 leading-relaxed mb-6">
                      Este artículo explora las dimensiones de la salud mental en contextos migratorios, ofreciendo herramientas prácticas para la gestión emocional y el fortalecimiento de la resiliencia en entornos desafiantes.
                    </p>
                    {/* Placeholder for more content */}
                    <div className="space-y-4">
                      <div className="h-4 bg-bluegrey-50 rounded-full w-full opacity-50" />
                      <div className="h-4 bg-bluegrey-50 rounded-full w-[90%] opacity-40" />
                      <div className="h-4 bg-bluegrey-50 rounded-full w-[95%] opacity-30" />
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-bluegrey-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button 
                      onClick={() => setSelectedResource(null)}
                      className="text-bluegrey-400 font-bold hover:text-bluegrey-900 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={18} /> Volver
                    </button>
                    
                    <Link 
                      href={`/recursos/${selectedResource}`}
                      className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-bosque-dark to-suculenta hover:from-suculenta hover:to-bosque-dark text-white font-bold rounded-2xl shadow-xl shadow-suculenta/20 transition-all hover:scale-[1.02] active:scale-95 text-center"
                    >
                      Leer artículo completo
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
