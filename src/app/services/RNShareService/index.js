import {Platform} from 'react-native';
import Share from 'react-native-share';
import MobxStore from '../../../mobx';
import DeeplinkingService from '../Deeplinking';

const STORE_LINK = Platform.select({
  android: `https://play.google.com/store/apps/details?id=com.bounce.apps`,
  ios: `https://apps.apple.com/us/app/bounce-events/id1572622963`,
});
class MessageTemplates {
  inviteToEventTemplate = (eventTitle, eventHost, eventURL) => {
    return `
    You’ve been invited to ${eventTitle} hosted by ${eventHost}. 
    Click the link below to attend!
    Link to download Bounce - 
    ${STORE_LINK}
    Visit the Event - 
    ${eventURL}
    `;
  };

  inviteToBounceAppForContact = userName => {
    return `
    ${userName} wants to be your friend on Bounce.
    Accept friend request:
    ${STORE_LINK}
    `;
  };

  shareBounceUserProfileTemplate = (
    inviteeName,
    invitationDetails,
    profileLink,
  ) => {
    return `
    Hey ${inviteeName} check out ${invitationDetails.username}'s profile on Bounce - 
    ${profileLink}
    `;
  };
}
class RNShareService extends MessageTemplates {
  async share() {
    const shareOptions = {
      message:
        'Hi' +
        ` ${'Suraj'} I’m interested in hiring you for my upcoming event, *(Event Title)* \n Date - Saturday, October 3rd \n Time - 9:00pm \n Location - 8990 Durango Dr., Las Vegas, NV, 89134 \n Click Here to view the event page- www.google.com`,
      // excludedActivityTypes:[
      //     {
      //         // FACEBOOK: NativeModules.RNShare.FACEBOOK || 'facebook',
      //         // FACEBOOK_STORIES: NativeModules.RNShare.FACEBOOK_STORIES || 'facebook-stories',
      //         // PAGESMANAGER: NativeModules.RNShare.PAGESMANAGER || 'pagesmanager',
      //         // TWITTER: NativeModules.RNShare.TWITTER || 'twitter',
      //         // WHATSAPP: NativeModules.RNShare.WHATSAPP || 'whatsapp',
      //         // INSTAGRAM: NativeModules.RNShare.INSTAGRAM || 'instagram',
      //         // INSTAGRAM_STORIES: NativeModules.RNShare.INSTAGRAM_STORIES || 'instagram-stories',
      //         // GOOGLEPLUS: NativeModules.RNShare.GOOGLEPLUS || 'googleplus',
      //         // EMAIL: NativeModules.RNShare.EMAIL || 'email',
      //         // PINTEREST: NativeModules.RNShare.PINTEREST || 'pinterest',
      //         // LINKEDIN: NativeModules.RNShare.LINKEDIN || 'linkedin',
      //       }
      // ]
    };
    try {
      const response = await Share.open(shareOptions);
      console.log('Response', JSON.stringify(response));
    } catch (error) {
      console.log('ERROR', error);
    }
  }

  shareEvent = async partyData => {
    try {
      console.log('PART_ON_SHARE - ', JSON.stringify(partyData));
      const partyId = partyData?.id ?? 0;
      const partyTitle = partyData?.title ?? '';
      const partyCreatorFullName = partyData?.creator?.fullName ?? '';
      const partyCreatorUserName = partyData?.creator?.username ?? '';

      const eventDeeplinkURL = await DeeplinkingService.createPartyLinkURL(partyId);
      const message = this.inviteToEventTemplate(
        partyTitle,
        partyCreatorFullName,
        eventDeeplinkURL,
      );
      const shareOpt = {
        message,
      };
      const response = await Share.open(shareOpt);
      console.log('SHARE_EVENT_RESPONSE', JSON.stringify(response));
    } catch (error) {
      console.log('ERROR_SHARE_EVENT_1 - ', error);
    }
  };

  shareBounceToContacts = async () => {
    try {
      const message = this.inviteToBounceAppForContact(
        MobxStore.authStore.user.user.fullName,
      );
      const shareOpt = {
        message,
      };
      const response = await Share.open(shareOpt);
      console.log('SHARE_EVENT_RESPONSE', JSON.stringify(response));
    } catch (error) {
      console.log('ERROR_SHARE_EVENT_1 - ', error);
    }
  };

  shareBounceUserProfile = async (user, profile) => {
    try {
      const userProfileLink = await DeeplinkingService.createProfileLinkURL(
        profile.id,
      );
      const message = this.shareBounceUserProfileTemplate(
        user.fullName,
        profile,
        userProfileLink,
      );
      const shareOpt = {
        message,
      };
      const response = await Share.open(shareOpt);
      console.log('SHARE_PROFILE_RESPONSE', JSON.stringify(response));
    } catch (e) {
      console.log('ERROR_BOUNCE_PROFILE - ', e);
    }
  };
}

export default new RNShareService();
