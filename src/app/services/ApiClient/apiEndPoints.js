import AppJSON from '../../../../app.json';

class Server {
  production = 'http://3.12.168.164:3000';
  ngrok = '';
  development = 'http://52.14.203.233:3000';
  baseURL = AppJSON.isProduction ? this.production : this.development;
}

class Endpoints extends Server {
  bounceWithFriends = '/party/bounceWithFriends';
  filtersEvents = '/party/filter';
  tagWiseNewsFeed = '/party/newsFeed';
  cancelFriendRequest = '/user/cancelFriendRequest';
  sendRequest = '/user/addFriendRequest';
  acceptRequest = '/user/approveFriendRequest';
  unFriend = id => `/user/unfriend/${id}`;
  denyFriendRequest = '/user/denyFriendRequest';
  relationWithUser = '/user';
  addInterest = '/user/addInterest';
  getQR = '/user/getqr';
  getAllUser = '/user/all';
  postUser = '/user';
  getCategory = '/Vendor/Category';
  postUserLogin = '/user/userlogin';
  getVendor = '/vendor/getvendor';
  getUser = '/user';
  getCategory = '/Vendor/Category';
  validateVendor = '/auth/validatevendor';
  vendorRegister = '/auth/vendor/register';
  userRegister = 'auth/host/register';
  vendorAddMedia = '/vendor/addmedia';
  postLogin = '/user/userlogin';
  getLanguage = '/language';
  getGenre = '/genres';
  getCertification = '/genres/guardcertification';
  vendorCategory = '/Vendor/Category';
  vendorList = '/vendor';
  party = '/party';
  getPartyById = partyId => `/party/${partyId}`;
  tags = '/tags';
  forgotPassword = '/auth/forgotpassword';
  countryCode = '/language/countrycode';
  guestUserParties = userId => `/party/getAttendingHostingInterested/${userId}`;
  guestUser = userId => `/user/${userId}`;
  addBookMark = partyId => `/party/bookmark/${partyId}`;
  spotifyCallback = `/spotify/spotifyCallback`;
  spotifyConnect = `/spotify/connect`;
  getSpotifyData = `/spotify`;
  addHosts = partyId => `/party/toggleHosts/${partyId}`;
  partyInvite = `/party-invite`;
  notifications = `/party/notifications`;
  acceptCohost = cohostId => `/party/partyHost/accept/${cohostId}`;
  denyCohost = cohostId => `/party/partyHost/deny/${cohostId}`;
  toggleGoing = partyId => `/party/toggleGoing/${partyId}`;
  toggleCantGo = partyId => `/party/toggleCantGo/${partyId}`;
  editHosts = partyId => `/party/editHosts/${partyId}`;
  getGuestLists = `/party/getGuestLists`;
  addGuestsInGuestList = guestListId => `/party/addGuests/${guestListId}`;
  editGuestsInGuestList = guestListId => `/party/editGuests/${guestListId}`;
  getPublicParties = `/party/public`;
  bounceWithFriendNotification = `/party/addNotifications`;
  editBounceWithFriendNotification = notificationId =>
    `/party/editNotification/${notificationId}`;
  authSendOtp = `/auth/sendOtp`;
  validateUser = `/auth/validateUser`;
  vendorSignupData = `/Vendor/SignupData`;
  updateVendor = `/vendor/updatevendor`;
  vendorFavourite = id => `/vendor/addFavourite/${id}`;
  vendorFilter = `/vendor/filter`;
  hireVendorRequest = `/vendor/hireVendorRequest`;
  approvedRequestByHost = partyId => `/vendor/approvedRequestByHost/${partyId}`;
  userNotification = `/user/notifications`;
  vendorNotification = `/vendor/notifications`;
  acceptHireVendorRequestByVendor = partyId =>
    `/vendor/approveRequestByVendor/${partyId}`;
  denyHireVendorRequestByVendor = partyId =>
    `/vendor/deniedRequestByVendor/${partyId}`;
  cohostRequestToHireHost = partyId => `/vendor/requestToHire/${partyId}`;
  cancelHireVendorByHost = partyId => `/vendor/cancelHireByHost/${partyId}`;
  getVendorByIdAndPartyId = `/vendor/getVendorByIDAndPartyId`;
  cancelHireRequest = `/vendor/cancelHireRequest`;
  vendorFavorites = `/vendor/favourites`;
  vendorHiredOrRequested = partyId => `/vendor/hiredOrRequested/${partyId}`;
  removeMediaImg = `/vendor/removeImage`;
  hiredVendorParties = `/vendor/hiredVendorParties`;
  hostToVendorRating = `/rating`;
  getUsersByPhoneNumber = `/auth/getUsersByPhoneNumber`;
  resetPassword = `/auth/resetPassword`;
  removeCohostVendorRatingNotification = id =>
    `/user/removeCohostVendorRatingNotification/${id}`;
  removeRatingNotification = id => `/rating/removeNotification/${id}`;
  ratingAndReviewVendors = partyId => `/vendor/vendorForRating/${partyId}`;
  createPaymentIntent = amt => `/party/createPaymentIntent?amount=${amt}`;
  buyTickets = `/party/buyTickets`;
  vendorScanQr = partyId => `/party/scanQr/${partyId}`;
  toggleBlock = userId => `/user/toggleBlock/${userId}`;
}

export default Object.freeze(new Endpoints());
