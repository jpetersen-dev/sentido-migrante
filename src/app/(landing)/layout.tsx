import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
