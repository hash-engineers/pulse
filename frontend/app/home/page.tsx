import { Hero } from './_hero';
import { Info } from './_info';
import { Testimonials } from './_testimonials';

export default async function Page() {
  return (
    <div>
      <Hero />
      <Info />
      <Testimonials />
    </div>
  );
}
