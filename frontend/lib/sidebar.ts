import { SidebarItem } from '@/types/layout';
import {
  Usb,
  Globe,
  Shapes,
  ShieldAlert,
  SquareActivity,
  CandlestickChart,
  ArrowDownNarrowWide,
} from 'lucide-react';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Globe, label: 'Monitors', href: '/monitors' },
  { icon: SquareActivity, label: 'Heartbeats', href: '/heartbeats' },
  { icon: Usb, label: "Who's on-call", href: '/who-is-on-call' },
  { icon: ShieldAlert, label: 'Incidents', href: '/incidents' },
  { icon: CandlestickChart, label: 'Status Pages', href: '/status-pages' },
  {
    icon: ArrowDownNarrowWide,
    label: 'Escalation policies',
    href: '/escalation-policies',
  },
  {
    icon: Shapes,
    label: 'Integrations',
    href: '/integrations',
  },
];
