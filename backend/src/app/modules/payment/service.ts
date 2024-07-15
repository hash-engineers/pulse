/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSLService } from './ssl/service';

const initSubscriptionPayment = async (payload: any) => {
  const initPaymentData = {
    amount: payload.amount,
    transactionId: payload.transactionId,
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    productCategory: payload?.productCategory,
  };

  const result = await SSLService.initSubscriptionPayment(initPaymentData);
  return {
    paymentUrl: result,
  };
};

const initOrderPayment = async (payload: any) => {
  const initPaymentData = {
    amount: payload.amount,
    transactionId: payload.transactionId,
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    shippingAddress: payload?.shippingAddress || 'N/A',
    deliveryMethod: payload?.deliveryMethod || 'N/A',
    productName: payload?.productName || 'N/A',
  };

  const result = await SSLService.initOrderPayment(initPaymentData);
  return {
    paymentUrl: result,
  };
};

const validatePayment = async (query: Record<string, unknown>) => {
  if (!query || !query.status || !(query.status === 'VALID')) {
    return {
      message: 'Invalid payment!',
    };
  }

  const response = await SSLService.validatePayment(query);

  if (response?.status !== 'VALID') {
    return {
      message: 'Payment failed!',
    };
  }

  //! to-do @faisal
};

export const PaymentService = {
  initSubscriptionPayment,
  initOrderPayment,
  validatePayment,
};
