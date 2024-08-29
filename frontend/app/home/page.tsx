import { Hero } from './_hero';
import { Info } from './_info';
import { Testimonials } from './_testimonials';
import { Pricing } from '@/components/payment/pricing';

export default function Page() {
  return (
    <div>
      <Hero />
      <Info />
      <Testimonials />
      <Pricing />
    </div>
  );
}
