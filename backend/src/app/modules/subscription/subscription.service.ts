import prisma from '../../../lib/prisma';
import { Subscription } from '@prisma/client';

const createOrUpdateASubscription = async (
  data: Subscription,
): Promise<Subscription> => {
  const subscription = await prisma.subscription.upsert({
    where: { userId: data.userId },
    create: data,
    update: data,
  });

  return subscription;
};

export const SubscriptionService = { createOrUpdateASubscription };
