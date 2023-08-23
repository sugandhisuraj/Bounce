import {makeAutoObservable, observable, action, computed} from 'mobx';

class GuestUserStore {
  @observable guestUserObj = {};
  @observable _guestUser = {};

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get guestUser() {
    return {...this._guestUser};
  }
  @action
  setGuestUser = (userData = {},guestUserObj = {}) => {
    this._guestUser = userData;
    this.guestUserObj = guestUserObj;
  };

  @computed
  getMutualFriends = () => {
    try {
      if (
        this.guestUser?.mutualFriends &&
        this.guestUser?.mutualFriends?.length > 0
      ) {
        return this.guestUser.mutualFriends.slice();
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  @computed
  getAllGuestUsersFriend() {
    try {
      if (this.guestUser?.friends && this.guestUser?.friends?.length > 0) {
        return this.guestUser.friends.slice();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
export default GuestUserStore;
