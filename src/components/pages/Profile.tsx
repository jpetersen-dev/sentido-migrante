"use client";

import { FileText, Calendar, Link2, Download, LogOut, ChevronRight, HelpCircle, User } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col w-full px-4 pt-16 pb-20 max-w-2xl mx-auto items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-cream-200 rounded-full"></div>
          <div className="h-6 w-32 bg-cream-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col w-full px-4 pt-16 pb-20 max-w-2xl mx-auto items-center text-center">
        <div className="w-20 h-20 bg-cream-100 text-bosque rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-white">
          <User size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-bluegrey-900 mb-3">Mi Cuenta</h1>
        <p className="text-bluegrey-500 mb-8 max-w-sm">Inicia sesión para ver tu historial de sesiones, facturas y progreso de tu plan terapéutico.</p>
        <button 
          onClick={() => signIn("google")}
          className="px-8 py-4 bg-bosque text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:bg-bosque-dark transition-all active:scale-[0.98]"
        >
          Ingresar con Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-bluegrey-900 mb-1">Mi Cuenta</h1>
          <p className="text-bluegrey-500 text-sm font-light">Hola, 👋 {session.user.name?.split(' ')[0] || "Paciente"}</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-cream-100 flex-shrink-0 flex items-center justify-center">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name || "User Profile"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="text-xl font-bold text-bosque">{session.user.name?.charAt(0).toUpperCase() || "U"}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Next Session Card */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-bosque p-8 text-white shadow-[0_15px_40px_rgba(20,184,166,0.3)] border border-olivo/50">
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[0.65rem] font-bold uppercase tracking-widest shadow-sm">
                <Calendar size={14} />
                Próxima Sesión
              </div>
              <span className="text-menta text-sm font-medium bg-bosque-dark/50 px-3 py-1 rounded-lg backdrop-blur-sm">Videollamada</span>
            </div>

            <div className="mb-10">
               <h3 className="text-4xl font-display font-bold mb-2 leading-none text-white drop-shadow-sm">Mañana, 15:30</h3>
               <p className="text-menta font-light text-lg">Psicoterapia Individual con Lic. Martín</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button className="flex-1 py-4 bg-white text-bosque-dark font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-cream-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-[0.98]">
                <Link2 size={18} /> Entrar a la sesión
              </button>
              <button className="px-6 py-4 bg-bosque-dark/50 hover:bg-bosque-dark/80 backdrop-blur-md text-white font-semibold rounded-2xl transition-all border border-olivo/50 active:scale-[0.98]">
                Reprogramar
              </button>
            </div>
          </div>
        </section>

        {/* Vertical List Items */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-bluegrey-400 ml-4 mb-1">Mi Actividad</h3>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden flex flex-col">
            {[
              { icon: User, label: "Datos Personales", color: "text-bluegrey-700", bg: "bg-bluegrey-50" },
              { icon: Calendar, label: "Historial de Citas", color: "text-bosque", bg: "bg-menta" },
              { icon: FileText, label: "Plan Terapéutico", color: "text-grape-600", bg: "bg-purple-50" },
              { icon: Download, label: "Facturas y Recibos", color: "text-bluegrey-600", bg: "bg-cream-100" },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <button key={i} className={`flex items-center gap-4 p-5 w-full hover:bg-cream-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-cream-100' : ''}`}>
                  <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                    <Icon size={22} className="shrink-0" />
                  </div>
                  <span className="font-semibold text-bluegrey-900 flex-1 text-left text-[15px]">{item.label}</span>
                  <ChevronRight size={18} className="text-bluegrey-300" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings & Support */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-bluegrey-400 ml-4 mb-1">Ajustes</h3>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden flex flex-col">
             <button className="flex items-center gap-4 p-5 w-full hover:bg-cream-50 transition-colors border-b border-cream-100">
                <div className="p-3 rounded-2xl bg-bluegrey-50 text-bluegrey-600">
                  <HelpCircle size={22} />
                </div>
                <span className="font-semibold text-bluegrey-900 flex-1 text-left text-[15px]">Soporte y Ayuda</span>
                <ChevronRight size={18} className="text-bluegrey-300" />
              </button>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-4 p-5 w-full hover:bg-red-50 transition-colors text-red-600 group">
                <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 text-red-600 transition-colors shrink-0">
                  <LogOut size={22} />
                </div>
                <span className="font-semibold flex-1 text-left text-[15px]">Cerrar Sesión</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
