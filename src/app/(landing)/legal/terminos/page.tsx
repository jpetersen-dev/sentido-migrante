import { Metadata } from 'next';
import { ShieldCheck, Scale, Clock, AlertTriangle, CreditCard, Info, UserCheck, HeartPulse, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Sentido Migrante',
  description: 'Términos y condiciones legales de la plataforma de psicoterapia Sentido Migrante.',
};

export default function TerminosPage() {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12 max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Title block */}
      <div className="mb-8 border-b border-cream-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-bluegrey-900 mb-2">Términos y Condiciones de Uso</h1>
        <p className="text-bluegrey-500 text-xs font-sans">Última actualización: 12 de junio de 2026</p>
      </div>

      {/* Introduction */}
      <div className="bg-cream-50 rounded-3xl border border-cream-200 p-6 mb-8 text-sm text-bluegrey-700 leading-relaxed font-sans">
        <p className="mb-4 font-semibold text-bluegrey-900">
          Bienvenido a Sentido Migrante.
        </p>
        <p>
          Este documento regula las condiciones bajo las cuales los usuarios pueden acceder y utilizar el portal web, los servicios de agendamiento y la plataforma de telepsicología de Sentido Migrante. Al acceder a nuestro sitio web, registrarse, solicitar información o agendar una consulta clínica, usted acepta expresamente quedar vinculado por el presente acuerdo en su totalidad. Si no está de acuerdo con alguno de estos términos, deberá abstenerse de utilizar nuestros servicios.
        </p>
      </div>

      {/* Terms sections */}
      <div className="flex flex-col gap-6 font-sans text-bluegrey-700 leading-relaxed text-sm">
        
        {/* Section 1: Chile Jurisdiction */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-900 flex items-center gap-3">
            <Scale size={24} className="text-bosque shrink-0" />
            1. Jurisdicción y Regulación Aplicable
          </h2>
          <p>
            Los presentes Términos y Condiciones se rigen de manera exclusiva por la legislación vigente de la República de Chile. Cualquier controversia, conflicto, duda de interpretación o reclamación derivada de la utilización del sitio web, la prestación de los servicios terapéuticos y el procesamiento de los pagos asociados, será sometida de forma única e improrrogable a la jurisdicción de los Tribunales Ordinarios de Justicia de la comuna y ciudad de Santiago de Chile, renunciando expresamente el usuario a cualquier otro fuero que pudiera corresponderle por su domicilio actual o futuro.
          </p>
        </section>

        {/* Section 2: VAT Exemption */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-905 flex items-center gap-3">
            <ShieldCheck size={24} className="text-bosque shrink-0" />
            2. Facturación y Exención de IVA por Exportación de Servicios
          </h2>
          <p>
            Sentido Migrante presta servicios de psicoterapia a nivel nacional e internacional a través de su plataforma en línea. En el ámbito fiscal y en concordancia con el ordenamiento tributario chileno, se aplican las siguientes normativas de exención del Impuesto al Valor Agregado (IVA):
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-bluegrey-600">
            <li>
              <strong>Exportación de Servicios Sanitarios Intangibles (Internacional):</strong> Para aquellos pacientes que residan fuera de las fronteras de la República de Chile, las consultas clínicas y psicoterapias transfronterizas realizadas por profesionales desde Chile se consideran una exportación de servicios intangibles. Conforme al <strong>Artículo 12, Letra E, Número 16 del Decreto Ley N° 825 de 1974 (Ley sobre Impuesto a las Ventas y Servicios)</strong> y las directrices administrativas del Servicio de Impuestos Internos (SII), estas operaciones se encuentran exentas de IVA.
            </li>
            <li>
              <strong>Prestaciones Sanitarias Nacionales (Chile):</strong> De igual forma, las consultas clínicas de psicología prestadas de manera interna a pacientes dentro de Chile por parte de psicólogos profesionales calificados y debidamente acreditados en el Registro de Prestadores Individuales de la Superintendencia de Salud se encuentran exentas de IVA, en virtud del <strong>Artículo 12, Letra E, Número 20 de la Ley de Impuesto a las Ventas y Servicios (D.L. 825)</strong>, modificada por la Ley de Financiamiento PGU N° 21.420.
            </li>
          </ul>
          <p className="text-xs text-bluegrey-500 bg-cream-50 p-3 rounded-xl border border-cream-100">
            Nota: Todos los aranceles y costos de sesión expuestos en nuestra web para las diversas monedas de pago corresponden al valor neto total final a pagar por el paciente, no aplicando recargo tributario adicional por concepto de IVA.
          </p>
        </section>

        {/* Section 3: 12 Hours Rule */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <Clock size={24} className="text-bosque shrink-0" />
            3. Política de Cancelación, Inasistencia y Modificación de Citas (Regla de las 12 Horas)
          </h2>
          <p>
            Para asegurar un correcto funcionamiento de las agendas y mantener el compromiso ético y profesional entre terapeutas y pacientes, se establece de manera estricta y obligatoria la siguiente política:
          </p>
          <div className="border-l-4 border-bosque-dark bg-cream-50 p-4 rounded-r-2xl my-2 flex flex-col gap-2">
            <h3 className="font-bold text-bluegrey-900">La Regla de las 12 Horas de Anticipación</h3>
            <p>
              Toda solicitud de cancelación, reprogramación o modificación de una sesión agendada deberá ser gestionada por el paciente a través de su portal privado de usuario o comunicada formalmente al equipo de coordinación clínica con al menos <strong>12 horas de anticipación</strong> al horario reservado originalmente.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-bluegrey-600">
            <p>
              <strong className="text-bluegrey-800">a) Modificaciones fuera del plazo límite:</strong> Si el paciente decide cancelar, reprogramar o modificar la cita con un tiempo menor a las 12 horas señaladas, la sesión se considerará formalmente efectuada. En consecuencia, se devengará el cobro del 100% de la tarifa del servicio reservado, perdiendo el derecho a reembolso o reagendamiento sin costo.
            </p>
            <p>
              <strong className="text-bluegrey-800">b) Inasistencias (No-Show):</strong> La ausencia injustificada o inasistencia del paciente transcurridos 15 minutos desde el inicio de la hora pactada se considerará "No-Show" y conllevará el cobro total de la sesión, liberando al psicólogo de la obligación de permanecer conectado.
            </p>
            <p>
              <strong className="text-bluegrey-800">c) Cancelaciones por parte del terapeuta:</strong> En caso fortuito o de fuerza mayor en que el psicólogo asignado deba cancelar o reprogramar una sesión, el paciente tendrá derecho a reprogramar la sesión en la fecha y hora disponible de su conveniencia sin costo alguno, o en su defecto, solicitar la restitución del 100% del pago realizado.
            </p>
          </div>
        </section>

        {/* Section 4: Telepsychotherapy & Emergencies */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <HeartPulse size={24} className="text-bosque shrink-0" />
            4. Naturaleza del Servicio y Exclusión de Emergencias
          </h2>
          <p>
            El servicio provisto por Sentido Migrante es de acompañamiento psicológico y psicoterapia ambulatoria bajo la modalidad en línea (telepsicología). Este canal no es apto para el tratamiento de crisis agudas o emergencias psiquiátricas graves.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-900">
            <AlertTriangle className="shrink-0 text-amber-600" size={24} />
            <div>
              <p className="font-bold text-sm mb-1">AVISO IMPORTANTE DE SEGURIDAD</p>
              <p className="text-xs leading-relaxed">
                Si usted se encuentra en una situación de crisis grave, presenta ideación suicida activa, intención de autolesión o conductas que pongan en peligro su vida o la de terceros, <strong>no debe utilizar esta plataforma</strong>. Le solicitamos acudir de inmediato al servicio de urgencias médicas más cercano de su localidad o comunicarse con las líneas de prevención del suicidio de su país de residencia (por ejemplo, el fono Salud Responde 600 360 7777 o marcar 131 de SAMU en Chile).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Accounts and Payments */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <CreditCard size={24} className="text-bosque shrink-0" />
            5. Registro de Cuenta, Pagos y Pasarelas de Pago
          </h2>
          <p>
            El acceso a las reservas de sesiones requiere la creación previa de una cuenta de usuario, comprometiéndose a entregar datos reales, vigentes y precisos. Los pagos se realizan de forma anticipada al inicio de cada consulta clínica utilizando los sistemas de pago autorizados (tales como Stripe, Webpay u otras pasarelas habilitadas en la web). Sentido Migrante no almacena datos de tarjetas de crédito o débito de forma directa, delegando la seguridad de las transacciones a los proveedores certificados de pago.
          </p>
        </section>

        {/* Section 6: User Eligibility */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <UserCheck size={24} className="text-bosque shrink-0" />
            6. Requisitos de Capacidad y Menores de Edad
          </h2>
          <p>
            Nuestros servicios están dirigidos primordialmente a personas con plena capacidad de ejercicio (mayores de 18 años). El tratamiento para adolescentes o niños de forma online queda supeditado a la aceptación explícita y al acompañamiento de sus padres, madres, tutores o representantes legales, quienes deberán firmar digitalmente el Consentimiento Informado especial correspondiente de forma previa al inicio del proceso clínico.
          </p>
        </section>

        {/* Section 7: Intellectual Property */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <FileText size={24} className="text-bosque shrink-0" />
            7. Propiedad Intelectual
          </h2>
          <p>
            Todos los contenidos de este portal web, incluyendo imágenes, marcas, logotipos, material de autoayuda, artículos, cuestionarios psicométricos, vídeos y código fuente, se encuentran protegidos por derechos de propiedad intelectual e industrial a nombre de Sentido Migrante y sus respectivos licenciantes. Queda estrictamente prohibida la copia, reproducción, difusión, distribución o utilización no autorizada de estos materiales sin la previa autorización por escrito del representante legal de Sentido Migrante.
          </p>
        </section>

        {/* Section 8: Modifications */}
        <section className="bg-white rounded-3xl border border-cream-200 p-6 md:p-8 shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-bold font-display text-bluegrey-950 flex items-center gap-3">
            <Info size={24} className="text-bosque shrink-0" />
            8. Modificación de los Términos
          </h2>
          <p>
            Sentido Migrante se reserva el derecho de modificar o actualizar de forma unilateral estos Términos y Condiciones en cualquier momento con el fin de adaptarlos a reformas legislativas o mejoras operativas del servicio. Se informará a los usuarios registrados sobre cambios significativos a través del portal de pacientes o por correo electrónico. La continuación del uso de la plataforma posterior a la entrada en vigor de los cambios constituye una aceptación expresa de los mismos.
          </p>
        </section>
      </div>

      {/* Support footer info */}
      <div className="mt-8 text-center text-xs text-bluegrey-500 font-sans">
        Para dudas legales o mayor información sobre estos Términos y Condiciones, escríbenos a{' '}
        <a href="mailto:soporte@sentidomigrante.com" className="text-bosque font-semibold underline hover:text-bosque-dark">
          soporte@sentidomigrante.com
        </a>
      </div>
    </div>
  );
}
