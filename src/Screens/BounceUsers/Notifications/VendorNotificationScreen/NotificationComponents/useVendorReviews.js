import React, {useMemo} from 'react';
import {View} from 'react-native';

import {filterArrayByDate, getHp, getWp} from '../../../../../app/utils';
import {Lists, ListTiles} from '../../../../../components';
import MobxStore from '../../../../../mobx';

const useVendorReviews = () => {
  const {vendorNotificationStore} = MobxStore;

  const vendorReviews =
    vendorNotificationStore.vendorNotificationAllData?.reviews ?? [];

  const NotificationData = useMemo(() => {
    if (vendorReviews.length == 0) {
      return [];
    }
    return filterArrayByDate(vendorReviews.slice()) ?? [];
  }, [vendorNotificationStore.vendorNotificationAllData]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [vendorNotificationStore.vendorNotificationAllData]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
      <Lists.NewToggleList
        containerStyle={{marginTop: getHp(15)}}
        listViewContainerStyle={{
          marginTop: getHp(15),
          marginHorizontal: getWp(10),
        }}
        minRender={1}
        heading={'Reviews'}
        ListData={NotificationData}
        ListTile={({item}) => (
          <ListTiles.VendorNotificationReviewTile reviewData={item} />
        )}
        CustomDivider={<View style={{height: getHp(5)}} />}
      />
    );
  }, [vendorNotificationStore.vendorNotificationAllData]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useVendorReviews;
