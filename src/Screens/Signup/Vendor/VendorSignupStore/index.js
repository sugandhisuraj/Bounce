import {
  makeAutoObservable,
  computed,
  action,
  observable,
  runInAction,
} from 'mobx';
import {CreateVendor} from '../../../../app/Entities';
import SelectionDataStore from '../../../../mobx/Stores/SelectionDataStore';
import {VendorFieldsData} from '../../../../app/constants';
class VendorSignupStore {
  @observable listener = {};
  @observable _selectedVendorBusinessCategory = {};
  @observable vendorFields = new CreateVendor();
  // All Selection for Genres, Armed, Equipments, Services
  @observable armed = new SelectionDataStore();
  @observable genres = new SelectionDataStore();
  @observable cuisines = new SelectionDataStore();
  @observable guard_certification = new SelectionDataStore();
  @observable equipment = new SelectionDataStore();
  @observable services = new SelectionDataStore();
  // All Selection for Genres, Armed, Equipments, Services
  constructor(props) {
    makeAutoObservable(this);
  }
  @action
  forEdit = userData => {
    console.log('FOR_EDIT_REC_USEr_22 - ', JSON.stringify(userData));
    const {pullUpNestedObjectFromVendors} = VendorFieldsData.VendorFieldsData;

    let armed = pullUpNestedObjectFromVendors(
      userData?.vendor?.armedVendor,
      'armed',
    );
    let guardCertification = pullUpNestedObjectFromVendors(
      userData?.vendor?.guardCertVendor,
      'certificate',
    );
    let cuisines = pullUpNestedObjectFromVendors(
      userData?.vendor?.cuisinesVendor,
      'cuisines',
    );

    let services = pullUpNestedObjectFromVendors(
      userData?.vendor?.cateringServicesVendor ??
        userData?.vendor?.bartenderServicesVendor ??
        userData?.vendor?.cleaningcrewsServicesVendor ??
        userData?.vendor?.photoServicesVendor ??
        userData?.vendor?.videoServicesVendor,
      'services',
    );
    let genres = pullUpNestedObjectFromVendors(
      userData?.vendor?.genresVendor,
      'genres',
    );
    let equipment = pullUpNestedObjectFromVendors(
      userData?.vendor?.djEquipmentVendor ??
        userData?.vendor?.bartenderEquipmentVendor ??
        userData?.vendor?.photoEquipmentVendor ??
        userData?.vendor?.videoEquipmentVendor,
      'equipment',
    );
    this.vendorFields = CreateVendor.forEdit(userData);
    this.vendorFields.updateFields({
      genres,
      services,
      guardCertification,
      armed,
      cuisines,
      equipment
    });
    this.armed.resetAndAddDatas(armed ?? []);
    this.genres.resetAndAddDatas(genres ?? []);
    this.cuisines.resetAndAddDatas(cuisines ?? []);
    this.guard_certification.resetAndAddDatas(guardCertification ?? []);
    this.equipment.resetAndAddDatas(equipment ?? []);
    this.services.resetAndAddDatas(services ?? []);

    this.updateListener();
  };

  @action
  updateListener = () => {
    this.listener = {};
  };
  @action
  updateVendorFields = (values = {}) => {
    this.vendorFields.updateFields(values);
    this.updateListener();
  };

  @action
  toggleEquipments = data => {
    this.equipment.toggle(data);
    this.updateVendorFields({
      equipment: this.equipment.data(),
    });
  };
  @action
  toggleServices = data => {
    this.services.toggle(data);
    this.updateVendorFields({
      services: this.services.data(),
    });
  };

  @action
  toggleVendorLists = (listKey, vendorFieldKey, data) => {
    this[listKey].toggle(data);
    this.updateVendorFields({
      [vendorFieldKey]: this[listKey].data(),
    });
  };
  @action
  clearAllSelectionLists = () => {
    this.armed.reset();
    this.genres.reset();
    this.cuisines.reset();
    this.guard_certification.reset();
    this.equipment.reset();
    this.services.reset();
  };
  @computed
  get selectedVendorBusinessCategory() {
    return {...this._selectedVendorBusinessCategory};
  }

  @action
  setVendorBusinessCategory = (businessCategory = {}) => {
    this.vendorFields = new CreateVendor();
    this.updateVendorFields({vendorType: businessCategory.id});
    return (this._selectedVendorBusinessCategory = {...businessCategory});
  };
  static _instance = null;

  static getInstance = () => {
    if (this._instance == null) {
      this._instance = new VendorSignupStore();
    }
    return this._instance;
  };
}

export default VendorSignupStore;
