import { Clock, User, Users, Globe, Heart, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { getAppUrl } from '@/lib/utils';

const IconMap: Record<string, any> = {
  User,
  Users,
  Globe,
  Heart
};

export default function Services({ servicesData }: { servicesData: any[] }) {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-bosque-dark bg-menta px-3 py-1 rounded-full mb-4 inline-block">
          Enfoque Clínico Transnacional
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-bluegrey-900 mb-4">
          Nuestras Verticales de Acompañamiento
        </h1>
        <p className="text-bluegrey-700 font-sans leading-relaxed mb-4">
          En Sentido Migrante desarrollamos una <strong className="font-semibold text-bosque-dark">Arquitectura de Restauración Existencial</strong>. Combinamos el rigor clínico del Psicoanálisis y el Análisis Existencial para ofrecer un espacio de alta especialidad donde no necesitas traducir tu dolor ni justificar tu identidad cultural.
        </p>
        <p className="text-sm text-bluegrey-500 font-medium">
          Nuestra práctica se enfoca en tres verticales clínicas principales diseñadas para los desafíos específicos de la vida en el extranjero, junto con un abordaje integrador del duelo migratorio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {servicesData.map((srv, i) => {
          const Icon = (typeof srv.icon === 'string' ? IconMap[srv.icon] : srv.icon) || User;
          return (
            <div key={i} className="bg-white rounded-3xl shadow-sm border border-cream-200 flex flex-col hover:shadow-lg transition-all overflow-hidden group">
              <div className="relative h-48 w-full bg-bluegrey-100 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm text-bluegrey-800">
                   <Icon size={20} strokeWidth={2} />
                </div>
                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-col gap-2 mb-3">
                  <h3 className="text-lg font-bold text-bluegrey-900 leading-tight">{srv.title}</h3>
                  <div className="self-start px-2 py-0.5 bg-menta border border-menta text-bosque-dark rounded-md text-xs font-semibold">
                    {srv.price}
                  </div>
                </div>
                <p className="text-xs text-bluegrey-600 leading-relaxed font-medium mb-6 flex-1">
                  {srv.desc}
                </p>
                
                <div className="h-px w-full bg-cream-200 mt-auto mb-4"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-bluegrey-500 font-medium text-xs">
                    <Clock size={14} />
                    <span>{srv.duration}</span>
                  </div>
                  <a href={getAppUrl(`/agendar?service=${srv.title}`)} className="px-3 py-1.5 bg-cream-50 text-bosque-dark hover:bg-menta hover:text-bosque-dark font-semibold text-xs rounded-xl transition-colors flex items-center gap-1">
                    Agendar <MoveRight size={12}/>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
