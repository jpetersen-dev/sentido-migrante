"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  HelpCircle, 
  Plus, 
  Minus,
  MessageSquare,
  FileText
} from 'lucide-react';

export default function Suiza() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'individual' | 'pareja'>('individual');

  const faqs = [
    {
      q: "¿El seguro básico suizo (Grundversicherung) cubre la terapia?",
      a: "El seguro básico (LAMal/KVG) cubre la terapia únicamente bajo el 'Anordnungsmodell' (modelo de prescripción médica) realizado por terapeutas registrados en el cantón correspondiente y con tarifas suizas estándar. Sentido Migrante opera de manera privada e independiente, lo que nos permite prescindir de largas derivaciones médicas, listas de espera de meses y mantener tarifas altamente preferenciales."
    },
    {
      q: "¿Puedo solicitar reembolso a mi seguro complementario (Zusatzversicherung)?",
      a: "Sí. Muchas aseguradoras complementarias en Suiza reembolsan una parte de los tratamientos psicológicos realizados por psicoterapeutas independientes cualificados. Te proporcionamos facturas detalladas con el diagnóstico y el formato adecuado para que las presentes a tu seguro (Zusatzversicherung) para solicitar el reembolso."
    },
    {
      q: "¿Cómo se programan las sesiones según la zona horaria?",
      a: "Nuestros terapeutas están habituados a coordinar con la hora de Suiza (CET/CEST). Al reservar tu sesión en nuestro calendario virtual, verás automáticamente los horarios disponibles en tu hora local para que no existan confusiones."
    },
    {
      q: "¿Qué sucede si necesito cancelar o reprogramar?",
      a: "Entendemos la dinámica de la vida en el extranjero. Puedes reprogramar o cancelar tu sesión de forma gratuita hasta con 24 horas de anticipación a través de tu panel de paciente o enviándonos un correo."
    }
  ];

  const comparisonData = {
    local: {
      title: "Sistema Público / Privado Local",
      cost: "180 - 260 CHF",
      wait: "3 a 6 meses de espera",
      lang: "Alemán, Francés o Italiano",
      focus: "Enfoque clínico general",
      feel: "Distancia cultural e idiomática"
    },
    sentido: {
      title: "Sentido Migrante",
      cost: "60 CHF / sesión",
      wait: "Inmediato (48 - 72 horas)",
      lang: "Español nativo",
      focus: "Especialistas en duelo migratorio",
      feel: "Calidez humana y arraigo cultural"
    }
  };

  // Entry animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } as const;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full px-4 pt-8 pb-20 max-w-5xl mx-auto overflow-hidden relative"
    >
      {/* Background Decorative Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-80 h-80 bg-menta/25 rounded-full blur-3xl -z-10 translate-x-1/4" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-0 w-96 h-96 bg-suculenta/15 rounded-full blur-3xl -z-10 -translate-x-1/3" 
      />

      {/* Hero Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-12 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-bosque-dark bg-menta px-4 py-1.5 rounded-full mb-6 font-sans">
          🇨🇭 Suiza / Tarifas en CHF
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-bluegrey-950 mb-6 leading-tight">
          Psicoterapia en tu propio idioma, adaptada a la realidad suiza
        </h1>
        <p className="text-base md:text-lg text-bluegrey-700 font-sans leading-relaxed">
          Migrar a Suiza abre un mundo de oportunidades, pero también plantea grandes retos de adaptación, aislamiento y estrés. Sana sin la barrera del idioma, con acompañamiento clínico de primer nivel e inmediato.
        </p>
      </motion.div>

      {/* SVG Interactive Graphic */}
      <motion.div 
        variants={itemVariants} 
        className="w-full flex justify-center mb-16"
      >
        <div className="bg-white rounded-[2.5rem] border border-cream-200 p-8 shadow-sm w-full md:max-w-4xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-display text-bluegrey-900 mb-3">
              "Sanar en el idioma de tus recuerdos"
            </h3>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              Expresar el sufrimiento emocional en una segunda lengua (inglés, alemán o francés) crea una barrera intelectual. La psicoterapia profunda requiere de tu lengua materna, que es donde se estructuran los afectos y las memorias de la infancia.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-bluegrey-700 font-medium">
                <CheckCircle2 className="text-olivo shrink-0" size={18} />
                <span>Especialistas certificados en Psicología Clínica.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-bluegrey-700 font-medium">
                <CheckCircle2 className="text-olivo shrink-0" size={18} />
                <span>Experiencia directa en choque cultural y duelo migratorio.</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-72 flex justify-center items-center shrink-0">
            {/* Visual SVG representing safe space and growth */}
            <svg viewBox="0 0 200 200" className="w-48 h-48 text-bosque" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="var(--color-cream-100)" />
              {/* Organic leaf shapes representing growth */}
              <path d="M100 140 C100 110, 130 90, 140 90 C130 110, 100 120, 100 140 Z" fill="var(--color-suculenta)" />
              <path d="M100 140 C100 110, 70 95, 60 95 C70 115, 100 125, 100 140 Z" fill="var(--color-olivo)" />
              <path d="M100 140 C100 90, 120 70, 110 50 C105 75, 100 90, 100 140 Z" fill="var(--color-bosque)" />
              {/* Abstract connection lines */}
              <path d="M50 70 Q80 40 100 50" stroke="var(--color-rosa-600)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M150 70 Q120 40 100 50" stroke="var(--color-rosa-600)" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="50" r="6" fill="var(--color-rosa-600)" />
              <circle cx="50" cy="70" r="4" fill="var(--color-bluegrey-400)" />
              <circle cx="150" cy="70" r="4" fill="var(--color-bluegrey-400)" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Comparison Grid Section */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-bluegrey-950 mb-3">
            El sistema local frente a tu bienestar
          </h2>
          <p className="text-sm text-bluegrey-600 max-w-xl mx-auto">
            Compara por qué miles de hispanohablantes en Suiza prefieren atenderse de forma online con Sentido Migrante en lugar de buscar psicoterapia local.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Local system card */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm hover:border-bluegrey-300 transition-colors">
            <div className="flex items-center gap-3 text-bluegrey-500 mb-6">
              <AlertCircle size={28} className="text-rosa-600 shrink-0" />
              <h3 className="text-xl font-bold font-display text-bluegrey-900">{comparisonData.local.title}</h3>
            </div>
            
            <div className="space-y-4 font-sans text-sm">
              <div className="flex justify-between py-2 border-b border-cream-100">
                <span className="text-bluegrey-500">Costo aproximado:</span>
                <span className="font-semibold text-bluegrey-800">{comparisonData.local.cost}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100">
                <span className="text-bluegrey-500">Tiempo de espera:</span>
                <span className="font-semibold text-bluegrey-800">{comparisonData.local.wait}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100">
                <span className="text-bluegrey-500">Idioma de atención:</span>
                <span className="font-semibold text-bluegrey-800">{comparisonData.local.lang}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100">
                <span className="text-bluegrey-500">Especialidad:</span>
                <span className="font-semibold text-bluegrey-800">{comparisonData.local.focus}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-bluegrey-500">Sensibilidad cultural:</span>
                <span className="font-semibold text-bluegrey-800">{comparisonData.local.feel}</span>
              </div>
            </div>
          </div>

          {/* Sentido Migrante card */}
          <div className="bg-bosque text-cream-50 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-menta/10 rounded-full translate-x-8 -translate-y-8" />
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 size={28} className="text-menta shrink-0" />
              <h3 className="text-xl font-bold font-display text-white">{comparisonData.sentido.title}</h3>
            </div>
            
            <div className="space-y-4 font-sans text-sm text-cream-100/90">
              <div className="flex justify-between py-2 border-b border-bosque-dark">
                <span>Costo aproximado:</span>
                <span className="font-bold text-white text-base">{comparisonData.sentido.cost}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-bosque-dark">
                <span>Tiempo de espera:</span>
                <span className="font-semibold text-white">{comparisonData.sentido.wait}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-bosque-dark">
                <span>Idioma de atención:</span>
                <span className="font-semibold text-white">{comparisonData.sentido.lang}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-bosque-dark">
                <span>Especialidad:</span>
                <span className="font-semibold text-white">{comparisonData.sentido.focus}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Sensibilidad cultural:</span>
                <span className="font-semibold text-white">{comparisonData.sentido.feel}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing / Booking Section */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-bluegrey-950 mb-3">
            Precios adaptados a ti
          </h2>
          <p className="text-sm text-bluegrey-600 max-w-xl mx-auto">
            Ofrecemos tarifas claras, sin compromisos a largo plazo. Invierte en tu salud mental bajo precios honestos.
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-cream-100 p-1.5 rounded-2xl border border-cream-200 inline-flex gap-2">
            <button 
              onClick={() => setSelectedPlan('individual')} 
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedPlan === 'individual' ? 'bg-bosque text-white shadow-sm' : 'text-bluegrey-600 hover:text-bluegrey-900'}`}
            >
              Sesión Individual
            </button>
            <button 
              onClick={() => setSelectedPlan('pareja')} 
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedPlan === 'pareja' ? 'bg-bosque text-white shadow-sm' : 'text-bluegrey-600 hover:text-bluegrey-900'}`}
            >
              Terapia de Pareja
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {selectedPlan === 'individual' ? (
              <motion.div
                key="individual"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[2.5rem] border border-cream-200 p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rosa-50 rounded-full translate-x-8 -translate-y-8 -z-0" />
                <span className="text-xs font-bold text-rosa-600 uppercase tracking-widest bg-rosa-50 px-3 py-1 rounded-md mb-6 relative">
                  Recomendado
                </span>
                
                <h3 className="text-2xl font-bold font-display text-bluegrey-900 mb-2">Terapia Individual</h3>
                <p className="text-sm text-bluegrey-500 mb-6 font-sans">Acompañamiento uno a uno adaptado a tu proceso.</p>
                
                <div className="text-5xl font-extrabold font-display text-bosque mb-1 flex items-baseline justify-center gap-1">
                  60 <span className="text-2xl font-bold">CHF</span>
                  <span className="text-sm font-normal text-bluegrey-400">/ sesión</span>
                </div>
                <p className="text-xs text-bluegrey-400 font-medium font-sans mb-8">Duración de la sesión: 50 minutos</p>

                <div className="w-full space-y-4 mb-8 text-left font-sans text-sm text-bluegrey-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Videollamada segura cifrada.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Factura apta para Seguro Complementario.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Soporte por WhatsApp de coordinación.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Recursos digitales y tests de duelo incluidos.</span>
                  </div>
                </div>

                <Link 
                  href="/agendar?country=CH&service=individual" 
                  className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2"
                >
                  Agendar Sesión <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="pareja"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[2.5rem] border border-cream-200 p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-menta rounded-full translate-x-8 -translate-y-8 -z-0" />
                <span className="text-xs font-bold text-bosque-dark uppercase tracking-widest bg-menta px-3 py-1 rounded-md mb-6 relative">
                  Parejas Binacionales
                </span>
                
                <h3 className="text-2xl font-bold font-display text-bluegrey-900 mb-2">Terapia de Pareja</h3>
                <p className="text-sm text-bluegrey-500 mb-6 font-sans">Ideal para mediar diferencias culturales y de convivencia.</p>
                
                <div className="text-5xl font-extrabold font-display text-bosque mb-1 flex items-baseline justify-center gap-1">
                  80 <span className="text-2xl font-bold">CHF</span>
                  <span className="text-sm font-normal text-bluegrey-400">/ sesión</span>
                </div>
                <p className="text-xs text-bluegrey-400 font-medium font-sans mb-8">Duración de la sesión: 60 minutos</p>

                <div className="w-full space-y-4 mb-8 text-left font-sans text-sm text-bluegrey-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Videollamada de alta calidad de 3 vías.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Foco en comunicación y mediación intercultural.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Factura detallada para aseguradora.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Terapeutas biculturales especializados.</span>
                  </div>
                </div>

                <Link 
                  href="/agendar?country=CH&service=pareja" 
                  className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2"
                >
                  Agendar Sesión Pareja <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Insurance info Accordion */}
      <motion.div variants={itemVariants} className="mb-20 max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-display text-bluegrey-950 mb-3 flex items-center justify-center gap-2">
            <Shield className="text-bosque" size={28} />
            Seguros y Reembolsos en Suiza
          </h2>
          <p className="text-sm text-bluegrey-600">
            Resolvemos tus dudas sobre cómo funciona la facturación y el reembolso en el sistema suizo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between font-bold p-6 text-left cursor-pointer text-bluegrey-950 hover:bg-cream-50 transition-colors font-display text-base md:text-lg"
              >
                {faq.q}
                <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-cream-100 text-bosque-dark ml-4 transition-colors">
                  {openFaq === i ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-cream-50/20"
                  >
                    <div className="p-6 pt-0 text-bluegrey-700 font-normal text-sm md:text-base leading-relaxed border-t border-cream-100/50 mt-2 font-sans">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trust reassurance banner */}
      <motion.div 
        variants={itemVariants} 
        className="bg-cream-100 rounded-3xl p-6 md:p-8 border border-cream-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="w-12 h-12 rounded-full bg-menta flex items-center justify-center text-bosque shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <h4 className="font-bold font-display text-bluegrey-900 text-lg mb-1">¿No estás seguro de cuál es tu nivel de duelo migratorio?</h4>
            <p className="text-sm text-bluegrey-600 font-sans">Realiza nuestro test interactivo gratuito y recibe un informe clínico orientativo.</p>
          </div>
        </div>
        <Link href="/recursos/test-duelo" className="px-5 py-3 bg-white hover:bg-cream-50 border border-cream-200 rounded-xl font-bold text-sm text-bosque shadow-sm flex items-center justify-center gap-2 shrink-0 transition-colors">
          Realizar Test <ArrowRight size={14} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
