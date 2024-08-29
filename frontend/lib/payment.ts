import { Pricing } from '@/types/payment';

const PRICING_LIST: Pricing[] = [
  {
    title: 'Free',
    popular: 0,
    price: 0,
    description:
      'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Get Started',
    benefitList: [
      '1 Team member',
      '2 GB Storage',
      'Upto 4 pages',
      'Community support',
      'lorem ipsum dolor',
    ],
    href: '/api/auth/login',
    billing: '/month',
  },
  {
    title: 'Premium',
    popular: 1,
    price: 10,
    description:
      'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Buy Now',
    benefitList: [
      '4 Team member',
      '4 GB Storage',
      'Upto 6 pages',
      'Priority support',
      'lorem ipsum dolor',
    ],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_MONTHLY_PLAN_LINK,
    billing: '/month',
  },
  {
    title: 'Enterprise',
    popular: 0,
    price: 99,
    description:
      'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Buy Now',
    benefitList: [
      '10 Team member',
      '8 GB Storage',
      'Upto 10 pages',
      'Priority support',
      'lorem ipsum dolor',
    ],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_YEARLY_PLAN_LINK,
    billing: '/year',
  },
];

export { PRICING_LIST };
