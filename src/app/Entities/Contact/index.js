class DeviceContact {
  id = 0;
  isDeviceContact = true;
  constructor(contact, i) {
    //this.id = contact.recordID;
    this.id = new Date().getTime() + i;
    Object.assign(this, contact);
  }
  get getName() {
    return (this?.givenName ?? '') + ' ' + (this?.familyName ?? '');
  }
  getThumbnail = () => {
    return this.thumbnailPath ?? null;
  };
  getPhoneNumbers = () => {
    let phoneData = {
      hasPhone: false,
      phoneNumbersWithLabel: [],
      phoneNumbers: [],
      mobileNumber: '',
      sanatizeNumber: '',
    };
    if (this?.phoneNumbers && this?.phoneNumbers?.length > -1) {
      phoneData.hasPhone = true;
      phoneData.phoneNumbersWithLabel = this.phoneNumbers.slice();
      phoneData.phoneNumbers = this.phoneNumbers?.map(ph => ph.number);
      let mobileNumber = this.phoneNumbers.find(ph => ph.label == 'mobile');
      if (mobileNumber != undefined) {
        phoneData.mobileNumber = mobileNumber.number;
        phoneData.sanatizeNumber = mobileNumber.number.replace(/[^\d.]/g, '');
      }
    }
    return phoneData;
  };
  static fromJSON(contact, index) {
    return new DeviceContact(contact, index);
  }
}
export default DeviceContact;
