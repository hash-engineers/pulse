'use client';

import dynamic from 'next/dynamic';
import { Div } from '@/lib/motion';
import { globeConfig, sampleArcs } from '@/lib/globe';

const Globe = dynamic(
  () => import('@/components/ui/globe').then(m => m.World),
  { ssr: false }
);

export function World() {
  return (
    <div className="flex flex-row items-center justify-center py-20 md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <Div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            We sell soap worldwide
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            This globe is interactive and customizable. Have fun with it, and
            don&apos;t forget to share it. :)
          </p>
        </Div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <Globe data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
