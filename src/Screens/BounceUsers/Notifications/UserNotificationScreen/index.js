import React, {useState, useEffect} from 'react';
import {
  View, 
  ScrollView,
  RefreshControl,
} from 'react-native';
import { 
  Scaffold, 
} from '@components';  
import {ListTiles} from '../../../../components';
import {
  filterArrayByDate, 
  utcToCurrentTimeZone,
} from '../../../../app/utils';
import MobxStore from '../../../../mobx';
import {observer} from 'mobx-react'; 
import {
  AuthService, 
  AppNotificationService, 
} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
 
import * as NotificationComponents from './NotificationComponents';

function UserNotificationScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  const {notificationsStore, authStore} = MobxStore;
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
         
        {/* <ListTiles.BounceGroupNotification />
        <View style={{height: 400}} /> */}
      </ScrollView>
    </Scaffold>
  );
}

UserNotificationScreen.routeName = '/UserNotificationScreen';
export default observer(UserNotificationScreen);
