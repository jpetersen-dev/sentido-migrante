"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Shield, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Activity, 
  Heart, 
  Smile, 
  User, 
  Calendar,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

const QUESTIONS = [
  {
    id: 1,
    category: "Aislamiento",
    text: "¿Te sientes solo/a con frecuencia o sientes la falta de una red de apoyo de confianza en tu nuevo país de residencia?"
  },
  {
    id: 2,
    category: "Nostalgia",
    text: "¿Experimentas una añoranza constante o melancolía profunda por tu tierra natal, clima, comida o costumbres?"
  },
  {
    id: 3,
    category: "Adaptación",
    text: "¿Sientes frustración, impotencia o indefensión al lidiar con la burocracia, normas sociales o dinámicas del nuevo entorno?"
  },
  {
    id: 4,
    category: "Identidad",
    text: "¿Sientes que no perteneces del todo a ningún lugar (ni a tu país de origen al volver de visita, ni al país de acogida)?"
  },
  {
    id: 5,
    category: "Fatiga",
    text: "¿Experimentas fatiga constante, cansancio físico o falta de energía, incluso cuando duermes lo suficiente?"
  },
  {
    id: 6,
    category: "Sueño",
    text: "¿Tienes dificultades para conciliar el sueño, insomnio o te despiertas con pensamientos recurrentes sobre tu futuro o tu familia?"
  },
  {
    id: 7,
    category: "Incertidumbre",
    text: "¿Te abruma la preocupación o ansiedad recurrente por tu estabilidad laboral, situación financiera o estatus legal en el extranjero?"
  },
  {
    id: 8,
    category: "Culpa",
    text: "¿Experimentas sentimientos de culpa por haber dejado atrás a tus seres queridos, sintiendo que deberías estar allí para apoyarlos?"
  },
  {
    id: 9,
    category: "Tristeza",
    text: "¿Sientes tristeza recurrente, desmotivación o desesperanza respecto a tu capacidad para integrarte o prosperar aquí?"
  },
  {
    id: 10,
    category: "Tensión Somática",
    text: "¿Sufres dolores físicos frecuentes como cefaleas, tensión en hombros/cuello o malestar digestivo causados por la tensión de adaptarte?"
  }
];

const OPTIONS = [
  { text: "Nunca", value: 0 },
  { text: "Casi nunca", value: 1 },
  { text: "A veces", value: 2 },
  { text: "Frecuentemente", value: 3 },
  { text: "Siempre", value: 4 }
];

export default function TestDuelo() {
  const [step, setStep] = useState<'welcome' | 'questions' | 'lead' | 'result'>('welcome');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const totalQuestions = QUESTIONS.length;
  const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;
  
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('questions');
  };

  const handleSelectOption = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 200);
    } else {
      setTimeout(() => {
        setStep('lead');
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('welcome');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setStep('result');
  };

  const resetTest = () => {
    setStep('welcome');
    setCurrentQuestionIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setUserEmail('');
    setTermsAccepted(false);
  };

  const totalScore = answers.reduce((sum, val) => sum + (val === -1 ? 0 : val), 0);
  const maxScore = totalQuestions * 4;

  let resultLevel: 'leve' | 'moderado' | 'elevado' = 'leve';
  if (totalScore >= 11 && totalScore <= 25) {
    resultLevel = 'moderado';
  } else if (totalScore > 25) {
    resultLevel = 'elevado';
  }

  const resultDetails = {
    leve: {
      title: "Duelo Migratorio Leve / Adaptación Saludable",
      badgeClass: "bg-menta text-bosque-dark border-menta",
      icon: Smile,
      iconColor: "text-bosque",
      desc: `Hola ${userName || "migrante"}, tu puntuación indica que estás gestionando tu proceso migratorio y de adaptación de manera saludable. Es habitual sentir nostalgia o cansancio ocasional (la distancia con el hogar siempre tiene un peso), pero mantienes recursos internos sólidos y un nivel de estrés manejable.`,
      advice: [
        "Sigue fortaleciendo tu red social local participando en actividades de tu interés.",
        "Dedica espacios conscientes a conectar con tus tradiciones sin descuidar tu presente.",
        "Practica el autocuidado físico y mental como pilar preventivo."
      ]
    },
    moderado: {
      title: "Estrés Migratorio Moderado (Fase de Alerta)",
      badgeClass: "bg-rosa-50 text-rosa-800 border-rosa-600/30",
      icon: Activity,
      iconColor: "text-rosa-600",
      desc: `Hola ${userName || "migrante"}, tu puntuación muestra señales claras de estrés migratorio moderado. Es probable que el aislamiento, el choque de expectativas o la fatiga por el esfuerzo de integración estén comenzando a sobrepasarte. Estás en una zona donde conviene prestar atención a tu salud emocional antes de que derive en un desgaste crónico.`,
      advice: [
        "Habla abiertamente de cómo te sientes. Nombrar tus emociones con personas de confianza alivia el aislamiento.",
        "Establece límites claros en el trabajo u obligaciones cotidianas para reducir la fatiga somática.",
        "Considera un espacio de acompañamiento terapéutico breve para adquirir herramientas de afrontamiento y resignificar tu historia."
      ]
    },
    elevado: {
      title: "Estrés Límite / Síndrome de Ulises Elevado",
      badgeClass: "bg-red-50 text-red-700 border-red-200",
      icon: AlertCircle,
      iconColor: "text-red-500",
      desc: `Hola ${userName || "migrante"}, tus respuestas indican que estás experimentando niveles muy elevados de estrés por desarraigo, consistentes con el Síndrome de Ulises. El agotamiento físico, la tristeza persistente, la culpa o la ansiedad por la estabilidad están interfiriendo significativamente con tu día a día. Migrar es difícil, y no tienes por qué llevar esta carga a solas.`,
      advice: [
        "Prioriza tu salud mental y física. Lo que sientes es una respuesta normal a una situación de adaptación extrema (estrés límite).",
        "Busca ayuda profesional transcultural. Un terapeuta que entienda la psicología del migrante te ayudará a procesar el duelo.",
        "Evita el aislamiento. Apóyate en asociaciones de expatriados, grupos de habla hispana o redes de contención."
      ]
    }
  };

  const currentResult = resultDetails[resultLevel];

  // Motion animation parameters
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeInOut" as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  return (
    <div className="flex flex-col w-full px-4 pt-8 pb-20 max-w-2xl mx-auto min-h-[600px] relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-72 bg-menta/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <AnimatePresence mode="wait" custom={direction}>
        {/* STEP 1: WELCOME SCREEN */}
        {step === 'welcome' && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col w-full"
          >
            <div className="mb-8 text-center">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-bosque bg-menta px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
                Recurso Gratuito / Clínico-Preventivo
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold font-display text-bluegrey-950 mb-4 tracking-tight leading-tight">
                Cuestionario del Síndrome de Ulises
              </h1>
              <p className="text-sm md:text-base text-bluegrey-600 font-sans leading-relaxed max-w-lg mx-auto">
                El duelo migratorio no es una enfermedad, es un proceso vital de reconfiguración. Evalúa de forma confidencial si tu nivel de estrés actual corresponde a estrés límite del migrante.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] border border-cream-200 p-8 shadow-sm flex flex-col items-center">
              <div className="p-4 rounded-full bg-cream-50 text-bosque mb-6">
                <HelpCircle size={44} className="stroke-[1.5]" />
              </div>
              
              <p className="text-sm text-bluegrey-600 mb-8 text-center font-medium font-sans max-w-md leading-relaxed">
                Este test consta de 10 preguntas breves basadas en factores fenomenológicos clave: soledad, nostalgia, indefensión y malestar somático.
              </p>

              <form onSubmit={handleStart} className="w-full flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-name" className="text-xs font-bold text-bluegrey-600 uppercase tracking-wide">
                    ¿Cuál es tu nombre? (Opcional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-bluegrey-400" size={18} />
                    <input 
                      type="text" 
                      id="user-name"
                      placeholder="Ej. Sofía" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-cream-50 border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/40 focus:border-bosque transition-all font-sans text-sm text-bluegrey-900"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full mt-4 py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2 font-sans"
                >
                  Comenzar Autoevaluación <ArrowRight size={16} />
                </button>
              </form>
            </div>
            
            <div className="mt-6 flex items-start gap-2.5 text-xs text-bluegrey-500 max-w-md mx-auto">
              <Shield size={16} className="text-bluegrey-400 shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed">
                Tus respuestas son estrictamente anónimas. No compartimos tus datos clínicos con terceros. Cumplimiento de confidencialidad médica y RGPD.
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 2: QUESTIONS WIZARD */}
        {step === 'questions' && (
          <motion.div 
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full"
          >
            {/* Header & Back Action */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBack} 
                className="flex items-center gap-1.5 text-xs font-bold text-bluegrey-600 hover:text-bosque transition-colors py-1.5 px-3 rounded-lg hover:bg-cream-100 font-sans"
              >
                <ArrowLeft size={14} /> Volver
              </button>
              <span className="text-xs font-bold text-bluegrey-400 font-sans">
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-cream-200 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-bosque rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Question Card Slider Container */}
            <div className="bg-white rounded-[2rem] border border-cream-200 p-6 md:p-8 shadow-sm min-h-[300px] flex flex-col justify-between overflow-hidden relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestionIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <div>
                    <span className="text-[10px] font-bold text-rosa-600 uppercase tracking-widest bg-rosa-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {QUESTIONS[currentQuestionIndex].category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold font-display text-bluegrey-950 leading-tight">
                      {QUESTIONS[currentQuestionIndex].text}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    {OPTIONS.map((opt, idx) => {
                      const isSelected = answers[currentQuestionIndex] === opt.value;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`w-full py-4 px-5 text-left rounded-2xl border transition-all text-sm font-semibold font-sans flex items-center justify-between ${
                            isSelected 
                            ? 'bg-menta border-bosque-dark text-bosque-dark shadow-sm scale-[1.01]' 
                            : 'bg-cream-50/50 hover:bg-cream-100/40 border-cream-200 text-bluegrey-700 hover:border-suculenta'
                          }`}
                        >
                          <span>{opt.text}</span>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isSelected 
                            ? 'bg-bosque text-white border-bosque' 
                            : 'border-bluegrey-300 text-bluegrey-400'
                          }`}>
                            {idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 3: LEAD CAPTURE FORM */}
        {step === 'lead' && (
          <motion.div 
            key="lead"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col w-full"
          >
            <div className="mb-8 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-bosque bg-menta px-3 py-1 rounded-full mb-4 inline-block font-sans">
                Respuestas Guardadas
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold font-display text-bluegrey-950 mb-3">
                Tu perfil de estrés está listo
              </h1>
              <p className="text-sm text-bluegrey-600 font-sans leading-relaxed max-w-md mx-auto">
                Ingresa tu email para desbloquear tu nivel de puntuación de forma inmediata en pantalla y recibir un reporte clínico en formato PDF.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] border border-cream-200 p-8 shadow-sm">
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5 max-w-md mx-auto">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-email" className="text-xs font-bold text-bluegrey-600 uppercase tracking-wide">
                    Dirección de correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-bluegrey-400" size={18} />
                    <input 
                      type="email" 
                      id="user-email"
                      required
                      placeholder="ejemplo@correo.com" 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-cream-50 border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/40 focus:border-bosque transition-all font-sans text-sm text-bluegrey-900"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-1">
                  <input 
                    type="checkbox" 
                    id="privacy-chk"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded border-cream-300 text-bosque focus:ring-bosque mt-0.5 shrink-0"
                  />
                  <label htmlFor="privacy-chk" className="text-xs text-bluegrey-500 leading-relaxed font-sans cursor-pointer select-none">
                    Acepto recibir mi resultado de autoevaluación y comunicaciones sobre psicología y bienestar de Sentido Migrante. Tratamos tus datos con total respeto (RGPD).
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={!termsAccepted}
                  className={`w-full py-4 text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2 font-sans ${
                    termsAccepted 
                    ? 'bg-bosque hover:bg-bosque-dark' 
                    : 'bg-bluegrey-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  Ver mi Resultado <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* STEP 4: FINAL RESULTS DISPLAY */}
        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full"
          >
            {/* Header info */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-extrabold font-display text-bluegrey-950 mb-2">
                Resultado de tu Autoevaluación
              </h1>
              <p className="text-xs text-bluegrey-500 font-sans">
                Este reporte tiene carácter orientativo y no constituye un diagnóstico clínico formal.
              </p>
            </div>

            {/* Score Showcase Card */}
            <div className="bg-white rounded-[2.5rem] border border-cream-200 p-8 shadow-sm flex flex-col items-center text-center mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cream-50 rounded-full translate-x-8 -translate-y-8 -z-0" />
              
              {/* Animated Ring Gauge */}
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-95" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="var(--color-cream-100)" 
                    strokeWidth="10" 
                    fill="transparent" 
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke={resultLevel === 'leve' ? 'var(--color-bosque)' : resultLevel === 'moderado' ? 'var(--color-rosa-600)' : '#EF4444'} 
                    strokeWidth="10" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * (totalScore / maxScore)) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-extrabold font-display text-bluegrey-900 leading-none">
                    {totalScore}
                  </span>
                  <span className="text-xs font-bold text-bluegrey-400 font-sans mt-1">
                    de {maxScore} pts
                  </span>
                </div>
              </div>

              {/* Severity Badge */}
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-4 inline-block font-sans ${currentResult.badgeClass}`}>
                {currentResult.title}
              </span>

              {/* Descriptive details */}
              <p className="text-sm md:text-base text-bluegrey-700 leading-relaxed font-sans mb-8">
                {currentResult.desc}
              </p>

              {/* Custom advice boxes */}
              <div className="w-full text-left bg-cream-50/50 rounded-2xl p-6 border border-cream-200 mb-6">
                <h3 className="font-bold font-display text-bluegrey-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Heart className="text-rosa-600 shrink-0" size={18} />
                  Recomendaciones de Afrontamiento:
                </h3>
                <ul className="space-y-3 font-sans text-sm text-bluegrey-600">
                  {currentResult.advice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white text-bosque flex items-center justify-center font-bold text-xs border border-cream-200 shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reassurance/PDF note */}
              <p className="text-xs text-bluegrey-500 font-medium font-sans mb-8 flex items-center gap-2 justify-center">
                <CheckCircle2 className="text-olivo" size={16} />
                Hemos enviado un reporte en PDF a <strong>{userEmail}</strong> con estas pautas detalladas.
              </p>

              {/* CTAs */}
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/agendar" 
                  className="flex-1 py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2 font-sans"
                >
                  <Calendar size={18} /> Agendar Sesión de Valoración
                </Link>
                <button 
                  onClick={resetTest}
                  className="py-4 px-6 bg-cream-100 hover:bg-cream-200 text-bluegrey-800 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 font-sans border border-cream-200"
                >
                  <RefreshCw size={18} /> Repetir
                </button>
              </div>
            </div>

            {/* Back to Recursos */}
            <div className="text-center">
              <Link 
                href="/recursos" 
                className="text-xs font-bold text-bluegrey-500 hover:text-bosque transition-colors font-sans inline-flex items-center gap-1"
              >
                ← Volver a recursos de bienestar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
