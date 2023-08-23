const { makeAutoObservable, observable, action, computed } = require("mobx");

class DeviceContactsStore {
    @observable _deviceContacts = [];
    constructor(props) {
        makeAutoObservable(this);    
    }

    @action
    setDeviceContacts(contacts = []) {
        this._deviceContacts = contacts;
    }

    @computed
    get deviceContacts() {
        return this._deviceContacts.slice();
    }
}

export default DeviceContactsStore;
