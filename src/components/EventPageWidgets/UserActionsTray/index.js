import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

import {
  InviteGreen,
  YellowStar,
  PromoteBlue,
  GreenTickSvg,
  Going,
  BlackClose,
  BlackSolidShare,
  InterestedYellowSvg,
  Interested,
  SaveBlue,
  MyTicketsSvg2,
  RedBoldCross,
  Location,
  Ticket,
  Save_Icon
} from '@svg';
import Styles from './indexCss';
import * as Buttons from '../../Buttons';
import InviteFriends from '../../../Screens/BounceVendors/PlanParty/InviteFriends';
import {
  copyArrayInItself,
  getHp,
  getWp,
  isPartyBegin,
  PartyUtils,
} from '../../../app/utils';
import MobxStore from '../../../mobx';
import {PartyService, RNShareService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
import ChooseVendor from '../../../Screens/BounceVendors/PlanParty/ChooseVendor';
import {ImagesStack} from '../..';
import NewsFeedGuestList from '../../../Screens/BounceUsers/NewsFeedGuestList';
import GuestList from '../../../Screens/BounceVendors/PlanParty/GuestList';
import TicketListScreen from '../../../Screens/BounceVendors/PlanParty/TicketList';
import NavigationService from '../../../navigation/NavigationService';
import ViewPurchasedTicketsScreen from '../../../Screens/BounceVendors/PlanParty/ViewPurchasedTicketsScreen';
import {PartyAddressWidget} from '..';

const styledComponent = styled.TouchableOpacity`
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.11);
`;
const UserActionsTray = props => {
  const {
    ticketScreenIncommingRoute,
    containerStyle,
    partyData,
    userActionTrayEvents,
    widgetType,
    ticketListScreenEvents,
  } = props;
  const partyTicketRangeData = PartyUtils.partyTicketsStatus(partyData);
  const onPressRSVP = () => {
    onPressMyTickets();
  };
  const onBounceGuestsPress = () => {
    const {BWF, NewsFeed} = NavigationService.screenNames;
    if (widgetType == BWF || widgetType == NewsFeed) {
      if (partyData?.attending?.length == 0) {
        return ToastUtil('No Guests!');
      }
      props.navigation.navigate(NewsFeedGuestList.routeName, {
        partyData,
      });
    } else {
      props.navigation.navigate(GuestList.routeName);
    }
  };
  const addToInterested = async () => {
    try {
      MobxStore.toggleLoader(true);
      const res = await PartyService.addBookMark(partyData.id);
      await userActionTrayEvents(partyData);
      ToastUtil(res.Message ?? 'Successfully Bookmarked');
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const userPartyGoingStatus = async (type = 'Going') => {
    try {
      MobxStore.toggleLoader(true);
      let toggleRes = null;
      if (type == 'Going') {
        toggleRes = await PartyService.partyToggleGo(partyData.id);
      } else {
        toggleRes = await PartyService.partyToggleCantGo(partyData.id);
      }

      if (userActionTrayEvents) {
        await userActionTrayEvents(partyData);
      }
      if (type == 'Going') {
        type = !partyData?.isAttending ? 'Going' : 'Not Going';
      }
      ToastUtil(`Party Status Changes to ${type}`, {
        duration: 2000,
      });
    } catch (error) {
      console.log('ERROR_USER_PARTY_GOING - ', error);
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong try again!',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onAttendOrTicketPress = () => {
    if (
      partyTicketRangeData.free ||
      widgetType == UserActionsTray.widgetType.RSVP ||
      widgetType == UserActionsTray.widgetType.RSVPWIDE
    ) {
      return userPartyGoingStatus();
    }
    if (partyTicketRangeData.onlyTicketLink) {
      return props.navigation.navigate(ViewPurchasedTicketsScreen.routeName, {
        partyData,
        inCommingRoutes: ticketScreenIncommingRoute,
        ticketListScreenEvents,
      });
    }
    return props.navigation.navigate(TicketListScreen.routeName, {
      screenType: TicketListScreen.screenType.Purchase,
      partyData,
      inCommingRoutes: ticketScreenIncommingRoute,
      ticketListScreenEvents,
    });
  };
  const onPressMyTickets = () => {
    props.navigation.navigate(ViewPurchasedTicketsScreen.routeName, {
      partyData,
      inCommingRoutes: ticketScreenIncommingRoute,
      ticketListScreenEvents,
    });
  };
  const InviteButton = useCallback(
    (style = {}) => {
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[Styles.verticalIconContainer, style]}
          Icon={<InviteGreen height={getHp(35)} width={getHp(35)} />}
          title={'Invite'}
          onPress={() => {
            props.navigation.navigate(InviteFriends.routeName);
          }}
          titleStyle={{marginTop: -getHp(5)}}
        />
      );
    },
    [partyData],
  );
  const HireButton = useMemo(() => {
    return (
      <Buttons.VerticalIcon
        styledComponent={styledComponent}
        containerStyle={[Styles.verticalIconContainer]}
        Icon={<YellowStar height={getHp(35)} width={getHp(35)} />}
        title={'Hire'}
        onPress={() => {
          props.navigation.navigate(ChooseVendor.routeName);
        }}
        titleStyle={{marginTop: -getHp(1)}}
      />
    );
  }, [partyData]);
  const PromoteButton = useMemo(() => {
    return (
      <Buttons.VerticalIcon
        styledComponent={styledComponent}
        containerStyle={[Styles.verticalIconContainer]}
        Icon={<PromoteBlue height={getHp(35)} width={getHp(35)} />}
        title={'Promote'}
        onPress={() => {}}
        titleStyle={{marginTop: -getHp(1)}}
      />
    );
  }, [partyData]);
  const AttendButton = useCallback(
    myProps => {
      let GoingSvg = partyData?.isAttending ? GreenTickSvg : Going;
      let title =
        myProps?.title || (partyData?.isAttending ? 'Attending' : 'Attend');
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[
            Styles.verticalIconContainer,
            myProps.containerStyle,
            myProps.showActiveColor &&
              partyData?.isAttending && {
                backgroundColor: 'rgba(0, 227, 145, 0.13)',
              },
            {paddingTop: getHp(3)},
          ]}
          Icon={<Ticket height={getHp(55)} width={getHp(55)} style={{marginTop: -12}} />}
          title={title}
          onPress={onAttendOrTicketPress}
          titleStyle={[myProps.titleStyle, {marginTop: -12, color: '#FFF'}]}
        />
      );
    },
    [partyData],
  );

  const DirectionButton = () => {
    return (
      <PartyAddressWidget
        currentParty={partyData}
        addressTextContainer={Styles.addressWidgetContainerForNoFeaturing}
        textRenderLength={30}
      />
    );
  };

  const CannotGoButton = useMemo(() => {
    const SVG = partyData?.isCantGo ? (
      <RedBoldCross height={getHp(25)} width={getHp(25)} />
    ) : (
      <BlackClose height={getHp(20)} width={getHp(20)} />
    );
    return (
      <Buttons.VerticalIcon
        styledComponent={styledComponent}
        containerStyle={[
          Styles.verticalIconContainer,
          partyData?.isCantGo && {backgroundColor: '#FFE8F0'},
          {paddingTop: getHp(5)},
        ]}
        Icon={SVG}
        title={partyData?.isCantGo ? 'Not Going' : `Can't Go`}
        onPress={() => userPartyGoingStatus("Can't Go")}
        titleStyle={{marginTop: getHp(5)}}
      />
    );
  }, [partyData]);

  const ShareButton = useCallback(
    customStyle => {
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[
            Styles.verticalIconContainer,
            {paddingTop: getHp(5)},
            customStyle,
          ]}
          Icon={<BlackSolidShare height={getHp(24)} width={getHp(24)} />}
          title={`Share`}
          onPress={() => {
            RNShareService.shareEvent(partyData);
          }}
          titleStyle={{marginTop: getHp(5), color: '#FFF'}}
        />
      );
    },
    [partyData],
  );
  const InterestedButton = useCallback(
    myProps => {
      const InterestedSVG = partyData?.isLiked ? SaveBlue : Interested;
      let title = partyData?.isLiked ? 'Saved' : 'Save';
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[
            Styles.verticalIconContainer,
            myProps.containerStyle,
            partyData?.isLiked && {backgroundColor: '#CFF6FF'},
            {paddingTop: getHp(5)},
          ]}
          Icon={<Save_Icon height={getHp(65)} width={getHp(65)} style={{marginTop: -17}} />}
          title={title}
          onPress={addToInterested}
          titleStyle={[
            myProps.titleStyle,
            {marginTop: getHp(-17), color: '#FFF'},
          ]}
        />
      );
    },
    [partyData],
  );

  const MyTicketsButton = useCallback(
    myProps => {
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[
            Styles.verticalIconContainer,
            {paddingTop: getHp(5)},
          ]}
          Icon={<MyTicketsSvg2 height={getHp(24)} width={getHp(24)} />}
          title={'My Tickets'}
          onPress={onPressMyTickets}
          titleStyle={{marginTop: getHp(5)}}
        />
      );
    },
    [partyData],
  );

  const BounceGuests = useCallback(
    (containerStyle = {}) => {
      let attendingGuests = copyArrayInItself(partyData?.attending, 1) ?? [];
      const imgStacks =
        attendingGuests.length == 0 ? null : (
          <ImagesStack
            containerStyle={[Styles.bounceGuestImgStackContainer]}
            numOfStacks={5}
            lastStackWithCount={
              attendingGuests.length > 4 ? attendingGuests.length : null
            }
            images={attendingGuests.map(i => i.profileImage?.filePath)}
            avatarSize={getHp(26)}
          />
        );
      return (
        <Buttons.VerticalIcon
          styledComponent={styledComponent}
          containerStyle={[
            Styles.verticalIconContainer,
            {width: '48%'},
            containerStyle,
          ]}
          Icon={imgStacks}
          title={`Bounce Guests`}
          onPress={onBounceGuestsPress}
          titleStyle={{marginTop: getHp(5)}}
        />
      );
    },
    [partyData],
  );
  const RSVPButton = useCallback(() => {
    return (
      <Buttons.VerticalIcon
        styledComponent={styledComponent}
        containerStyle={[Styles.verticalIconContainer, {paddingTop: getHp(5)}]}
        Icon={<GreenTickSvg height={getHp(24)} width={getHp(24)} />}
        title={'RSVP'}
        onPress={onPressRSVP}
        titleStyle={{marginTop: getHp(5)}}
      />
    );
  }, [partyData]);

  const buyTicketLength = partyData?.buyTickets?.length ?? 0;

  const isPaidForParty = partyData?.isAttending || buyTicketLength > 0;

  if (widgetType == UserActionsTray.widgetType.RSVP) {
    return (
      <View style={[Styles.container, containerStyle]}>
        {AttendButton({showActiveColor: true})}
        {InterestedButton({})}
      </View>
    );
  }
  if (widgetType == UserActionsTray.widgetType.RSVPWIDE) {
    return (
      <View style={[Styles.wideActionTray, containerStyle]}>
        {InterestedButton({
          containerStyle: [Styles.wideAttendButton],
          titleStyle: Styles.wideAttendButtonTitleStyle,
        })}
        {AttendButton({
          showActiveColor: true,
          containerStyle: [Styles.wideAttendButton, {marginTop: getHp(18)}],
          titleStyle: Styles.wideAttendButtonTitleStyle,
        })}
      </View>
    );
  }
  if (
    partyData?.isHost &&
    widgetType == NavigationService.screenNames.EventPage
  ) {
    return (
      <View style={[Styles.container, containerStyle]}>
        {InviteButton()}
        {HireButton}
        {/* {PromoteButton} */}
        {ShareButton()}
      </View>
    );
  }

  if (partyTicketRangeData.onlyTicketLink) {
    return (
      <View style={[Styles.container, containerStyle]}>
        {AttendButton({
          showActiveColor: false,
          title: partyTicketRangeData.free ? 'Free' : partyTicketRangeData.ticketRange,
        })}
        {InterestedButton({})}
        {partyData?.isPrivate ? CannotGoButton : ShareButton({})}
      </View>
    );
  }
  if (!isPaidForParty) {
    return (
      <View style={[Styles.container, containerStyle]}>
        {AttendButton({title: partyTicketRangeData.free ? 'Free' : partyTicketRangeData.ticketRange })}
        {DirectionButton({})}
        {InterestedButton({})}
        {partyData?.isPrivate ? CannotGoButton : ShareButton({})}
      </View>
    );
  }
  return (
    <View style={[Styles.container, containerStyle]}>
      {BounceGuests({width: getHp(115)})}
      {DirectionButton({})}
      {buyTicketLength > 0 ? MyTicketsButton({}) : RSVPButton()}
      {ShareButton({})}
    </View>
  );
};

UserActionsTray.widgetType = {};
UserActionsTray.widgetType.RSVP = 'RSVP';
UserActionsTray.widgetType.RSVPWIDE = 'RSVPWIDE';

UserActionsTray.defaultProps = {
  widgetType: NavigationService.screenNames.EventPage,
};
export default UserActionsTray;

/*
props.navigation.navigate(TicketListScreen.routeName, {
      screenType: TicketListScreen.screenType.Purchase,
      partyData,
    });
    if (isPartyBegin(partyData?.date) || isPartyFreeAndAttended) {
    return (
      <View style={[Styles.container, containerStyle]}>
        {BounceGuests()}
        {ShareButton({width: '48%'})}
      </View>
    );
  }
    */

/*

  {"id":19,"createdAt":"2021-10-19T08:26:05.785Z","title":"Pevent1","description":"Desc","date":"2021-11-06T13:47:13.000Z","isPrivate":true,"fee":0,"needBouncer":false,"needDJ":false,"ageLimit":true,"fromAge":0,"toAge":0,"isDraft":false,"creator":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}},"location":{"id":20,"lon":"1","lat":"1","addressStr":"Indore"},"profileImage":{"id":159,"fileName":"2E06127F-5BDD-4CD6-BDD2-E883AB2A1557.jpg","createdAt":"2021-10-19T08:26:05.630Z","filePath":"https://bounce-prod-media.s3.amazonaws.com/2021-10-19/69754d36f247b6267bb40b2fde640d40b7ebaa2f/5e1548b5d16dc3bc4fe1f602dd31b656/2E06127F-5BDD-4CD6-BDD2-E883AB2A1557.jpg","fileSequence":0},"gallery":[{"id":160,"fileName":"2E06127F-5BDD-4CD6-BDD2-E883AB2A1557.jpg","createdAt":"2021-10-19T08:26:05.762Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-19/5245a92034ca68013deb9461fb404d898ddf5bec/5e1548b5d16dc3bc4fe1f602dd31b656/2E06127F-5BDD-4CD6-BDD2-E883AB2A1557.jpg","fileSequence":0,"uploader":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}}}],"likes":[{"id":16,"phoneNumber":"8720880991","email":"guest2@gmail.com","fullName":"Guest 2","birthday":"2021-09-24 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp"],"username":"guest2","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":75,"fileName":"image-1632461972667.jpg","createdAt":"2021-09-24T05:41:17.507Z","filePath":"https://bounce-prod-media.s3.amazonaws.com/2021-09-24/dbecbe1f2e39ff36b4747b75875317361c476537/fc74c1f7ea0309c6a310baa04952bbca/image-1632461972667.jpg","fileSequence":0}}],"hosts":[{"id":21,"createdAt":"2021-10-19T08:26:06.561Z","status":1,"setByUser":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}},"host":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}}}],"attending":[{"id":16,"phoneNumber":"8720880991","email":"guest2@gmail.com","fullName":"Guest 2","birthday":"2021-09-24 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp"],"username":"guest2","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":75,"fileName":"image-1632461972667.jpg","createdAt":"2021-09-24T05:41:17.507Z","filePath":"https://bounce-prod-media.s3.amazonaws.com/2021-09-24/dbecbe1f2e39ff36b4747b75875317361c476537/fc74c1f7ea0309c6a310baa04952bbca/image-1632461972667.jpg","fileSequence":0}}],"cantgo":[],"arrived":[],"bouncer":null,"dj":null,"mediaGallery":[],"tickets":[{"id":15,"createdAt":"2021-10-19T08:26:05.803Z","title":"Title 1","description":"Description 1","price":"198","quantity":100,"soldOut":1}],"buyTickets":[{"id":26,"paymentId":"pi_3JmDmgFA7GDhqLcr2PRZ5QMU","ticketId":15,"title":"Title 1","description":"Description 1","price":198,"quantity":100,"selectedQuantity":1,"totalTicketPrice":"198","totalTicketTax":"5.94","totalTicketPriceWithTax":"203.94","createdAt":"2021-10-19T08:35:11.661Z"}],"partyTags":[],"list":{"id":19,"title":"Pevent1","createdAt":"2021-10-19T08:26:05.800Z"},"hiredVendors":[],"unconfirmedHost":[{"id":21,"createdAt":"2021-10-19T08:26:06.561Z","status":1,"setByUser":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}},"host":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":155,"fileName":"image-1634542212719.jpg","createdAt":"2021-10-18T07:32:08.678Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-18/a540c5c4d4860cc6dad47c5cb68430bbcfe1f2be/69911c1ee996a446e2e9b2d16b980135/image-1634542212719.jpg","fileSequence":0}}}],"invited":[{"id":16,"phoneNumber":"8720880991","email":"guest2@gmail.com","fullName":"Guest 2","birthday":"2021-09-24 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp"],"username":"guest2","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":75,"fileName":"image-1632461972667.jpg","createdAt":"2021-09-24T05:41:17.507Z","filePath":"https://bounce-prod-media.s3.amazonaws.com/2021-09-24/dbecbe1f2e39ff36b4747b75875317361c476537/fc74c1f7ea0309c6a310baa04952bbca/image-1632461972667.jpg","fileSequence":0}},{"id":18,"phoneNumber":"8720880991","email":"guest3@gmail.com","fullName":"Guest 3","birthday":"2021-09-28 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":"+91","firebaseTokens":["cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp"],"username":"guest3","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":null}],"invite":{"id":6,"createdAt":"2021-10-19T08:41:41.305Z","invitedBy":{"id":2,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Guest 1","birthday":"2021-05-21 00:00:00","state":null,"city":"null","about":"Dsfgdsfg","description":null,"profession":"null","vendorType":0,"age":0,"snapchatUsername":"null","instagramUsername":null,"tiktokUsername":"null","twitterUsername":"null","linkedInUsername":"null","language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false},"invitedUser":{"id":18,"phoneNumber":"8720880991","email":"guest3@gmail.com","fullName":"Guest 3","birthday":"2021-09-28 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":"+91","firebaseTokens":["cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp"],"username":"guest3","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":null},"party":{"id":19,"createdAt":"2021-10-19T08:26:05.785Z","title":"Pevent1","description":"Desc","date":"2021-11-06T13:47:13.000Z","isPrivate":true,"fee":0,"needBouncer":false,"needDJ":false,"ageLimit":true,"fromAge":0,"toAge":0,"isDraft":false}},"isHost":false,"madeHostBy":null,"isLiked":false,"isAttending":false,"friendsWantsToGo":[],"topGuestTags":[{"subTagsId":8,"commonSubTagsId":"1","percentage":"100%","name":"Basketball","emoji":"🏀"},{"subTagsId":7,"commonSubTagsId":"1","percentage":"100%","name":"Golf","emoji":"⛳️"},{"subTagsId":1,"commonSubTagsId":"1","percentage":"100%","name":"Concerts","emoji":"🎫"},{"subTagsId":25,"commonSubTagsId":"1","percentage":"100%","name":"Writing","emoji":"📝"},{"subTagsId":5,"commonSubTagsId":"1","percentage":"100%","name":"Gaming","emoji":"🎮"},{"subTagsId":4,"commonSubTagsId":"1","percentage":"100%","name":"Game Shows","emoji":"📺"},{"subTagsId":2,"commonSubTagsId":"1","percentage":"100%","name":"Comedy","emoji":"🙊"},{"subTagsId":6,"commonSubTagsId":"1","percentage":"100%","name":"Bars","emoji":"🍸"},{"subTagsId":14,"commonSubTagsId":"1","percentage":"100%","name":"Pool","emoji":"🎱"},{"subTagsId":3,"commonSubTagsId":"1","percentage":"100%","name":"Clubs","emoji":"🕺"},{"subTagsId":17,"commonSubTagsId":"1","percentage":"100%","name":"Surfing","emoji":"🏄"}],"isCantGo":false,"isLive":false}
  */
