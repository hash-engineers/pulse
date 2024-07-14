import { SidebarItem } from '@/types/sidebar';

import {
  Globe,
  SquareActivity,
  Usb,
  ShieldAlert,
  CandlestickChart,
  ArrowDownNarrowWide,
  Shapes,
} from 'lucide-react';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Globe, label: 'Monitors', href: '/dashboard/monitors' },
  { icon: SquareActivity, label: 'Heartbeats', href: '/heartbeats' },
  { icon: Usb, label: "Who's on-call", href: '/who-is-on-call' },
  { icon: ShieldAlert, label: 'Incidents', href: '/dashboard/incidents' },
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

export { SIDEBAR_ITEMS };
