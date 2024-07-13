import { FooterItem, FooterSocialIcon } from '@/types/footer';

const SOLUTIONS_ITEMS: FooterItem[] = [
  { label: 'Monitoring', href: '/monitoring' },
  { label: 'Incident', href: '/incident' },
  { label: 'Dashboards', href: '/dashboards' },
  { label: 'Integrations', href: '/integrations' },
];

const RESOURCES_ITEMS: FooterItem[] = [
  { label: 'Help & Support', href: '/help-and-support' },
  { label: 'Docs', href: '/docs' },
  { label: 'Logs', href: '/logs' },
];

const COMPANY_ITEMS: FooterItem[] = [
  { label: 'Work at Pulse', href: '/work-at-pulse' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Security', href: '/security' },
];

const COMMUNITY_ITEMS: FooterItem[] = [
  { label: 'Guides', href: '/guides' },
  { label: 'Questions', href: '/questions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Comparisons', href: '/comparisons' },
];

const FOOTER_SOCIAL_ICONS: FooterSocialIcon[] = [
  { src: 'instagram', href: '' },
  { src: 'linkedin', href: '' },
  { src: 'twitter', href: '' },
  { src: 'reddit', href: '' },
  { src: 'github', href: '' },
  { src: 'youtube', href: '' },
];

export {
  SOLUTIONS_ITEMS,
  RESOURCES_ITEMS,
  COMPANY_ITEMS,
  COMMUNITY_ITEMS,
  FOOTER_SOCIAL_ICONS,
};
