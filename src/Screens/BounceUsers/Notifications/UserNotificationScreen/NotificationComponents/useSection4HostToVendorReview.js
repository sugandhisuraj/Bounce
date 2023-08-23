import React, {useMemo} from 'react';
import {View} from 'react-native';

import {Lists, ListTiles} from '../../../../../components';
import {filterArrayByDate, getHp} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';

const useSection4HostToVendorReview = props => {
  const {notificationsStore} = MobxStore;
  const creatorCohostratingNotification =
    notificationsStore.notificationData?.creatorCohostratingNotification ?? [];

  const NotificationData = useMemo(() => {
    if (creatorCohostratingNotification.length == 0) {
      return [];
    }
    return filterArrayByDate(creatorCohostratingNotification.slice()) ?? [];
  }, [notificationsStore?.notificationData]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [notificationsStore?.notificationData]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(20)}}
        listViewContainerStyle={{marginTop: getHp(20)}}
        minRender={1}
        heading={'Reviews'}
        ListData={NotificationData}
        ListTile={({item}) => (
          <ListTiles.HostNotificationVendorRating
            {...props}
            vendorRequest={item}
          />
        )}
        CustomDivider={
          <View style={{height: getHp(10), backgroundColor: '#F2F2F2'}} />
        }
      />
    );
  }, [notificationsStore?.notificationData]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useSection4HostToVendorReview;

/*

  const Section4HostToVendorReview = useMemo(() => {
    const {creatorCohostratingNotification = []} =
      notificationsStore.notificationData;

    let returnData = {
      Component: null,
      createdAt: null,
      vendorRatingNotificaiton: [],
    };
    returnData.vendorRatingNotificaiton = filterArrayByDate(
      creatorCohostratingNotification.slice(),
    );
    if (returnData.vendorRatingNotificaiton.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.vendorRatingNotificaiton[0].createdAt;

    returnData.Component = (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(20)}}
        listViewContainerStyle={{marginTop: getHp(20)}}
        minRender={1}
        heading={'Reviews'}
        ListData={returnData.vendorRatingNotificaiton}
        ListTile={({item}) => (
          <ListTiles.HostNotificationVendorRating
            {...props}
            vendorRequest={item}
          />
        )}
        CustomDivider={
          <View style={{height: getHp(10), backgroundColor: '#F2F2F2'}} />
        }
      />
    );
    return returnData;
  }, [notificationsStore.notificationData]);
*/
