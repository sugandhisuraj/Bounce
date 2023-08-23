import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import ToastUtil from '../../../app/constants/toast';
import {CountryCodeEntity} from '../../../app/Entities';
import {AuthService} from '../../../app/services';

class AppStore {
  @observable loader = false;

  @observable _unfriendModalData = {isVisible: false};
  @observable _countryCodes = [];
  @observable _vendorSignupData = {};
  @observable languagesData = [];
  @observable isProccessedDeeplinking = false;
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @action
  setIsProcessedDeeplinking = value => {
    this.isProccessedDeeplinking = value;
  };
  @computed
  get vendorSignupData() {
    return {...this._vendorSignupData};
  }
  @computed
  setLanguagesData = languagesData => {
    this.languagesData = languagesData;
  };

  @action
  fetchVendorSignupData = async () => {
    try {
      this.rootStore.toggleLoader(true);
      let vendorSignupData = await AuthService.fetchVendorSignupData();
      let languagesData = await AuthService.fetchLanguagesData();
      console.log('ALL_LANG_DATA - ', JSON.stringify(languagesData));
      runInAction(() => {
        this._vendorSignupData = vendorSignupData;
        this.languagesData = languagesData;
      });
    } catch (error) {
      // runInAction(() => {
      //   this._vendorSignupData = {};
      //   this.langu
      // });
      ToastUtil('Something went wrong! Try Again');
    } finally {
      this.rootStore.toggleLoader(false);
    }
  };

  @computed
  getCountryCodeDataOnDialCode = countryData => {
    let countryCodeIndex = this.countryCodes.findIndex(
      c => c.dial_code == countryData.dial_code,
    );
    if (countryCodeIndex > -1) {
      return {...this.countryCodes[countryCodeIndex]};
    }
    return new CountryCodeEntity(countryData).serialize();
  };
  @computed
  get countryCodes() {
    return this._countryCodes.slice();
  }
  @action
  setCountryCodes = (countryCodes = []) => {
    this._countryCodes = countryCodes;
  };
  @action
  toogleLoader = (flag = undefined) => {
    if (flag != undefined) {
      this.loader = flag;
      return;
    }
    this.loader = !this.loader;
  };
}

export default AppStore;
