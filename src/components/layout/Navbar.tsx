"use client";

import { User, Menu, X, Home, Stethoscope, Calendar, BookOpen, UserCircle, HelpCircle, Phone, LogOut, CircleUser } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoSymbol } from '@/components/ui/LogoSymbol';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getAppUrl } from '@/lib/utils';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [lang, setLang] = useState('ES');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const languages = ['ES', 'DE', 'CH-DE', 'IT', 'FR', 'EN'];
  const isAppRoute = (path: string) => ['/agendar', '/recursos', '/mi-cuenta', '/articulo'].some(route => path.startsWith(route));

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showUserMenu]);

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
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isMenuOpen ? 'bg-transparent border-transparent shadow-none' : 'bg-cream-50/80 backdrop-blur-xl border-b border-cream-200/30 shadow-sm'}`}>
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-5xl mx-auto">
          {/* Isotype: Symbol + Text + Subtitle */}
          <Link href="/" className="flex items-center gap-2 z-50 relative" onClick={() => setIsMenuOpen(false)}>
            <LogoSymbol className={`w-8 h-8 shrink-0 transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-bosque'}`} />
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight uppercase transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-bluegrey-900'}`}>Sentido Migrante</span>
              <span className={`text-[0.65rem] font-semibold leading-tight tracking-wider transition-colors duration-300 ${isMenuOpen ? 'text-menta' : 'text-bosque-dark'}`}>Psicoterapia y Vínculo Cultural</span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold z-50 relative">
            {navLinks.filter(link => link.name !== 'Mi Cuenta' && link.name !== 'Preguntas frecuentes').map((link) => {
              const isApp = isAppRoute(link.path);
              const isHovered = hoveredLink === link.name;
              
              const linkContent = (
                <span className="relative z-10 font-sans tracking-wide">{link.name}</span>
              );

              return (
                <div
                  key={link.name}
                  className="relative py-1.5 px-3 cursor-pointer select-none text-bluegrey-600 hover:text-bosque transition-colors duration-200"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="desktopNavHover"
                      className="absolute inset-0 bg-menta/50 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isApp ? (
                    <a href={getAppUrl(link.path)}>
                      {linkContent}
                    </a>
                  ) : (
                    <Link href={link.path}>
                      {linkContent}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side interactions */}
          <div className="flex items-center gap-2 sm:gap-3 z-50 relative">
            {/* Language switcher */}
            <div className="relative group">
              <button className={`flex items-center gap-1 text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border transition-all ${isMenuOpen ? 'text-white border-white/20 hover:bg-white/10' : 'text-bluegrey-600 border-cream-200 hover:border-bosque/30 hover:text-bosque'}`}>
                {lang}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-28 bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-cream-200 py-1">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-bluegrey-700 hover:bg-menta hover:text-bosque-dark transition-colors"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* User Avatar / Login Button */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-bluegrey-100 animate-pulse hidden sm:block shrink-0" />
            ) : session?.user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); }}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                      className={`w-8 h-8 rounded-full object-cover border-2 transition-all duration-300 ${isMenuOpen ? 'border-white/50' : 'border-cream-200 group-hover:border-bosque'
                        }`}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isMenuOpen ? 'bg-white/20 text-white' : 'bg-menta text-bosque-dark border border-menta'
                      }`}>
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cream-200 overflow-hidden py-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3 border-b border-cream-100 bg-cream-50/50">
                        <p className="font-semibold text-sm text-bluegrey-900 truncate">{session.user.name}</p>
                        <p className="text-xs text-bluegrey-500 truncate mt-0.5">{session.user.email}</p>
                      </div>
                      <a
                        href={getAppUrl("/mi-cuenta")}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-bluegrey-700 hover:bg-menta hover:text-bosque-dark transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={16} className="text-bosque" />
                        Mi Cuenta
                      </a>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className={`flex items-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm ${isMenuOpen
                    ? 'text-white hover:bg-white/10 sm:border sm:border-white/20'
                    : 'text-bluegrey-600 hover:text-bosque sm:bg-bosque sm:text-white sm:hover:bg-bosque-dark sm:shadow-bosque/10 hover:shadow-md'
                  }`}
              >
                <CircleUser size={20} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Ingresar</span>
              </button>
            )}

            {/* Hamburger button with micro-animation */}
            <button
              className={`md:hidden p-2 -mr-2 rounded-full transition-all duration-300 ${isMenuOpen ? 'text-white hover:bg-white/10' : 'text-bluegrey-600 hover:bg-cream-100 hover:text-bosque'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "open" : "closed"}
                  initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
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
            className="fixed inset-0 z-40 bg-bosque-dark/95 backdrop-blur-3xl flex flex-col pt-24 px-6 md:px-12 overflow-y-auto no-scrollbar pb-12"
          >
            {/* Session info inside drawer (mobile) */}
            {session?.user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-bosque flex items-center justify-center text-white font-bold text-lg border border-white/10">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{session.user.name}</span>
                  <span className="text-menta/70 text-sm">{session.user.email}</span>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col gap-2 text-2xl font-display font-medium text-white mb-10">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isApp = isAppRoute(link.path);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    {isApp ? (
                      <a
                        href={getAppUrl(link.path)}
                        className="flex items-center gap-4 text-cream-50 hover:text-menta hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={24} className="text-menta group-hover:text-white transition-colors" strokeWidth={1.5} />
                        <span className="font-display font-medium text-xl">{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="flex items-center gap-4 text-cream-50 hover:text-menta hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={24} className="text-menta group-hover:text-white transition-colors" strokeWidth={1.5} />
                        <span className="font-display font-medium text-xl">{link.name}</span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-6 mt-auto pt-6 border-t border-white/10">
              {/* Login / Logout in drawer */}
              {!session?.user ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => { signIn("google"); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xl font-display font-medium text-menta hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <CircleUser size={24} strokeWidth={1.5} />
                  <span>Ingresar con Google</span>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-lg font-display font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                  <span>Cerrar sesión</span>
                </motion.button>
              )}

              <div className="flex flex-col gap-3 px-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-menta/70">Seleccionar idioma:</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsMenuOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${lang === l ? 'bg-menta text-bosque-dark shadow-md' : 'bg-white/5 text-cream-200 hover:bg-white/10'}`}
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
