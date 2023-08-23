import React, {useMemo} from 'react';
import {View} from 'react-native';

import {filterArrayByDate, getHp, getWp} from '../../../../../app/utils';
import {Lists, ListTiles} from '../../../../../components';
import MobxStore from '../../../../../mobx';

const useVendorConfirmRequest = () => {
  const {vendorNotificationStore} = MobxStore;

  const hireVendorConfirmRequests =
    vendorNotificationStore.hostHireVendorConfirmRequest ?? [];

  const NotificationData = useMemo(() => {
    if (hireVendorConfirmRequests.length == 0) {
      return [];
    }
    return filterArrayByDate(hireVendorConfirmRequests.slice()) ?? [];
  }, [vendorNotificationStore.hostHireVendorConfirmRequest]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [vendorNotificationStore.hostHireVendorConfirmRequest]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
      <Lists.NewToggleList
        containerStyle={{paddingVertical: getHp(15)}}
        listViewContainerStyle={{
          marginTop: getHp(15),
        }}
        minRender={1}
        heading={'Hire Requests'}
        ListData={NotificationData}
        ListTile={({item}) => (
          <ListTiles.VendorHireVendorConfirmation vendorRequestData={item} />
        )}
        CustomDivider={<View style={{height: 10}} />}
      />
    );
  }, [vendorNotificationStore.hostHireVendorConfirmRequest]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useVendorConfirmRequest;
