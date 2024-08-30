import { Request, Response } from 'express';
import { Subscription } from '@prisma/client';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';
import { SubscriptionService } from './subscription.service';

const createOrUpdateASubscription = catchAsync(
  async (req: Request, res: Response) => {
    const data = await SubscriptionService.createOrUpdateASubscription(
      req.body,
    );

    sendResponse<Subscription>(res, {
      statusCode: 200,
      success: true,
      message: 'Subscription create or updated',
      data,
    });
  },
);

export const SubscriptionController = { createOrUpdateASubscription };
