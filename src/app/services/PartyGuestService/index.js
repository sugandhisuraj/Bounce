import ApiClient from '../ApiClient';

import MobxStore from '../../../mobx';
import ToastUtil from '../../constants/toast';

class PartyGuestService {
  getGuestLists = async () => {
    try {
      MobxStore.toggleLoader(true);
      const guestListResponse = await ApiClient.authInstance.get(
        ApiClient.endPoints.getGuestLists,
      );
      if (guestListResponse.status != 200) {
        throw {response: guestListResponse};
      }
      return Promise.resolve(guestListResponse.data);
    } catch (error) {
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  addGuestsInGuestList = async (guestListId, guests) => {
    try { 
      const addResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.addGuestsInGuestList(guestListId),
        {guests},
      );
      if (addResponse.status != 201) {
        throw {response: addResponse};
      }
      return Promise.resolve(addResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  editGuestsInGuestList = async (guestListId, guests) => {
    try {
      const editResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.editGuestsInGuestList(guestListId),
        {guests},
      );
      if (editResponse.status != 201) {
        throw {response: editResponse};
      }
      return Promise.resolve(editResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new PartyGuestService();
