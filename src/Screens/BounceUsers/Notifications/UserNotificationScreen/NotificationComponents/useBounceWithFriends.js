import React, {useMemo} from 'react';

import {
  AppNotificationService,
  FriendRequestService,
} from '../../../../../app/services';
import {Lists, ListTiles} from '../../../../../components';
import {filterArrayByDate, getHp} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';
import ToastUtil from '../../../../../app/constants/toast';
import HostView from '../../../../BounceVendors/PlanParty/HostView';
import CommonInterestNewsFeed from '../../../NewsFeed/CommonInterestNewsFeed';
import MyBounceWithFriendsParties from '../../../MyBounceWithFriendsParties';

const useBounceWithFriends = props => {
  const {notificationsStore, bounceWithFriendsStore} = MobxStore;
  const bounceWithFriend =
    notificationsStore?.notificationData?.bounceWithFriend ?? [];

  const onBounceWithFriendTilePress = async bwfData => {
    try {
      MobxStore.toggleLoader(true);
      bounceWithFriendsStore.selectedBounceUsers.resetAndAddData(
        bwfData.fromUser,
      );
      await FriendRequestService.bounceWithFriends();
      props.navigation.navigate(MyBounceWithFriendsParties.routeName, {
        persistBWFRecords: true,
      });

      MobxStore.toggleLoader(false);
      FriendRequestService.editBounceWithFriendsNotifications(bwfData);
      await AppNotificationService.getUserNotification();
    } catch (error) {
      console.log('onBounceWithFriendTilePress - ', error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const NotificationData = useMemo(() => {
    if (bounceWithFriend.length == 0) {
      return [];
    }
    return filterArrayByDate(bounceWithFriend.slice()) ?? [];
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
        listViewContainerStyle={{marginTop: 0}}
        dividerStyle={{marginVertical: getHp(5)}}
        minRender={1}
        heading={''}
        ListData={NotificationData}
        ListTile={({item}) => (
          <ListTiles.BounceWithFriendTile
            bwfOnPress={onBounceWithFriendTilePress}
            bwfData={item}
          />
        )}
      />
    );
  }, [notificationsStore?.notificationData]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useBounceWithFriends;

/*
const bounceWithFriendData = useMemo(() => {
    const {bounceWithFriend = []} = notificationsStore.notificationData;
    let returnData = {
      Component: null,
      createdAt: null,
      bWFNotData: [],
    };
    returnData.bWFNotData = filterArrayByDate(bounceWithFriend.slice());
    if (returnData.bWFNotData.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.bWFNotData[0].createdAt;
    //bWFNotData = [...bWFNotData, ...bWFNotData, ...bWFNotData];
    returnData.Component = (
      <Lists.NewToggleList
        listViewContainerStyle={{marginTop: 0}}
        dividerStyle={{marginVertical: getHp(5)}}
        minRender={1}
        heading={''}
        ListData={returnData.bWFNotData}
        ListTile={({item}) => (
          <ListTiles.BounceWithFriendTile
            bwfOnPress={onBounceWithFriendTilePress}
            bwfData={item}
          />
        )}
      />
    );
    return returnData;
  }, [notificationsStore.notificationData]);
  */
