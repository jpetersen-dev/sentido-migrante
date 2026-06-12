import { Metadata } from 'next';
import { Lock, FileText, CheckCircle2, ShieldCheck, Eye, Database, Mail, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Consentimiento | Sentido Migrante',
  description: 'Política de privacidad, tratamiento de datos sensibles y consentimiento informado de salud digital bajo estándares RGPD/GDPR.',
};

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Title Block */}
      <div className="mb-8 border-b border-cream-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-bluegrey-900 mb-2">Política de Privacidad y Consentimiento</h1>
        <p className="text-bluegrey-500 text-xs font-sans">Última actualización: 12 de junio de 2026</p>
      </div>

      {/* Intro block */}
      <div className="bg-cream-50 rounded-3xl border border-cream-200 p-6 mb-8 text-sm text-bluegrey-700 leading-relaxed font-sans">
        <p className="mb-4 font-semibold text-bluegrey-900">
          Compromiso con la Confidencialidad y el Resguardo de tus Datos Clínicos.
        </p>
        <p>
          En Sentido Migrante entendemos que la terapia es un espacio de máxima vulnerabilidad y confianza. Por ello, la confidencialidad de tu proceso y el resguardo seguro de tu información no son solo imperativos éticos de la práctica psicológica, sino también prioridades tecnológicas. Esta política detalla cómo recopilamos, almacenamos, tratamos y protegemos tu información personal y clínica en cumplimiento estricto con el Reglamento General de Protección de Datos (RGPD/GDPR - Reglamento UE 2016/679) y las leyes de derechos y deberes de los pacientes.
        </p>
      </div>

      {/* Content list */}
      <div className="flex flex-col gap-6 font-sans text-bluegrey-700 leading-relaxed text-sm">
        
        {/* Section 1: GDPR Compliance & Data Controller */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-900 flex items-center gap-3">
            <Lock size={24} className="text-bosque shrink-0" />
            1. Responsable del Tratamiento y Cumplimiento RGPD
          </h2>
          <p>
            El responsable del tratamiento de los datos recabados en este sitio web es Sentido Migrante. Dado que prestamos soporte transfronterizo en salud mental a ciudadanos residentes en la Unión Europea y otros países, aplicamos las garantías del Reglamento General de Protección de Datos (RGPD) europeo.
          </p>
          <p>
            La base legal para el tratamiento de tus datos personales comunes es tu <strong>consentimiento explícito</strong> (Art. 6.1.a del RGPD) y la ejecución del contrato de prestación de servicios psicológicos. En cuanto al tratamiento de tus datos de salud mental (calificados como <strong>datos sensibles o categorías especiales de datos</strong>), la base legal es tu consentimiento expreso manifestado antes de iniciar el tratamiento (Art. 9.2.a del RGPD) y la relación clínica clínico-paciente.
          </p>
        </section>

        {/* Section 2: Collected Data */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <Eye size={24} className="text-bosque shrink-0" />
            2. Información Recopilada y Categorías de Datos
          </h2>
          <p>
            Solo solicitamos y tratamos los datos estrictamente necesarios (principio de minimización de datos) para llevar a cabo la consulta psicológica:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-bluegrey-600">
            <li>
              <strong>Datos Identificativos e Información de Contacto:</strong> Nombre completo, dirección de correo electrónico, número de teléfono móvil, fecha de nacimiento, país de residencia actual, zona horaria y datos de facturación.
            </li>
            <li>
              <strong>Datos de Salud Mental y Clínicos (Datos Sensibles):</strong> Respuestas a cuestionarios iniciales de bienestar o test diagnósticos (como test de duelo, ansiedad o depresión), ficha clínica digitalizada redactada por tu terapeuta asignado, notas de evolución de las sesiones, antecedentes clínicos relevantes y diagnósticos presuntivos orientados al tratamiento.
            </li>
            <li>
              <strong>Datos Tecnológicos:</strong> Dirección IP de conexión, logs técnicos del sistema para control de accesos y seguridad, y cookies puramente necesarias para mantener iniciada tu sesión en el portal del paciente.
            </li>
          </ul>
        </section>

        {/* Section 3: Safe Storage & Security Protocols */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <Database size={24} className="text-bosque shrink-0" />
            3. Almacenamiento Seguro y Confidencialidad Técnica
          </h2>
          <p>
            Sentido Migrante implementa rigurosas medidas de seguridad técnicas y organizativas para salvaguardar la confidencialidad de tu historial:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="bg-cream-50 p-4 rounded-2xl border border-cream-100">
              <h4 className="font-semibold text-bluegrey-900 mb-1">Cifrado de Extremo a Extremo</h4>
              <p className="text-xs text-bluegrey-600 leading-normal">
                Toda transmisión de datos de salud en nuestra web viaja cifrada bajo protocolos seguros SSL/HTTPS, y las bases de datos que albergan las notas clínicas están encriptadas en reposo (AES-256).
              </p>
            </div>
            <div className="bg-cream-50 p-4 rounded-2xl border border-cream-100">
              <h4 className="font-semibold text-bluegrey-900 mb-1">Acceso Clínico Restringido</h4>
              <p className="text-xs text-bluegrey-600 leading-normal">
                Nadie del equipo técnico, administrativo o de marketing de Sentido Migrante tiene acceso a tu ficha clínica. Tu expediente solo puede ser visualizado por tu terapeuta asignado, bajo estricto secreto profesional.
              </p>
            </div>
          </div>
          <p className="text-xs text-bluegrey-500">
            * Las sesiones de videoconferencia se realizan mediante canales cerrados cifrados que no son grabados ni almacenados bajo ninguna circunstancia.
          </p>
        </section>

        {/* Section 4: Digital Informed Consent */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <FileText size={24} className="text-bosque shrink-0" />
            4. Consentimiento Informado para Salud Digital
          </h2>
          <p>
            Al hacer uso de nuestros servicios y agendar tu sesión, declaras comprender y consentir expresamente lo siguiente respecto al proceso terapéutico digital:
          </p>
          <div className="bg-cream-50 rounded-2xl p-4 flex flex-col gap-2 border border-cream-100 text-xs text-bluegrey-600">
            <p>
              <strong>a) Modalidad de Telepsicoterapia:</strong> Comprendo que las consultas psicológicas se efectúan a través de herramientas de telecomunicación a distancia. Esto ofrece ventajas de accesibilidad, flexibilidad de horarios y continuidad transcultural del cuidado clínico, pero también depende de la estabilidad tecnológica de ambas partes.
            </p>
            <p>
              <strong>b) Entorno de Conexión:</strong> Me comprometo a conectarme a cada sesión desde un espacio físico silencioso, privado y seguro, que garantice la confidencialidad de la videollamada y evite interrupciones de terceros.
            </p>
            <p>
              <strong>c) Secreto Profesional:</strong> Toda la información revelada en el contexto de las sesiones terapéuticas está sujeta a secreto profesional. Las únicas excepciones legales y éticas al secreto profesional corresponden a:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Casos de riesgo grave e inminente de daño físico para el propio paciente (ideación o intento suicida activo).</li>
              <li>Casos de peligro vital o de daño grave e inminente para terceras personas.</li>
              <li>Situaciones de abuso o negligencia grave en perjuicio de menores de edad o personas en situación de dependencia.</li>
              <li>Requerimientos de información médica por mandato judicial emanado de tribunales competentes.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: ARCO Rights */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <CheckCircle2 size={24} className="text-bosque shrink-0" />
            5. Derechos ARCO y Acceso GDPR
          </h2>
          <p>
            De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes pleno control sobre tu información. Tienes derecho a ejercer ante Sentido Migrante tus derechos ARCO-POL:
          </p>
          <div className="flex flex-col gap-2.5 text-bluegrey-600">
            <p>
              <strong className="text-bluegrey-800">• Acceso:</strong> Conocer qué datos personales tratamos sobre ti y solicitar una copia completa de tu expediente o historial de agendamientos.
            </p>
            <p>
              <strong className="text-bluegrey-800">• Rectificación:</strong> Solicitar la corrección de datos de contacto o personales que sean inexactos, incompletos o que se encuentren desactualizados.
            </p>
            <p>
              <strong className="text-bluegrey-800">• Cancelación / Supresión (Derecho al Olvido):</strong> Solicitar la eliminación de tus datos personales en nuestra base de datos.
            </p>
            <p>
              <strong className="text-bluegrey-800">• Oposición:</strong> Oponerte a que continuemos tratando tu información para finalidades específicas (por ejemplo, notificaciones administrativas o correos de seguimiento).
            </p>
            <p>
              <strong className="text-bluegrey-800">• Portabilidad:</strong> Solicitar la entrega de tus datos de contacto y antecedentes clínicos en un formato electrónico estructurado y de uso común, para transferirlos a otro especialista o centro de salud mental.
            </p>
            <p>
              <strong className="text-bluegrey-800">• Limitación del Tratamiento:</strong> Solicitar la restricción temporal del procesamiento de tus datos mientras se verifica la exactitud o la legalidad de un reclamo.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed mt-2">
            <AlertCircle className="shrink-0 text-blue-600" size={20} />
            <div>
              <p className="font-bold mb-1">INTERACCIÓN CON EL RESGUARDO CLÍNICO OBLIGATORIO</p>
              <p>
                Ten presente que de conformidad con las normativas internacionales de salud y la legislación sanitaria chilena que rige el ejercicio clínico, los terapeutas tienen la obligación legal y ética de conservar las fichas clínicas de los pacientes por un período determinado (en el caso de Chile, un mínimo de 15 años desde la última atención) para acreditar la idoneidad y responsabilidad en el tratamiento. 
              </p>
              <p className="mt-1.5">
                Por este motivo, al ejercer tu derecho de <strong>Cancelación o Supresión</strong>, eliminaremos inmediatamente tu cuenta de usuario, historial de navegación y datos de contacto superfluos. No obstante, los registros clínicos (notas de sesión e historial clínico indispensable) permanecerán guardados de forma inactiva y bloqueada en servidores seguros, sin procesamiento activo y accesibles únicamente bajo secreto profesional clínico, hasta que finalice el término de conservación exigido por la ley.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Exercise Rights & Contacts */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <Mail size={24} className="text-bosque shrink-0" />
            6. Ejercicio de Derechos y Contacto de Privacidad
          </h2>
          <p>
            Para ejercer cualquiera de los derechos descritos anteriormente, retirar el consentimiento otorgado o realizar consultas relativas al tratamiento de tus datos médicos y personales, deberás dirigir una solicitud formal por escrito a nuestro canal dedicado:
          </p>
          <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 text-center">
            <p className="font-semibold text-bluegrey-900 text-base">Delegado de Protección de Datos (DPO)</p>
            <p className="text-bosque font-bold text-sm my-1">
              <a href="mailto:privacidad@sentidomigrante.com" className="underline hover:text-bosque-dark">
                privacidad@sentidomigrante.com
              </a>
            </p>
            <p className="text-xs text-bluegrey-500">
              * Por razones de estricta seguridad de la información de salud, se te solicitará acreditar debidamente tu identidad (mediante documento oficial o código único de tu portal de paciente) para procesar cualquier solicitud relacionada con la descarga o rectificación de datos clínicos.
            </p>
          </div>
        </section>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-8 text-center text-xs text-bluegrey-500 font-sans">
        Sentido Migrante se reserva el derecho de modificar esta Política de Privacidad de forma periódica. Te aconsejamos revisarla regularmente para estar al tanto de posibles mejoras en nuestros estándares de ciberseguridad.
      </div>
    </div>
  );
}
