import {action, computed, makeAutoObservable, observable} from 'mobx';
import {
  NotificationPartyInvite,
  NotificationCohostInvite,
} from '../../../app/Entities';
import {ListTiles} from '../../../components';
import {HostHireVendorRequest} from '../../../components/ListTiles';

class NotificationsStore {
  @observable notificationData = {};
  @observable partyInvites = [];
  @observable cohostInvites = [];

  //Notification Sections Wise
  @observable section1HostSideCohostRequests = []; // hostCohostHireVendorRequest, hostCohostHireVendor
  @observable section2HostCohostSideHireVendorRequests = [];
  @observable section3HostCohostRequestSent = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action
  initNotification = notificationData => {
    const {invites = [], partyHosts = []} = notificationData;

    //All PartyInvites
    let partyInvitesData = invites.map(invite => {
      return NotificationPartyInvite.fromJSON(invite);
    });

    //All Cohost Invites
    let cohostInvitesData = partyHosts.map(cohostInvite => {
      return NotificationCohostInvite.fromJSON(cohostInvite);
    });
    this.partyInvites = partyInvitesData;
    this.cohostInvites = cohostInvitesData;
    this.notificationData = notificationData;
    this.initSection2HostCohostSideHireVendorRequests();
    this.initSection1HostSideCohostRequests();
    this.initSection3HostCohostRequestSent();
  };

  @action
  initSection3HostCohostRequestSent = () => {
    let section3HostCohostRequestSent = [];
    const {
      cohostRecievedHireRequestByHost = [],
      hostHireVendorAccepted = [],
      hostHireVendorDenied = [],
      cohostVendorHireSuccess = [],
    } = this.notificationData;

    cohostRecievedHireRequestByHost.forEach(i => {
      section3HostCohostRequestSent.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostRecievedHireVendorRequestByHost',
          TIleProp: {
            mode: ListTiles.HostCohostRecievedHireVendorRequestByHost.mode
              .forCohost,
          },
        },
      });
    });

    hostHireVendorAccepted.forEach(i => {
      section3HostCohostRequestSent.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostHireVendorAcceptOrDenied',
          TIleProp: {
            mode: ListTiles.HostCohostHireVendorAcceptOrDenied.modes
              .AcceptedHireRequest,
          },
        },
      });
    });

    hostHireVendorDenied.forEach(i => {
      section3HostCohostRequestSent.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostHireVendorAcceptOrDenied',
          TIleProp: {
            mode: ListTiles.HostCohostHireVendorAcceptOrDenied.modes
              .DeniedHireRequest,
          },
        },
      });
    });

    cohostVendorHireSuccess.forEach(i => {
      section3HostCohostRequestSent.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostRecievedHireVendorRequestByHost',
          TIleProp: {
            mode: ListTiles.HostCohostRecievedHireVendorRequestByHost.mode
              .forHostHiredThisVendor,
          },
        },
      });
    });

    this.section3HostCohostRequestSent = section3HostCohostRequestSent;
  };
  @action
  initSection2HostCohostSideHireVendorRequests = () => {
    let section2HostCohostSideHireVendorRequests = [];
    const {
      hireVendorRequests = [],
      cancelHireVendorRequests = [],
      cohostRequestToHireVendor = [],
    } = this.notificationData;

    hireVendorRequests.forEach(i => {
      section2HostCohostSideHireVendorRequests.push({
        ...i,
        reactProps: {
          Tile: 'HostHireVendorRequest',
          TIleProp: {
            mode: HostHireVendorRequest.modes.ForHireVendor,
          },
        },
      });
    });
    cancelHireVendorRequests.forEach(i => {
      section2HostCohostSideHireVendorRequests.push({
        ...i,
        reactProps: {
          Tile: 'HostHireVendorRequest',
          TIleProp: {
            mode: HostHireVendorRequest.modes.ForCancelHireVendor,
          },
        },
      });
    });
    cohostRequestToHireVendor.forEach(i => {
      section2HostCohostSideHireVendorRequests.push({
        ...i,
        reactProps: {
          Tile: 'CohostRequestToHireVendorToHost',
          TIleProp: {},
        },
      });
    });
    this.section2HostCohostSideHireVendorRequests =
      section2HostCohostSideHireVendorRequests;
  };
  @action
  initSection1HostSideCohostRequests = () => {
    const {hostCohostHireVendorRequest = [], hostCohostHireVendor = []} =
      this.notificationData;
    let section1HostSideCohostRequests = [];
    hostCohostHireVendorRequest.forEach(i => {
      section1HostSideCohostRequests.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostRecievedHireVendorRequestByHost',
          TIleProp: {
            mode: ListTiles.HostCohostRecievedHireVendorRequestByHost.mode
              .forHost,
          },
        },
      });
    });
    //
    hostCohostHireVendor.forEach(i => {
      section1HostSideCohostRequests.push({
        ...i,
        reactProps: {
          Tile: 'HostCohostHireVendorRequest',
          TIleProp: {},
        },
      });
    });
    this.section1HostSideCohostRequests = section1HostSideCohostRequests;
  };
  @action
  isHireVendorRequestExist = (partyId, vendorId) => {
    const {hireVendorRequests = []} = this.notificationData;
    let isRequestExist = false;

    for (let i = 0; i < hireVendorRequests.length; i++) {
      let currentTuple = hireVendorRequests[i];
      if (
        currentTuple.vendor.id == vendorId &&
        currentTuple.party.id == partyId
      ) {
        isRequestExist = true;
        break;
      }
    }
    return isRequestExist;
  };

  getNotificationCounts = () => {
    let count = 0;
    NOTIFICATION_RES_KEYS.map((nKeys) => {
      if(this.notificationData[nKeys] && this.notificationData[nKeys]?.length) {
        count += this.notificationData[nKeys]?.length;
      }
    })
  return count;
  }
  
}

export default NotificationsStore;

const NOTIFICATION_RES_KEYS = [
  'bounceWithFriend',
  'cancelHireVendorRequests',
  'cohostRecievedHireRequestByHost',
  'cohostRequestToHireVendor',
  'cohostVendorHireSuccess',
  'creatorCohostratingNotification',
  'hireVendorRequests',
  'hostCohostHireVendor',
  'hostCohostHireVendorRequest',
  'hostHireVendorAccepted',
  'hostHireVendorDenied',
  'invites',
  'partyHosts',
];
