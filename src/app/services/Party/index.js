import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import CreateFormData from '../FormData';
import {NotificationPartyInvite, TagCategory} from '../../Entities';
import HostViewModel from '../../../Screens/BounceVendors/PlanParty/HostView/HostViewModel';
import {Toast} from '../../constants';
import ToastUtil from '../../constants/toast';
import AuthService from '../AuthService';
import NavigationService from '../../../navigation/NavigationService';
import HostView from '../../../Screens/BounceVendors/PlanParty/HostView';
import ConditionalRenderNewsFeed from '../../../Screens/BounceUsers/NewsFeed/ConditionalRenderNewsFeed';
import {wait} from '../../utils';

class PartyService {
  isIAMCreator = party => {
    return MobxStore.authStore.user.user.id == party.creator.id;
  };
  createOrUpdateParty = async (partyFields, partyID = undefined) => {
    try {
      const formData = CreateFormData.objectToFormData(partyFields);
      let endPoint = ApiClient.endPoints.party;
      if (partyID) {
        formData.append('isTagsUpdated', true);
        endPoint = endPoint.concat('/' + partyID);
      }
      console.log(
        'JSON_PARTY_FORM_DATA_edit_check_22 - ',
        JSON.stringify(formData),
      );
      //return false;
      MobxStore.appStore.toogleLoader(true);
      const createPartyRes = await ApiClient.authInstance.post(
        endPoint,
        formData,
        ApiClient.formDataHeaders(),
      );
      console.log('CREATE_PARTY_STATUS - ', createPartyRes.status);
      console.log('CREATE_PARTY_RESPONSE - ', createPartyRes.data);
      this.getParty();
      return Promise.resolve(createPartyRes);
    } catch (error) {
      console.log('CREATE_PARTY_ERROR_STATUS - ', error.response.status);
      console.log('CREATE_PARTY_ERROR - ', error.response.data);
      return Promise.reject(error);
    } finally {
      MobxStore.appStore.toogleLoader(false);
    }
  };

  getParty = async () => {
    try {
      MobxStore.partyStore.onLoadParty();
      const parties = await ApiClient.authInstance.get(
        ApiClient.endPoints.party,
        ApiClient.applicationJSONHeader(false),
      );
      MobxStore.partyStore.setParty(parties.data);
      return Promise.resolve(parties.data);
    } catch (error) {
      MobxStore.partyStore.onLoadParty(false);
      return Promise.reject(error);
    }
  };

  getTags = async () => {
    try {
      const TagsRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.tags,
      );
      if (TagsRes.status != 200) {
        throw {response: TagsRes};
      }
      let tagDto = [];
      TagsRes.data.map(tag => {
        tagDto.push(TagCategory.fromJSON(tag));
      });
      MobxStore.tagStore.setTags(tagDto);
      return Promise.resolve(tagDto);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getNewsFeed = async (
    filterBody = {},
    showLoader = true,
    assignToMobxStore = true,
  ) => {
    try {
      showLoader && MobxStore.toggleLoader(true);
      const newsFeedRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.tagWiseNewsFeed,
        filterBody,
      );
      if (newsFeedRes.status == 201) {
        if (assignToMobxStore) {
          MobxStore.interestedParty.addNewsFeeds(newsFeedRes.data);
        }
        return Promise.resolve(newsFeedRes.data);
      } else {
        throw {response: newsFeedRes};
      }
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
      return Promise.reject(error);
    } finally {
      showLoader && MobxStore.toggleLoader(false);
    }
  };

  getAllPublicParties = async () => {
    try {
      const publicPartyRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.getPublicParties,
      );
      if (publicPartyRes.status != 200) {
        throw {response: publicPartyRes};
      }
      MobxStore.interestedParty.setPublicParties(publicPartyRes.data);
      return Promise.resolve(publicPartyRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  searchEvents = async (body = {}) => {
    try {
      const searchPartyRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.filtersEvents,
        body,
      );
      if (searchPartyRes.status != 201) {
        throw {response: searchPartyRes};
      }
      MobxStore.searchEvents.setSearchEvents(searchPartyRes.data);
      return Promise.resolve(searchPartyRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  addBookMark = async partyId => {
    try {
      const addBookMarkRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.addBookMark(partyId),
      );
      if (addBookMarkRes.status != 201 && addBookMarkRes.status != 200) {
        throw {response: addBookMarkRes};
      }
      return Promise.resolve(addBookMarkRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getPartyById = async partyId => {
    try {
      const party = await ApiClient.authInstance.get(
        ApiClient.endPoints.getPartyById(partyId),
      );
      if (party.status == 200) {
        return Promise.resolve(party.data);
      }
      throw {response: party};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  addPartyHost = async (partyId, userIds = []) => {
    try {
      console.log('COHOST_+BOD - ', userIds);
      const addHostRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.addHosts(partyId),
        {userIds},
      );
      if (addHostRes.status == 201) {
        return Promise.resolve(addHostRes.data);
      }
      throw {response: addHostRes};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  sendPartyInvites = async (
    invitedBounceUser,
    invitedUsersPhones = [],
    partyId,
  ) => {
    const body = {
      invitedBounceUser,
      invitedUsersPhones,
      partyId,
    };

    console.log('SEND_PARTY_INVITE_BODY_1 - ', JSON.stringify(body));
    try {
      const inviteResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.partyInvite,
        body,
      );
      if (inviteResponse.status == 201) {
        return Promise.resolve(inviteResponse.data);
      }
      throw {response: inviteResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getNotification = async () => {};

  acceptCohostInvite = async (partyId, invitedBy) => {
    try {
      console.log('INVITED_BY - ', JSON.stringify(invitedBy));
      const acceptCohost = await ApiClient.authInstance.post(
        ApiClient.endPoints.acceptCohost(partyId),
        {invitedBy},
      );
      if (acceptCohost.status == 201) {
        return Promise.resolve(acceptCohost.data);
      }
      throw {response: acceptCohost};
    } catch (error) {
      return Promise.reject(error);
    }
  };
  denyCohostInvite = async partyId => {
    try {
      const denyCohost = await ApiClient.authInstance.post(
        ApiClient.endPoints.denyCohost(partyId),
      );
      if (denyCohost.status == 201) {
        return Promise.resolve(denyCohost.data);
      }
      throw {response: denyCohost};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  partyToggleGo = async partyId => {
    try {
      const toggleRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.toggleGoing(partyId),
      );
      if (toggleRes.status == 201) {
        return Promise.resolve(toggleRes.data);
      }
      throw {response: toggleRes};
    } catch (error) {
      return Promise.reject(error);
    }
  };
  partyToggleCantGo = async partyId => {
    try {
      const toggleRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.toggleCantGo(partyId),
      );
      if (toggleRes.status == 201) {
        return Promise.resolve(toggleRes.data);
      }
      throw {response: toggleRes};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  loadCurrentParty = async (partyId = null) => {
    try {
      MobxStore.toggleLoader(true);
      const hostViewInstance = HostViewModel.instance();
      const currentParty = await this.getPartyById(
        partyId ?? hostViewInstance.currentParty.id,
      );
      hostViewInstance.setCurrentParty(currentParty);
      return Promise.resolve(currentParty);
    } catch (error) {
      let msg = error?.response?.data?.msg ?? 'Something went wrong!';
      Toast(msg);
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  addInterest = async (interest, headers = {}) => {
    try {
      let apiInstance = ApiClient.authInstance;
      if ('Authorization' in headers) {
        apiInstance = ApiClient.instance;
      }
      const addTagsResponse = await apiInstance.post(
        ApiClient.endPoints.addInterest,
        {interest},
        {headers},
      );
      if (addTagsResponse.status == 201 || addTagsResponse.status == 200) {
        return Promise.resolve(addTagsResponse.data);
      }
      throw {response: addTagsResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  addInterestController = async (shouldReloadNewsFeed = true) => {
    try {
      const {interestedParty} = MobxStore;
      if (interestedParty.interestedTags.getAllSubTags().length == 0) {
        ToastUtil('Add atleast 1 Interest');
        return Promise.resolve(false);
      }
      MobxStore.toggleLoader(true);
      const addTagResponse = await this.addInterest(
        interestedParty.interestedTags.tags,
      );

      await AuthService.reloadUser();
      if (shouldReloadNewsFeed) {
        await this.getNewsFeed();
      }
      return Promise.resolve(addTagResponse);
    } catch (error) {
      let msg =
        error?.response?.data?.message ??
        error?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  buyPartyTickets = async body => {
    try {
      const response = await ApiClient.authInstance.post(
        ApiClient.endPoints.buyTickets,
        body,
      );
      if (response.status != 201) {
        throw {response};
      }
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  navigationToEventPageOrNewsFeed = async party => {
    try {
      MobxStore.toggleLoader(true);
      const updatedParty = await this.getPartyById(party.id);
      const isHost = updatedParty?.isHost ?? false;
      const isPrivate = updatedParty?.isPrivate ?? false;
      if (isHost || isPrivate) {
        //If the Party is private or User is host or cohost of this party
        return NavigationService.navigate(HostView.routeName, {
          party,
        });
      }
      MobxStore.interestedParty.addTopOneNewsFeedEvent(updatedParty);
      await wait(500);
      NavigationService.navigate(ConditionalRenderNewsFeed.routeName, {
        loadInitialData: false,
      });
      return Promise.resolve(true);
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  onBuyPartyTickets = async params => {
    try {
      MobxStore.toggleLoader(true);
      const {tickets, partyId} = params;
      let paymentIntent = {id: 'TEST'};
      let paymentBody = {
        paymentDetails: {
          ...paymentIntent,
          tickets,
          partyId,
        },
      };
      const partyTicketRes = await this.buyPartyTickets(paymentBody);
      return Promise.resolve(partyTicketRes);
    } catch (error) {
      let msg = error.message ?? 'Something went wrong! Try Again';
      if (error?.error?.message) {
        msg = error.error.message;
      }
      ToastUtil(msg, {
        duration: 5000,
      });
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  deleteParty = async partyId => {
    try {
      const response = await ApiClient.authInstance.delete(
        ApiClient.endPoints.party + '/' + partyId,
      );

      if (response.status != 200) {
        throw {response};
      }
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

const planParty = new PartyService();
export default planParty;

/*

navigationToEventPageOrNewsFeed = async party => {
    try {
      const isHost = party?.isHost ?? false;
      const isPrivate = party?.isPrivate ?? false;

      //If the Party is private or User is host or cohost of this party

      if (isHost || isPrivate) {
        return NavigationService.navigate(HostView.routeName, {
          party,
        });
      }

      MobxStore.toggleLoader(true);
      const updatedParty = await this.getPartyById(party.id);
      // const newsFeedRes = await this.getNewsFeed(false, false);
      // const newsfeedParties = [];
      // newsFeedRes.map(newsfeed => {
      //   if (party.id != newsfeed.id) {
      //     newsfeedParties.push(newsfeed);
      //   }
      // });
      // newsfeedParties.unshift(updatedParty);
      MobxStore.interestedParty.addTopOneNewsFeedEvent(updatedParty);
      await wait(500);
      NavigationService.navigate(ConditionalRenderNewsFeed.routeName, {
        loadInitialData: false,
      });
      //return Promise.resolve(newsFeedRes.data);
      return Promise.resolve(true);
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  */
