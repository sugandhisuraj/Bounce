import React, {Fragment} from 'react';
import {Text, ScrollView, View, Keyboard, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {
  CardField,
  useStripe,
  CardForm,
  Sheet,
  presentPaymentSheet,
  initPaymentSheet,
  useGooglePay,
  useApplePay,
  ApplePayButton,
} from '@stripe/stripe-react-native';

import {
  PaymentService,
  PartyService,
  FriendRequestService,
} from '../../../../app/services';
import {Buttons} from '../../../../components';
import {CenterRoundBlurView} from '../../../../components/AppPopups/Frames';
import Styles from './indexCss';
import {
  copyArrayInItself,
  getHp,
  myParseFloat,
  wait,
} from '../../../../app/utils';
import TicketListModel from './model';
import ToastUtil from '../../../../app/constants/toast';
import MobxStore from '../../../../mobx';
import NavigationService from '../../../../navigation/NavigationService';

const CheckoutPopup = props => {
  let {isApplePaySupported} = useApplePay();
  const {createGooglePayPaymentMethod, initGooglePay, presentGooglePay} =
    useGooglePay();
  const {presentApplePay, confirmApplePayPayment} = useApplePay();
  const {authStore} = MobxStore;
  const {confirmPayment} = useStripe();
  const {
    checkoutPopupVisible,
    setCheckoutPopupVisible,
    partyData,
    ticketListScreenEvents,
    isProduction,
  } = props;
  const ticketListModel = TicketListModel.getInstance();
  let selectedTicketsData = ticketListModel.getTicketsForCheckout();

  const RenderTicketInfo = (item, i, arr) => {
    return (
      <Fragment>
        <View style={[Styles.ticketInfoContainer]}>
          <Text style={[Styles.ticketTitleText]}>{item.title}</Text>
          <Text
            style={[
              Styles.ticketQuantityPriceText,
            ]}>{`${item.selectedQuantity} tickets - $${item.totalTicketPrice}`}</Text>
        </View>
        {i < arr.length - 1 && <View style={Styles.divider} />}
      </Fragment>
    );
  };
  const savePurchasedTickets = async () => {
    try {
      const onBuyTicketRes = await PartyService.onBuyPartyTickets({
        tickets: selectedTicketsData.tickets,
        partyId: partyData.id,
      });
      ToastUtil('Payment Successfully Processed!', {duration: 5000});
      if (ticketListScreenEvents) {
        await ticketListScreenEvents(partyData);
      }
      props.navigation.goBack();
    } catch (e) {
      console.log('ERROR_WHILE_PARTY_PAY - ', e);
    }
  };
  const applePayment = async () => {
    try {
      const res = await PaymentService.presentAndConfirmApplePay({
        presentApplePay,
        confirmApplePayPayment,
        totalAmount: selectedTicketsData.total,
        isProduction,
        partyData,
      });
      if (res) {
        savePurchasedTickets();
      }
    } catch (e) {
      return ToastUtil('Something went wrong! Try again');
    }
  };
  const onConfirmTicketPress = async () => {
    try {
      Keyboard.dismiss();
      const paymentResponse = await PaymentService.onDirectStripePayment({
        getOnlyIntent: false,
        totalAmount: selectedTicketsData.total,
        isProduction,
        onGetPaymentIntent: paymentIntent => {
          ticketListModel.setTicketIntent(paymentIntent);
        },
      });
      if (paymentResponse) {
        setCheckoutPopupVisible(i => false);
        await wait(200);
        savePurchasedTickets();
        return;
      }
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again!');
    }
  };
  const googlePay = async () => {
    try {
      const {error} = await initGooglePay({
        testEnv: true,

        merchantName: 'Suraj',
        countryCode: 'IN',
        billingAddressConfig: {
          isRequired: true,
          format: 'FULL',
          isPhoneNumberRequired: true,
        },
        isEmailRequired: true,
        existingPaymentMethodRequired: false,
      });
      console.log("ERROR - ", error);
      const cgp = await createGooglePayPaymentMethod({
        amount: 1,
        currencyCode: 'INR',
      });
      return;
      const paymentResponse = await PaymentService.onDirectStripePayment({
        getOnlyIntent: true,
        totalAmount: selectedTicketsData.total,
        isProduction,
        onGetPaymentIntent: _ => {},
      });
      console.log('PAYMENT_INTENT_ - ', paymentResponse.client_secret);
      const sdf2 = await presentGooglePay({
        clientSecret: paymentResponse.client_secret,
        currencyCode: 'USD',
      });
      console.log('DIFF_STEDER - ', sdf2);

      return;
    } catch (e) {
      console.log('E_ ', e);
      ToastUtil('Something went wrong! Try Again');
    }
  };
  if (!checkoutPopupVisible) {
    return null;
  }

  console.log(JSON.stringify(selectedTicketsData));
  //isApplePaySupported = false;
  return (
    <CenterRoundBlurView
      showClose
      onClosePress={() => {
        setCheckoutPopupVisible(i => false);
      }}
      centerViewContainerStyle={[Styles.centerViewContainerStyle()]}>
      <View style={Styles.popupContainer}>
        <ScrollView
          style={{maxHeight: '70%', minHeight: '70%'}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {copyArrayInItself(selectedTicketsData.tickets, 1).map(
            RenderTicketInfo,
          )}
        </ScrollView>
        <View style={Styles.divider} />
        <View style={[Styles.totalContainer]}>
          <Text style={[Styles.ticketTitleText]}>Tax</Text>
          <Text
            style={[
              Styles.ticketQuantityPriceText,
            ]}>{`$${selectedTicketsData.totalTax}`}</Text>
        </View>
        <View style={Styles.divider} />
        <View style={[Styles.totalContainer]}>
          <Text style={[Styles.ticketTitleText]}>Total</Text>
          <Text
            style={[
              Styles.ticketQuantityPriceText,
            ]}>{`${selectedTicketsData.totalTicketQuantity} tickets - $${selectedTicketsData.total}`}</Text>
        </View>
      </View>
      <View style={Styles.paymentOptionsContainer}>
        {isApplePaySupported && (
          <ApplePayButton
            onPress={applePayment}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={Styles.applePayButton}
          />
        )}
        <Buttons.LinearGradient
          onPress={onConfirmTicketPress}
          //onPress={googlePay}
          title={'Pay With Stripe'}
          gradientColors={['#4FC3FF', '#00A7FD']}
          linearGradientStyle={[
            Styles.checkoutButtonStyle,
            !isApplePaySupported && {width: '100%'},
          ]}
          showArrow={false}
        />
      </View>
    </CenterRoundBlurView>
  );
};

export default observer(CheckoutPopup);

/*

Gpay for sandbox

const {error} = await initGooglePay({
        testEnv:true,
        merchantName: 'david poura',
        countryCode:'US'
      }); 
      

      
      const paymentResponse = await PaymentService.onDirectStripePayment({
        getOnlyIntent: true,
        totalAmount: selectedTicketsData.total,
        isProduction,
        onGetPaymentIntent: _ => {},
      });
      console.log("PAYMENT_INTENT_ - ", paymentResponse.client_secret)
      const sdf2 = await presentGooglePay({clientSecret:paymentResponse.client_secret, currencyCode:'USD'}); 
      console.log("DIFF_STEDER - ", sdf2);
    
      return;
      */
