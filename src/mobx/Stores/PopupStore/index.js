import {observable, action, makeAutoObservable} from 'mobx';

class PopupStore {
  /* Confirmation Popup */
  @observable confirmationPopup = {visible: false};
  @action
  resetConfirmationPopup = () => {
    this.confirmationPopup = {visible: false};
  };
  @action
  setConfirmationPopup = (data = {}) => {
    this.confirmationPopup = data;
  };
  /* Confirmation Popup */

  /* Unfriend Popup */
  @observable unfriendPopup = {visible: false};
  @action
  resetUnfriendPopup = () => {
    this.unfriendPopup = {visible: false};
  };
  @action
  setUnfriendPopup = (data = {}) => {
    this.unfriendPopup = data;
  };
  /* Unfriend Popup */

  /* Vendor Confirm Host for Vendor */
  @observable vendorConfirmHostHireVendorPopup = {visible: false};

  @action
  resetVendorConfirmHostHireVendorPopup = () => {
    this.vendorConfirmHostHireVendorPopup = {visible: false};
  };
  @action
  setVendorConfirmHostHireVendorPopup = (data = {}) => {
    this.vendorConfirmHostHireVendorPopup = data;
  };
  /* Vendor Confirm Host for Vendor */

  /* Host Popup for Hire Vendor Cancel and UnHire Requests */
  @observable hostHireVendorCancelUnHirePopup = {visible: false};

  @action
  resetHostHireVendorCancelUnHirePopup = () => {
    this.hostHireVendorCancelUnHirePopup = {visible: false};
  };

  @action
  setHostHireVendorCancelUnHirePopup = (data = {}) => {
    this.hostHireVendorCancelUnHirePopup = data;
  };

  /* Host Popup for Hire Vendor Cancel and UnHire Requests */

  /* Common BlurView Popup*/
  @observable newsFeedPopups = {visible: false};

  @action
  resetNewsFeedPopups = () => {
    this.newsFeedPopups = {visible: false};
  };

  @action
  setNewsFeedPopups = (data = {}) => {
    this.newsFeedPopups = data;
  };

  /* Common BlurView Popup*/

  /* Report Or Block Popups */
  @observable reportBlockPopup = {visible: false};

  @action
  resetReportBlockPopup = () => {
    this.reportBlockPopup = {visible: false};
  };

  @action
  setReportBlockPopup = (data = {}) => {
    data.resetPopup = this.resetReportBlockPopup;
    this.reportBlockPopup = data;
  };

  /* Report Or Block Popups */
  constructor(props) {
    makeAutoObservable(this);
  }
}

export default PopupStore;

// import {observable, action, makeAutoObservable} from 'mobx';

// class PopupStore {
//   @observable confirmationPopup = {visible: false};
//   @observable unfriendPopup = {visible: false};
//   @observable vendorConfirmHostHireVendorPopup = {visible: false};
//   constructor(props) {
//     makeAutoObservable(this);
//   }

//   @action
//   resetVendorConfirmHostHireVendorPopup = () => {
//     this.vendorConfirmHostHireVendorPopup = {visible: false};
//   };
//   @action
//   setVendorConfirmHostHireVendorPopup = (data = {}) => {
//     this.vendorConfirmHostHireVendorPopup = data;
//   };

//   @action
//   resetConfirmationPopup = () => {
//     this.confirmationPopup = {visible: false};
//   };
//   @action
//   setConfirmationPopup = (data = {}) => {
//     this.confirmationPopup = data;
//   };

//   @action
//   resetUnfriendPopup = () => {
//     this.unfriendPopup = {visible: false};
//   };
//   @action
//   setUnfriendPopup = (data = {}) => {
//     this.unfriendPopup = data;
//   };
// }

// export default PopupStore;
