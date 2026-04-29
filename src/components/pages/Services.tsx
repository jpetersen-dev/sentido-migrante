import { Clock, User, Users, Globe, MoveRight } from 'lucide-react';
import Link from 'next/link';

const IconMap: Record<string, any> = {
  User,
  Users,
  Globe
};

export default function Services({ servicesData }: { servicesData: any[] }) {
  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-2">Servicios</h1>
        <p className="text-bluegrey-600 font-medium">Encuentra el acompañamiento adecuado para ti.</p>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
        {servicesData.map((srv, i) => {
          const Icon = typeof srv.icon === 'string' ? IconMap[srv.icon] : srv.icon;
          return (
            <div key={i} className="bg-white rounded-3xl shadow-sm border border-cream-200 flex flex-col hover:shadow-lg transition-all overflow-hidden group">
              <div className="relative h-56 w-full bg-bluegrey-100 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm text-bluegrey-800">
                   <Icon size={20} strokeWidth={2} />
                </div>
                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-bluegrey-900 leading-tight flex-1">{srv.title}</h3>
                  <div className="px-2.5 py-1 bg-menta border border-menta text-bosque-dark rounded-lg text-sm font-semibold shrink-0">
                    {srv.price}
                  </div>
                </div>
                <p className="text-sm text-bluegrey-600 leading-relaxed font-medium mb-6">
                  {srv.desc}
                </p>
                
                <div className="h-px w-full bg-cream-200 mt-auto mb-4"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-bluegrey-500 font-medium text-sm">
                    <Clock size={16} />
                    <span>{srv.duration}</span>
                  </div>
                  <Link href={`/agendar?service=${srv.title}`} className="px-4 py-2 bg-cream-50 text-bosque-dark hover:bg-menta hover:text-bosque-dark font-semibold text-sm rounded-xl transition-colors flex items-center gap-2">
                    Agendar <MoveRight size={14}/>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
