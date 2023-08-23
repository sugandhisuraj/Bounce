import {observable, makeAutoObservable, action, computed} from 'mobx';

class SelectedStore {
  primaryKey = 'id';
  @observable _data = [];

  constructor(key = 'id') {
    makeAutoObservable(this);
    this.primaryKey = key;
  }

  @action
  reset = () => {
    this._data = [];
  };

  @action
  resetAndAddDatas = (datas = []) => {
    this.reset();
    this._data = datas.slice();
  };
  @action
  resetAndAddData = data => {
    this.reset();
    this.addData(data);
  };
  @computed
  data = (ids = null) => {
    let allData = this._data.slice();
    if (ids) {
      return allData.map(c => c.id);
    }
    return allData;
  };

  @action
  assignData = data => {
    this._data = data;
  };
  @action
  addData = data => {
    if (this.isDataExist(data).exist) {
      return;
    }
    let newData = this.data();
    newData.push(data);
    this._data = newData;
  };
  @action
  addDatas(datas) {
    datas.map(data => this.addData(data));
  }
  @action
  toggle = data => {
    let dataStatus = this.isDataExist(data);
    let newData = this.data();
    if (dataStatus.exist) {
      newData.splice(dataStatus.index, 1);
    } else {
      newData.push(data);
    }
    this._data = newData;
  };

  @computed
  isDataExist = data => {
    const allData = this.data();
    let dataStatus = {
      index: -1,
      data: {},
      exist: false,
    };
    let dataIndex = allData.findIndex(i => i.id == data.id);
    if (dataIndex > -1) {
      dataStatus.index = dataIndex;
      dataStatus.data = allData[dataIndex];
      dataStatus.exist = true;
    }
    return dataStatus;
  };

  @action
  removeDataIfExist = data => {
    let allData = this.data();
    let dataIndex = allData.findIndex(i => i.id == data.id);
    if (dataIndex > -1) {
      allData.splice(dataIndex, 1);
      this._data = allData;
    }
  };

  @action
  push = d => {
    let newData = this.data();
    newData.push(d);
    this._data = newData;
  };
  @action
  pop = () => {
    let newData = this.data();
    let popElement = newData.pop();
    this._data = newData;
    return popElement;
  };
}

export default SelectedStore;

// class SelectedStore {
//   @observable _cohosts = [];
//   @observable _bounceInvites = [];
//   @observable _contactInvites = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   @action
//   resetCohostInvites = () => {
//     this._cohosts = [];
//   };

//   @action
//   resetBounceInvites = () => {
//     this._bounceInvites = [];
//   };

//   @action
//   resetContactInvites = () => {
//     this._contactInvites = [];
//   };
//   // Contact Invites
//   @computed
//   contactInvites(forId = null) {
//     let allContactInvites = this._contactInvites.slice();
//     if (forId) {
//       return allContactInvites.map(c => c.id);
//     }
//     return allContactInvites;
//   }

//   @action
//   toggleContactInvites(contact) {
//     let contactStatus = this.isContactInviteExist(contact);
//     let newContacts = this.contactInvites();
//     if (contactStatus.exist) {
//       newContacts.splice(contactStatus.index, 1);
//     } else {
//       newContacts.push(contact);
//     }
//     this._contactInvites = newContacts;
//   }

//   @computed
//   isContactInviteExist = contact => {
//     const allContactInvites = this.contactInvites();
//     let contactData = {
//       index: -1,
//       contact: {},
//       exist: false,
//     };
//     let contactIndex = allContactInvites.findIndex(ch => ch.id == contact.id);
//     if (contactIndex > -1) {
//       contactData.index = contactIndex;
//       contactData.invite = allContactInvites[contactIndex];
//       contactData.exist = true;
//     }
//     return contactData;
//   };

//   //Contact Invites
//   // Bounce Invites

//   @action
//   preSelectedBounceInvites(invitedData = []) {
//     this._bounceInvites = invitedData.slice();
//   }

//   @computed
//   bounceInvites(forId = null) {
//     let allBounceInvites = this._bounceInvites.slice();
//     if (forId) {
//       return allBounceInvites.map(c => c.id);
//     }
//     return allBounceInvites;
//   }
//   @action
//   removeBounceInviteIfExist(invite) {
//     let allInvites = this.bounceInvites();
//     let inviteIndex = allInvites.findIndex(i => i.id == invite.id);
//     if (inviteIndex > -1) {
//       allInvites.splice(inviteIndex, 1);
//       this._bounceInvites = allInvites;
//     }
//   }
//   @action
//   toggleBounceInvites(invite) {
//     let inviteStatus = this.isBounceInviteExist(invite);
//     let newBounceInvites = this.bounceInvites();
//     if (inviteStatus.exist) {
//       newBounceInvites.splice(inviteStatus.index, 1);
//     } else {
//       newBounceInvites.push(invite);
//     }
//     this._bounceInvites = newBounceInvites;
//   }

//   @computed
//   isBounceInviteExist = invite => {
//     const allBounceInvites = this.bounceInvites();
//     let inviteData = {
//       index: -1,
//       invite: {},
//       exist: false,
//     };
//     let inviteIndex = allBounceInvites.findIndex(inv => inv.id == invite.id);
//     if (inviteIndex > -1) {
//       inviteData.index = inviteIndex;
//       inviteData.invite = allBounceInvites[inviteIndex];
//       inviteData.exist = true;
//     }
//     return inviteData;
//   };
//   // Bounce Invites

//   // Cohost
//   @computed
//   cohosts(forId = null) {
//     let allCohosts = this._cohosts.slice();
//     if (forId) {
//       return allCohosts.map(c => c.id);
//     }
//     return allCohosts;
//   }

//   @action
//   toggleCohosts(cohost) {
//     let cohostStatus = this.isCohostExist(cohost);
//     let newCohost = this.cohosts();
//     if (cohostStatus.exist) {
//       newCohost.splice(cohostStatus.index, 1);
//     } else {
//       newCohost.push(cohost);
//     }
//     this._cohosts = newCohost;
//   }

//   @computed
//   isCohostExist = cohost => {
//     const allCohosts = this.cohosts();
//     let cohostData = {
//       index: -1,
//       cohost: {},
//       exist: false,
//     };
//     let cohostIndex = allCohosts.findIndex(ch => ch.id == cohost.id);
//     if (cohostIndex > -1) {
//       cohostData.index = cohostIndex;
//       cohostData.cohost = allCohosts[cohostIndex];
//       cohostData.exist = true;
//     }
//     return cohostData;
//   };

//   @action
//   removeCohostIfExist(cohost) {
//     let allCohosts = this.cohosts();
//     let allCohostIndex = allCohosts.findIndex(ch => ch.id == cohost.id);
//     if (allCohostIndex > -1) {
//       allCohosts.splice(allCohostIndex, 1);
//       this._cohosts = allCohosts;
//     }
//   }
//   // Cohost
// }
