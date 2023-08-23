import {ApiClient} from '..';

import MobxStore from '../../../mobx';

class AppNotificationService {
  getUserNotification = async () => {
    try {
      const notificationResponse = await ApiClient.authInstance.get(
        ApiClient.endPoints.userNotification,
      );

      if (notificationResponse.status != 200) {
        throw {response: notificationResponse};
      }
      MobxStore.notificationsStore.initNotification(notificationResponse.data);
      return Promise.resolve(notificationResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getVendorNotification = async () => {
    try {
      const vendorNotificationRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.vendorNotification,
      );

      if (vendorNotificationRes.status != 200) {
        throw {response: vendorNotificationRes};
      }
      MobxStore.vendorNotificationStore.setVendorNotificationData(
        vendorNotificationRes?.data ?? {},
      );
      return Promise.resolve(vendorNotificationRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new AppNotificationService();
