import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import ToastUtil from '../../constants/toast';
import AuthService from '../AuthService';
class FriendRequest {
  async sendRequest(id) {
    try {
      MobxStore.toggleLoader(true);
      const sendRequestResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.sendRequest + `/${id}`,
      );
      if (
        sendRequestResponse.status == 201 ||
        sendRequestResponse.status == 200
      ) {
        await AuthService.reloadUser();
        return Promise.resolve(sendRequestResponse.data);
      }
      throw {response: sendRequestResponse};
    } catch (error) {
      let msg = error?.response?.data?.message ?? 'Something went wrong';
      ToastUtil(msg);
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  }
  async unfriendUser(id) {
    try {
      MobxStore.toggleLoader(true);
      const unfriendUserResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.unFriend(id),
      );
      if (unfriendUserResponse.status != 201) {
        throw {respons: unfriendUserResponse};
      }
      await AuthService.reloadUser();
    } catch (error) {
      let msg =
        error?.message ??
        error?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  }
  async approveFriendRequest(id) {
    try {
      const approveFriendRequestResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.acceptRequest + `/${id}`,
      );
      if (
        approveFriendRequestResponse.status == 201 ||
        approveFriendRequestResponse.status == 200
      ) {
        return Promise.resolve(approveFriendRequestResponse.data);
      }
      throw {response: approveFriendRequestResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async cancelFriendRequest(id) {
    try {
      const cancelFriendRequestResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.cancelFriendRequest + `/${id}`,
      );
      if (
        cancelFriendRequestResponse.status == 201 ||
        cancelFriendRequestResponse.status == 200
      ) {
        return Promise.resolve(cancelFriendRequestResponse.data);
      }
      throw {response: cancelFriendRequestResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async denyFriendRequest(id) {
    try {
      const denyFriendRequestResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.denyFriendRequest + `/${id}`,
      );
      if (
        denyFriendRequestResponse.status == 201 ||
        denyFriendRequestResponse.status == 200
      ) {
        return Promise.resolve(denyFriendRequestResponse.data);
      }
      throw {response: denyFriendRequestResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getAllUser() {
    try {
      const allUserResponse = await ApiClient.authInstance.get(
        ApiClient.endPoints.getAllUser,
      );
      if (allUserResponse.status == 201 || allUserResponse.status == 200) {
        MobxStore.bounceUsersStore.setBounceUsers(allUserResponse.data);
        return Promise.resolve(allUserResponse.data);
      }
      throw {response: allUserResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getGuestUserParties(userId) {
    try {
      const response = await ApiClient.authInstance.get(
        ApiClient.endPoints.guestUserParties(userId),
      );
      if (response.status != 200) {
        throw {response};
      }

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getGuestUser(userId) {
    try {
      const response = await ApiClient.authInstance.get(
        ApiClient.endPoints.guestUser(userId),
      );
      if (response.status != 200) {
        throw {response};
      }

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getGuestUserCompleteData(userId) {
    try {
      MobxStore.toggleLoader(true);
      const guestUserData = await this.getGuestUser(userId);
      const guestUserPartyData = await this.getGuestUserParties(userId);
      return Promise.resolve({
        guestUserData,
        guestUserPartyData,
      });
    } catch (error) {
      console.log('getGuestUserCompleteData - ', error);
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  }

  async bounceWithFriends() {
    try {
      const bounceWithFriendsIds =
        MobxStore.bounceWithFriendsStore.selectedBounceUsers.data(true);
      const bwfDataRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.bounceWithFriends,
        {ids: bounceWithFriendsIds},
      );
      if (bwfDataRes.status != 201) {
        throw {response: bwfDataRes};
      }

      MobxStore.bounceWithFriendsStore.setBounceWithFriendsData(
        bwfDataRes.data,
      );
      return Promise.resolve(bwfDataRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async sendBounceWithFriendsNotifications() {
    try {
      const selectedBounceUsers =
        MobxStore.bounceWithFriendsStore.selectedBounceUsers.data();
      const bounceWithFriendsNotRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.bounceWithFriendNotification,
        {toUsers: JSON.parse(JSON.stringify(selectedBounceUsers))},
      );
      if (bounceWithFriendsNotRes.status != 201) {
        throw {response: bounceWithFriendsNotRes};
      }
      console.log(
        'BOUNCE_WITH_FRIEND_NOT_RES - ',
        bounceWithFriendsNotRes.data,
      );
      return Promise.resolve(bounceWithFriendsNotRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async editBounceWithFriendsNotifications(bwfData) {
    try {
      const editBounceWithFriendsNotRes = await ApiClient.authInstance.post(
        ApiClient.endPoints.editBounceWithFriendNotification(bwfData.id),
        {},
      );
      if (editBounceWithFriendsNotRes.status != 201) {
        throw {response: editBounceWithFriendsNotRes};
      }
      return Promise.resolve(editBounceWithFriendsNotRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  toggleBlockUser = async userId => {
    try {
      const response = await ApiClient.authInstance.post(
        ApiClient.endPoints.toggleBlock(userId),
      );
      if (response.status != 201) {
        throw {response};
      }
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new FriendRequest();
