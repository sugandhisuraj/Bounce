import {action, computed, makeAutoObservable, observable} from 'mobx';
import {SearchPartyDTO} from '../../../app/DTO';

class SearchEvents {
  @observable searchPlaceholder = 'Search Events';
  @observable listener = {};
  @observable _searchEvents = [];
  @observable activeTab = 0;
  @observable searchText = '';
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setActiveTab = activeTab => {
    this.activeTab = activeTab;
  };
  @action
  setSearchText = searchText => {
    this.searchText = searchText;
  };
  @action
  updateListeners() {
    this.listener = {};
  }
  @computed
  get searchEvents() {
    return this._searchEvents.slice();
  }
  @action
  setSearchEvents = (searchEvents = []) => {
    this._searchEvents = searchEvents;
    this.updateListeners();
  };
}

export default SearchEvents;
