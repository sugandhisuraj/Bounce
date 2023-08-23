import {action, computed, observable, runInAction} from 'mobx';
import {makeAutoObservable} from 'mobx';

import SelectedTags from '../SelectedTags';
import { isPartyBegin } from '../../../app/utils';
import ToastUtil from '../../../app/constants/toast';
import {PartyService} from '../../../app/services';
class InterestedParty {
  @observable interestedTags = new SelectedTags();
  @observable _newsFeeds = [];
  @observable _publicParties = [];

  @observable topOneNewsFeedEvent = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @computed
  get newsFeeds() {
    return this._newsFeeds.slice();
  }

  @computed
  get newsFeedsWithTopNewsFeed() {
    let returnData = this.newsFeeds.filter(p => !isPartyBegin(p.date));
    if (Object.keys(this.topOneNewsFeedEvent).length > 0) {
      returnData = returnData.filter(e => e.id != this.topOneNewsFeedEvent.id);
      returnData.unshift({...this.topOneNewsFeedEvent});
    }
    return returnData;
  }
  @action
  addTopOneNewsFeedEvent = event => {
    this.topOneNewsFeedEvent = event;
  };
  @action
  addNewsFeeds = (newsFeeds = []) => {
    this._newsFeeds = newsFeeds;
  };
  @computed
  get publicParties() {
    return this._publicParties.slice();
  }
  @action
  setPublicParties = (parties = []) => {
    this._publicParties = parties;
  };

  getPartySubTags = party => {
    let partySubTags = [];
    party.partyTags.map(tag => {
      tag.subTags.map(subTag => {
        partySubTags.push(subTag);
      });
    });
    return partySubTags;
  };

  @computed
  computeAddInterestResults = (interest = []) => {
    if (interest.length == 0) {
      interest = this.interestedTags.getAllSubTags();
    }
    if (interest.length == 0) {
      return 0;
    }
    return this.publicParties.filter(event => {
      let partySubTags = this.getPartySubTags(event);
      let interestContain = interest.filter(iF => {
        let findInterest = partySubTags.find(i => i.name == iF.name);
        return findInterest ? true : false;
      });
      return interestContain.length > 0;
    }).length;
  };

  @action
  getPartyAndUpdateInNewsfeed = async party => {
    try {
      if (party.id == this.topOneNewsFeedEvent.id) {
        this.rootStore.toggleLoader(true);
        const oneSpecificParty = await PartyService.getPartyById(party.id);
        this.topOneNewsFeedEvent = oneSpecificParty;
        return;
      }
      let thatPartyIndexInNewsFeed = this._newsFeeds.findIndex(
        n => n.id == party.id,
      );
      if (thatPartyIndexInNewsFeed == -1) {
        return;
      }
      this.rootStore.toggleLoader(true);
      const thatSpecificPartyRes = await PartyService.getPartyById(party.id);
      let newNewsFeed = [...this._newsFeeds];

      newNewsFeed[thatPartyIndexInNewsFeed] = thatSpecificPartyRes;
      runInAction(() => {
        this._newsFeeds = newNewsFeed;
      });
    } catch (error) {
      ToastUtil('Something went wrong! Try again');
      return Promise.reject(error);
    } finally {
      this.rootStore.toggleLoader(false);
    }
  };
}

export default InterestedParty;
