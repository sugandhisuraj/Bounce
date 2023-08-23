import RNContacts from 'react-native-contacts';
import {Platform, PermissionsAndroid} from 'react-native';

import MobxStore from '../../../mobx';
import {DeviceContact} from '../../Entities';
import {Strings} from '../../constants';
class DeviceContactService {
  isPermissionAssigned = false;

  constructor() {
    if (Platform.OS == 'ios') {
      this.isPermissionAssigned = true;
    }
  }
  async checkPermission() {
    try {
      if (this.isPermissionAssigned) {
        return this.getContacts();
      }
      const isPermisionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      this.isPermissionAssigned = isPermisionGranted ?? false;
      if (this.isPermissionAssigned) {
        this.getContacts();
      } else {
        this.getPermisison();
      }
    } catch (error) {
      this.isPermissionAssigned = false;
    }
  }
  async getContacts() {
    try {
      const allContacts = await RNContacts.getAll();
      let contacts = [];
      if (allContacts.length > 0) {
        allContacts.map((contact, i) => {
          contacts.push(DeviceContact.fromJSON(contact, i));
        });
        //console.log("ALL_CONTACTS_DATA - ", JSON.stringify(contacts));
        MobxStore.deviceContactsStore.setDeviceContacts(contacts);
      }
      return Promise.resolve(contacts);
    } catch (error) {
      console.log('GETALL_CONTACTS_ERROR - ', error);
    }
  }

  async getPermisison() {
    try {
      let permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        Strings.permissionContact,
      );
      if (permission == 'granted') {
        this.isPermissionAssigned = true;
        return this.getContacts();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new DeviceContactService();
