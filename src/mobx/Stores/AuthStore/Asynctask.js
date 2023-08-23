import {LocalStorage} from '../../../app/utils/localStorage';
import {postData, BaseURL} from '../../../FetchServices';
import {runInAction} from 'mobx';
import axios from 'axios';
import {ApiClient, AccountService} from '../../../app/services';
class Asynctask {
  authStore;
  rootStore;
  constructor(authStore, rootStore) {
    this.authStore = authStore;
    this.rootStore = rootStore;
  }
  fetchProfile = async () => {
    try {
      const data = await LocalStorage.getToken();
      console.log("TOKEN_HERE_BEFORE_FP - ", data);
      const body = data != undefined && data !== null && JSON.parse(data);
      let userLoginResponse = await ApiClient.instance.post(
        ApiClient.endPoints.postUserLogin,
        body,
      );
      console.log("RESP_REC_HERE - ", userLoginResponse.data);
      runInAction(() => {
        this.authStore.userProfile = userLoginResponse.data;
        this.authStore.isAuthenticated = true;
      });
      return Promise.resolve(userLoginResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  login = async (username, password, showLoader = true) => {
    try {
      showLoader && this.rootStore.appStore.toogleLoader(true);
      let body = {
        username: username,
        password: password,
      };
      const userLoginReq = await ApiClient.instance.post(
        ApiClient.endPoints.postUserLogin,
        body,
      ); 
       const userLoginResponse = userLoginReq.data;
      showLoader && this.rootStore.appStore.toogleLoader(false);
      if (userLoginResponse.success == true) { 
        await LocalStorage.storeToken(JSON.stringify(body));
        await LocalStorage.onSignUp(
          userLoginResponse.token,
          JSON.stringify(userLoginResponse.user),
        );
        await AccountService.addNewAccount(userLoginResponse)
        runInAction(() => {
          this.authStore.userProfile = userLoginResponse;
          this.authStore.isAuthenticated = true;
        });
        return Promise.resolve(userLoginResponse);
      } else {
        return Promise.reject(userLoginResponse);
      }
    } catch (error) { 
      showLoader && this.rootStore.appStore.toogleLoader(false);
      return Promise.reject(error);
    }
  };

  fetchVendor = async (token = undefined) => {
    try {
      let tok = token;
      if (token == undefined) {
        tok = this.authStore.userProfile?.token;
      }
      console.log('FETCH_VENDCOR - ', tok);
      const vendorAutoLoginResponse = await ApiClient.instance.get(
        ApiClient.endPoints.getVendor,
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        },
      );
      return Promise.resolve(vendorAutoLoginResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  reloadVendor = async () => {
    try {
      const vendorResponse = await this.fetchVendor();
      console.log(
        'VENDOR_RESPONSE_DATA - ',
        JSON.stringify(vendorResponse.data),
      );
      if (vendorResponse.status == 200) {
        this.authStore.onReloadVendor(vendorResponse.data);
        return Promise.resolve(vendorResponse.data);
      } else {
        throw new Error(vendorResponse);
      }
    } catch (error) {
      console.log('ERRROR_RELOAD_VENDER - ', error);
      return Promise.reject(error);
    }
  };
  autoLogin = async (showLoader = false) => {
    try {
      showLoader && this.rootStore.appStore.toogleLoader(true);
      const {token, userDetails} = await LocalStorage.autoLogin();
      let userDetailsObjLocal = JSON.parse(userDetails);
      let autoLoginResponse;
      if (userDetailsObjLocal.vendorType == 0) {
        autoLoginResponse = await this.fetchUser(token);
      } else {
        autoLoginResponse = await this.fetchVendor(token);
      }
      let userDetailsObj = {
        success: true,
        token,
        user: autoLoginResponse.data,
      };
      this.authStore.onAutoLogin(userDetailsObj);
      showLoader && this.rootStore.appStore.toogleLoader(false);
      return Promise.resolve(userDetailsObj);
    } catch (error) {
      console.log('LAND_ON_ASYNC_AUTOLOGIN');
      showLoader && this.rootStore.appStore.toogleLoader(false);
      runInAction(() => {
        this.authStore.isAutoLoginDone = true;
      });
      return Promise.reject(error);
    }
  };
  fetchUser = async token => {
    try {
      let tok = token;
      if (token == undefined) {
        tok = this.authStore.userProfile.token;
      }
      const userResponse = await ApiClient.instance.get(
        ApiClient.endPoints.getUser,
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        },
      );
      return Promise.resolve(userResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  reloadUser = async () => {
    try {
      const userDataRes = await this.fetchUser();
      this.authStore.onReloadVendor(userDataRes.data);
      return Promise.resolve(userDataRes.data);
    }catch(error) {
      return Promise.reject(error);
    }

  }
}
export default Asynctask;
