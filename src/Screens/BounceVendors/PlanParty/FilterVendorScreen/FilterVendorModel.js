import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import ToastUtil from '../../../../app/constants/toast';
import {FilterVendor as FilterVendorEntity} from '../../../../app/Entities';
import SelectionDataStore from '../../../../mobx/Stores/SelectionDataStore';
import MobxStore from '../../../../mobx';
import {VendorService} from '../../../../app/services';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import {VendorFieldsData} from '../../../../app/constants';
class FilterVendorModel {
  @observable isFilterModeOn = false;
  @observable filteredVendorData = [];
  @observable filterFields = new FilterVendorEntity();

  @observable genres = new SelectionDataStore();
  @observable armed = new SelectionDataStore();
  @observable guardCertification = new SelectionDataStore();
  @observable cuisines = new SelectionDataStore();
  @observable services = new SelectionDataStore();
  @observable equipment = new SelectionDataStore();
  @observable gender = new SelectionDataStore();
  constructor() {
    makeAutoObservable(this);
  }
 
  @action
  getFilteredVendorsData = async () => {
    try {
     
      let filterBody = JSON.parse(JSON.stringify(this.filterFields));
      let categoryFilterPrices =
      VendorFieldsData.VendorFieldsData.getFromToPrices(filterBody.categoryId);
      if (categoryFilterPrices.toPrice == filterBody.toPrice) {
        filterBody.toPrice += 100;
      }
      const {categoryId, fromPrice, toPrice} = filterBody;
      filterBody.dollar = VendorFieldsData.VendorFieldsData.getDollarsFromPrice(
        categoryId,
        fromPrice,
        toPrice,
      );
      console.log("FILTER_VENDOR_BODY - ", JSON.stringify(filterBody));
      MobxStore.toggleLoader(true);
      const vendorFilterRes = await VendorService.vendorFilter(filterBody);
      runInAction(() => {
        this.filteredVendorData = vendorFilterRes;
        this.isFilterModeOn = true;
      });
      return vendorFilterRes;
    } catch (error) {
      console.log('ERROR_FILTER_VENDOR - ', error);
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
      runInAction(() => {
        this.filteredVendorData = [];
        this.isFilterModeOn = false;
      });
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  @action
  updateFilterFields = (fields = {}) => {
    //this.filterFields = this.filterFields.clone(fields);
    this.filterFields = {
      ...this.filterFields,
      ...fields,
    };
    //this.getFilteredVendorsData();
  };
  @action
  toggleCheckLists = (listKey, item) => {
    if (listKey in this) {
      this[listKey].toggle(item);
      this.updateFilterFields({
        [listKey]: this[listKey].data(true),
      });
    }
    return null;
  };
  @action
  checkItemInList = (listKey, item) => {
    if (listKey in this) {
      return this[listKey].isDataExist(item).exist ?? false;
    }
    return false;
  };

  @action
  clearList = category => {
    let categoryFilterPrices =
      VendorFieldsData.VendorFieldsData.getFromToPrices(category.id);
    this.filterFields = new FilterVendorEntity({
      categoryId: category.id,
      ...categoryFilterPrices,
    });
    this.isFilterModeOn = false;
    this.filteredVendorData = [];
    this.armed.reset();
    this.genres.reset();
    this.cuisines.reset();
    this.guardCertification.reset();
    this.equipment.reset();
    this.services.reset();
    this.gender.reset();
  };
  static _instance = null;
  static getInstance = () => {
    if (this._instance == null) {
      this._instance = new FilterVendorModel();
    }
    return this._instance;
  };
}

export default FilterVendorModel;
