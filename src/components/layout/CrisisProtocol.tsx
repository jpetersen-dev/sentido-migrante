import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface CrisisProtocolProps {
  className?: string;
}

export default function CrisisProtocol({ className = '' }: CrisisProtocolProps) {
  return (
    <div className={`p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center gap-2.5 text-rose-800 font-bold text-sm tracking-wide">
        <ShieldAlert className="shrink-0 text-rose-600 animate-pulse" size={20} />
        <span>PROTOCOLO DE CRISIS TRANSNACIONAL</span>
      </div>
      
      <p className="text-xs leading-relaxed font-medium">
        <strong>IMPORTANTE:</strong> Sentido Migrante es un servicio de psicoterapia y acompañamiento psicológico online. Dado que nuestros terapeutas atienden de manera remota (principalmente desde Chile), <strong>este servicio NO es adecuado para situaciones de emergencia psiquiátrica, ideación suicida o crisis vital aguda</strong>.
      </p>

      <div className="text-xs leading-relaxed border-t border-rose-200/60 pt-3 flex flex-col gap-2 font-medium">
        <span className="font-semibold text-rose-900">
          Si te encuentras en una situación de riesgo vital o emergencia en Europa, por favor comunícate de inmediato con los servicios de asistencia locales:
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
          <div className="bg-white/80 p-3 rounded-xl border border-rose-100/50 shadow-sm">
            <span className="font-bold text-rose-950 block text-xs border-b border-rose-100 pb-1 mb-1">
              🇨🇭 SUIZA (CH)
            </span>
            <ul className="space-y-1 text-rose-900 text-[11px]">
              <li>Urgencias Generales (Notruf): <strong className="text-rose-700">112</strong></li>
              <li>Teléfono de la Esperanza (La Main Tendue): <strong className="text-rose-700">143</strong></li>
            </ul>
          </div>
          
          <div className="bg-white/80 p-3 rounded-xl border border-rose-100/50 shadow-sm">
            <span className="font-bold text-rose-950 block text-xs border-b border-rose-100 pb-1 mb-1">
              🇩🇪 ALEMANIA (DE)
            </span>
            <ul className="space-y-1 text-rose-900 text-[11px]">
              <li>Urgencias Generales (Notruf): <strong className="text-rose-700">112</strong></li>
              <li>Servicio de urgencias médicas (Ärztlicher Bereitschaftsdienst): <strong className="text-rose-700">116117</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-[10px] leading-relaxed text-rose-800 border-t border-rose-200/60 pt-3 font-medium">
        <strong>Exención de responsabilidad civil:</strong> El equipo clínico de Sentido Migrante y sus terapeutas quedan exentos de toda responsabilidad civil derivada de crisis vitales agudas, conductas autolesivas o de riesgo vital que no hayan sido comunicadas oportunamente dentro del encuadre clínico y que requieran de una intervención inmediata o presencial en el lugar de residencia del usuario.
      </p>
    </div>
  );
}
