import HireVendorStrore from '../../../Screens/BounceVendors/PlanParty/ChooseVendor/HIreVendorStore';
import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import {AppNotificationService, NotificationService} from '..';
import ToastUtil from '../../constants/toast';
import HostViewModel from '../../../Screens/BounceVendors/PlanParty/HostView/HostViewModel';

class VendorService {
  getVendorsByCategory = async () => {
    try {
      const vendorCategoryResponse = await ApiClient.authInstance.get(
        ApiClient.endPoints.vendorList,
      );
      if (vendorCategoryResponse.status != 200) {
        throw {response: vendorCategoryResponse};
      }
      return Promise.resolve(vendorCategoryResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setVendorByCategory = async () => {
    try {
      MobxStore.toggleLoader(true);
      const vendorsByCategory = await this.getVendorsByCategory();
      HireVendorStrore.getInstance().setVendorsByCategory(vendorsByCategory);
      return Promise.resolve(vendorsByCategory);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  toggleFavVendor = async vendorId => {
    try {
      const vendorFavResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.vendorFavourite(vendorId),
      );
      if (vendorFavResponse.status == 201) {
        return Promise.resolve(vendorFavResponse);
      }
      throw {response: vendorFavResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  };
  setToggleFavVendor = async vendorId => {
    try {
      MobxStore.toggleLoader(true);
      const toggleFavVendor = await this.toggleFavVendor(vendorId);
      //await VendorService.setVendorByCategory();
      await this.setFavoritesVendor();
      return Promise.resolve(true);
    } catch (error) {
      ToastUtil(
        error?.message ??
          error?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
      return Promise.reject();
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  vendorFilter = async (body = {}) => {
    try {
      const vendorFilterResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.vendorFilter,
        body,
      );
      if (vendorFilterResponse.status != 201) {
        throw {response: vendorFilterResponse};
      }
      return Promise.resolve(vendorFilterResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  hireVendorRequestByHost = async (vendorIds = [], partyId = 1) => {
    try {
      const hireVendorReq = await ApiClient.authInstance.post(
        ApiClient.endPoints.hireVendorRequest,
        {
          vendorIds,
          partyId,
        },
      );
      if (hireVendorReq.status != 201) {
        throw {response: hireVendorReq};
      }
      return Promise.resolve(hireVendorReq.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  hireVendorByHost = async (vendorId, partyId = 1) => {
    try {
      const hireVendorReq = await ApiClient.authInstance.post(
        ApiClient.endPoints.approvedRequestByHost(partyId),
        {vendorId},
      );
      if (hireVendorReq.status != 201) {
        throw {response: hireVendorReq};
      }
      return Promise.resolve(hireVendorReq.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  cancelHireVendorByHost = async (vendorId, partyId = 1) => {
    try {
      const hireVendorReq = await ApiClient.authInstance.post(
        ApiClient.endPoints.cancelHireVendorByHost(partyId),
        {vendorId},
      );
      if (hireVendorReq.status != 201) {
        throw {response: hireVendorReq};
      }
      return Promise.resolve(hireVendorReq.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  cancelHireRequestsByHost = async (vendorId, partyId) => {
    try {
      console.log('CANCEL_HIRE_REQUEST - ', vendorId, partyId);
      const res = await ApiClient.authInstance.post(
        ApiClient.endPoints.cancelHireRequest,
        {
          vendorId,
          partyId,
        },
      );
      if (res.status != 201) {
        throw {response: res};
      }
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  acceptHireVendorRequestByVendor = async partyId => {
    try {
      const hireVendorReq = await ApiClient.authInstance.post(
        ApiClient.endPoints.acceptHireVendorRequestByVendor(partyId),
      );
      if (hireVendorReq.status != 201) {
        throw {response: hireVendorReq};
      }
      return Promise.resolve(hireVendorReq.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  denyHireVendorRequestByVendor = async partyId => {
    try {
      const denyVendorReq = await ApiClient.authInstance.post(
        ApiClient.endPoints.denyHireVendorRequestByVendor(partyId),
      );
      if (denyVendorReq.status != 201) {
        throw {response: denyVendorReq};
      }
      return Promise.resolve(denyVendorReq.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  cohostRequestToHireVendorToHost = async (vendorId, partyId) => {
    try {
      const res = await ApiClient.authInstance.post(
        ApiClient.endPoints.cohostRequestToHireHost(partyId),
        {vendorId},
      );

      if (res.status != 201) {
        throw {response: res};
      }
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getVendorByIdAndPartyId = async (vendorId, partyId) => {
    try {
      const res = await ApiClient.authInstance.post(
        ApiClient.endPoints.getVendorByIdAndPartyId,
        {vendorId, partyId},
      );
      if (res.status != 201) {
        throw {response: res};
      }
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getFavoritesVendor = async () => {
    try {
      const favVendors = await ApiClient.authInstance.get(
        ApiClient.endPoints.vendorFavorites,
      );
      if (favVendors.status != 200) {
        throw {response: favVendors};
      }
      return Promise.resolve(favVendors.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setFavoritesVendor = async (showLoader = true) => {
    try {
      showLoader && MobxStore.toggleLoader(true);
      const favVendors = await this.getFavoritesVendor();
      HireVendorStrore.getInstance().setFavoriteVendors(favVendors);
      return Promise.resolve(favVendors);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      showLoader && MobxStore.toggleLoader(false);
    }
  };

  removeHireVendorNotifications = async (path = '') => {
    try {
      const res = await ApiClient.authInstance.post('/vendor/' + path);
      console.log('REMOVE_NOT_RES - ', res.data, res.status);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  onRemoveHireVendorNotifications = async (path = '', forVendor = false) => {
    try {
      MobxStore.toggleLoader(true);
      const res = await this.removeHireVendorNotifications(path);
      if (forVendor) {
        await AppNotificationService.getVendorNotification();
      } else {
        await AppNotificationService.getUserNotification();
      }
    } catch (error) {
      ToastUtil(
        error?.message ??
          error?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  getHiredorRequestedVendors = async partyId => {
    try {
      const hiredReqRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.vendorHiredOrRequested(partyId),
      );
      if (hiredReqRes.status != 200) {
        throw {response: hiredReqRes};
      }
      return Promise.resolve(hiredReqRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setHiredorRequestedVendors = async (partyId = null) => {
    try {
      if (!partyId) {
        partyId = HostViewModel.instance().currentParty.id;
      }

      const hiredReqVendors = await this.getHiredorRequestedVendors(partyId);
      HireVendorStrore.getInstance().setRequestedOrHiredVendors(
        hiredReqVendors,
      );

      return Promise.resolve(hiredReqVendors);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getRatingAndReviewVendors = async partyId => {
    try {
      const rateRevRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.ratingAndReviewVendors(partyId),
      );
      if (rateRevRes.status != 200) {
        throw {response: hiredReqRes};
      }
      return Promise.resolve(rateRevRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  setRatingAndReviewVendors = async (partyId = null) => {
    try {
      if (!partyId) {
        partyId = HostViewModel.instance().currentParty.id;
      }

      const rateAndRevVendors = await this.getRatingAndReviewVendors(partyId);
      HireVendorStrore.getInstance().setRatingAndReviewVendors(
        rateAndRevVendors,
      );

      return Promise.resolve(rateAndRevVendors);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  removeMedia = async image => {
    try {
      const removeMediaRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.removeMediaImg,
        {image},
      );
      if (removeMediaRes.status != 201) {
        throw {response: removeMediaRes};
      }
      return Promise.resolve(removeMediaRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getHiredVendorParties = async () => {
    try {
      const res = await ApiClient.authInstance.get(
        ApiClient.endPoints.hiredVendorParties,
      );
      if (res.status != 200) {
        throw {response: res};
      }
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  hostToVendorRating = async (body = {}) => {
    try {
      const res = await ApiClient.authInstance.post(
        ApiClient.endPoints.hostToVendorRating,
        body,
      );
      if (res.status != 201) {
        throw {response: res};
      }
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  toggleFavVendorAndSetVendorFav = async vendorId => {
    try {
      MobxStore.toggleLoader(true);
      const toggleFavVendor = await this.toggleFavVendor(vendorId);
      //await VendorService.setVendorByCategory();
      await this.setFavoritesVendor();
    } catch (error) {
      ToastUtil(
        error?.message ??
          error?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  removeCohostVendorRatingNotification = async recordId => {
    try {
      const removeRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.removeCohostVendorRatingNotification(recordId),
      );
      if (removeRes.status != 201) {
        throw {response: removeRes};
      }
      return Promise.resolve(removeRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  removeRatingNotification = async id => {
    try {
      MobxStore.toggleLoader(true);
      const response = await ApiClient.authInstance.post(
        ApiClient.endPoints.removeRatingNotification(id),
      );
      if (response.status != 201) {
        throw {response};
      }
      await AppNotificationService.getVendorNotification();
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      ToastUtil('Something went wrong! Try Again');
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  vendorScanQr = async (partyId, token) => {
    try {
      const response = await ApiClient.authInstance.post(
        ApiClient.endPoints.vendorScanQr(partyId),
        {
          token,
        },
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

export default new VendorService();
