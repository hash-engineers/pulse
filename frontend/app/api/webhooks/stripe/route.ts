import { Stripe } from 'stripe';
import stripe from '@/lib/stripe';
import axios from 'axios';
import { api, headers } from '@/lib/api';
import { User } from '@/types/user';

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
            await axios.patch(`${api}/companies/`);
          }
        }
    }
  } catch (error) {}
}
