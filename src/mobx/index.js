import OrientationStore from './Stores/OrientationStore';
import AuthStore from './Stores/AuthStore';
import AppStore from './Stores/AppStore';
import UIStore from './Stores/UiStore';
import PartyStore from './Stores/PartyStore';
import TagStore from './Stores/TagStore';
import InterestedParty from './Stores/InterestedParty';
import SearchEvents from './Stores/SearchEvents';
import SocialStore from './Stores/SocialStore';
import DeviceContactsStore from './Stores/DeviceContactsStore';
import NotificationsStore from './Stores/NotificationsStore';
import BounceWithFriendsStore from './Stores/BounceWithFriendsStore';
import GuestUserStore from './Stores/GuestUserStore';
import BounceUsersStore from './Stores/BounceUsersStore';
import PopupStore from './Stores/PopupStore';
import VendorNotificationStore from './Stores/VendorNotificationStore';
class MobxStore {
  constructor(props) {
    this.authStore = new AuthStore(this);
    this.orientationStore = new OrientationStore(this);
    this.appStore = new AppStore(this);
    this.uiStore = new UIStore(this);
    this.partyStore = new PartyStore(this);
    this.tagStore = new TagStore(this);
    this.interestedParty = new InterestedParty(this);
    this.searchEvents = new SearchEvents(this);
    this.socialStore = new SocialStore(this);
    this.deviceContactsStore = new DeviceContactsStore();
    this.notificationsStore = new NotificationsStore();
    this.bounceWithFriendsStore = new BounceWithFriendsStore(this);
    this.guestUserStore = new GuestUserStore();
    this.bounceUsersStore = new BounceUsersStore(this);
    this.popupStore = new PopupStore();
    this.vendorNotificationStore = new VendorNotificationStore();
  }
  toggleLoader(flag) {
    this.appStore.toogleLoader(flag);
  }
}
export default new MobxStore();
