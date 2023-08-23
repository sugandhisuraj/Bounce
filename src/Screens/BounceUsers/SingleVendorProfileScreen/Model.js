import {action, computed, makeAutoObservable, observable} from 'mobx';

class SingleVendorProfileScreenModel {
  @observable loading = true;
  @observable vendorData = {};
  @observable error = null;
  @action
  resetVendorData = () => {
    this.error = null;
    this.loading = true;
    this.vendorData = {};
  };
  @action
  onVendorDataLoaded = (vendorData = {}) => {
    this.error = null;
    this.loading = false;
    this.vendorData = vendorData;
  };
  @action
  onVendorDataError = () => {
    this.loading = false;
    this.error = 'Error';
    this.vendorData = {};
  };

  @computed
  getVendorRatingReviewStatus = vId => {
    const vendor = this.vendorData;
    return vendor?.isReviewed == false && vendor?.is12HrsDone == true;
  };
  constructor() {
    makeAutoObservable(this);
  }

  static _instance = null;
  static getInstance = () => {
    if (!this._instance) {
      this._instance = new SingleVendorProfileScreenModel();
    }
    return this._instance;
  };
}

export default SingleVendorProfileScreenModel;
