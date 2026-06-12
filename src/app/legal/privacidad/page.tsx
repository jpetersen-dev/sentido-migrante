import { Metadata } from 'next';
import { Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Sentido Migrante',
  description: 'Política de privacidad, tratamiento de datos y consentimiento informado de Sentido Migrante.',
};

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 max-w-3xl mx-auto animate-in fade-in duration-500">
      {/* Title Block */}
      <div className="mb-8 border-b border-cream-200 pb-6">
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-2">Política de Privacidad y Consentimiento</h1>
        <p className="text-bluegrey-500 text-xs font-sans">Última actualización: 11 de junio de 2026</p>
      </div>

      {/* Privacy Policy Content */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-6 font-sans text-bluegrey-700 leading-relaxed text-sm">
        
        {/* Section 1: GDPR Compliance */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-900 flex items-center gap-2">
            <Lock size={20} className="text-bosque" />
            1. Protección de Datos y Cumplimiento RGPD
          </h2>
          <p>
            Sentido Migrante se compromete con la protección de la privacidad y los datos de carácter personal de sus usuarios de acuerdo con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea. Los datos sensibles de carácter médico y de salud mental serán tratados de forma estrictamente confidencial, cifrados y almacenados de manera segura en servidores que cumplen con los estándares éticos internacionales.
          </p>
        </section>

        {/* Section 2: Informed Consent */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-950 flex items-center gap-2">
            <FileText size={20} className="text-bosque" />
            2. Consentimiento Informado Digital
          </h2>
          <p>
            Al agendar y participar en las sesiones terapéuticas de Sentido Migrante, el paciente declara otorgar su consentimiento libre, expreso e informado para el tratamiento de su sintomatología psicológica. Se acuerda que el espacio de psicoterapia es confidencial (bajo secreto profesional), a menos que exista un riesgo grave e inminente para la vida del propio paciente o de terceros.
          </p>
        </section>

        {/* Section 3: Patient Rights */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold font-display text-bluegrey-950 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-bosque" />
            3. Derechos ARCO
          </h2>
          <p>
            Como titular de los datos, tienes derecho en todo momento a acceder, rectificar, cancelar u oponerte (derechos ARCO) al uso de tus datos personales, así como a solicitar la supresión de tu historial clínico digital enviando una solicitud formal a través del portal privado del paciente o escribiendo a nuestro equipo de soporte técnico y clínico.
          </p>
        </section>
      </div>
    </div>
  );
}
