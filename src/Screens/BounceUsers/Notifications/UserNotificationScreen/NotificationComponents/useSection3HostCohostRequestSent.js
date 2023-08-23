import React, {useMemo} from 'react';
import {View} from 'react-native';

import {Lists, ListTiles} from '../../../../../components';
import {filterArrayByDate, getHp} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';

const useSection3HostCohostRequestSent = props => {
  const {notificationsStore} = MobxStore;
  const section3HostCohostRequestSent =
    notificationsStore?.section3HostCohostRequestSent ?? [];

  const NotificationData = useMemo(() => {
    if (section3HostCohostRequestSent.length == 0) {
      return [];
    }
    return filterArrayByDate(section3HostCohostRequestSent.slice()) ?? [];
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
        heading={'Requests Sent'}
        ListData={NotificationData}
        ListTile={({item}) => {
          if (!item?.reactProps) {
            return null;
          }
          const ListWidget = ListTiles[item?.reactProps.Tile];
          return (
            <ListWidget {...item?.reactProps?.TIleProp} vendorRequest={item} />
          );
        }}
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

export default useSection3HostCohostRequestSent;

/*


  const section3HostCohostRequestSent = useMemo(() => {
    const {section3HostCohostRequestSent = []} = notificationsStore;

    let returnData = {
      Component: null,
      createdAt: null,
      section3HostCohostRequestSentData: [],
    };
    returnData.section3HostCohostRequestSentData = filterArrayByDate(
      section3HostCohostRequestSent.slice(),
    );
    if (returnData.section3HostCohostRequestSentData.length == 0) {
      return returnData;
    }
    returnData.createdAt =
      returnData.section3HostCohostRequestSentData[0].createdAt;
    returnData.Component = (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(20)}}
        listViewContainerStyle={{marginTop: getHp(20)}}
        minRender={1}
        heading={'Requests Sent'}
        ListData={returnData.section3HostCohostRequestSentData}
        ListTile={({item}) => {
          if (!item?.reactProps) {
            return null;
          }
          const ListWidget = ListTiles[item?.reactProps.Tile];
          return (
            <ListWidget {...item?.reactProps?.TIleProp} vendorRequest={item} />
          );
        }}
        CustomDivider={
          <View style={{height: getHp(10), backgroundColor: '#F2F2F2'}} />
        }
      />
    );
    return returnData;
  }, [notificationsStore.notificationData]);
  */
