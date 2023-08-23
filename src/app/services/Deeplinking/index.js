import dynamicLinks from '@react-native-firebase/dynamic-links';
import qs from 'query-string';

import PartyService from '../Party';
import DeeplinkingURLSchema from './DeeplinkingURLSchema';
import NavigationService from '../../../navigation/NavigationService';
import GuestProfile from '../../../Screens/BounceUsers/Profile/GuestProfile';

class Deeplinking extends DeeplinkingURLSchema {
  isSubscribed = false;
  onLinkUnsubscribe = null;
  async listenForDeepLink() {
    const initialLink = await dynamicLinks().getInitialLink();
    console.log("ON_INITIAL_TEST - ", JSON.stringify(initialLink));
    if (initialLink != null && initialLink.url) {
      this.processRouting(initialLink.url);
    }
    this.subscribeForLinks();
  }
  async processRouting(initialURL) {
    try {
      const {query, url} = qs.parseUrl(initialURL);
      console.log(
        'PROCESSING_DEEP_LINK_ROUTE - ',
        JSON.stringify({query, url}),
      );
      if (Object.keys(query).length == 0) {
        return;
      }
      if (query?.route == this.routingURL.bounceparty) {
        this.onBouncePartyShare(query);
      }
      if (query?.route == this.routingURL.bounceprofile) {
        this.onBounceProfileShare(query);
      }
    } catch (e) {
      return null;
    }
  }

  onBouncePartyShare = routingDetails => {
    try {
      PartyService.navigationToEventPageOrNewsFeed({
        id: routingDetails.partyid,
      });
    } catch (e) {}
  };
  onBounceProfileShare = routingDetails => {
    try {
      NavigationService.navigate(GuestProfile.routeName, {
        guestUser: {id: routingDetails.profileid},
      });
    } catch (e) {}
  };
  subscribeForLinks() {
    if (this.isSubscribed) {
      return;
    }
    this.onLinkUnsubscribe = dynamicLinks().onLink(link => {
      console.log('ON_LINK_APP - ', link);
      if (link == null || link?.url == null) {
        return;
      }
      this.processRouting(link.url);
    });
    this.isSubscribed = true;
  }
}
export default Object.freeze(new Deeplinking());
