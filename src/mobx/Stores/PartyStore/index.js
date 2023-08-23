import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import {filterArrOnDate} from '../../../app/utils';

class PartyStore {
  @observable isLoading = false;
  @observable _party = [];

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  isPartyLikedByMe = partyData => {
    let searchedParty = this.party.find(p => partyData.id == p.id);
    if (searchedParty && searchedParty?.isLiked) {
      return true;
    }
    return false;
  };

  @computed
  isPartyHostedByMe = partyData => {
    let proccessParty = this.party.find(p => partyData.id == p.id);
    if (proccessParty && proccessParty?.isHost && proccessParty?.isHost == true) {
      return true;
    }
    return false;
  };
  @computed
  getHostingParties = () => {
    return this.party.filter(p => p?.isHost ?? false);
  };
  @computed
  getAttendingParties = () => {
    return this.party.filter(p => p?.isAttending ?? false);
  };
  @computed
  getInterestedParties = () => {
    return this.party.filter(p => p?.isLiked ?? false);
  };

  @action
  onLoadParty = (status = true) => {
    //this._party = [];
    this.isLoading = status;
  };
  @action
  setParty = (party = []) => {
    // this.party = party;
    let sortedParty = filterArrOnDate(party);
    this._party = sortedParty.slice();
    this.isLoading = false;
  };

  get party() {
    return this._party.slice();
  }
}

export default PartyStore;
