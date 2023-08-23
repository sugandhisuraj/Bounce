import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  isVendor = false;
  isUser = false;
  isAuthenticated = false;
  constructor(userData = {}) {
    Object.assign(this, userData);
  }

  static fromJSON = userData => {
    let user = new User(userData);
    user.isAuthenticated = true;
    if (userData.user.vendorType == 0) {
      user.isUser = true;
    } else {
      user.isVendor = true;
    }
    return user;
  };

  serialize = async () => {
    try {
      let isItemSaved = await AsyncStorage.setItem(
        'USER',
        JSON.stringify(this),
      );
      return isItemSaved;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  setUser = user => {
    this.user = user;
  };
  static deserialize = async () => {
    try {
      let retrieveUser = await AsyncStorage.getItem('USER');
      if (retrieveUser) {
        return Promise.resolve(this.fromJSON(JSON.parse(retrieveUser)));
      }
      throw {message: 'User Not Logged In!'};
    } catch (error) {
      return Promise.reject(error);
    }
  };
  clear = () => {
    return AsyncStorage.removeItem('USER');
  };
  isIBlockedThisUser = (userId) => { 
    const blockedUsersList = this.user.blockedUsers ?? [];
    let indexForUserBlocked = blockedUsersList.findIndex(bU => bU.blockedUser.id == userId);
    if (indexForUserBlocked == -1){
      return false;
    }
    return true;
  }

  isIBlockedByThisUser = (userId) => {
    const blockedByUsersList = this.user.blockedByUsers ?? [];
    const indexForBlockedByUser = blockedByUsersList.findIndex(bbU => bbU.actualUser.id == userId);
     
    if (indexForBlockedByUser == -1){
      return false;
    }
    return true;
  }
}

export default User;
