import {
  action,
  makeAutoObservable,
  observable,
  runInAction,
  computed,
} from 'mobx';
import {FriendRequestService} from '../../../app/services';

class GuestProfileModel {
  @observable static instances = [];
  @observable static instanceIndex = -1;
  @observable guestUser = {};
  @observable guestUserWithParties = {};
  @observable loading = true;
  constructor() {
    makeAutoObservable(this);
  }

  @computed
  isGuestUserAvailable() {
    return Object.keys(this.guestUserWithParties).length > 0;
  }
  @action
  async getGuestAllData(userId, props) {
    try {
      this.loading = true;
      const {guestUserData, guestUserPartyData} =
        await FriendRequestService.getGuestUserCompleteData(userId);
      this.guestUser = guestUserData;
      this.guestUserWithParties = {...guestUserData, ...guestUserPartyData};
      this.loading = false;
    } catch (error) {
      return props.navigation.goBack();
    }
  }

  static getInstance() {
    let newInstance = new GuestProfileModel();
    runInAction(() => {
      this.instanceIndex = this.instanceIndex + 1;
      this.instances.push(newInstance);
    });
    return newInstance;
  }

  static removeInstance() {
    let newInstances = this.instances.slice();
    newInstances.pop();
    runInAction(() => {
      this.instanceIndex = this.instanceIndex - 1;
      this.instances = newInstances;
    });
  }
}

export default GuestProfileModel;
