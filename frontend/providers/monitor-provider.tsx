'use client';

import { Monitor } from '@/types/monitor';
import { ReactNode, useState } from 'react';
import { MonitorContext } from '@/context/monitor-context';

type Props = { children: ReactNode };

export function MonitorProvider({ children }: Props) {
  const [monitors, setMonitors] = useState<Monitor[] | null>(null);

  return (
    <MonitorContext.Provider value={{ monitors, setMonitors }}>
      {children}
    </MonitorContext.Provider>
  );
}
