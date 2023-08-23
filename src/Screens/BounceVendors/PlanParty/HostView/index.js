import React, {useState, useEffect, Fragment, useMemo} from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {PartyService} from '../../../../app/services';
import {
  AppTabs,
  Buttons,
  EventPageWidgets,
  Lists,
  ListTiles,
  Placeholder,
  ToggleShowMoreText,
} from '../../../../components';
import HostViewModel from './HostViewModel';
import Styles, {Styled} from './indexCss';
import InviteFriendsModel from '../InviteFriends/InviteFriendsModel';
import MobxStore from '../../../../mobx';
import {getHp, getWp} from '../../../../app/utils';
import {DirectionBlue} from '@svg';
import GuestList from '../GuestList';
import SingleVendorProfileScreen from '../../../BounceUsers/SingleVendorProfileScreen';
import GuestListModal from '../GuestList/GuestListModal';
import MutualFriendBlurView from './MutualFriendBlurView';
import CreateInvitation from '../CreateInvitation';
import TicketListScreen from '../TicketList';
import NavigationService from '../../../../navigation/NavigationService';
import GuestProfile from '../../../BounceUsers/Profile/GuestProfile';

MaterialIcons.loadFont();
AntDesign.loadFont();
const HostViewScreen = props => {
  const {party} = props.route.params;
  const [getImageState, setImageState] = useState(0);
  const {authStore, toggleLoader} = MobxStore;
  const hostViewInstance = HostViewModel.instance();
  const guestListInstance = GuestListModal.instance();
  const {currentParty, isThisPartyHostByMe, setCurrentParty} = hostViewInstance;
  const invitedInstance = InviteFriendsModel.instance();
  console.log('isThisPartyHostByMe_1 ', isThisPartyHostByMe());
  useEffect(() => {
    setCurrentParty({});
    userActionTrayEvents();
  }, []);

  useEffect(() => {
    guestListInstance.setCurrentParty(hostViewInstance.currentParty);
  }, [hostViewInstance.currentParty]);
  const userActionTrayEvents = async () => {
    try {
      await PartyService.loadCurrentParty(party.id);
    } catch (error) {
      return props.navigation.goBack();
    }
  };

  const onFriendAvatarPress = async guestUser => {
    try {
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser,
      });
    } catch (error) {}
  };
  const AttendingTab = ({type}) => {
    let listData = currentParty?.attending ?? [];
    if (type == 'HOST') {
      listData = currentParty?.hosts?.map(h => h.host) ?? [];
    }
    console.log('TTT - ', JSON.stringify(guestListInstance.getCohosts()));
    return (
      <View style={Styles.attendingTabContainerStyle}>
        <Lists.FriendAvatarList
          containerStyle={{width: '98%', alignSelf: 'center'}}
          onPress={onFriendAvatarPress}
          renderFriendCountAndHeading={false}
          DataList={listData}
          listContainerStyle={{marginTop: 0}}
        />
        <Buttons.PrimaryGreyBgtBlackTitle
          title={'All Guests'}
          containerStyle={Styles.allGuestsBtnContainerStyle}
          onPress={() => {
            props.navigation.navigate(GuestList.routeName);
          }}
        />
      </View>
    );
  };

  const onNavigateToVendorProfile = vendor =>
    props.navigation.navigate(SingleVendorProfileScreen.routeName, {
      vendorRequest: {
        vendor,
        party: hostViewInstance.currentParty,
      },
    });
  const FeaturingTab = () => {
    return (
      <View style={Styles.attendingTabContainerStyle}>
        <View style={[Styles.featuredVendorContainer]}>
          {currentParty?.hiredVendors?.slice(0, 6)?.map(item => {
            return (
              <ListTiles.FeatureVendorTabTile
                onPress={onNavigateToVendorProfile}
                vendor={item.vendor}
                containerStyle={{
                  marginRight: getWp(10),
                  marginTop: getHp(10),
                }}
              />
            );
          })}
        </View>
        <Buttons.PrimaryGreyBgtBlackTitle
          title={'All Vendors'}
          containerStyle={Styles.allGuestsBtnContainerStyle}
          onPress={() => {
            props.navigation.navigate(GuestList.routeName);
          }}
        />
      </View>
    );
  };

  const AttendingFeaturingTab = useMemo(() => {
    const TabConfig = [
      {
        heading: 'Hosting',
        Component: () => <AttendingTab type={'HOST'} />,
        shouldRender: currentParty?.hosts?.length > 0 ?? false,
      },
      {
        heading: 'Attending',
        Component: () => <AttendingTab type={'ATTEND'} />,
        shouldRender: currentParty?.attending?.length > 0 ?? false,
      },
      {
        heading: 'Featuring',
        shouldRender: currentParty?.hiredVendors?.length > 0 ?? false,
        Component: FeaturingTab,
      },
    ];
    return (
      <AppTabs.CommonTabs
        //containerStyle={{marginTop: getHp(10)}}
        polygonContainerStyle={{top: getHp(30)}}
        tabContainerStyle={{height: getHp(45)}}
        tabData={TabConfig}
        polygonConfig={[
          [getWp(180)],
          [getWp(75), getWp(290)],
          [getWp(45), getWp(180), getWp(320)],
        ]}
      />
    );
  }, [currentParty]);

  const WithBackEditComponent = () => {
    return (
      <View style={[Styles.backStyleContainer]}>
        <Styled.TouchShadow onPress={() => props.navigation.goBack()}>
          <AntDesign name="left" color={'#FFF'} size={getHp(30)} />
        </Styled.TouchShadow>

        {currentParty.isHost && (
          <Styled.TouchShadow
            onPress={() => {
              console.log('HERE');
              props.navigation.navigate(CreateInvitation.routeName, {
                party: currentParty,
                isEditParty: true,
                onBackRoute: HostViewScreen.routeName,
                onReload: userActionTrayEvents,
              });
            }}>
            <MaterialIcons name="edit" color={'#FFF'} size={getHp(27)} />
          </Styled.TouchShadow>
        )}
      </View>
    );
  };
  const onTicketRangePress = partyData => {
    props.navigation.navigate(TicketListScreen.routeName, {
      screenType: TicketListScreen.screenType.Purchase,
      partyData,
      inCommingRoutes: NavigationService.screenNames.EventPage,
      ticketListScreenEvents: userActionTrayEvents,
    });
  };
  if (Object.keys(currentParty).length == 0) {
    return null;
  }
  console.log('CURRENT_PARTY_EXECUTE - ', JSON.stringify(currentParty));
  //currentParty.description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  return (
    <Fragment>
      <MutualFriendBlurView />
      <StatusBar barStyle={'dark-content'} />
      {WithBackEditComponent()}
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: getHp(100)}}
        style={Styles.container}>
        <EventPageWidgets.PartyImageCarousalWithBackAndEdit
          {...props}
          onTicketRangePress={onTicketRangePress}
          partyData={currentParty}
          widgetType={NavigationService.screenNames.EventPage}
        />
        <View style={{paddingHorizontal: getWp(12)}}>
          <EventPageWidgets.UserActionsTray
            {...props}
            partyData={currentParty}
            userActionTrayEvents={userActionTrayEvents}
            ticketListScreenEvents={userActionTrayEvents}
            containerStyle={{
              // marginTop:
              //   currentParty?.gallery?.length > 1 ? getHp(35) : getHp(20),
            }}
            widgetType={NavigationService.screenNames.EventPage}
            ticketScreenIncommingRoute={NavigationService.screenNames.EventPage}
          />
          <EventPageWidgets.PartyAddressWidget
            textRenderLength={31}
            addressTextContainer={Styles.addressTextContainer}
            currentParty={currentParty}
          />
          <EventPageWidgets.PartyDescriptionWidget
            textLength={80}
            currentParty={currentParty}
            containerStyle={{
              marginTop: getHp(15),
              paddingHorizontal: getWp(10),
            }}
          />
        </View>
        {AttendingFeaturingTab}
        <EventPageWidgets.PartyTopGuestInterests
          hostViewInstance={hostViewInstance}
        />
      </ScrollView>
    </Fragment>
  );
};
HostViewScreen.routeName = '/HostView';
HostViewScreen.Modes = {};
HostViewScreen.Modes.Host = 'Host';
HostViewScreen.Modes.User = 'User';
export default observer(HostViewScreen);
