import { Globe } from 'lucide-react';
import { LogoSymbol } from '@/components/ui/LogoSymbol';

export default function Footer() {
  return (
    <footer className="w-full bg-cream-50 border-t border-cream-200 text-bluegrey-900 pt-10 pb-6 px-4 md:px-8 mt-12 rounded-t-3xl md:rounded-none">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <LogoSymbol className="w-8 h-8 shrink-0 text-bosque" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight uppercase text-bosque-dark">Sentido Migrante</span>
                <span className="text-[0.65rem] font-medium leading-tight text-bluegrey-500">Psicoterapia humanista y vínculo cultural</span>
              </div>
            </div>
            <p className="text-bluegrey-600 text-sm mt-2 font-medium">
              Salud mental sin fronteras. Psicoterapia para la comunidad hispanohablante en Europa.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold text-bosque-dark">Atención</h4>
            <ul className="flex flex-col gap-2 text-sm text-bluegrey-700 font-medium">
              <li>Lunes a Viernes: 08:00 - 20:00 (CET)</li>
              <li>Sábados: 09:00 - 14:00 (CET)</li>
              <li>Consultas Online</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-display font-bold text-bosque-dark">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-bluegrey-700 font-medium">
              <li><button className="hover:text-bosque transition-colors">Términos y Condiciones</button></li>
              <li><button className="hover:text-bosque transition-colors">Política de Privacidad</button></li>
              <li><button className="hover:text-bosque transition-colors">Acuerdo Terapéutico</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-cream-200 text-center text-xs font-medium text-bluegrey-500">
          © {new Date().getFullYear()} Sentido Migrante. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
