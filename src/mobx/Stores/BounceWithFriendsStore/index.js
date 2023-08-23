const {makeAutoObservable, observable, computed, action, runInAction} = require('mobx');
import SelectionDataStore from '../SelectionDataStore';
import {PartyService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
class BounceWithFriendsStore {
  @observable selectedBounceUsers = new SelectionDataStore();
  @observable _bounceWithFriendsData = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  reset = () => {
    this.selectedBounceUsers.reset();
    this._bounceWithFriendsData = {};
  };
  @computed
  get bounceWithFriendsData() {
    return {...this._bounceWithFriendsData};
  }

  @action
  setBounceWithFriendsData = (bwfData = {}) => {
    this._bounceWithFriendsData = bwfData;
  };

  @computed
  getCommonTags() {
    return this.bounceWithFriendsData?.Tags?.slice() ?? [];
  }
  @computed
  isTagExistInCommonTags(subTag) {
    let subT = this.getCommonTags().find(t => t.name == subTag.name);
    return subT == undefined ? false : true;
  }
  @computed
  getCommonParties() {
    return this.bounceWithFriendsData?.parties ?? [];
  }
  @computed
  getBounceWithFriendsName() {
    let bwfNames = [];
    this.selectedBounceUsers
      .data()
      .map(friend => bwfNames.push(friend.fullName));
    return bwfNames.join(', ');
  }

  @action
  getPartyAndUpdateInBWF = async party => {
    try {
      let thatPartyIndexInBWF = this.getCommonParties().findIndex(
        n => n.id == party.id,
      );
      if (thatPartyIndexInBWF == -1) {
        return;
      }
      this.rootStore.toggleLoader(true);
      const thatSpecificPartyRes = await PartyService.getPartyById(party.id);
      let newBWFS = [...this.getCommonParties()];

      newBWFS[thatPartyIndexInBWF] = thatSpecificPartyRes;
      let updatedBounceWithFriendsData = this.bounceWithFriendsData;
      updatedBounceWithFriendsData.parties = newBWFS;
      runInAction(() => {
        this._bounceWithFriendsData = updatedBounceWithFriendsData;
      });
      return Promise.resolve(true);
    } catch (error) {
      console.log("BWF_GET_PARTY_UPDATE - ", error);
      ToastUtil('Something went wrong! Try again');
      return Promise.reject(error);
    } finally {
      this.rootStore.toggleLoader(false);
    }
  };
}

export default BounceWithFriendsStore;
