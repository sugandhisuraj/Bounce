import {action, computed, makeAutoObservable, observable} from 'mobx';
import SelectionDataStore from '../../../../mobx/Stores/SelectionDataStore';

class InviteFriendsModel {
  @observable mode = InviteFriendsModel.Mode.Friends;

  @observable cohost = new SelectionDataStore();
  @observable bounceInvites = new SelectionDataStore();
  @observable contactInvites = new SelectionDataStore();
  @observable inviteTrack = new SelectionDataStore();

  @action
  syncInviteTrack = () => {
    let trackobj = {
      id: new Date().getTime() + this.inviteTrack.data().length + 1,
      data: {
        cohost: this.cohost.data(),
        bounceInvites: this.bounceInvites.data(),
        contactInvites: this.contactInvites.data(),
      },
    };
    this.inviteTrack.push(trackobj);
  };
  @action
  assignEmptyInviteTrack = (cohost = [], bounceInvites = []) => {
    let trackobj = {
      id: new Date().getTime() + this.inviteTrack.data().length + 1,
      data: {
        cohost,
        bounceInvites,
        contactInvites: [],
      },
    };
    this.inviteTrack.push(trackobj);
  };
  @action
  undo = () => {
    let poppedData = null;
    if (this.inviteTrack.data().length == 1) {
      poppedData = this.inviteTrack.data()[0];
    } else {
      poppedData = this.inviteTrack.pop();
      poppedData = this.inviteTrack.data()[this.inviteTrack.data().length - 1];
    }
    console.log('POPPED_DATA_4 - ', JSON.stringify(poppedData));
    const {data} = poppedData;

    this.cohost.resetAndAddDatas(data.cohost);
    this.bounceInvites.resetAndAddDatas(data.bounceInvites);
    this.contactInvites.resetAndAddDatas(data.contactInvites);
  };
  constructor(props) {
    makeAutoObservable(this); 
  }

  @action
  initInvites = currentParty => {
    let invites = currentParty?.invited?.slice() ?? [];
    let cohosts = currentParty?.unconfirmedHost ?? [];
    cohosts = cohosts.map(c => c.host);
    invites = invites.filter(i => {
      let isInviteInCohost = cohosts.findIndex(c => c.id == i.id);
      return isInviteInCohost == -1 ? true : false;
    });
    this.cohost.resetAndAddDatas(cohosts);
    this.bounceInvites.resetAndAddDatas(invites);
    this.contactInvites.reset();
    this.inviteTrack.reset();
    this.assignEmptyInviteTrack(cohosts, invites);
  };
  // Cohost to Friend Switch
  @action
  switchToCohostMode() {
    this.mode = InviteFriendsModel.Mode.Cohost;
  }
  @action
  switchToFriendsMode() {
    this.mode = InviteFriendsModel.Mode.Friends;
  }
  // Cohost to Friend Switch

  static Mode = {
    Friends: 'Friends',
    Cohost: 'Cohost',
  };
  static _instance = null;
  static instance() {
    if (!this._instance) {
      this._instance = new InviteFriendsModel();
    }
    return this._instance;
  }
}

export default InviteFriendsModel;
