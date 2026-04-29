import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto md:px-6">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
