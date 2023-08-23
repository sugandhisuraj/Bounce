import AsyncStorage from '@react-native-async-storage/async-storage';
import MobxStore from '../../../mobx';
import ToastUtil from '../../constants/toast';
import {User} from '../../Entities';
import AuthService from '../AuthService';

const LOCAL_STORAGE_TOKEN = {
  USERS: 'USERS',
};
const {authStore} = MobxStore;
let users = [];

class AccountService {
  _accounts = [];

  get accounts() {
    return this._accounts.slice();
  }
  isAccountExist = account => {
    let accDetails = {
      index: -1,
      account: {},
      isExist: false,
    };
    let accountIndex = this.accounts.findIndex(
      acc => acc.user.id == account.user.id,
    );
    if (accountIndex == -1) {
      return accDetails;
    }
    accDetails.index = accountIndex;
    (accDetails.account = this.accounts[accountIndex]),
      (accDetails.isExist = true);
    return accDetails;
  };
  add = account => {
    let newAccounts = this.accounts;
    let accountExistDetails = this.isAccountExist(account);
    if (accountExistDetails.isExist) {
      newAccounts[accountExistDetails.index] = account;
    } else {
      newAccounts.push(account);
    }
    this._accounts = newAccounts;
    this.syncAccountsToMobxStore();
    this.serialize();
  };
  serialize = async () => {
    try {
      await AsyncStorage.setItem('USERS', JSON.stringify(this._accounts));
    } catch (error) {
      console.log('ACCOUNTS_SERIALIZE_ERROR - ', error);
    }
  };
  clear = async () => {
    return AsyncStorage.removeItem('USERS');
  };
  deserialize = async () => {
    try {
      const allAccounts = await AsyncStorage.getItem('USERS');
      if (!allAccounts) {
        throw {message: 'Not have Any Account'};
      }
      let allAcountsObj = JSON.parse(allAccounts);
      let newAccounts = [];
      allAcountsObj.map(account => {
        newAccounts.push(User.fromJSON(account));
      });
      this._accounts = newAccounts;
      this.syncAccountsToMobxStore();
    } catch (error) {
      this.syncAccountsToMobxStore();
    }
  };
  syncAccountsToMobxStore = () => {
    MobxStore.authStore.syncAllAccounts(this._accounts);
  };
  remove = account => {
    let accountInfo = this.isAccountExist(account);
    let newAccounts = this.accounts;
    newAccounts.splice(accountInfo.index, 1);
    this._accounts = newAccounts;
    this.syncAccountsToMobxStore();
    this.serialize();
  };
  
  setLastAccountToUser = () => {
    let allAccounts = this.accounts;
    if (allAccounts.length > 0) {
      this.onSelectAccount(allAccounts[0]);
      return true;
    }
    return false;
  }
  onSelectAccount = async account => {
    try {
      if (account.user.id == MobxStore.authStore.user?.user?.id) {
        return;
      }
      MobxStore.toggleLoader(true);
      const userResponse = await AuthService.getUserByToken(account.token);
      //let newAccount = this.isAccountExist(account);
      account.setUser(userResponse);
      account.serialize();
      MobxStore.authStore.setUser(account);
      this.add(account);
    } catch (error) {
      console.log('ON_SELECT_ACCOUNT - ', error);
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
      this.remove(account);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
}
export default new AccountService();

/*
addNewAccount = async userDetail => {
  //   try {
  //     let isAvailable = await this.isAdded(userDetail?.user.id);
  //     let oldUsers = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
  //     if (!isAvailable) {
  //       if (oldUsers == null || oldUsers == undefined) {
  //         users = [];
  //       } else {
  //         users = JSON.parse(oldUsers);
  //       }
  //       users.push(userDetail);
  //       await AsyncStorage.setItem(
  //         LOCAL_STORAGE_TOKEN.USERS,
  //         JSON.stringify(users),
  //       );
  //     } else {
  //       await AsyncStorage.setItem(
  //         LOCAL_STORAGE_TOKEN.USERS,
  //         JSON.stringify(users),
  //       );
  //     }
  //   } catch (error) {
  //     Promise.reject(error);
  //   }
  // };

  // isAdded = async ID => {
  //   try {
  //     let Added = false;
  //     let UserLocal = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
  //     let userLocal = JSON.parse(UserLocal);
  //     if (userLocal && userLocal.length > 0) {
  //       userLocal.map(singleUser => {
  //         if (singleUser.user.id == ID) { 
  //           Added = true;
  //         }
  //       });
  //     } else {
  //       Added = false;
  //     }
  //     return Added;
  //   } catch (error) { 
  //     return Promise.reject(error);
  //   }
  // };

  // getAllAccounts = async () => {
  //   let allAccounts = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
  //   return JSON.parse(allAccounts);
  // };

  // updateAccount = async userData => {
  //   try {
  //     let newData = [];
  //     let UserLocal = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
  //     let userLocal = JSON.parse(UserLocal);
  //     if (userLocal) {
  //       userLocal.map(singleUser => {
  //         if (singleUser.user.id == userData.user.id) {
  //           newData.push(userData);
  //         } else {
  //           newData.push(singleUser);
  //         }
  //       });
  //       await AsyncStorage.setItem(
  //         LOCAL_STORAGE_TOKEN.USERS,
  //         JSON.stringify(newData),
  //       );
  //     }
  //   } catch (error) { 
  //     return Promise.reject(error);
  //   }
  // };

  // removeAccount = async ID => {
  //   try {
  //     let newData = [];
  //     let UserLocal = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USERS);
  //     let userLocal = JSON.parse(UserLocal);
  //     if (userLocal && userLocal.length > 1) {
  //       userLocal.map(singleUser => {
  //         if (singleUser.user.id != ID) {
  //           newData.push(singleUser);
  //         }
  //       });
  //       authStore.setUserProfile(newData[0]);
  //       await AsyncStorage.setItem(
  //         LOCAL_STORAGE_TOKEN.USERS,
  //         JSON.stringify(newData),
  //       );
  //     } else {
  //       await AsyncStorage.clear();
  //       authStore.logout();
  //     }
  //   } catch (error) { 
  //     return Promise.reject(error);
  //   }
  // };
*/
