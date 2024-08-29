import { EPopularPlan } from '@/enums/payment';

type Pricing = {
  title: string;
  popular: EPopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
  billing: string;
  paymentLink?: string;
};

export type { Pricing };
