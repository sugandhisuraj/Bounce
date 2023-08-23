import {Keyboard} from 'react-native';
import { 
  presentPaymentSheet,
  initPaymentSheet, 
} from '@stripe/stripe-react-native';

import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import ToastUtil from '../../constants/toast';
import {myParseFloat, wait} from '../../utils';

class PaymentService {
  createPaymentIntent = async (amount, env = 'SANDBOX') => {
    try {
      const iRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.createPaymentIntent(amount),
        {env},
      );
      if (iRes.status != 201) {
        throw {response: iRes};
      }
      return Promise.resolve(iRes.data);
    } catch (error) {
      return Promise.resolve(error);
    }
  };

  getCreatePaymentIntent = async (amount, env) => {
    try {
      MobxStore.toggleLoader(true);
      const paymentIntent = await this.createPaymentIntent(
        myParseFloat(amount * 100),
        env,
      );
      return Promise.resolve(paymentIntent);
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
      return Promise.resolve(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  onDirectStripePayment = async params => {
    try {
      const {
        totalAmount,
        isProduction,
        getOnlyIntent = false,
        onGetPaymentIntent,
      } = params;

      const env = isProduction ? 'PRODUCTION' : 'SANDBOX';
      console.log(
        'TOTAL_AMT_FOR_PAYMENT_REQ - ',
        env,
        myParseFloat(totalAmount * 100),
      );
      const paymentIntent = await this.getCreatePaymentIntent(totalAmount, env);
      onGetPaymentIntent(paymentIntent);
      if (getOnlyIntent) {
        return Promise.resolve(paymentIntent);
      }
      await wait(500);
      const {error: errorInitPaymentSheet} = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
      if (errorInitPaymentSheet) {
        throw {error: errorInitPaymentSheet};
      }
      const {error} = await presentPaymentSheet({
        clientSecret: paymentIntent.client_secret,
      });

      if (error && error?.code == 'Canceled') {
        return;
      }
      if (error && error?.code != 'Canceled') {
        throw {error: error};
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  presentAndConfirmApplePay = async (params = {}) => {
    try {
      const {
        partyData,
        presentApplePay,
        confirmApplePayPayment,
        totalAmount,
        isProduction,
      } = params;
      const {error: presentApplePayErr} = await presentApplePay({
        cartItems: [
          {label: partyData.title + ' Ticket', amount: totalAmount + ''},
        ],
        country: 'US',
        currency: 'USD',
        requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
        requiredBillingContactFields: ['phoneNumber', 'name'],
      });
      if (presentApplePayErr && presentApplePayErr?.code == 'Canceled') {
        return Promise.resolve(false);
      }
      if (presentApplePayErr) {
        throw {error: presentApplePayErr};
      }

      const paymentResponseSecret = await this.onDirectStripePayment({
        getOnlyIntent: true,
        totalAmount,
        isProduction,
        onGetPaymentIntent: _ => {},
      });
      console.log('COMPLETE_PAYMENT_SCRENT_TEST_3 - ', paymentResponseSecret);

      const {error: confirmApplePayPaymentErr} = confirmApplePayPayment(
        paymentResponseSecret.client_secret,
      );
      if (confirmApplePayPaymentErr) {
        throw {error: confirmApplePayPaymentErr};
      }
      return Promise.resolve(true);
    } catch (e) { 
      console.log(e.error.code);
      return Promise.reject(e);
    }
  };
}

export default new PaymentService();
