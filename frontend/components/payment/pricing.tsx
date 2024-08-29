import Link from 'next/link';
import { Check } from 'lucide-react';
import { redirect } from 'next/navigation';
import { PRICING_LIST } from '@/lib/payment';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '../ui/button';
import { EPopularPlan } from '@/enums/payment';
import { Pricing as PricingType } from '@/types/payment';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

export async function Pricing() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect('/api/auth/login');

  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-[#667EEA] to-[#764BA2] uppercase text-transparent bg-clip-text">
          {' '}
          Unlimited{' '}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        reiciendis.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRICING_LIST.map(
          ({
            title,
            popular,
            price,
            billing,
            description,
            paymentLink,
            buttonText,
            benefitList,
          }: PricingType) => (
            <Card
              key={title}
              className={
                popular === EPopularPlan.YES
                  ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10'
                  : ''
              }
            >
              <CardHeader>
                <CardTitle className="flex item-center justify-between">
                  {title}
                  {popular === EPopularPlan.YES ? (
                    <Badge variant="secondary" className="text-sm text-primary">
                      Most popular
                    </Badge>
                  ) : null}
                </CardTitle>
                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> {billing}</span>
                </div>

                <CardDescription>{description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Link
                  href={paymentLink + `?prefilled_email=${user.email}`}
                  className={buttonVariants()}
                >
                  {buttonText}
                </Link>
              </CardContent>

              <hr className="w-4/5 m-auto mb-4" />

              <CardFooter className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit: string) => (
                    <span key={benefit} className="flex">
                      <Check className="text-purple-500" />{' '}
                      <h3 className="ml-2">{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
