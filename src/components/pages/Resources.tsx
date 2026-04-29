"use client";

import { Clock, Search, BookOpen, Video, FileText, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Resources({ resourcesContent = [] }: { resourcesContent?: any[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-12">
      <div className="mb-8 flex flex-col gap-4">
        <button onClick={() => router.push('/#descubre')} className="self-start p-2 rounded-full bg-white shadow-sm border border-cream-200 text-bluegrey-600 hover:text-bosque transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold font-display text-bluegrey-900 mb-2">Recursos</h1>
          <p className="text-bluegrey-600">Herramientas y artículos para tu bienestar</p>
        </div>
      </div>

      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Buscar artículos o temas..." 
          className="w-full p-4 pl-12 rounded-xl border border-cream-200 bg-white shadow-sm focus:outline-none focus:border-olivo focus:ring-1 focus:ring-olivo transition-all font-medium text-bluegrey-900"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bluegrey-400" size={20} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {['Todos', 'Ansiedad', 'Expatriación', 'Relaciones', 'Mindfulness'].map((tag, i) => (
          <button key={i} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${i === 0 ? 'bg-bosque text-white' : 'bg-white text-bluegrey-600 border border-cream-200 hover:border-suculenta'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourcesContent.map((item, i) => (
          <div key={i} onClick={() => router.push('/articulo/1')} className="bg-white rounded-3xl shadow-sm border border-cream-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group cursor-pointer">
            <div className="h-48 bg-bluegrey-200 relative overflow-hidden">
               <div className={`absolute inset-0 ${item.color || 'bg-olivo text-white'} opacity-40 mix-blend-multiply`}></div>
               <img src={`https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop&sig=${i + 10}`} alt="Articulo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-1 gap-3">
               <div className="flex justify-between items-start">
                  <span className="text-[0.65rem] font-bold text-grape-600 uppercase tracking-widest bg-grape-50 px-2 py-1 rounded-md">{item.category}</span>
                  <div className="flex items-center gap-1 text-xs text-bluegrey-400 font-medium bg-cream-50 px-2 py-1 rounded-md">
                     <Clock size={12} />
                     <span>{item.time}</span>
                  </div>
               </div>
               <h3 className="font-bold text-bluegrey-900 leading-tight text-xl mt-1">{item.title}</h3>
               <p className="text-sm text-bluegrey-600 line-clamp-2 mt-auto">Explora nuestro recurso para ayudarte en tu proceso terapéutico.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
