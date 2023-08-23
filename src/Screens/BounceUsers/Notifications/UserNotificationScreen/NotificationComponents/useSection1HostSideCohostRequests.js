

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

const useSection1HostSideCohostRequests = props => {
  const {notificationsStore} = MobxStore;
  const section1HostSideCohostRequestsData =
    notificationsStore?.section1HostSideCohostRequests ?? [];

 
  const NotificationData = useMemo(() => {
    if (section1HostSideCohostRequestsData.length == 0) {
      return [];
    }
    return filterArrayByDate(section1HostSideCohostRequestsData.slice()) ?? [];
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
        heading={'Cohost Requests'}
        ListData={NotificationData}
        ListTile={({item}) => {
          if (!item?.reactProps) {
            return null;
          }
          const ListWidget = ListTiles[item?.reactProps.Tile];
          return (
            <ListWidget
              {...props}
              {...item?.reactProps?.TIleProp}
              vendorRequest={item}
            />
          );
        }}
        CustomDivider={
          <View style={{height: getHp(7), backgroundColor: '#F2F2F2'}} />
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

export default useSection1HostSideCohostRequests;


/*
 const section1HostSideCohostRequests = useMemo(() => {
    const {section1HostSideCohostRequests = []} = notificationsStore;
    let returnData = {
      Component: null,
      createdAt: null,
      section1HostSideCohostRequestsData: [],
    };
    returnData.section1HostSideCohostRequestsData = filterArrayByDate(
      section1HostSideCohostRequests.slice(),
    );
    if (returnData.section1HostSideCohostRequestsData.length == 0) {
      return returnData;
    }
    returnData.createdAt =
      returnData.section1HostSideCohostRequestsData[0].createdAt;
    returnData.Component = (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(20)}}
        listViewContainerStyle={{marginTop: getHp(20)}}
        minRender={1}
        heading={'Cohost Requests'}
        ListData={returnData.section1HostSideCohostRequestsData}
        ListTile={({item}) => {
          if (!item?.reactProps) {
            return null;
          }
          const ListWidget = ListTiles[item?.reactProps.Tile];
          return (
            <ListWidget
              {...props}
              {...item?.reactProps?.TIleProp}
              vendorRequest={item}
            />
          );
        }}
        CustomDivider={
          <View style={{height: getHp(7), backgroundColor: '#F2F2F2'}} />
        }
      />
    );
    return returnData;
  }, [notificationsStore.notificationData]);
  */