import {action, computed, makeAutoObservable, observable} from 'mobx';
import { TagCategory } from '../../../app/Entities';
import {PartyService} from '../../../app/services';

class SelectedTags {
  @observable _tags = [];

  constructor(props) {
    makeAutoObservable(this);
  }
  @computed
  get tags() {
    return this._tags.slice();
  }
  @action
  sync = (selectedTags = []) => {
    let tagDto = [];
    selectedTags.map(tag => {
      tagDto.push(TagCategory.fromJSON(tag));
    });
    this._tags = tagDto;
  };
  @action
  onSelectTag = (tag, subTags) => {
    try {
      let updatedTags = this.tags ?? [];
      let {tagExist, tagIndex} = this.isTagSelected(tag, subTags);
      if (!tagExist) {
        updatedTags.push(tag.fromSelect(subTags));
      } else {
        updatedTags[tagIndex] = updatedTags[tagIndex].toggleSubTag(subTags);
        if (updatedTags[tagIndex].subTags.length == 0) {
          updatedTags = updatedTags.filter((_, i) => i != tagIndex);
        }
      }
      this._tags = updatedTags;
    } catch (error) {
      console.log('ON_SELECT_TAG_ERROR - ', error);
      throw new Error(error);
    }
  };
  isTagSelected = (tag, subTag) => {
    let result = {
      tagIndex: -1,
      subTagIndex: -1,
      tagExist: false,
      subTagExist: false,
    };
    let tagIndex = this.tags.findIndex(t => tag.id == t.id);
    if (tagIndex == -1) {
      return result;
    }
    result.tagIndex = tagIndex;
    result.tagExist = true;
    let subTagIndex = this.tags[tagIndex].isSubTagExist(subTag);
    if (subTagIndex == -1) {
      return result;
    } else {
      result.subTagIndex = subTagIndex;
      result.subTagExist = true;
      return result;
    }
  };

  @computed
  getAllSubTags = () => {
    let subTagsData = [];
    this.tags.map(tag => {
      subTagsData.push(...tag.getSubtags());
    });
    return JSON.parse(JSON.stringify(subTagsData));
  };
}

export default SelectedTags;
