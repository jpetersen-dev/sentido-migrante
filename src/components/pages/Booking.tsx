"use client";

import { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CreditCard, ChevronRight, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const teamData = [
  { id: '1', name: "Lic. Martín Suárez", role: "Psicólogo Clínico", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop" },
  { id: '2', name: "Lic. Elena Rojas", role: "Psicoterapeuta Sistémica", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" }
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Fake data
  const today = new Date();
  const nextDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i));
  const availableSlots = ['09:00', '10:00', '14:00', '15:30', '17:00'];

  const services = [
    { id: '1', name: 'Psicoterapia Individual', price: 'CHF 150', duration: '50 min' },
    { id: '2', name: 'Terapia de Pareja', price: 'CHF 180', duration: '60 min' }
  ];
  const [selectedService, setSelectedService] = useState(services[0].id);

  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-2">Agendar Sesión</h1>
        <p className="text-bluegrey-600 text-sm">Selecciona el especialista y tu disponibilidad</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 text-xs sm:text-sm overflow-x-auto pb-2">
        <div className={`font-semibold shrink-0 ${step >= 1 ? 'text-bosque' : 'text-bluegrey-400'}`}>Especialista</div>
        <ChevronRight size={14} className="text-bluegrey-300 shrink-0" />
        <div className={`font-semibold shrink-0 ${step >= 2 ? 'text-bosque' : 'text-bluegrey-400'}`}>Fecha</div>
        <ChevronRight size={14} className="text-bluegrey-300 shrink-0" />
        <div className={`font-semibold shrink-0 ${step >= 3 ? 'text-bosque' : 'text-bluegrey-400'}`}>Servicio</div>
        <ChevronRight size={14} className="text-bluegrey-300 shrink-0" />
        <div className={`font-semibold shrink-0 ${step >= 4 ? 'text-bosque' : 'text-bluegrey-400'}`}>Pago</div>
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-bluegrey-800 flex items-center gap-2">
              <User size={20} className="text-bosque" />
              Selecciona un especialista
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamData.map(pro => (
                <div 
                  key={pro.id} 
                  onClick={() => setSelectedPro(pro.id)}
                  className={`p-4 rounded-2xl flex items-center gap-4 border-2 transition-all cursor-pointer ${
                    selectedPro === pro.id ? 'border-bosque bg-menta shadow-sm' : 'border-cream-200 bg-white hover:border-suculenta'
                  }`}
                >
                  <img src={pro.img} alt={pro.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold text-bluegrey-900">{pro.name}</h4>
                    <p className="text-xs text-bosque-dark font-bold uppercase tracking-wider">{pro.role}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedPro === pro.id ? 'border-bosque' : 'border-cream-300'}`}>
                    {selectedPro === pro.id && <div className="w-2.5 h-2.5 rounded-full bg-bosque" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            disabled={!selectedPro}
            onClick={() => setStep(2)}
            className="mt-4 w-full py-4 bg-bosque text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="bg-bluegrey-50 rounded-2xl p-4 border border-bluegrey-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={teamData.find(p => p.id === selectedPro)?.img} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-xs text-bluegrey-500 font-medium uppercase">Especialista</span>
                <span className="font-bold text-bluegrey-900 text-sm hidden sm:block">
                  {teamData.find(p => p.id === selectedPro)?.name}
                </span>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="text-sm font-semibold text-bosque underline">Cambiar</button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-4">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-bluegrey-800">
              <CalendarIcon size={20} className="text-bosque" />
              Selecciona una fecha
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {nextDays.map(date => {
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border transition-all snap-start ${
                      isSelected 
                        ? 'bg-bosque border-bosque text-white shadow-md transform scale-105' 
                        : isWeekend ? 'bg-cream-100 border-cream-200 text-bluegrey-400 opacity-60' : 'bg-white border-cream-200 text-bluegrey-700 hover:border-suculenta'
                    }`}
                    disabled={isWeekend}
                  >
                    <span className="text-xs font-semibold uppercase">{format(date, 'eee', { locale: es })}</span>
                    <span className="text-xl font-bold">{format(date, 'd')}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedDate && (
             <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-4 animate-in fade-in slide-in-from-top-2">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-bluegrey-800">
                 <Clock size={20} className="text-bosque" />
                 Horarios disponibles
               </h3>
               <div className="grid grid-cols-3 gap-3">
                 {availableSlots.map(time => (
                   <button
                     key={time}
                     onClick={() => setSelectedTime(time)}
                     className={`py-2 px-3 rounded-xl border font-medium text-sm transition-all ${
                       selectedTime === time 
                         ? 'bg-bosque border-bosque text-white shadow-md' 
                         : 'bg-white border-cream-200 text-bluegrey-700 hover:border-suculenta'
                     }`}
                   >
                     {time}
                   </button>
                 ))}
               </div>
             </div>
          )}

          <div className="flex gap-3 mt-4">
            <button onClick={() => setStep(1)} className="w-1/3 py-4 border-2 border-cream-200 text-bluegrey-700 rounded-xl font-bold transition-all active:scale-[0.98]">Atrás</button>
            <button 
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(3)} 
              className="w-2/3 py-4 bg-bosque text-white rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="bg-bluegrey-50 rounded-2xl p-4 border border-bluegrey-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-bluegrey-500 font-medium uppercase">Fecha seleccionada</span>
              <span className="font-bold text-bluegrey-900 text-sm">
                {selectedDate ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es }) : ''} - {selectedTime}
              </span>
            </div>
            <button onClick={() => setStep(2)} className="text-sm font-semibold text-bosque underline">Cambiar</button>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-bluegrey-800">Tipo de Servicio</h3>
            {services.map(srv => (
              <div 
                key={srv.id} 
                onClick={() => setSelectedService(srv.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedService === srv.id ? 'border-bosque bg-menta shadow-sm' : 'border-cream-200 bg-white hover:border-suculenta'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-bluegrey-900">{srv.name}</h4>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedService === srv.id ? 'border-bosque' : 'border-cream-300'}`}>
                    {selectedService === srv.id && <div className="w-2.5 h-2.5 rounded-full bg-bosque" />}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-bluegrey-600">
                  <span className="flex items-center gap-1"><Clock size={14}/> {srv.duration}</span>
                  <span className="text-bosque-dark">{srv.price}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-bluegrey-800 mt-4">Datos del Paciente</h3>
            <div className="flex flex-col gap-3">
              <input value={patientName} onChange={(e) => setPatientName(e.target.value)} type="text" placeholder="Nombre completo" className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900" />
              <input type="email" placeholder="Correo electrónico" className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900" />
              <input type="tel" placeholder="Teléfono (+41, +34, etc)" className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900" />
              <textarea placeholder="Motivo de consulta (opcional)" rows={3} className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900 resize-none"></textarea>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button onClick={() => setStep(2)} className="w-1/3 py-4 border-2 border-cream-200 text-bluegrey-700 rounded-xl font-bold transition-all active:scale-[0.98]">Atrás</button>
            <button onClick={() => setShowConfirmModal(true)} disabled={!patientName.trim()} className="w-2/3 py-4 bg-bosque text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50">Confirmar</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-5">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-bluegrey-800">
               Resumen de Reserva
             </h3>
             <div className="flex flex-col gap-3 text-sm">
               <div className="flex justify-between pb-3 border-b border-cream-100">
                 <span className="text-bluegrey-500">Especialista</span>
                 <span className="font-semibold text-bluegrey-900">{teamData.find(p => p.id === selectedPro)?.name}</span>
               </div>
               <div className="flex justify-between pb-3 border-b border-cream-100">
                 <span className="text-bluegrey-500">Servicio</span>
                 <span className="font-semibold text-bluegrey-900">{services.find(s => s.id === selectedService)?.name}</span>
               </div>
               <div className="flex justify-between pb-3 border-b border-cream-100">
                 <span className="text-bluegrey-500">Fecha y Hora</span>
                 <span className="font-semibold text-bluegrey-900">{selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : ''} a las {selectedTime}</span>
               </div>
               <div className="flex justify-between pt-1">
                 <span className="font-bold text-bluegrey-900">Total</span>
                 <span className="font-bold text-lg text-bosque-dark">{services.find(s => s.id === selectedService)?.price}</span>
               </div>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-5">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-bluegrey-800">
               <CreditCard size={20} className="text-bosque" />
               Método de pago
             </h3>
             <div className="p-4 border border-bluegrey-200 rounded-xl bg-bluegrey-50 text-center mb-4">
               <span className="text-sm font-medium text-bluegrey-600">Simulación de pasarela de pago (Stripe/Twint)</span>
               <div className="flex items-center justify-center gap-2 mt-4 text-bluegrey-400">
                  <div className="h-8 w-12 bg-bluegrey-200 rounded"></div>
                  <div className="h-8 w-12 bg-bluegrey-200 rounded"></div>
                  <div className="h-8 w-12 bg-bluegrey-200 rounded"></div>
               </div>
             </div>
             
             <div className="flex items-start gap-2 mt-4 text-xs text-bluegrey-500">
               <input type="checkbox" id="terms" className="mt-1 accent-bosque" />
               <label htmlFor="terms">Acepto el acuerdo terapéutico y las políticas de cancelación (24 hrs de antelación).</label>
             </div>
          </div>

          <div className="flex gap-3">
             <button onClick={() => setStep(3)} className="w-1/3 py-4 border-2 border-cream-200 text-bluegrey-700 rounded-xl font-bold transition-all active:scale-[0.98]">Atrás</button>
             <button className="w-2/3 py-4 bg-bosque text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98]">Confirmar y Pagar</button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bluegrey-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 50, opacity: 0 }} 
              className="bg-white/85 backdrop-blur-2xl rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-white/60"
            >
              <div className="p-6 flex justify-between items-center border-b border-cream-200/50">
                  <h3 className="text-xl font-display font-bold text-bluegrey-900">Confirmación de Reserva</h3>
                  <button onClick={() => setShowConfirmModal(false)} className="text-bluegrey-500 hover:text-bluegrey-700 bg-white/60 hover:bg-white/80 backdrop-blur-md rounded-full p-2 transition-colors"><X size={20} strokeWidth={2.5} /></button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-white/60 flex flex-col gap-4">
                  <div className="flex justify-between pb-3 border-b border-cream-200/60">
                    <span className="text-bluegrey-500 font-medium text-sm">Paciente</span>
                    <span className="font-bold text-bluegrey-900 text-right">{patientName || 'No especificado'}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-cream-200/60">
                    <span className="text-bluegrey-500 font-medium text-sm">Especialista</span>
                    <span className="font-bold text-bluegrey-900 text-right">{teamData.find(p => p.id === selectedPro)?.name}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-cream-200/60">
                    <span className="text-bluegrey-500 font-medium text-sm">Servicio</span>
                    <span className="font-bold text-bluegrey-900 text-right max-w-[150px] truncate">{services.find(s => s.id === selectedService)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bluegrey-500 font-medium text-sm">Fecha y Hora</span>
                    <span className="font-bold text-bluegrey-900 text-right">{selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : ''} <br/> a las {selectedTime}</span>
                  </div>
                </div>
                
                <p className="text-[13px] text-bluegrey-500 font-light text-center px-2 leading-relaxed">
                  Una vez confirmado el pago, la sesión quedará agendada.
                </p>

                <button 
                  onClick={() => { setShowConfirmModal(false); setStep(4); }} 
                  className="w-full py-4 bg-bosque hover:bg-bosque-dark text-white rounded-xl font-bold text-lg shadow-lg shadow-bosque/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Ir al pago
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
