import {
  observable,
  action,
  runInAction,
  makeAutoObservable,
  computed,
} from 'mobx';
import Asynctask from './Asynctask';
import {LocalStorage} from '../../../app/utils/localStorage';
import {AccountService} from '../../../app/services';
import {FriendShipStatus, User} from '../../../app/Entities';

const USER_FRIEND_STATUS = {
  isFriend: false,
  isRequestSend: false,
  isSendRequest: false,
};
class AuthStore {
  @observable userProfile = {};
  @observable user = new User();
  @observable AllAccounts = [];
  @observable isAuthenticated = false;
  @observable isAutoLoginDone = false;
  //async;
  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    //this.async = new Asynctask(this, rootStore);
  }

  @action
  onAutoLogin = user => {
    this.isAutoLoginDone = true;
    this.user = user;
  };
  @action
  setIsAutoLoginDone = (status = false) => {
    this.isAutoLoginDone = status;
  };
  @action
  setUser = user => {
    this.user = user;
  };

  @action
  syncAllAccounts = (accounts = []) => {
    this.AllAccounts = accounts;
  };

  @action
  logout = () => {
    this.user.clear();
    AccountService.remove(this.user);
    if (!AccountService.setLastAccountToUser()) {
      this.user = new User();
    }
  };

  @computed isPendingRequest(userId) {
    if (userId == null) {
      return false;
    }
    let isRequestExist =
      this.user?.user?.pendingRequests?.findIndex(u => u?.id == userId) ?? -1;
    return isRequestExist == -1 ? false : true;
  }
  @computed incomingRequests(userId) {
    let isRequestExist = this.user.user.incomingRequests.findIndex(
      u => u.id == userId,
    );
    return isRequestExist == -1 ? false : true;
  }
  @computed isFriend(userId) {
    if (!this.user?.user?.friends?.findIndex) {
      return false;
    }
    let isRequestExist = this.user.user.friends.findIndex(u => u.id == userId);
    return isRequestExist == -1 ? false : true;
  }
  @computed userFriendStatus(userId) {
    let status = {...USER_FRIEND_STATUS};
    if (this.isFriend(userId)) {
      status.isFriend = true;
      return status;
    }
    if (this.isPendingRequest(userId)) {
      status.isRequestSend = true;
      return status;
    }
    status.isSendRequest = true;
    return status;
  }
  @computed getUserFriendStatus(userId) {
    if (this.isFriend(userId)) { 
      return FriendShipStatus.FriendRequestApproved;
    }
    if (this.isPendingRequest(userId)) {
      return FriendShipStatus.FriendRequestPendingApproval;
    }
    return FriendShipStatus.NoFriendRequest;
  }
  @computed
  getMyFriends() {
    try {
      return this.user.user?.friends?.slice() ?? [];
    } catch (error) {
      return [];
    }
  }

  @computed
  getSpotifyData() {
    let spotifyData = {
      connected: false,
      data: {},
      topTracks: [],
    };
    if (!this.user?.user?.spotify) {
      return spotifyData;
    }
    spotifyData.connected = true;
    spotifyData.data = this.user.user?.spotify;
    spotifyData.topTracks = spotifyData.data?.spotifyTopTracks ?? [];
    return spotifyData;
  }
}

export default AuthStore;
