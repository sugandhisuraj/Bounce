import {action, computed, makeAutoObservable, observable} from 'mobx';

class VendorNotificationStore {
  @observable _vendorNotificationAllData = {};
  @observable _hostHireVendorRequest = [];
  @observable _hostHireVendorConfirmRequest = [];
  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get vendorNotificationAllData() {
    return {...this._vendorNotificationAllData};
  }

  @computed
  get hostHireVendorRequest() {
    return this._hostHireVendorRequest.slice();
  }

  @computed
  get hostHireVendorConfirmRequest() {
    return this._hostHireVendorConfirmRequest.slice();
  }

  @action
  setVendorNotificationData = notificationData => {
    this._vendorNotificationAllData = notificationData;
    this._hostHireVendorRequest = notificationData?.hostHireVendorRequest ?? [];
    this._hostHireVendorConfirmRequest =
      notificationData?.hostHireVendorConfirmRequest ?? [];
  };
}

export default VendorNotificationStore;
