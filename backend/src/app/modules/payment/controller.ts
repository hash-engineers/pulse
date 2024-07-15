import { Request, Response } from 'express';
import { PaymentService } from './service';
import catchAsync from '../../../utils/catch-async';
import sendResponse from '../../../utils/send-response';

const initSubscriptionPayment = catchAsync(
  async (req: Request, res: Response) => {
    const paymentData = req.body;

    const result = await PaymentService.initSubscriptionPayment(paymentData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Payment init successfully.',
      data: result,
    });
  },
);

const initOrderPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;

  const result = await PaymentService.initOrderPayment(paymentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment init successfully.',
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await PaymentService.validatePayment(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment validated successfully.',
    data: result,
  });
});

export const PaymentController = {
  initSubscriptionPayment,
  initOrderPayment,
  validatePayment,
};
