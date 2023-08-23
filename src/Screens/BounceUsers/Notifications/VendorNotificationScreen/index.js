import React, {useState, Fragment, useMemo} from 'react';
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
import {AuthService, AppNotificationService} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
import HostView from '../../../BounceVendors/PlanParty/HostView';
import CommonInterestNewsFeed from '../../NewsFeed/CommonInterestNewsFeed';
import {
  VendorHireVendorConfirmation,
  VendorHireVendorRequest,
} from '../../../../components/ListTiles';
import useVendorReviews from './NotificationComponents/useVendorReviews';
import useVendorRequests from './NotificationComponents/useVendorRequests';
import useVendorConfirmRequest from './NotificationComponents/useVendorConfirmRequest';

const VendorNotificationScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const {authStore, vendorNotificationStore} = MobxStore;
  const userinfo = authStore.user;

  const VendorRequestsNotification = useVendorRequests();
  const VendorHireVendorConfirmation = useVendorConfirmRequest();
  const VendorReviewNotification = useVendorReviews();
  console.log('VENDOR_INFO_DATA - ', JSON.stringify(userinfo));

  console.log(
    'ALL_VENDOR_NOTIFICATION - ',
    JSON.stringify(vendorNotificationStore.vendorNotificationAllData),
  );
  onRefreshScreen = async () => {
    try {
      setRefreshing(i => true);
      await AuthService.reloadUser();
      await AppNotificationService.getVendorNotification();
      setRefreshing(i => false);
    } catch (error) {
      Toast('Something went wrong!');
    } finally {
      setRefreshing(i => false);
    }
  };

  let renderedComponents = [
    {
      type: 'Vendor Request',
      component: VendorRequestsNotification.NotificationComponent,
      createdAt: utcToCurrentTimeZone(VendorRequestsNotification.createdAt),
    },
    {
      type: 'Vendor Confirm Request',
      component: VendorHireVendorConfirmation.NotificationComponent,
      createdAt: utcToCurrentTimeZone(VendorHireVendorConfirmation.createdAt),
    },
    {
      type: 'vendorReviews',
      component: VendorReviewNotification.NotificationComponent,
      createdAt: utcToCurrentTimeZone(VendorReviewNotification.createdAt),
    },
  ];
  renderedComponents = filterArrayByDate(renderedComponents);
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: getHp(100)}}
        style={{backgroundColor: '#FBFBFB', paddingBottom: getHp(100)}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshScreen} />
        }>
        {renderedComponents.map(c => {
          return c.component;
        })}
      </ScrollView>
    </Scaffold>
  );
};

VendorNotificationScreen.routeName = '/VendorNotificationScreen';

export default observer(VendorNotificationScreen);
