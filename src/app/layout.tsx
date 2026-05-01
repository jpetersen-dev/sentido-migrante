import './globals.css';
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import Footer from '../components/layout/Footer';
import SessionProvider from '../components/providers/SessionProvider';
import SmoothScroll from '../components/providers/SmoothScroll';
import PageCanvas from '../components/PageCanvas';

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
            <Navbar />
            <main className="relative flex-1 w-full max-w-5xl mx-auto md:px-6">
              <PageCanvas />
              {children}
            </main>
            <Footer />
            <BottomNav />
          </SmoothScroll>
        </SessionProvider>
      </body>
    </html>
  );
}
