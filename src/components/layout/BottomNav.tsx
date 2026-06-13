"use client";

import { Home, Calendar, Stethoscope, UserCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { getLandingUrl } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/agendar', icon: Calendar, label: 'Agendar' },
    { to: '/servicios', icon: Stethoscope, label: 'Servicios' },
    { to: '/recursos', icon: BookOpen, label: 'Recursos' },
    { to: '/mi-cuenta', icon: UserCircle, label: 'Mi Cuenta' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-xl border-t border-cream-200/50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-around px-2 pt-2.5 pb-2 pb-[calc(10px+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isLanding = item.to === '/' || item.to === '/servicios';
          const isActive = !isLanding && (pathname === item.to || pathname?.startsWith(item.to + '/'));

          const buttonContent = (
            <motion.div
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative flex flex-col items-center justify-center w-full py-1 cursor-pointer select-none"
            >
              <div className="relative flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300">
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-menta rounded-full -z-10"
                  />
                )}
                <Icon size={20} className={isActive ? 'text-bosque-dark stroke-[2.25px] transition-colors duration-300' : 'text-bluegrey-500 stroke-[2px] transition-colors duration-300'} />
              </div>
              <span className={`text-[0.65rem] mt-1.5 transition-colors duration-200 ${isActive ? 'text-bosque-dark font-bold' : 'text-bluegrey-500 font-medium'}`}>
                {item.label}
              </span>
            </motion.div>
          );

          return isLanding ? (
            <a
              key={item.to}
              href={getLandingUrl(item.to)}
              className="flex-1 flex justify-center text-center cursor-pointer select-none"
            >
              {buttonContent}
            </a>
          ) : (
            <Link
              key={item.to}
              href={item.to}
              className="flex-1 flex justify-center text-center cursor-pointer select-none"
            >
              {buttonContent}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
