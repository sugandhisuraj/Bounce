import {action, makeAutoObservable, observable} from 'mobx';
import {SearchEventDTO} from '../../../app/DTO';
class SearchEventModel {
  @observable searchDTO = null;
  constructor() {
    makeAutoObservable(this);
    this.searchDTO = new SearchEventDTO(this.setSearchDTO);
  }

  @action
  setSearchDTO = dto => {
    this.searchDTO = dto;
  };
  static _instance = null;

  static getInstance = () => {
    if (this._instance == null) {
      this._instance = new SearchEventModel();
    }
    return this._instance;
  };
}

export default SearchEventModel;
