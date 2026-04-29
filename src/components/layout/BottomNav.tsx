"use client";

import { Home, Calendar, Stethoscope, UserCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe glass bg-white/80 border-t border-cream-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to || pathname?.startsWith(item.to + '/');
          
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-bosque' : 'text-bluegrey-400 hover:text-bluegrey-600'
              }`}
            >
              <Icon size={22} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              <span className={`text-[0.65rem] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
