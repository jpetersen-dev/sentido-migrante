"use client";

import { Bell, User, Menu, X, Home, Stethoscope, Calendar, BookOpen, UserCircle, HelpCircle, Phone, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoSymbol } from '@/components/ui/LogoSymbol';
export default function Navbar() {
  const [lang, setLang] = useState('ES');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languages = ['ES', 'DE', 'CH-DE', 'IT', 'FR', 'EN'];

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Servicios', path: '/servicios', icon: Stethoscope },
    { name: 'Agendar Sesión', path: '/agendar', icon: Calendar },
    { name: '¿Quiénes somos?', path: '/#quienes-somos', icon: UserCircle },
    { name: 'Recursos', path: '/recursos', icon: BookOpen },
    { name: 'Preguntas frecuentes', path: '/#faq', icon: HelpCircle },
    { name: 'Contacto', path: '/#contacto', icon: Phone },
    { name: 'Mi Cuenta', path: '/mi-cuenta', icon: User },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isMenuOpen ? 'bg-transparent border-transparent shadow-none' : 'bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm'}`}>
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-5xl mx-auto">
          {/* Isotype: Symbol + Text + Subtitle */}
          <Link href="/" className="flex items-center gap-2 z-50 relative" onClick={() => setIsMenuOpen(false)}>
            <LogoSymbol className={`w-8 h-8 shrink-0 transition-colors ${isMenuOpen ? 'text-white' : 'text-olivo'}`} />
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight uppercase transition-colors uppercase ${isMenuOpen ? 'text-white' : 'text-bluegrey-900'}`}>Sentido Migrante</span>
              <span className={`text-[0.65rem] font-medium leading-tight transition-colors ${isMenuOpen ? 'text-suculenta' : 'text-bosque-dark'}`}>Psicoterapia humanista y vínculo cultural</span>
            </div>
          </Link>

          {/* Right side interactions */}
          <div className="flex items-center gap-2 sm:gap-3 z-50 relative">
            <div className="relative group">
              <button className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md transition-colors ${isMenuOpen ? 'text-white hover:text-suculenta' : 'text-bluegrey-600 hover:text-bosque'}`}>
                {lang}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-24 bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/50">
                {languages.map((l) => (
                  <button 
                    key={l} 
                    onClick={() => setLang(l)}
                    className="w-full text-left px-3 py-2 text-sm text-bluegrey-700 hover:bg-menta hover:text-bosque-dark transition-colors"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button className={`p-2 transition-colors relative ${isMenuOpen ? 'text-white hover:text-suculenta' : 'text-bluegrey-500 hover:text-bosque'}`}>
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-grape-600 rounded-full border border-cream-50"></span>
            </button>
            
            <Link href="/mi-cuenta" className={`w-8 h-8 rounded-full hidden sm:flex items-center justify-center transition-colors ${isMenuOpen ? 'bg-bluegrey-800 text-white hover:bg-bluegrey-700 hover:text-suculenta' : 'bg-bluegrey-100 text-bluegrey-600 hover:bg-menta hover:text-bosque-dark'}`}>
              <User size={18} />
            </Link>

            <button 
              className={`p-2 -mr-2 transition-colors ${isMenuOpen ? 'text-white hover:text-suculenta' : 'text-bluegrey-600 hover:text-bosque'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
         </div>
      </header>

      {/* Hamburger Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bluegrey-900/80 backdrop-blur-2xl flex flex-col pt-24 px-6 md:px-12"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-medium text-white mb-10">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                  >
                    <Link 
                      href={link.path} 
                      className="flex items-center gap-4 hover:text-suculenta transition-colors py-4 border-b border-bluegrey-700/50 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={28} className="text-olivo group-hover:text-suculenta transition-colors" strokeWidth={1.5} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-bluegrey-300">Seleccionar idioma:</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button 
                      key={l}
                      onClick={() => { setLang(l); setIsMenuOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${lang === l ? 'bg-olivo text-white shadow-lg shadow-olivo/20' : 'bg-bluegrey-800 text-bluegrey-300 hover:bg-bluegrey-700'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
