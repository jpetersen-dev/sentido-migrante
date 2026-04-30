"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Minus, Mail, MessageCircle, ChevronRight, Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { LogoSymbol } from '@/components/ui/LogoSymbol';

export default function DescubreSection({ onOpenPro, teamData }: { onOpenPro: (index: number) => void, teamData?: any[] }) {
  // Use passed teamData or fallback to local static data
  const team = teamData || [
    { name: "Lic. Martín Suárez", role: "Psicólogo Clínico", bio: "Especialista en desarrollo personal y procesos de transición. Enfoque cognitivo constructivista con más de 10 años de experiencia acompañando a hispanohablantes en Suiza.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop" },
    { name: "Lic. Elena Rojas", role: "Psicoterapeuta Sistémica", bio: "Experta en terapia de pareja y relacional. Ayuda a navegar el choque cultural en parejas binacionales y familias migrantes con un enfoque empático y estructurado.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" }
  ];

  const faqs = [
    { q: "¿Cuánto dura una sesión?", a: "Nuestras sesiones estándar tienen una duración de 50 minutos. Esto permite un trabajo profundo y un cierre adecuado de la sesión." },
    { q: "¿Las sesiones son por videollamada?", a: "Sí, utilizamos plataformas seguras con cifrado de extremo a extremo para garantizar tu privacidad y confidencialidad. También ofrecemos sesiones presenciales en nuestra clínica en Zúrich." },
    { q: "¿El seguro médico suizo cubre estas sesiones?", a: "Depende de tu seguro complementario (Zusatzversicherung). Emitimos facturas que puedes presentar a tu aseguradora para reembolso." }
  ];
  const [activeTab, setActiveTab] = useState<'main' | 'quienes' | 'faq' | 'contacto'>('main');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#quienes-somos') setActiveTab('quienes');
    else if (hash === '#faq') setActiveTab('faq');
    else if (hash === '#contacto') setActiveTab('contacto');
    else if (hash === '#descubre') setActiveTab('main');
    
    if (hash && pathname === '/') {
      setTimeout(() => {
        const el = document.getElementById('descubre');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="descubre" className="px-6 py-16 bg-cream-50 rounded-[3rem] mx-2 md:mx-0 border border-cream-200 scroll-mt-24 overflow-hidden relative min-h-[500px]">
      <AnimatePresence mode="wait">
        {activeTab === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-bluegrey-900 font-display mb-2">Descubre</h2>
            
            <div className="relative h-64 w-full bg-bluegrey-200 rounded-[2rem] overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop" alt="MenteVital Espacio" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-8 text-center">
                <LogoSymbol className="w-12 h-12 text-white mb-3 shrink-0" />
                <h3 className="text-white text-2xl md:text-3xl font-bold font-display mb-2 uppercase">Sentido Migrante</h3>
                <p className="text-white/90 font-light text-lg">Conoce más sobre nuestro espacio y filosofía</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <button onClick={() => { setActiveTab('quienes'); window.location.hash = 'quienes-somos'; }} className="flex items-center justify-between bg-white px-6 py-5 rounded-2xl shadow-sm border border-cream-200 hover:shadow-md transition-all group">
                <span className="font-semibold text-bluegrey-900">¿Quiénes somos?</span>
                <ChevronRight className="text-bosque group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={() => router.push('/recursos')} className="flex items-center justify-between bg-white px-6 py-5 rounded-2xl shadow-sm border border-cream-200 hover:shadow-md transition-all group">
                <span className="font-semibold text-bluegrey-900">Artículos y recursos</span>
                <ChevronRight className="text-bosque group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={() => { setActiveTab('faq'); window.location.hash = 'faq'; }} className="flex items-center justify-between bg-white px-6 py-5 rounded-2xl shadow-sm border border-cream-200 hover:shadow-md transition-all group">
                <span className="font-semibold text-bluegrey-900">Preguntas frecuentes</span>
                <ChevronRight className="text-bosque group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={() => { setActiveTab('contacto'); window.location.hash = 'contacto'; }} className="flex items-center justify-between bg-white px-6 py-5 rounded-2xl shadow-sm border border-cream-200 hover:shadow-md transition-all group">
                <span className="font-semibold text-bluegrey-900">Contacto y ubicación</span>
                <ChevronRight className="text-bosque group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'quienes' && (
          <motion.div 
            key="quienes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-2">
              <button onClick={() => { setActiveTab('main'); window.history.replaceState(null, '', ' '); }} className="p-2 rounded-full bg-white shadow-sm border border-cream-200 text-bluegrey-600 hover:text-bosque transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-3xl font-bold text-bluegrey-900 font-display">¿Quiénes somos?</h2>
            </div>
            
            <p className="text-bluegrey-600 font-light leading-relaxed text-lg mb-4">
              Somos un equipo de profesionales apasionados por la salud mental y el bienestar integral. 
              Nuestra filosofía se basa en crear un espacio seguro, empático y libre de juicios, 
              donde cada persona puede explorar sus desafíos y descubrir sus propias herramientas para sanar. 
              Entendemos especialmente la complejidad de vivir lejos de casa, por lo que hemos creado 
              un entorno que te acoge sin importar de dónde vengas.
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              {team.map((member, i) => (
                <div 
                  onClick={() => onOpenPro(i)}
                  key={i} 
                  className="flex-1 bg-white p-4 rounded-[2rem] shadow-sm border border-cream-200 flex flex-col items-center gap-4 cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <div className="w-full h-48 rounded-3xl bg-bluegrey-100 overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-center text-center pb-2">
                    <h4 className="font-bold text-xl text-bluegrey-900 font-display">{member.name}</h4>
                    <p className="text-xs text-bosque-dark font-bold mb-3 uppercase tracking-wider">{member.role}</p>
                    <button className="text-sm font-semibold text-bluegrey-500 flex items-center justify-center w-full py-2 bg-cream-50 rounded-xl hover:bg-cream-100 transition-colors">
                      Ver perfil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div 
            key="faq"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-2">
              <button onClick={() => { setActiveTab('main'); window.history.replaceState(null, '', ' '); }} className="p-2 rounded-full bg-white shadow-sm border border-cream-200 text-bluegrey-600 hover:text-bosque transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-3xl font-bold text-bluegrey-900 font-display">Preguntas frecuentes</h2>
            </div>

            <div className="bg-bluegrey-50 rounded-2xl p-6 border border-cream-200 mb-2">
              <h4 className="font-bold text-bluegrey-900 mb-2">¿Tienes dudas sobre cómo funciona la terapia online o presencial?</h4>
              <p className="text-bluegrey-600 font-light">Hemos recopilado las preguntas más comunes de nuestros pacientes expatriados para ayudarte a dar el primer paso con claridad.</p>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between font-bold p-6 text-left cursor-pointer text-bluegrey-900 hover:bg-cream-50 transition-colors"
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
                        className="overflow-hidden bg-cream-50/30"
                      >
                        <div className="p-6 pt-0 text-bluegrey-600 font-light text-[15px] leading-relaxed border-t border-cream-100 mt-2">
                          <p className="pt-4">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'contacto' && (
          <motion.div 
            key="contacto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 max-w-3xl mx-auto w-full"
          >
            <div className="flex items-center gap-4 mb-2">
              <button onClick={() => { setActiveTab('main'); window.history.replaceState(null, '', ' '); }} className="p-2 rounded-full bg-white shadow-sm border border-cream-200 text-bluegrey-600 hover:text-bosque transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-3xl font-bold text-bluegrey-900 font-display">Contacto</h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-cream-200 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-bluegrey-900 font-display mb-2">Hablemos</h3>
                <p className="text-bluegrey-600 font-light leading-relaxed">
                  Atendemos exclusivamente de forma online a hispanohablantes en el extranjero, con foco en expatriados en Suiza, España y el resto de Europa y Australia.
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-bluegrey-700">Nombre y Apellido</label>
                  <input type="text" id="name" className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olivo/50 focus:border-olivo transition-all font-light text-bluegrey-900 placeholder:text-bluegrey-400" placeholder="Ej. Ana Pérez" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-bluegrey-700">Correo Electrónico</label>
                  <input type="email" id="email" className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olivo/50 focus:border-olivo transition-all font-light text-bluegrey-900 placeholder:text-bluegrey-400" placeholder="ana@ejemplo.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-bluegrey-700">¿En qué podemos ayudarte o asesorarte?</label>
                  <textarea id="message" rows={4} className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olivo/50 focus:border-olivo transition-all font-light resize-none text-bluegrey-900 placeholder:text-bluegrey-400" placeholder="Cuéntanos un poco sobre tu situación..."></textarea>
                </div>
                <button type="button" className="mt-2 w-full py-4 bg-bosque hover:bg-bosque-dark text-white font-bold rounded-xl text-center shadow-md active:scale-95 transition-all">
                  Enviar mensaje
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-200 flex flex-col sm:flex-row gap-6 sm:justify-around items-start sm:items-center">
              <a href="mailto:hola@sentidomigrante.ch" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-menta flex items-center justify-center text-bosque group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-bluegrey-900 text-sm">Correo directo</span>
                  <span className="text-bluegrey-500 text-sm font-light">hola@sentidomigrante.ch</span>
                </div>
              </a>
              <div className="hidden sm:block w-px h-12 bg-cream-200"></div>
              <a href="https://wa.me/41790000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-menta flex items-center justify-center text-bosque group-hover:scale-110 transition-transform shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-bluegrey-900 text-sm">Soporte WhatsApp</span>
                  <span className="text-bluegrey-500 text-sm font-light">+41 79 000 00 00</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
