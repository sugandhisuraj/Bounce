import {makeAutoObservable, autorun, computed, action, observable} from 'mobx';
import {createFilter} from 'react-native-search-filter';
import {Lists} from '../../../../../components';
import SelectionDataStore from '../../../../../mobx/Stores/SelectionDataStore';
class HireVendorStrore {
  @observable ratingAndReviewVendors = [];
  @observable _favoriteVendors = [];
  @observable _requestedOrHiredVendors = [];
  @observable _vendorsByCategory = [];
  @observable _selectedVendorByCategory = {};

  @observable selectedVendors = new SelectionDataStore();

  @observable currentVendorIndex = 0;

  @action
  setRatingAndReviewVendors = (arr = []) => {
    this.ratingAndReviewVendors = arr;
  };
  @computed
  getRatingAndReviewVendor = vendorId => {
    let vendorDetail = {};
    this.ratingAndReviewVendors.map(vC => {
      vC.vendor.map(v => {
        if (v.id == vendorId) {
          vendorDetail = {...v};
        }
      });
    });
    return vendorDetail;
  };
  @computed
  getVendorRatingReviewStatus = vId => {
    let vendor = this.getRatingAndReviewVendor(vId);
    if (Object.keys(vendor).length == 0) {
      return false;
    }else {
      return vendor?.isReviewed == false && vendor?.is12HrsDone == true;
    }
  };
  @action
  setCurrentVendorIndex = (index = 0) => {
    this.currentVendorIndex = index;
  };

  @computed
  get favoriteVendors() {
    return this._favoriteVendors.slice();
  }

  @computed
  get requestedOrHiredVendors() {
    return this._requestedOrHiredVendors.slice();
  }
  @action
  setRequestedOrHiredVendors = (data = []) => {
    this._requestedOrHiredVendors = data;
  };

  @computed
  isThisVendorHiredOrRequested = vendor => {
    let vendorDetails = {};
    let hiredReqVendorCategory = this.requestedOrHiredVendors.find(
      c => c.id == vendor.vendorType,
    );
    if (!hiredReqVendorCategory) {
      return vendorDetails;
    }
    vendorDetails =
      hiredReqVendorCategory.vendor.find(v => v.id == vendor.id) ?? {};
    return vendorDetails;
  };

  @action
  setFavoriteVendors = (favVendors = []) => {
    this._favoriteVendors = favVendors;
  };
  @action
  setSelectedVendorByCategory = (vendorByCategoryData = {}) => {
    this._selectedVendorByCategory = {...vendorByCategoryData};
  };
  @computed
  get selectedVendorByCategory() {
    return {...this._selectedVendorByCategory};
  }
  @computed
  get vendorsByCategory() {
    if (this._vendorsByCategory && this._vendorsByCategory.slice) {
      return this._vendorsByCategory.slice();
    }
    return [];
  }
  @action
  setVendorsByCategory = (responseData = []) => {
    this._vendorsByCategory = responseData;
  };

  @action
  syncCurrentSelectedCategory = () => {
    let updatedData = this.vendorsByCategory.find(
      c => c.id == this._selectedVendorByCategory.id,
    );
    if (updatedData) {
      this._selectedVendorByCategory = updatedData;
    }
  };

  @computed
  vendorCategoryList = (searchQuery = '') => {
    if (searchQuery.length > 0) {
      let returnCategories = [];
      this.vendorsByCategory.map(category => {
        let vendors = category.vendor.map(v => ({
          ...v,
          businessOwnerName: v.vendor.businessOwnerName,
        }));
        let filteredResult = vendors.filter(
          createFilter(
            searchQuery,
            Lists.NewToggleList.SEARCH_FILTERS.HireVendorList,
          ),
        );
        let fRLen = filteredResult?.length ?? 0;
        if (fRLen > 0) {
          let rightText = `${fRLen} option${fRLen > 1 ? 's' : ''} available`;
          returnCategories.push({
            ...category,
            rightText,
          });
        }
      });
      return returnCategories;
    } else {
      return this.vendorsByCategory.map(categories => {
        let totalVendorsSelected = this.selectedVendors
          .data()
          .filter(v => v.vendorType == categories.id);
        let rightText =
          totalVendorsSelected.length == 0
            ? ''
            : totalVendorsSelected.length + ' Selected';
        return {
          ...categories,
          rightText,
        };
      });
    }
  };

  @computed
  getFavoriteVendors = () => {
    let favVendors = [];
    this.vendorsByCategory.map(vCategory => {
      vCategory.vendor.map(v => {
        if (v.isFavourite) {
          favVendors.push(v);
        }
      });
    });
    return favVendors;
  };

  @computed
  isThisVendorFavorite = vendorId => {
    let vendor = this.favoriteVendors.findIndex(v => v.id == vendorId);
    return vendor > -1 ? true : false;
  };

  constructor() {
    makeAutoObservable(this);
  }

  static _instance = null;
  static getInstance = () => {
    if (this._instance == null) {
      this._instance = new HireVendorStrore();
    }
    return this._instance;
  };
}

export default HireVendorStrore;
