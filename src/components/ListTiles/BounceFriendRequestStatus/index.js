import React from 'react';
import {TouchableOpacity} from 'react-native';

import FriendTile from '../Friend';
import {GreyTick, SelectedBlueTick} from '@svg';
import {getWp, getHp} from '../../../app/utils';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';
import {RequestSent, SendRequest, BlueTick, ShareSvg} from '@svg';
import {FriendRequestService} from '../../../app/services';
import {Buttons} from '../..';
import {FriendShipStatus} from '../../../app/Entities';
import {Text} from 'native-base';
const BounceFriendRequestStatus = props => {
  const {authStore, appStore, popupStore} = MobxStore;
  const {friend, friendTileProp, onRightIconPress, onTitlePress, tileType} =
    props;

  const onFriendsStatusPress = () => {
    popupStore.setUnfriendPopup({
      visible: true,
      friend,
      onSuccess: async () => {
        await FriendRequestService.unfriendUser(friend.id);
      },
    });
  };
  const onRequestSent = async friendStatus => {
    await FriendRequestService.sendRequest(friend.id);
    onRightIconPress && onRightIconPress(friend, friendStatus);
  };
  const GenerateIconFunction = friendStatus => {
    if (friend.id == authStore.user?.user?.id) {
      return null;
    }
    let onTapButton = (
      <TouchableOpacity onPress={onRequestSent.bind(null, friendStatus)}>
        <SendRequest height={27} width={25} />
      </TouchableOpacity>
    );
    if (friendStatus == FriendShipStatus.FriendRequestPendingApproval) {
      onTapButton = <RequestSent height={50} width={50} />;
    } else if (friendStatus == FriendShipStatus.FriendRequestApproved) {
      onTapButton = <BlueTick height={getHp(20)} width={getWp(20)} />;
    }
    return onTapButton;
  };
  const GenerateButtonFunction = friendStatus => {
    if (friend.id == authStore.user?.user?.id) {
      return null;
    }
    let onTapButton = (
      <Buttons.FriendRequestsStatus
        onPress={onRequestSent.bind(null, friendStatus)}
        type={Buttons.FriendRequestsStatus.type.AddFriend}
      />
    );
    if (authStore.user.isIBlockedThisUser(friend.id)) {
      onTapButton = (
        <Buttons.FriendRequestsStatus
          type={Buttons.FriendRequestsStatus.type.Blocked}
        />
         
      );
      //onTapButton = <Text>HJelsdf</Text>
    }
    else if (friendStatus == FriendShipStatus.FriendRequestPendingApproval) {
      onTapButton = (
        <Buttons.FriendRequestsStatus
          type={Buttons.FriendRequestsStatus.type.Requested}
        />
      );
    } else if (friendStatus == FriendShipStatus.FriendRequestDenied) {
      onTapButton = (
        <Buttons.FriendRequestsStatus
          type={Buttons.FriendRequestsStatus.type.Requested}
        />
      );
    } else if (friendStatus == FriendShipStatus.FriendRequestApproved) {
      //onTapButton = <BlueTick height={getHp(20)} width={getWp(20)} />;
      onTapButton = (
        <Buttons.FriendRequestsStatus
          onPress={onFriendsStatusPress}
          type={Buttons.FriendRequestsStatus.type.Friend}
        />
      );
    }
    return onTapButton;
  };
  const friendStatus = authStore.getUserFriendStatus(friend.id);
  const iconFunction =
    tileType == BounceFriendRequestStatus.tileType.Icon
      ? GenerateIconFunction(friendStatus)
      : GenerateButtonFunction(friendStatus);

  let friendTileCustomizeProps = {
    tileTitleContainerStyle: {
      width:
        tileType == BounceFriendRequestStatus.tileType.Icon ? '75%' : '60%',
    },
    tileIconContainerStyle: {
      //alignItems: 'flex-end',
      width:
        tileType == BounceFriendRequestStatus.tileType.Icon ? '10%' : '25%',
    },
    ...friendTileProp,
  };
  return (
    <FriendTile
      {...friendTileCustomizeProps}
      type={FriendTile.type.Button}
      avatar={friend?.profileImage?.filePath}
      title={friend?.fullName}
      subTitle={friend?.city ?? ''}
      Icon={iconFunction}
      onRightIconPress={null}
      onTitlePress={!onTitlePress ? null : () => onTitlePress(friend)}
    />
  );
};

BounceFriendRequestStatus.tileType = {};
BounceFriendRequestStatus.tileType.Button = 'Button';
BounceFriendRequestStatus.tileType.Icon = 'Icon';
BounceFriendRequestStatus.defaultProps = {
  friendTileProp: {},
  onRightIconPress: null,
  onTitlePress: null,
  tileType: BounceFriendRequestStatus.tileType.Button,
};
export default observer(BounceFriendRequestStatus);
