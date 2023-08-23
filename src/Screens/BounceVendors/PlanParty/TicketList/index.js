import React, {useEffect, Fragment, useState} from 'react';
import {Button, Alert, ScrollView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  copyArrayInItself,
  FONTSIZE,
  getHp,
  isPartyBegin,
  sortArrayAlphabatically,
  wait,
} from '../../../../app/utils';
import {
  Scaffold,
  Headers,
  ListTiles,
  Buttons,
  UserQRComponent,
  ExternalTicketLink,
} from '../../../../components';
import {PartyService, FriendRequestService} from '../../../../app/services';
import Styles from './indexCss';
import HostViewModel from '../HostView/HostViewModel';
import {observer} from 'mobx-react';
import ToastUtil from '../../../../app/constants/toast';
import TicketListModel from './model';
import CheckoutPopup from './checkoutPopup';
import {
  CardField,
  useStripe,
  CardForm,
  Sheet,
  StripeProvider,
  useApplePay,
} from '@stripe/stripe-react-native';
import {APP_CONFIGURATIONS} from '../../../../app/constants';
import {UserActionsTray} from '../../../../components/EventPageWidgets';
import MobxStore from '../../../../mobx';
import NavigationService from '../../../../navigation/NavigationService';

const TicketListScreen = props => {
  const {isApplePaySupported} = useApplePay();
  const [publishableKey, setPublishableKey] = useState(
    APP_CONFIGURATIONS.STRIPE.publishingProductKey,
  );
  const {
    screenType,
    partyData: partyDataParam,
    ticketListScreenEvents,
  } = props.route.params;
  console.log('IS_APPLE_PAY_SUPPORTED - ', isApplePaySupported);
  const [partyData, setPartyData] = useState(partyDataParam);
  const [checkoutPopupVisible, setCheckoutPopupVisible] = useState(false);
  const [paymentView, setPaymentView] = useState(false);
  const ticketListModel = TicketListModel.getInstance();
  let partyTicketLength = partyData?.tickets?.length ?? 0;
  useEffect(() => {
    ticketListModel.syncWithTickets(partyData);
  }, [partyData, screenType]);
  const ViewModeData = () => {
    return (
      <Fragment>
        <Text style={[Styles.scanIntoEventText]}>{'Scan into the event'}</Text>
        <UserQRComponent containerStyle={Styles.userQrComponentContainer} />
      </Fragment>
    );
  };
  const onCheckoutPress = (isProd = true) => {
    if (isPartyBegin(partyData.date)) {
      return ToastUtil(`Party is over! can't buy tickets`);
    }
    let isTicketEmpty =
      ticketListModel.getTicketsForCheckout().tickets.length == 0;
    if (isTicketEmpty) {
      return ToastUtil('Select atleast 1 ticket!');
    }
    if (isProd) {
      setPublishableKey(APP_CONFIGURATIONS.STRIPE.publishingProductKey);
    } else {
      setPublishableKey(APP_CONFIGURATIONS.STRIPE.publishingDevKey);
    }

    //return StripeService.paymentReq();

    setPaymentView(i => false);
    setCheckoutPopupVisible(i => true);
  };
  const userActionTrayEvents = async () => {
    try {
      MobxStore.toggleLoader(true);
      const partyDataRes = await PartyService.getPartyById(partyData.id);

      console.log('HERE_TESTSFD - ', JSON.stringify(partyDataRes));
      setPartyData(partyDataRes);
      if (ticketListScreenEvents) {
        ticketListScreenEvents(partyData);
      }
    } catch (error) {
      ToastUtil('Something went wrong! TryAgain');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const ChangeRSVPComponent = () => {
    return (
      <View>
        <Text style={[Styles.changeRSVPText]}>Change RSVP</Text>
        <UserActionsTray
          partyData={partyData}
          containerStyle={Styles.RSVPContainer}
          widgetType={UserActionsTray.widgetType.RSVP}
          userActionTrayEvents={userActionTrayEvents}
        />
      </View>
    );
  };
  console.log('CURRENT_PARTY_Ticket - ', JSON.stringify(partyData));
  // let sortedTickets =
  const operatedTickets =
    screenType == TicketListScreen.screenType.Purchase
      ? ticketListModel.tickets
      : partyData.buyTickets;
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.bounce.apps">
      <CheckoutPopup
        navigation={props.navigation}
        partyData={partyData}
        paymentView={paymentView}
        setPaymentView={setPaymentView}
        checkoutPopupVisible={checkoutPopupVisible}
        setCheckoutPopupVisible={setCheckoutPopupVisible}
        ticketListScreenEvents={ticketListScreenEvents}
        isProduction={
          publishableKey == APP_CONFIGURATIONS.STRIPE.publishingProductKey
        }
        publishableKey={publishableKey}
      />
      <Scaffold
        statusBarStyle={{backgroundColor: '#FBFBFB'}}
        contentContainerStyle={Styles.container}>
        <Headers.BackTile
          title={`${partyData.title}`}
          onBackPress={() => {
            props.navigation.goBack();
          }}
        />

        <ScrollView bounces={false} style={{marginTop: getHp(10)}}>
          {operatedTickets.map(ticket => {
            return (
              <>
                <ListTiles.TicketTile
                  ticketTileOnPress={ticket => {}}
                  isSelected={false}
                  ticket={ticket}
                  widgetType={screenType}
                  partyData={partyData}
                />
                <View style={{height: getHp(10), backgroundColor: '#F5F5F5'}} />
              </>
            );
          })}
        </ScrollView>
        {partyData?.externalLink?.length > 0 && (
          <ExternalTicketLink
            containerStyle={[Styles.externalLinkContainer]}
            partyData={partyData}
            externalTicketLink={partyData?.externalLink}
            containerTitle={'Tickets are available at'}
          />
        )}
        <Buttons.LinearGradient
          onPress={() => onCheckoutPress(true)}
          // onPress={async () => {
          //   props.navigation.goBack();
          //   await wait(3000);
          //   ticketListScreenEvents(partyData);
          // }}
          title={'Checkout'}
          gradientColors={['#4FC3FF', '#00A7FD']}
          linearGradientStyle={[Styles.checkoutButtonStyle, {width: '85%'}]}
          showArrow={false}
        />
        {APP_CONFIGURATIONS.IS_DEVELOPMENT && (
          <Buttons.PrimaryButton
            titleStyle={{fontSize: FONTSIZE.Text13}}
            onPress={() => onCheckoutPress(false)}
            withShadow={false}
            containerStyle={{
              alignSelf: 'center',
              backgroundColor: '#FBFBFB',
            }}
            title={'Checkout Sandbox'}
          />
        )}
      </Scaffold>
    </StripeProvider>
  );
};

TicketListScreen.screenType = {};
TicketListScreen.screenType.Purchase = 'Purchase';
TicketListScreen.screenType.View = 'View';

TicketListScreen.routeName = '/TicketListScreen';
export default observer(TicketListScreen);
