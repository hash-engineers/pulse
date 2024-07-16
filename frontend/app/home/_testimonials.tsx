import { testimonials } from '@/lib/home';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

export function Testimonials() {
  return (
    <section className="space-y-8">
      <h3 className="text-center">Why our users love us</h3>
      <div className="rounded-md flex flex-col antialiased  bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          speed="slow"
          direction="right"
          items={testimonials}
        />
      </div>
    </section>
  );
}
