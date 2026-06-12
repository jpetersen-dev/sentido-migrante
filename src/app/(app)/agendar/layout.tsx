import React from 'react';
import CrisisProtocol from '@/components/layout/CrisisProtocol';

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start px-2 py-4">
      <div className="w-full lg:w-3/5 xl:w-2/3 shrink-0">
        {children}
      </div>
      <aside className="w-full lg:w-2/5 xl:w-1/3 lg:mt-[104px] px-2 lg:px-0">
        <div className="sticky top-6">
          <CrisisProtocol className="shadow-sm bg-rose-50/90 backdrop-blur-sm" />
        </div>
      </aside>
    </div>
  );
}
