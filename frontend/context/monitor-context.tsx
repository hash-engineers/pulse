import { Monitor } from '@/types/monitor';
import { createContext, Dispatch, SetStateAction } from 'react';

type MonitorContextType = {
  monitors: Monitor[] | null;
  setMonitors: Dispatch<SetStateAction<Monitor[] | null>>;
};

export const MonitorContext = createContext<MonitorContextType | undefined>(
  undefined
);
