import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import {VendorService} from '../../../app/services';
import MobxStore from '../../../mobx';

class PartyRentalsModel {
  @observable _hiredVendorParties = [];
  @observable isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get hiredVendorParties() {
    return this._hiredVendorParties.slice();
  }
  @action
  setHiredVendorParties = (parties = []) => {
    this._hiredVendorParties = parties;
  };

  @action
  fetchHiredVendorParties = async () => {
    try {
      MobxStore.toggleLoader(true);
      const parties = await VendorService.getHiredVendorParties();
      this.setHiredVendorParties(parties);
      runInAction(() => {
        this.isLoading = false;
      });
    } catch (error) {
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  static _instance = null;
  static getInstance() {
    if (!this._instance) {
      this._instance = new PartyRentalsModel();
    }
    return this._instance;
  }
}

export default PartyRentalsModel;

/*

[{"id":1,"createdAt":"2021-10-21T11:13:27.268Z","vendor":{"id":12,"phoneNumber":"8720880991","email":"music1@gmail.com","fullName":"Music 1","birthday":null,"state":null,"city":"Indore, Madhya Pradesh, India","about":"Desc\t","description":null,"profession":null,"vendorType":2,"age":1,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":[{"code":"af","label":"Afrikaans","value":4},{"code":"ak","label":"Akan","value":5}],"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":null,"username":"music1","gender":0,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":25,"fileName":"5323916A-8CF9-482D-86B3-1F686E32D030.jpg","createdAt":"2021-10-21T11:10:53.424Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-21/91b84b2add15719344a3d592aad92dc2c73969f3/acc4c7eedfc7263a57d4e1f1ce432661/5323916A-8CF9-482D-86B3-1F686E32D030.jpg","fileSequence":0}},"party":{"id":6,"createdAt":"2021-10-20T08:30:14.733Z","title":"Thanos birthday party","description":"Desc","date":"2021-11-11T13:59:11.000Z","isPrivate":false,"fee":0,"needBouncer":false,"needDJ":false,"ageLimit":false,"fromAge":0,"toAge":0,"isDraft":false,"profileImage":{"id":18,"fileName":"00532B40-EE22-4C12-AEEE-EAC0299CCA61.jpg","createdAt":"2021-10-20T08:30:14.647Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-20/24e92d8228f03951951ba6be80cf69444f0fc55d/1c1335d236faa469a8e58e721b719b62/00532B40-EE22-4C12-AEEE-EAC0299CCA61.jpg","fileSequence":0},"creator":{"id":1,"phoneNumber":"8720880991","email":"guest1@gmail.com","fullName":"Suraj 1","birthday":"2021-10-07 00:00:00","state":null,"city":null,"about":null,"description":null,"profession":null,"vendorType":0,"age":0,"snapchatUsername":null,"instagramUsername":null,"tiktokUsername":null,"twitterUsername":null,"linkedInUsername":null,"language":null,"countryCode":{"id":229,"code":"US","flag":"🇺🇸","name":"United States","dial_code":"+1"},"firebaseTokens":["cHcd8yKoh03zgam9dm9XTq:APA91bFbh0G43VSER_TIYxu1uRHGOd_WowHrxBJ_NLHWLemx2bpEx-Fjyka-nBEaIBhwFI_G6QFEerC5tRcQyhh3zVQVwg9vuKWGAHlmedoYrqv1O_jQ_0evJUjyMPjKUzT8XQ6ekqP3"],"username":"guest1","gender":null,"numberOfRatings":0,"averageRating":"0","instaData":null,"instaId":null,"friendCount":false,"hosting":false,"attending":false,"interested":false,"profileImage":{"id":1,"fileName":"image-1634711113921.jpg","createdAt":"2021-10-20T06:27:11.460Z","filePath":"https://bounce-prod-media.s3.amazonaws.com/2021-10-20/bd625b78eff40a66da631aa3eb363a20d5f8be7d/67e3936819ceb0101ada3d1bd551a7dd/image-1634711113921.jpg","fileSequence":0}},"gallery":[{"id":19,"fileName":"00532B40-EE22-4C12-AEEE-EAC0299CCA61.jpg","createdAt":"2021-10-20T08:30:14.703Z","filePath":"https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-10-20/ce49dcae30c4acba6a245ce3456c9d343a424a39/1c1335d236faa469a8e58e721b719b62/00532B40-EE22-4C12-AEEE-EAC0299CCA61.jpg","fileSequence":0}],"location":{"id":6,"lon":"1","lat":"1","addressStr":"Address"}}}]

*/