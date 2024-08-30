import ApiError from '../../../errors/api-error';
import prisma from '../../../lib/prisma';
import { ESubscriptionPlan, Subscription } from '@prisma/client';

const createOrUpdateASubscription = async (
  data: Subscription,
): Promise<Subscription> => {
  const subscription = await prisma.$transaction(async tx => {
    const newSubscription = await tx.subscription.upsert({
      where: { userId: data.userId },
      create: data,
      update: data,
    });

    await tx.company.update({
      where: { id: data.userId },
      data: { plan: ESubscriptionPlan.PREMIUM },
    });

    return newSubscription;
  });

  if (!subscription) throw new ApiError(500, 'Failed to create subscription!');

  return subscription;
};

export const SubscriptionService = { createOrUpdateASubscription };
