import React, {useEffect, Fragment, useState} from 'react';
import {Button, Alert, ScrollView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  copyArrayInItself,
  FONTSIZE,
  getHp,
  isPartyBegin,
  PartyUtils,
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

const ViewPurchasedTicketsScreen = props => {
  const {
    screenType,
    inCommingRoutes,
    partyData: partyDataParam,
    ticketListScreenEvents,
  } = props.route.params;
  const [partyData, setPartyData] = useState(partyDataParam);

  let partyTicketLength = partyData?.tickets?.length ?? 0;
  const buyTickets = partyData.buyTickets;
  const partyTicketRangeData = PartyUtils.partyTicketsStatus(partyData);

  const ScanQRComponent = () => {
    return (
      <View style={{marginTop: getHp(12)}}>
        <Text style={[Styles.scanIntoEventText]}>{'Scan into the event'}</Text>
        <UserQRComponent containerStyle={Styles.userQrComponentContainer} />
      </View>
    );
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

  const TemplateForOnlyTicketLink = () => {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={Styles.templatForOnlyTicketLinkContainer}>
          <ExternalTicketLink
            containerStyle={Styles.externalLinkContainer}
            partyData={partyData}
            externalTicketLink={partyData?.externalLink}
            containerTitle={'Tickets'}
          />
          <View style={{marginTop: getHp(50)}}>
            <Text style={[Styles.rsvpHeadingText]}>RSVP</Text>
            <UserActionsTray
              partyData={partyData}
              containerStyle={Styles.RSVPContainer}
              widgetType={UserActionsTray.widgetType.RSVPWIDE}
              userActionTrayEvents={userActionTrayEvents}
            />
          </View>
        </View>
        <Buttons.PrimaryButton
          containerStyle={Styles.backToEventContainer}
          title={'Back to event'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    );
  };
  const TemplateForViewPurchasedTickets = () => {
    return (
      <View style={{flex: 1}}>
        <ScanQRComponent />
        <ScrollView bounces={false} style={{marginTop: getHp(10)}}>
          {buyTickets.map(ticket => {
            return (
              <>
                <ListTiles.TicketTile
                  ticketTileOnPress={ticket => {}}
                  isSelected={false}
                  ticket={ticket}
                  widgetType={ListTiles.TicketTile.widgetType.View}
                  partyData={partyData}
                />
                <View style={{height: getHp(10), backgroundColor: '#F5F5F5'}} />
              </>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const TemplateForViewFreeEvent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <ScanQRComponent />
          <Text style={[Styles.changeRSVPText]}>Change RSVP</Text>
          <UserActionsTray
            partyData={partyData}
            containerStyle={[Styles.RSVPContainer, {width: '65%'}]}
            widgetType={UserActionsTray.widgetType.RSVP}
            userActionTrayEvents={userActionTrayEvents}
          />
        </View>
        <Buttons.PrimaryButton
          containerStyle={Styles.backToEventContainer}
          title={'Back to event'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    );
  };

  let RenderComponent = null;
  if (partyTicketRangeData.onlyTicketLink) {
    RenderComponent = <TemplateForOnlyTicketLink />;
  } else if (buyTickets.length > 0) {
    RenderComponent = <TemplateForViewPurchasedTickets />;
  } else if (partyTicketRangeData.free) {
    RenderComponent = <TemplateForViewFreeEvent />;
  } else {
    RenderComponent = <TemplateForViewFreeEvent />;
  }
  return (
    <Scaffold
      statusBarStyle={{backgroundColor: '#FBFBFB'}}
      contentContainerStyle={Styles.container}>
      <Headers.BackTile
        title={`${partyData.title}`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      {RenderComponent}
    </Scaffold>
  );
};

ViewPurchasedTicketsScreen.routeName = '/ViewPurchasedTickets';
export default observer(ViewPurchasedTicketsScreen);
