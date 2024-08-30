import { FooterItem, FooterSocialIcon } from '@/types/layout';

const SOLUTIONS_ITEMS: FooterItem[] = [
  { label: 'Monitoring', href: '/home/generic' },
  { label: 'Incident', href: '/home/generic' },
  { label: 'Dashboards', href: '/home/generic' },
  { label: 'Integrations', href: '/home/generic' },
];

const RESOURCES_ITEMS: FooterItem[] = [
  { label: 'Help & Support', href: '/home/generic' },
  { label: 'Docs', href: '/home/generic' },
  { label: 'Logs', href: '/home/generic' },
];

const COMPANY_ITEMS: FooterItem[] = [
  { label: 'Work at Pulse', href: '/home/generic' },
  { label: 'Engineering', href: '/home/generic' },
  { label: 'Security', href: '/home/generic' },
];

const COMMUNITY_ITEMS: FooterItem[] = [
  { label: 'Guides', href: '/home/generic' },
  { label: 'Questions', href: '/home/generic' },
  { label: 'Blog', href: '/home/generic' },
  { label: 'Comparisons', href: '/home/generic' },
];

const FOOTER_SOCIAL_ICONS: FooterSocialIcon[] = [
  { src: 'instagram', href: '/home/generic' },
  { src: 'linkedin', href: '/home/generic' },
  { src: 'twitter', href: '/home/generic' },
  { src: 'reddit', href: '/home/generic' },
  { src: 'github', href: '/home/generic' },
  { src: 'youtube', href: '/home/generic' },
];

export {
  SOLUTIONS_ITEMS,
  RESOURCES_ITEMS,
  COMPANY_ITEMS,
  COMMUNITY_ITEMS,
  FOOTER_SOCIAL_ICONS,
};
