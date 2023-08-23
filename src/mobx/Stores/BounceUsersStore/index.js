import {action, computed, makeAutoObservable, observable} from 'mobx';

class BounceUsersStore {
  @observable _bounceUsers = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed
  get bounceUsers() {
    return this._bounceUsers.slice();
  }

  @computed
  get bounceUsersFilteredByBlocking() {
    let users = this.bounceUsers;
     
    const authStore = this.rootStore.authStore.user;
    return users.filter(u => !authStore.isIBlockedByThisUser(u.id));
  }
  @action
  setBounceUsers = (users = []) => {
    this._bounceUsers = users;
  };

  @computed
  getUserById = userId => {
    let user = this.bounceUsers.find(u => u.id == userId);
    return user ? {...user} : null;
  };
}

export default BounceUsersStore;
