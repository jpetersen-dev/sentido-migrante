import './globals.css';
import SessionProvider from '../components/providers/SessionProvider';
import SmoothScroll from '../components/providers/SmoothScroll';

export const metadata = {
  title: 'Sentido Migrante',
  description: 'Clínica de psicoterapia enfocada en hispanohablantes en Europa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen pb-16 md:pb-0">
        <SessionProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </SessionProvider>
      </body>
    </html>
  );
}
