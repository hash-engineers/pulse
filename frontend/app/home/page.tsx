import { getAnUserById } from '@/actions/user';
import { Hero } from './_hero';
import { Info } from './_info';
import { Testimonials } from './_testimonials';

export default async function Page() {
  console.log(
    await getAnUserById({ id: 'kp_73d6b149d15a48a399f8daf98ccde59f' }),
    '.....................'
  );

  return (
    <div>
      <Hero />
      {/* <Info /> */}
      <Testimonials />
    </div>
  );
}
