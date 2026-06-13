"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAppUrl } from '@/lib/utils';
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

export default function Alemania() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'individual' | 'pareja'>('individual');

  const faqs = [
    {
      q: "¿Por qué hay listas de espera tan largas en Alemania para terapia?",
      a: "El sistema de salud público alemán (Gesetzliche Krankenkasse) cuenta con un número limitado de licencias terapéuticas (Kassensitze). Esto provoca un cuello de botella donde la espera para un terapeuta de habla alemana supera las 26 semanas, y es aún mayor para terapeutas hispanohablantes autorizados por cajas públicas. Sentido Migrante ofrece consulta privada e inmediata, eliminando la burocracia y las esperas insostenibles."
    },
    {
      q: "¿Las cajas de seguro médico público (Krankenkassen) cubren el costo?",
      a: "El seguro público (AOK, TK, Barmer, etc.) solo cubre terapeutas contratados por el sistema público (Kassenzulassung). Excepcionalmente, existe el procedimiento de 'Kostenerstattung' (reembolso de costos) si demuestras que no has encontrado plaza en meses, aunque es un trámite complejo. Nuestras tarifas están ajustadas a 60 EUR para que puedas asumir un tratamiento privado directo sin depender de aprobaciones burocráticas."
    },
    {
      q: "¿El seguro privado (PKV) o complementario cubre las sesiones?",
      a: "Sí, dependiendo de tu póliza de seguro médico privado (Private Krankenversicherung) o de seguro complementario (Zusatzversicherung) que incluya servicios de psicoterapia o tratamientos alternativos de psicología (Heilpraktiker für Psychotherapie). Te entregamos facturas detalladas válidas para solicitar reembolsos."
    },
    {
      q: "¿Cómo se gestiona el cumplimiento de privacidad y protección de datos?",
      a: "La protección de datos es fundamental en Alemania (DSGVO). Utilizamos una plataforma clínica que cumple estrictamente con el RGPD y estándares HIPAA, cifrando todas las videollamadas de punto a punto y almacenando la información médica con la máxima seguridad."
    }
  ];

  const comparisonData = {
    local: {
      title: "Seguro Público Alemán (Krankenkasse)",
      cost: "Gratuito (pero con alta barrera de acceso)",
      wait: "6 a 9 meses promedio",
      lang: "Alemán (barrera idiomática)",
      focus: "Enfoque clínico generalista",
      feel: "Burocracia rígida y procesos de aprobación"
    },
    sentido: {
      title: "Sentido Migrante (Consulta Privada)",
      cost: "60 EUR / sesión",
      wait: "Inmediato (48 - 72 horas)",
      lang: "Español nativo",
      focus: "Especialistas en estrés transcultural",
      feel: "Espacio humano, cálido y sin burocracia"
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
          x: [0, -15, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-0 w-80 h-80 bg-menta/20 rounded-full blur-3xl -z-10 -translate-x-1/4" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-0 w-96 h-96 bg-suculenta/20 rounded-full blur-3xl -z-10 translate-x-1/3" 
      />

      {/* Hero Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-12 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-bosque-dark bg-menta px-4 py-1.5 rounded-full mb-6 font-sans">
          🇩🇪 Alemania / Tarifas en EUR
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-bluegrey-950 mb-6 leading-tight">
          Terapia psicológica en tu idioma, sin listas de espera en Alemania
        </h1>
        <p className="text-base md:text-lg text-bluegrey-700 font-sans leading-relaxed">
          El proceso de integración en Alemania puede ser emocionalmente desgastante. La barrera del idioma y el clima social pueden acentuar la soledad. Te ofrecemos apoyo clínico transcultural inmediato y en español.
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
              Supera el choque cultural y el desarraigo
            </h3>
            <p className="text-sm text-bluegrey-600 leading-relaxed font-sans mb-4">
              Establecerse en Alemania implica navegar la burocracia, aprender un nuevo idioma y asimilar códigos culturales distintos. En consulta trabajamos dinámicas de adaptación, manejo del estrés y fortalecimiento de tu identidad como migrante.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-bluegrey-700 font-medium">
                <CheckCircle2 className="text-olivo shrink-0" size={18} />
                <span>Sesiones online flexibles adaptadas a tu horario laboral.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-bluegrey-700 font-medium">
                <CheckCircle2 className="text-olivo shrink-0" size={18} />
                <span>Espacio clínico seguro y estrictamente confidencial (cumplimiento DSGVO).</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-72 flex justify-center items-center shrink-0">
            {/* Visual SVG representing safe space and connection */}
            <svg viewBox="0 0 200 200" className="w-48 h-48 text-bosque" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="var(--color-cream-100)" />
              {/* Hands holding a plant / growth representation */}
              <path d="M70 120 C70 110, 85 90, 100 90 C115 90, 130 110, 130 120 C130 130, 115 140, 100 140 C85 140, 70 130, 70 120 Z" fill="var(--color-menta)" />
              <path d="M100 135 C100 115, 115 105, 120 105 C115 115, 100 120, 100 135 Z" fill="var(--color-suculenta)" />
              <path d="M100 135 C100 115, 85 108, 80 108 C85 118, 100 122, 100 135 Z" fill="var(--color-olivo)" />
              <circle cx="100" cy="80" r="15" fill="var(--color-rosa-50)" />
              <path d="M92 80 Q100 70 108 80" stroke="var(--color-rosa-600)" strokeWidth="2.5" />
              {/* Radiating wellness lines */}
              <line x1="100" y1="50" x2="100" y2="58" stroke="var(--color-rosa-600)" strokeWidth="2" strokeLinecap="round" />
              <line x1="75" y1="60" x2="81" y2="66" stroke="var(--color-rosa-600)" strokeWidth="2" strokeLinecap="round" />
              <line x1="125" y1="60" x2="119" y2="66" stroke="var(--color-rosa-600)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Comparison Grid Section */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-bluegrey-950 mb-3">
            El sistema de salud alemán frente a tu bienestar
          </h2>
          <p className="text-sm text-bluegrey-600 max-w-xl mx-auto">
            Por qué la consulta privada en tu idioma con Sentido Migrante es la opción preferida frente a la espera del sistema público en Alemania.
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
                <span className="font-semibold text-bluegrey-800 text-rosa-600 font-bold">{comparisonData.local.wait}</span>
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
                <span className="text-bluegrey-500">Burocracia:</span>
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
                <span className="font-bold text-menta">{comparisonData.sentido.wait}</span>
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
                <span>Burocracia:</span>
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
            Tarifas transparentes
          </h2>
          <p className="text-sm text-bluegrey-600 max-w-xl mx-auto">
            Acceso directo a terapia privada de alta calidad sin suscripciones forzosas. Cancela o reprograma con facilidad.
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
                <p className="text-sm text-bluegrey-500 mb-6 font-sans">Acompañamiento clínico individualizado.</p>
                
                <div className="text-5xl font-extrabold font-display text-bosque mb-1 flex items-baseline justify-center gap-1">
                  60 <span className="text-2xl font-bold">EUR</span>
                  <span className="text-sm font-normal text-bluegrey-400">/ sesión</span>
                </div>
                <p className="text-xs text-bluegrey-400 font-medium font-sans mb-8">Duración de la sesión: 50 minutos</p>

                <div className="w-full space-y-4 mb-8 text-left font-sans text-sm text-bluegrey-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Videollamada con cifrado clínico.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Factura válida para reembolsos de PKV.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Flexibilidad de cancelación (24h antes).</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Material complementario de apoyo emocional.</span>
                  </div>
                </div>

                 <a 
                  href={getAppUrl('/agendar?country=DE&service=individual')} 
                  className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2"
                >
                  Agendar Sesión <ArrowRight size={16} />
                </a>
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
                  Parejas e Integración
                </span>
                
                <h3 className="text-2xl font-bold font-display text-bluegrey-900 mb-2">Terapia de Pareja</h3>
                <p className="text-sm text-bluegrey-500 mb-6 font-sans">Ideal para parejas hispanohablantes o mixtas (biculturales).</p>
                
                <div className="text-5xl font-extrabold font-display text-bosque mb-1 flex items-baseline justify-center gap-1">
                  80 <span className="text-2xl font-bold">EUR</span>
                  <span className="text-sm font-normal text-bluegrey-400">/ sesión</span>
                </div>
                <p className="text-xs text-bluegrey-400 font-medium font-sans mb-8">Duración de la sesión: 60 minutes</p>

                <div className="w-full space-y-4 mb-8 text-left font-sans text-sm text-bluegrey-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Conexión remota de alta estabilidad.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Especialización en choques culturales de pareja.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Documentación para justificación aseguradora.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="text-olivo shrink-0" size={18} />
                    <span>Plan de comunicación transcultural integrado.</span>
                  </div>
                </div>

                 <a 
                  href={getAppUrl('/agendar?country=DE&service=pareja')} 
                  className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2"
                >
                  Agendar Sesión Pareja <ArrowRight size={16} />
                </a>
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
            Seguros y Cobertura en Alemania
          </h2>
          <p className="text-sm text-bluegrey-600">
            Aclaramos cómo gestionar reembolsos y copagos en Alemania con tu seguro de salud.
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
            <h4 className="font-bold font-display text-bluegrey-900 text-lg mb-1">¿Sufres de estrés migratorio constante?</h4>
            <p className="text-sm text-bluegrey-600 font-sans">Evalúa tu nivel de duelo y bienestar con el cuestionario interactivo del Síndrome de Ulises.</p>
          </div>
        </div>
        <a href={getAppUrl('/recursos/test-duelo')} className="px-5 py-3 bg-white hover:bg-cream-50 border border-cream-200 rounded-xl font-bold text-sm text-bosque shadow-sm flex items-center justify-center gap-2 shrink-0 transition-colors">
          Realizar Test <ArrowRight size={14} />
        </a>
      </motion.div>
    </motion.div>
  );
}
