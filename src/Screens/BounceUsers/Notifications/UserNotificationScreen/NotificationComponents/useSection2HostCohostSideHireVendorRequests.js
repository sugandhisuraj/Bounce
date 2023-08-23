import React, {useMemo} from 'react';
import {View} from 'react-native';

import {Lists, ListTiles} from '../../../../../components';
import {filterArrayByDate, getHp} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';

const useSection2HostCohostSideHireVendorRequests = props => {
  const {notificationsStore} = MobxStore;
  const section2HostCohostSideHireVendorRequests =
    notificationsStore?.section2HostCohostSideHireVendorRequests ?? [];

  const NotificationData = useMemo(() => {
    if (section2HostCohostSideHireVendorRequests.length == 0) {
      return [];
    }
    return (
      filterArrayByDate(section2HostCohostSideHireVendorRequests.slice()) ?? []
    );
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
        heading={'Messages'}
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
        CustomDivider={<View style={{height: getHp(10)}} />}
      />
    );
  }, [notificationsStore?.notificationData]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useSection2HostCohostSideHireVendorRequests;

/*
const section2HostCohostSideHireVendorRequests = useMemo(() => {
    const {section2HostCohostSideHireVendorRequests = []} = notificationsStore;

    let returnData = {
      Component: null,
      createdAt: null,
      hireVendorData: [],
    };
    returnData.hireVendorData = filterArrayByDate(
      section2HostCohostSideHireVendorRequests.slice(),
    );
    if (returnData.hireVendorData.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.hireVendorData[0].createdAt;
    returnData.Component = (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(20)}}
        listViewContainerStyle={{marginTop: getHp(20)}}
        minRender={1}
        heading={'Messages'}
        ListData={returnData.hireVendorData}
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
        CustomDivider={<View style={{height: 10}} />}
      />
    );
    return returnData;
  }, [notificationsStore.notificationData]);
  */
