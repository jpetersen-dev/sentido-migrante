import BottomNav from '@/components/layout/BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
