import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Platform } from 'react-native';

class DeeplinkingURLSchema {
  baseUrlSchema = 'bounceapp://';
  baseUrl = `https://bounceeventapp-deeplink.com/`;
  routingURL = {
    bounceparty: 'bounceparty', // bounceapp://bounceparty/suraj1/6
    bounceprofile: 'bounceprofile', //bounceapp://bounceprofile/suraj1/1
  };
  createPartyLinkURL = async (partyId) => {
    let url = `${this.baseUrl}?route=${this.routingURL.bounceparty}&partyid=${partyId}`;
    const returnUrl = await this.buildLink(url);
    return returnUrl;
  };

  createProfileLinkURL = async (profileId) => {
    let url = `${this.baseUrl}?route=${this.routingURL.bounceprofile}&profileid=${profileId}`;
    const returnUrl = await this.buildLink(url);
    return returnUrl;
  };
  async buildLink(linkToBeCreate) {
      try {
        const buildLink = Platform.select({
          ios: this.buildIOSLink,
          android: this.buildAndroidLink,
        })
        const link = await buildLink(linkToBeCreate);
        console.log("ACT_LINK - ", link);

        return Promise.resolve(link);
      }catch(e) {
        return Promise.reject(e);
      }
  }
  async buildIOSLink(linkToBeCreate){
    try {
      const link = await dynamicLinks().buildShortLink({
        link: linkToBeCreate,
        domainUriPrefix: 'https://bounceeventapp.page.link',
        
        ios: {
          bundleId: 'com.bounce.apps',
          appStoreId: '1572622963',
        },
        android: {
          packageName: "com.bounce.apps",
        },
      });

      return Promise.resolve(link);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async buildAndroidLink(linkToBeCreate){
    try {
      const link  = await dynamicLinks().buildLink({
        link: linkToBeCreate,
        domainUriPrefix: 'https://bounceeventapp.page.link',
        android: {
          packageName: "com.bounce.apps",
        }
      });
      return Promise.resolve(link);
    }catch(e) {
      return Promise.reject(e);
    }
  }
}

export default DeeplinkingURLSchema;
//Hey Suraj check out David's profile on Bounce -: https://bounceeventapp.page.link/AuDiPut65WWuqYU28