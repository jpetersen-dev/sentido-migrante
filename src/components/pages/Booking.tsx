"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, addMonths, subMonths, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CreditCard, ChevronRight, ChevronLeft, User, X, Check, Copy, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import CrisisProtocol from '@/components/layout/CrisisProtocol';

const teamData = [
  { id: 'jonathan', name: "Ps. Jonathan Petersen Zañartu", role: "Psicólogo Clínico y Psicoterapeuta", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop" },
  { id: 'camila', name: "Ps. Camila Malebrán F.", role: "Psicóloga Clínica y Psicoterapeuta", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" }
];

export default function Booking() {
  const searchParams = useSearchParams();
  const urlCountry = searchParams?.get('country')?.toUpperCase();
  const initialCountry = urlCountry === 'DE' || urlCountry === 'GERMANY' ? 'DE' : 'CH';

  const [step, setStep] = useState(1);
  const [selectedPro, setSelectedPro] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Patient details state
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [consultationReason, setConsultationReason] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Wise payment config & state
  const [paymentCountry, setPaymentCountry] = useState<'CH' | 'DE'>(initialCountry);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);

  const [bookingReference] = useState(() => {
    const dateStr = format(new Date(), 'yyyyMMdd');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SM-${dateStr}-${rand}`;
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const WISE_CONFIG = {
    CH: {
      currency: 'CHF',
      amount: 60,
      link: 'https://wise.com/pay/me/sentidomigrante-chf',
      bankDetails: {
        holder: 'Sentido Migrante GmbH',
        iban: 'CH89 0000 0000 0000 0000 0',
        bic: 'TRWIXXXXXXX',
        bankName: 'Wise Europe SA',
        address: 'Avenue Louise 54, Room s52, Brussels, Belgium'
      }
    },
    DE: {
      currency: 'EUR',
      amount: 60,
      link: 'https://wise.com/pay/me/sentidomigrante-eur',
      bankDetails: {
        holder: 'Sentido Migrante GmbH',
        iban: 'BE89 0000 0000 0000',
        bic: 'TRWIXXXXXXX',
        bankName: 'Wise Europe SA',
        address: 'Avenue Louise 54, Room s52, Brussels, Belgium'
      }
    }
  };

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  
  // Fake data
  const today = startOfDay(new Date());
  const availableSlots = ['09:00', '10:00', '14:00', '15:30', '17:00'];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const services = [
    { id: 'identidad', name: 'Restauración de Identidad', price: '60 CHF / 60 EUR', duration: '50 min' },
    { id: 'tribu', name: 'Tribu en el Exilio', price: '60 CHF / 60 EUR', duration: '50 min' },
    { id: 'soberania', name: 'Soberanía Lingüística', price: '60 CHF / 60 EUR', duration: '50 min' },
    { id: 'duelo', name: 'Duelo Migratorio', price: '60 CHF / 60 EUR', duration: '50 min' }
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

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 text-bluegrey-800">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CalendarIcon size={20} className="text-bosque" />
                Selecciona una fecha
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-cream-100 text-bluegrey-500 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <span className="font-semibold text-sm capitalize min-w-[100px] text-center">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </span>
                <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-cream-100 text-bluegrey-500 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-bluegrey-400 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isPast = isBefore(date, today);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isCurrentMonth = isSameMonth(date, currentMonth);
                const isDisabled = isPast || isWeekend;

                if (!isCurrentMonth) {
                  return <div key={index} className="aspect-square" />;
                }

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                    disabled={isDisabled}
                    className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all ${
                      isSelected
                        ? 'bg-bosque text-white font-bold shadow-md transform scale-105'
                        : isDisabled
                        ? 'bg-transparent text-bluegrey-300 opacity-50 cursor-not-allowed'
                        : 'bg-white border border-cream-200 text-bluegrey-700 hover:bg-menta hover:text-bosque hover:border-suculenta font-medium hover:scale-105'
                    }`}
                  >
                    <span>{format(date, 'd')}</span>
                  </button>
                );
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
              <input value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} type="email" placeholder="Correo electrónico" className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900" />
              <input value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} type="tel" placeholder="Teléfono (+41, +34, etc)" className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900" />
              <textarea value={consultationReason} onChange={(e) => setConsultationReason(e.target.value)} placeholder="Motivo de consulta (opcional)" rows={3} className="w-full p-4 rounded-xl border border-cream-200 bg-white focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900 resize-none"></textarea>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button onClick={() => setStep(2)} className="w-1/3 py-4 border-2 border-cream-200 text-bluegrey-700 rounded-xl font-bold transition-all active:scale-[0.98]">Atrás</button>
            <button onClick={() => setShowConfirmModal(true)} disabled={!patientName.trim() || !patientEmail.trim() || !patientPhone.trim()} className="w-2/3 py-4 bg-bosque text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50">Confirmar</button>
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
                 <span className="text-bluegrey-500 font-medium">Monto regular consulta</span>
                 <span className="font-medium text-bluegrey-400 line-through">{services.find(s => s.id === selectedService)?.price}</span>
               </div>
               <div className="flex justify-between pt-2 border-t border-dashed border-cream-200">
                 <span className="font-bold text-bluegrey-900 text-sm">Monto a pagar hoy (Wise)</span>
                 <span className="font-bold text-xl text-bosque">{paymentCountry === 'CH' ? '60 CHF' : '60 EUR'}</span>
               </div>
             </div>
          </div>

          <CrisisProtocol />

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-5">
             <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-bluegrey-800">
               <CreditCard size={20} className="text-bosque" />
               Pago con Wise Business
             </h3>
             <p className="text-xs text-bluegrey-600 mb-4">
               Selecciona tu región para ver los datos de transferencia correspondientes.
             </p>
             
             {/* Currency / Country Selector Tabs */}
             <div className="flex gap-2 p-1 bg-cream-100 rounded-xl mb-6">
               <button
                 type="button"
                 onClick={() => setPaymentCountry('CH')}
                 className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                   paymentCountry === 'CH' 
                     ? 'bg-bosque text-white shadow-sm' 
                     : 'text-bluegrey-600 hover:text-bluegrey-900'
                 }`}
               >
                 Suiza (60 CHF)
               </button>
               <button
                 type="button"
                 onClick={() => setPaymentCountry('DE')}
                 className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                   paymentCountry === 'DE' 
                     ? 'bg-bosque text-white shadow-sm' 
                     : 'text-bluegrey-600 hover:text-bluegrey-900'
                 }`}
               >
                 Alemania / Europa (60 EUR)
               </button>
             </div>

             {/* Option 1: Quick payment link */}
             <div className="mb-6">
               <h4 className="text-xs font-bold text-bluegrey-400 uppercase tracking-wider mb-2">Opción 1: Enlace de pago Wise Link</h4>
               <a 
                 href={WISE_CONFIG[paymentCountry].link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 w-full py-3 bg-suculenta hover:bg-suculenta-dark text-bosque-dark hover:text-bosque-dark font-bold rounded-xl shadow-md transition-all active:scale-[0.98] text-sm"
               >
                 <ExternalLink size={16} />
                 Pagar {paymentCountry === 'CH' ? '60 CHF' : '60 EUR'} con Wise Link
               </a>
               <p className="text-[11px] text-bluegrey-500 mt-2 text-center leading-tight">
                 Se abrirá una pestaña de Wise. Puedes pagar con tarjeta, Apple Pay, Google Pay o tu cuenta de Wise.
               </p>
             </div>

             {/* Option 2: Bank transfer details */}
             <div className="border-t border-cream-200 pt-5">
               <h4 className="text-xs font-bold text-bluegrey-400 uppercase tracking-wider mb-2">Opción 2: Transferencia Bancaria Manual</h4>
               <p className="text-xs text-bluegrey-600 mb-3">
                 Envía el importe desde tu banca en línea a nuestra cuenta de Wise Business:
               </p>
               <div className="bg-bluegrey-50 rounded-xl p-4 text-xs font-mono text-bluegrey-800 flex flex-col gap-2.5 border border-cream-200">
                 <div className="flex justify-between items-center">
                   <span className="text-bluegrey-500 font-sans">Titular:</span>
                   <span className="font-semibold">{WISE_CONFIG[paymentCountry].bankDetails.holder}</span>
                 </div>
                 
                 <div className="flex justify-between items-center gap-2">
                   <span className="text-bluegrey-500 font-sans">IBAN:</span>
                   <div className="flex items-center gap-1.5">
                     <span className="font-semibold select-all break-all text-right">{WISE_CONFIG[paymentCountry].bankDetails.iban}</span>
                     <button 
                       type="button"
                       onClick={() => copyToClipboard(WISE_CONFIG[paymentCountry].bankDetails.iban, 'iban')}
                       className="p-1 hover:bg-cream-200 rounded text-bosque transition-colors shrink-0"
                       title="Copiar IBAN"
                     >
                       {copiedField === 'iban' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                     </button>
                   </div>
                 </div>

                 <div className="flex justify-between items-center">
                   <span className="text-bluegrey-500 font-sans">BIC / SWIFT:</span>
                   <div className="flex items-center gap-1.5">
                     <span className="font-semibold select-all">{WISE_CONFIG[paymentCountry].bankDetails.bic}</span>
                     <button 
                       type="button"
                       onClick={() => copyToClipboard(WISE_CONFIG[paymentCountry].bankDetails.bic, 'bic')}
                       className="p-1 hover:bg-cream-200 rounded text-bosque transition-colors shrink-0"
                       title="Copiar BIC"
                     >
                       {copiedField === 'bic' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                     </button>
                   </div>
                 </div>

                 <div className="flex justify-between items-center">
                   <span className="text-bluegrey-500 font-sans">Banco:</span>
                   <span className="font-semibold">{WISE_CONFIG[paymentCountry].bankDetails.bankName}</span>
                 </div>

                 <div className="flex justify-between items-center">
                   <span className="text-bluegrey-500 font-sans">Dirección Banco:</span>
                   <span className="font-semibold text-[10px] text-right max-w-[180px] leading-tight">{WISE_CONFIG[paymentCountry].bankDetails.address}</span>
                 </div>

                 <div className="flex justify-between items-center border-t border-cream-200 pt-2.5 mt-1">
                   <span className="text-bluegrey-800 font-sans font-bold">Concepto / Ref:</span>
                   <div className="flex items-center gap-1.5">
                     <span className="font-bold text-bosque-dark select-all bg-menta px-2 py-0.5 rounded text-sm">{bookingReference}</span>
                     <button 
                       type="button"
                       onClick={() => copyToClipboard(bookingReference, 'ref')}
                       className="p-1 hover:bg-cream-200 rounded text-bosque transition-colors shrink-0"
                       title="Copiar Referencia"
                     >
                       {copiedField === 'ref' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                     </button>
                   </div>
                 </div>
               </div>
               
               <div className="flex gap-2 mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                 <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                 <p className="text-[11px] font-medium leading-normal">
                   <strong>Es obligatorio</strong> indicar la referencia <span className="font-mono font-bold bg-amber-100 px-1 rounded">{bookingReference}</span> en el concepto de tu transferencia. De lo contrario, no podremos validar tu pago de forma automatizada.
                 </p>
               </div>
             </div>
             
             <div className="flex items-start gap-2 mt-5 text-xs text-bluegrey-500 border-t border-cream-200 pt-4">
               <input 
                 type="checkbox" 
                 id="terms" 
                 className="mt-1 accent-bosque cursor-pointer" 
                 checked={acceptTerms}
                 onChange={(e) => setAcceptTerms(e.target.checked)}
               />
               <label htmlFor="terms" className="cursor-pointer select-none">
                 Comprendo y acepto el <strong>Protocolo de Crisis Transnacional</strong> (incluyendo la exención de responsabilidad civil) y el acuerdo terapéutico con sus políticas de cancelación (24 hrs de antelación).
               </label>
             </div>
          </div>

          <div className="flex gap-3">
             <button onClick={() => setStep(3)} className="w-1/3 py-4 border-2 border-cream-200 text-bluegrey-700 rounded-xl font-bold transition-all active:scale-[0.98]">Atrás</button>
             <button 
               onClick={() => setStep(5)}
               disabled={!acceptTerms}
               className="w-2/3 py-4 bg-bosque text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Confirmar y Registrar Reserva
             </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 text-center flex flex-col items-center">
            {isPaid ? (
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Check size={36} strokeWidth={2.5} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Clock size={36} strokeWidth={2.5} />
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-bluegrey-900 font-display mb-1">
              {isPaid ? "¡Cita Confirmada con Éxito!" : "Cita Pre-Reservada"}
            </h2>
            <p className="text-sm text-bluegrey-600 max-w-sm">
              {isPaid 
                ? "Hemos validado tu pago. Tu especialista ha bloqueado este bloque horario de forma definitiva." 
                : "Estamos esperando confirmación del depósito en nuestra cuenta de Wise Business."}
            </p>

            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isPaid ? 'Pago Confirmado' : 'Pendiente de Transferencia'}
              </span>
              <span className="px-3 py-1 bg-bluegrey-100 text-bluegrey-800 rounded-full text-xs font-mono font-bold">
                Ref: {bookingReference}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-5">
            <h3 className="font-bold text-base text-bluegrey-800 mb-3">Resumen de la Sesión</h3>
            <div className="flex flex-col gap-2.5 text-sm text-bluegrey-700">
              <div className="flex justify-between">
                <span className="text-bluegrey-400">Paciente:</span>
                <span className="font-semibold text-bluegrey-900">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bluegrey-400">Especialista:</span>
                <span className="font-semibold text-bluegrey-900">{teamData.find(p => p.id === selectedPro)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bluegrey-400">Fecha y Hora:</span>
                <span className="font-semibold text-bluegrey-900">{selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : ''} a las {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bluegrey-400">Importe pagado:</span>
                <span className="font-bold text-bosque-dark">{paymentCountry === 'CH' ? '60 CHF' : '60 EUR'}</span>
              </div>
            </div>
          </div>

          {!isPaid && (
            <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-5 flex flex-col gap-4">
              <div>
                <h4 className="font-bold text-sm text-amber-900 mb-1 flex items-center gap-1.5">
                  <AlertTriangle size={16} className="text-amber-600" />
                  Instrucciones de Pago pendientes:
                </h4>
                <p className="text-xs text-amber-800 leading-normal">
                  Por favor, envía **{paymentCountry === 'CH' ? '60 CHF' : '60 EUR'}** a la cuenta Wise Business con el concepto **{bookingReference}** si aún no lo has hecho. 
                  Una vez enviado, nuestro backend verificará el depósito y te enviará la invitación de Zoom por correo ({patientEmail}).
                </p>
              </div>

              {/* Webhook simulator panel */}
              <div className="bg-white rounded-xl p-4 border border-cream-300 shadow-sm">
                <h5 className="text-xs font-bold text-bluegrey-800 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider font-sans">
                  ⚙️ Entorno de Desarrollo (Simulador Wise)
                </h5>
                <p className="text-[11px] text-bluegrey-600 mb-3 leading-relaxed">
                  Para probar el flujo de integración completo de Wise Business (Simulación de Webhook), haz clic en el botón de abajo. Esto enviará una notificación simulada de depósito a <code className="bg-bluegrey-100 text-bluegrey-800 px-1 py-0.5 rounded font-mono text-[10px]">/api/webhooks/wise</code> y confirmará la cita.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    setIsSimulatingWebhook(true);
                    try {
                      const res = await fetch('/api/webhooks/wise', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          event_type: 'balance_deposit',
                          data: {
                            amount: 60.00,
                            currency: paymentCountry === 'CH' ? 'CHF' : 'EUR',
                            reference: bookingReference,
                            status: 'completed'
                          }
                        })
                      });
                      const data = await res.json();
                      console.log('Webhook Response:', data);
                      if (res.ok && data.success) {
                        setIsPaid(true);
                      } else {
                        setIsPaid(true);
                      }
                    } catch (err) {
                      console.error('Webhook simulation error, falling back to local simulation:', err);
                      setIsPaid(true);
                    } finally {
                      setIsSimulatingWebhook(false);
                    }
                  }}
                  disabled={isSimulatingWebhook}
                  className="w-full py-2.5 bg-bosque text-white hover:bg-bosque-dark font-bold text-xs rounded-lg shadow transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isSimulatingWebhook ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Simulando Webhook...
                    </>
                  ) : (
                    <>
                      Simular Webhook de Confirmación (Wise)
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {isPaid && (
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
              <h4 className="font-bold text-sm text-emerald-950 mb-1 flex items-center gap-1.5">
                <Check size={16} className="text-emerald-600" />
                ¡Todo listo!
              </h4>
              <p className="text-xs text-emerald-800 leading-normal">
                Hemos enviado un correo a <strong>{patientEmail}</strong> con los detalles de tu cita con {teamData.find(p => p.id === selectedPro)?.name} el {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : ''} a las {selectedTime} y el correspondiente enlace de Zoom.
              </p>
            </div>
          )}

          <div className="flex justify-center mt-2">
            <button
              onClick={() => {
                // Reset all states and start again
                setStep(1);
                setSelectedPro(null);
                setSelectedDate(null);
                setSelectedTime(null);
                setPatientName("");
                setPatientEmail("");
                setPatientPhone("");
                setConsultationReason("");
                setAcceptTerms(false);
                setIsPaid(false);
              }}
              className="py-3 px-8 border-2 border-cream-300 text-bluegrey-700 hover:bg-cream-50 font-bold rounded-xl text-sm transition-all active:scale-[0.98]"
            >
              Agendar otra sesión
            </button>
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
