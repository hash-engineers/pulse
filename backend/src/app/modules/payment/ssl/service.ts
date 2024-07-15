/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import ApiError from '../../../../errors/api-error';

const initSubscriptionPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: payload.amount,
      currency: 'BDT',
      tran_id: payload.transactionId,
      success_url: config.ssl.subscriptionSuccessUrl,
      fail_url: config.ssl.subscriptionFailUrl,
      cancel_url: config.ssl.subscriptionCancelUrl,
      ipn_url: config.ssl.subscriptionIpnUrl,
      shipping_method: 'N/A',
      product_name: 'Subscription',
      product_category: `${payload.productCategory} - plan`,
      product_profile: 'N/A',
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: 'N/A',
      cus_add2: 'N/A',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: payload.phoneNumber,
      cus_fax: 'N/A',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'N/A',
    };

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentApi,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  } catch (error) {
    throw new ApiError(400, 'Payment error occured!');
  }
};

const initOrderPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: payload.amount,
      currency: 'BDT',
      tran_id: payload.transactionId,
      success_url: config.ssl.orderSuccessUrl,
      fail_url: config.ssl.orderFailUrl,
      cancel_url: config.ssl.orderCancelUrl,
      ipn_url: config.ssl.orderIpnUrl,
      shipping_method: payload.deliveryMethod,
      product_name: payload.productName,
      product_category: 'Payment',
      product_profile: 'N/A',
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.shippingAddress,
      cus_add2: 'N/A',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: payload.phoneNumber,
      cus_fax: 'N/A',
      ship_name: 'N/A',
      ship_add1: payload.shippingAddress,
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'N/A',
    };

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentApi,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  } catch (error) {
    throw new ApiError(400, 'Payment error occured!');
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`,
    });

    return response.data;
  } catch (err) {
    throw new ApiError(400, 'Payment validation failed!');
  }
};

export const SSLService = {
  initSubscriptionPayment,
  initOrderPayment,
  validatePayment,
};
