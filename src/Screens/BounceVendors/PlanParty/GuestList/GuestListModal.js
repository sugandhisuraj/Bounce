import {action, computed, makeAutoObservable, observable} from 'mobx';

class GuestListModal {
  @observable _currentParty = [];

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  isThisHostOfCurrentParty(host) {
    return host.id == this.currentParty.creator.id ?? false;
  }
  @computed
  getAttendingGuest() {
    return this.currentParty?.attending?.slice() ?? [];
  }

  @computed
  getInterestedGuest() {
    return this.currentParty?.likes?.slice() ?? [];
  }

  @computed
  getCantGoGuest() {
    return this.currentParty?.cantgo?.slice() ?? [];
  }
  @computed
  getCohosts() {
    let mainHost = [];
    let coHosts = [];
    if (this.currentParty?.hosts) {
      mainHost = this.currentParty?.hosts.filter(c => {
        return this.isThisHostOfCurrentParty(c.host);
      });
      coHosts = this.currentParty?.hosts.filter(c => {
        return this.isThisHostOfCurrentParty(c.host) == false;
      });
    }
    
    return {
      mainHost,
      coHosts,
      allHosts:mainHost.concat(coHosts) ?? [],
      apiResHosts: this.currentParty.hosts
    };
  }
  @computed
  get currentParty() {
    return {...this._currentParty};
  }
  @action
  setCurrentParty = currentParty => {
    this._currentParty = currentParty;
  };

  static _instance = null;
  static instance() {
    if (this._instance == null) {
      this._instance = new GuestListModal();
    }
    return this._instance;
  }
}
export default GuestListModal;
