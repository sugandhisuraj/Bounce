import {
  observable,
  action,
  runInAction,
  makeAutoObservable,
  computed,
} from 'mobx';
import {LocalStorage} from '../../../app/utils/localStorage';

class TagStore {
  @observable partyTags = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTags = (tags = []) => {
    this.partyTags = tags;
  };

  getTags = () => {
    return this.partyTags.slice();
  };

  getTagCategoryFromSubTag = subTag => {
    let returnData = {
      isFind: false,
      tagCategory: {},
    };
    console.log("REC - ", subTag);
    this.partyTags.map(tag => {
      tag.subTags.map(sT => {
        if (sT.name == subTag.name) {
          returnData.tagCategory = tag;
        }
      });
    });
     
    return returnData;;
  };
}

export default TagStore;
