import React, {useState, Fragment, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Header,
  Scaffold,
  MessageCard,
  FriendRequest,
  InviteRequest,
  Lists,
} from '@components';
import {StarPerson, Girl, Message, WhiteDownload, WhiteParty} from '@assets';
import {FONTSIZE} from '@utils';
import {ListTiles, Payment} from '../../../../components';
import {
  filterArrayByDate,
  getHp,
  getWp,
  utcToCurrentTimeZone,
} from '../../../../app/utils';
import MobxStore from '../../../../mobx';
import {observer} from 'mobx-react';
import CohostInvite from '../../../../components/ListTiles/CohostInvite';
import {
  AuthService,
  FriendRequestService,
  PartyService,
  AppNotificationService,
  VendorService,
} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
import HostView from '../../../BounceVendors/PlanParty/HostView';
import CommonInterestNewsFeed from '../../NewsFeed/CommonInterestNewsFeed';
import * as NotificationComponents from './NotificationComponents';

function UserNotificationScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const {authStore, bounceWithFriendsStore, notificationsStore} = MobxStore;
  const userinfo = authStore.user;

  // All Notifications Components
  const pendingFriendRequests =
    NotificationComponents.usePendingFriendRequests();
  const incommingFriendRequests =
    NotificationComponents.useIncommingFriendRequests();
  const partyInvitesData = NotificationComponents.usePartyInvitesData(props);
  const bounceWithFriendData =
    NotificationComponents.useBounceWithFriends(props);
  const section1HostSideCohostRequests =
    NotificationComponents.useSection1HostSideCohostRequests(props);
  const section2HostCohostSideHireVendorRequests =
    NotificationComponents.useSection2HostCohostSideHireVendorRequests(props);
  const section3HostCohostRequestSent =
    NotificationComponents.useSection3HostCohostRequestSent(props);
  const Section4HostToVendorReview =
    NotificationComponents.useSection4HostToVendorReview(props);
  // All Notification Components
  useEffect(() => {
    //
  }, []);
  onRefreshScreen = async () => {
    try {
      setRefreshing(i => true);
      await AuthService.reloadUser();
      await AppNotificationService.getUserNotification();
      setRefreshing(i => false);
    } catch (error) {
      console.log('ERROR_REF - ', error);
      ToastUtil('Something went wrong!');
    } finally {
      setRefreshing(i => false);
    }
  };

  let renderedComponents = [
    {
      type: 'Pending Friend Requests',
      component: pendingFriendRequests.NotificationComponent,
      createdAt: utcToCurrentTimeZone(pendingFriendRequests.createdAt),
    },
    {
      type: 'Friend Requests',
      component: incommingFriendRequests.NotificationComponent,
      createdAt: utcToCurrentTimeZone(incommingFriendRequests.createdAt),
    },
    {
      type: 'All PartyInvites',
      component: partyInvitesData.NotificationComponent,
      createdAt: utcToCurrentTimeZone(partyInvitesData.createdAt),
    },
    {
      type: 'All Bounce with Friends',
      component: bounceWithFriendData.NotificationComponent,
      createdAt: utcToCurrentTimeZone(bounceWithFriendData.createdAt),
    },
    {
      type: 'section1HostSideCohostRequests',
      component: section1HostSideCohostRequests.NotificationComponent,
      createdAt: utcToCurrentTimeZone(section1HostSideCohostRequests.createdAt),
    },
    {
      type: 'section2HostCohostSideHireVendorRequests',
      component: section2HostCohostSideHireVendorRequests.NotificationComponent,
      createdAt: utcToCurrentTimeZone(
        section2HostCohostSideHireVendorRequests.createdAt,
      ),
    },

    {
      type: 'section3HostCohostRequestSent',
      component: section3HostCohostRequestSent.NotificationComponent,
      createdAt: utcToCurrentTimeZone(section3HostCohostRequestSent.createdAt),
    },
    {
      name: 'Section4HostToVendorReview',
      component: Section4HostToVendorReview.NotificationComponent,
      createdAt: utcToCurrentTimeZone(Section4HostToVendorReview.createdAt),
    },
  ];
  renderedComponents = filterArrayByDate(renderedComponents);
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <ScrollView
        // alwaysBounceVertical={false}
        // bounces={false}
        style={{backgroundColor: '#FBFBFB'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshScreen} />
        }>
        {/* <ListTiles.CohostHireVendorRequestToHost /> */}
        {renderedComponents.map(c => {
          return c.component;
        })}

        <View style={{height: 100}} />
      </ScrollView>
    </Scaffold>
  );
}

UserNotificationScreen.routeName = '/UserNotificationScreen';
export default observer(UserNotificationScreen);

/* <Payment Message_Stack={Message_Stack} heading={'Payments'} />
            <MessageCard Message_Stack={Message_Stack} heading={'Messaging'} /> 
            
            
            const Message_Stack = [
  {
    icon: Girl,
    name: 'David Poura',
    partyType: 'Homecoming Party',
    price: '$750.00',
    desc: 'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.',
  },
  {
    icon: Girl,
    name: 'David Poura',
    partyType: 'Homecoming Party',
    price: '$750.00',
    desc: 'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.',
  },
];

const ReviewStack = [
  {
    icon: Girl,
    name: 'David Poura',
    time: 'Sat. October 3, 9:00pm',
    partyType: 'Grad Night 2021',
    price: '$750.00',
    desc: 'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.',
  },
  {
    icon: Girl,
    name: 'David Poura',
    time: 'Sat. October 3, 9:00pm',
    partyType: 'Grad Night 2021',
    price: '$750.00',
    desc: 'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.',
  },
];
            */
