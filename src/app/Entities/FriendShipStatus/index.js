import FriendRequestsStatus from "../../../components/Buttons/FriendRequestsStatus";

class FriendShipStatus {
  static FriendRequestSent = 'FriendRequestSent';
  static FriendRequestApproved = 'FriendRequestApproved';
  static FriendRequestDenied = 'FriendRequestDenied';
  static FriendRequestPendingApproval = 'FriendRequestPendingApproval';
  static NoFriendRequest = 'NoFriendRequest';
  static FriendShipStatusTexts = {
    [this.FriendRequestSent]: FriendRequestsStatus.type.Requested,
    [this.FriendRequestApproved]: FriendRequestsStatus.type.Friend,
    [this.FriendRequestDenied]: 'Denied',
    [this.FriendRequestPendingApproval]: FriendRequestsStatus.type.Requested,
    [this.NoFriendRequest]: FriendRequestsStatus.type.AddFriend,
  };

  static forText = status => {
    return this.FriendShipStatusTexts[status] ?? 'Add Friend';
  };
}

export default FriendShipStatus;
