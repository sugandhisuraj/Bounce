import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import {PartyGuestService} from '../../../../app/services';
import SelectionDataStore from '../../../../mobx/Stores/SelectionDataStore';
import HostViewModel from '../HostView/HostViewModel';
class CreateEditGuestListModel {
  @observable _allGuestLists = [];
  @observable selectedGuestLists = new SelectionDataStore();

  @observable currentOperateGuestList = {};
  @observable preSelectedGuests = new SelectionDataStore();
  @observable newlyAddedGuests = new SelectionDataStore();
  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get allGuestListsData() {
    return this._allGuestLists.slice();
  }
  @action
  resetStoreData = () => {
    this._allGuestLists = [];
    this.currentOperateGuestList = {};
    this.selectedGuestLists.reset();
    this.preSelectedGuests.reset();
    this.newlyAddedGuests.reset();
  };
  @action
  setCurrentOperateGuestList = gList => {
    this.currentOperateGuestList = gList;
    this.preSelectedGuests.assignData(
      gList.guestList.map(i => i.guest),
    );
  };
  @computed
  allGuestLists = (removeCurrentParty = true) => {
    let sliceCurrentParty = this.allGuestListsData;
    if (removeCurrentParty) {
      sliceCurrentParty = this.allGuestListsData.filter(gLists => {
        return (
          gLists?.party?.id != HostViewModel.instance().currentParty?.id ??
          false
        );
      });
    }

    return sliceCurrentParty;
  };
  @action
  fetchGuestLists = async (flag = false) => {
    try {
      runInAction(async () => {
        this._allGuestLists = await PartyGuestService.getGuestLists();
        if (Object.keys(this.currentOperateGuestList).length > 0) {
          let assignGuestList = this._allGuestLists.find(
            g => g.id == this.currentOperateGuestList.id,
          );
          if (assignGuestList) {
            this.setCurrentOperateGuestList(assignGuestList);
          }
        }
      });
    } catch (error) {
      console.log('ERROR_FETCH_GUESTLIST - ', error);
      runInAction(() => {
        this._allGuestLists = [];
      });
    }
  };

  @computed
  isAtleastAnyGuestPresent = () => {
    let isAtleastOneGuest = false;
    let allGuest = this.allGuestLists();
    for(let i=0;i<allGuest.length;i++){
       if (allGuest[i].guestList.length > 0) {
        isAtleastOneGuest = true;
        break;
       }
    }
    return isAtleastOneGuest;
  }
  static _instance = null;
  static instance() {
    if (!this._instance) {
      this._instance = new CreateEditGuestListModel();
    }
    return this._instance;
  }
}

export default CreateEditGuestListModel;
