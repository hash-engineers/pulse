import { Stripe } from 'stripe';
import stripe from '@/lib/stripe';
import axios from 'axios';
import { api, headers } from '@/lib/api';
import { User } from '@/types/user';
import { ESubscriptionPeriod, ESubscriptionPlan } from '@/enums/subscription';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (error: any) {
    console.error('Webhook signature varification failed', error.message);
    return new Response(`Webhook Error -> ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ['line_items'] }
        );

        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          let user: User | null = null;
          const res = await axios.get(
            `${api}/users/user?email=${customerDetails.email}`,
            { headers }
          );

          user = await res.data?.data;

          if (!user) throw new Error('User not found!');

          if (!user.company.customerId) {
            await axios.patch(`${api}/companies/${user.company.id}`, {
              customerId,
            });
          }

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const pirceId = item.price?.id;

            const isSubscription = item.price?.type === 'recurring';

            if (isSubscription) {
              let endDate = new Date();

              if (pirceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
                endDate.setFullYear(endDate.getFullYear() + 1); // 1 year form now
              } else if (pirceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else {
                throw new Error('Invalid price id!s');
              }

              const subscriptionData = {
                userId: user.id,
                startDate: new Date().toISOString(),
                endDate: endDate.toISOString(),
                plan: ESubscriptionPlan.PREMIUM,
                period:
                  pirceId === process.env.STRIPE_YEARLY_PRICE_ID!
                    ? ESubscriptionPeriod.YEARLY
                    : ESubscriptionPeriod.MONTHLY,
              };

              await axios.post(`${api}/subscriptions`, subscriptionData);
            } else {
              // One time payment
            }
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error Handling Event ->', error);

    return new Response('Webhook Error ->', { status: 400 });
  }
}
