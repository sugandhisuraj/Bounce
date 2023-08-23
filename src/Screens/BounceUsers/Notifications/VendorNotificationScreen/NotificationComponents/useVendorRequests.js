import React, {useMemo} from 'react';
import {View} from 'react-native';

import {filterArrayByDate, getHp, getWp} from '../../../../../app/utils';
import {Lists, ListTiles} from '../../../../../components';
import MobxStore from '../../../../../mobx';

const useVendorRequests = () => {
  const {vendorNotificationStore} = MobxStore;

  const hireVendorRequests =
    vendorNotificationStore.hostHireVendorRequest ?? [];

  const NotificationData = useMemo(() => {
    if (hireVendorRequests.length == 0) {
      return [];
    }
    return filterArrayByDate(hireVendorRequests.slice()) ?? [];
  }, [vendorNotificationStore.hostHireVendorRequest]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [vendorNotificationStore.hostHireVendorRequest]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(10)}}
        listViewContainerStyle={{
          marginTop: getHp(20),
          marginHorizontal: getHp(10),
        }}
        minRender={1}
        heading={'Messages'}
        ListData={NotificationData}
        ListTile={({item}) => (
          <ListTiles.VendorHireVendorRequest vendorRequestData={item} />
        )}
        CustomDivider={<View style={{height: 10}} />}
      />
    );
  }, [vendorNotificationStore.hostHireVendorRequest]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useVendorRequests;
