import { getAnUserById } from '@/actions/user';
import { Hero } from './_hero';
import { Info } from './_info';
import { Testimonials } from './_testimonials';

export default function Page() {
  return (
    <div>
      <Hero />
      {/* <Info /> */}
      <Testimonials />
    </div>
  );
}
