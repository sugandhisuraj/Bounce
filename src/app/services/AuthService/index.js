import { Platform } from 'react-native';
import { checkVersion } from 'react-native-check-version';
import RNDeviceInfo from 'react-native-device-info';
import AppJSON from '../../../../app.json';
import MobxStore from '../../../mobx';
import { User } from '../../Entities';
import ToastUtil from '../../constants/toast';
import AccountService from '../AccountService';
import ApiClient from '../ApiClient';

class AuthService {
  constructor() {}

  signupUser = async userFormData => {
    try {
      const signupUserResponse = await ApiClient.instance.post(
        ApiClient.endPoints.userRegister,
        userFormData,
      );
      if (signupUserResponse.status != 201) {
        throw {response: signupUserResponse};
      }
      return Promise.resolve(signupUserResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  singin = async (username, password) => {
    try {
      let body = {
        username: username,
        password: password,
      };
      const userLoginRes = await ApiClient.instance.post(
        ApiClient.endPoints.postUserLogin,
        body,
      );

      if (userLoginRes.status != 201) {
        throw {response: userLoginRes};
      }
      userLoginRes.data.accessToken = userLoginRes.data.token;
      return this.onUserAuthenticated(userLoginRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  getUserByToken = async token => {
    try {
      const userResponse = await ApiClient.instance.get(
        ApiClient.endPoints.getUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (userResponse.status != 200) {
        throw {response: userResponse};
      }
      return Promise.resolve(userResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  onUserAuthenticated = userData => {
    let user = new User.fromJSON(userData);
    user.serialize();
    MobxStore.authStore.setUser(user);
    AccountService.add(user);
    return user;
  };
  autoLogin = async () => {
    let deserializedUser;
    try {
      deserializedUser = await User.deserialize();
      const userResponse = await this.getUserByToken(deserializedUser.token);
      deserializedUser.setUser(userResponse);
      deserializedUser.serialize();
      MobxStore.authStore.onAutoLogin(deserializedUser);
      AccountService.add(deserializedUser);
      return deserializedUser;
    } catch (error) {
      console.log('AUTO_LOGIN_ERR - ', error);
      if (deserializedUser) {
        deserializedUser.clear();
      }
      MobxStore.authStore.setIsAutoLoginDone(true);
    }
  };

  reloadUser = async () => {
    try {
      const currentUser = MobxStore.authStore.user;
      const userData = await this.getUserByToken(currentUser.token);
      currentUser.setUser(userData);
      let deepClone = JSON.parse(JSON.stringify(currentUser));
      return this.onUserAuthenticated(deepClone);
    } catch (error) {
      console.log('ERROR_RELOAD_USEr - ', error);
      let msg =
        error?.message ??
        error?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    }
  };
  getCountryCode = async () => {
    try {
      const countryCodeResponse = await ApiClient.authInstance.get(
        ApiClient.endPoints.countryCode,
      );
      if (countryCodeResponse.status == 200) {
        MobxStore.appStore.setCountryCodes(countryCodeResponse.data);
        return Promise.resolve(countryCodeResponse.data);
      }
      throw {response: countryCodeResponse};
    } catch (error) {
      return Promise.reject(error);
    }
  };

  sendAuthOtp = async mobileNo => {
    try {
      const sendOtpRes = await ApiClient.instance.post(
        ApiClient.endPoints.authSendOtp,
        {
          mobileNo,
        },
      );
      if (sendOtpRes.status != 201) {
        throw {response: sendOtpRes};
      }
      return Promise.resolve(sendOtpRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  validateUser = async (body = {}) => {
    try {
      const validateUserRes = await ApiClient.instance.post(
        ApiClient.endPoints.validateUser,
        body,
      );
      if (validateUserRes.status != 201) {
        throw {response: validateUserRes};
      }
      return Promise.resolve(validateUserRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchVendorSignupData = async () => {
    try {
      let vendorSignupDataRes = await ApiClient.instance.get(
        ApiClient.endPoints.vendorSignupData,
      );
      if (vendorSignupDataRes.status != 200) {
        throw {response: vendorSignupDataRes};
      }
      return Promise.resolve(vendorSignupDataRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  fetchLanguagesData = async () => {
    try {
      let response = await ApiClient.instance.get(
        ApiClient.endPoints.getLanguage,
      );
      if (response.status != 200) {
        throw {response};
      }
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getUsersByPhoneNumber = async phoneNumber => {
    try {
      const response = await ApiClient.instance.post(
        ApiClient.endPoints.getUsersByPhoneNumber,
        {
          phoneNumber,
        },
      );
      if (response.status != 201) {
        throw {response};
      }
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  resetPassword = async (userId, password) => {
    try {
      const resetPassRes = await ApiClient.instance.post(
        ApiClient.endPoints.resetPassword,
        {userId, password},
      );
      if (resetPassRes.status != 201) {
        throw {response: resetPassRes};
      }
      return Promise.resolve(resetPassRes.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  isAppNeedsToBeUpdate = async () => {
    let shouldUpdate = false;
    if (Platform.OS == 'android') {
      const playStoreAppVersion = await checkVersion();
      const currentAppVersion = await RNDeviceInfo.getVersion();
       
      if (Number(playStoreAppVersion.version) > Number(currentAppVersion)) {
        shouldUpdate = true;
      }
    } else {
      const appStoreAppVersion = await checkVersion({
        currentVersion: AppJSON.iosAppStoreVersion
      });
      console.log('APP_ST - ', appStoreAppVersion);
      if (appStoreAppVersion.needsUpdate) {
        shouldUpdate = true;
      }
    }
    return shouldUpdate;
  };
}
export default new AuthService();
