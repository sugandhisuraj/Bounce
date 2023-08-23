import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';
const FriendRequestButton = props => {
  const {title, onPress, type, containerStyle, titleStyle} = props;

  let renderDetails = {};
  if (type == FriendRequestButton.type.AddFriend) {
    renderDetails.style = {};
    renderDetails.titleStyle = {};
    renderDetails.title = title ?? 'Add Friend';
    renderDetails.colors = ['#00CFFF', '#68E3FF'];
  }
  if (type == FriendRequestButton.type.Requested) {
    renderDetails.title = title ?? 'Requested';
    renderDetails.titleStyle = Styles.requestedTitle;
    renderDetails.colors = ['#FFFFFF', '#FFFFFF'];
    renderDetails.style = Styles.shadowStyle;
  }
  if (type == FriendRequestButton.type.Friend) {
    renderDetails.title = title ?? 'Friends';
    renderDetails.titleStyle = [Styles.requestedTitle, Styles.friendTile];
    renderDetails.colors = ['#FFFFFF', '#FFFFFF'];
    renderDetails.style = Styles.shadowStyle1;
  }
  if (type == FriendRequestButton.type.Blocked) {
    renderDetails.title = 'Blocked';
    renderDetails.titleStyle = [Styles.requestedTitle, Styles.friendTile,{color: '#FF2E00'}];
    renderDetails.colors = ['#FFD0C6', '#FFD0C6'];
    renderDetails.style = Styles.shadowStyle1;
  }
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[Styles.container, renderDetails.style, containerStyle]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[Styles.container, containerStyle]}
        colors={renderDetails.colors}>
        <Text style={[Styles.title, renderDetails.titleStyle, titleStyle]}>
          {renderDetails.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

FriendRequestButton.type = {};
FriendRequestButton.type.Friend = 'Friend';
FriendRequestButton.type.AddFriend = 'AddFriend';
FriendRequestButton.type.Requested = 'Requested';
FriendRequestButton.type.Blocked = 'Blocked';

FriendRequestButton.defaultProps = {
  onPress: null,
  type: FriendRequestButton.type.AddFriend,
  containerStyle: {},
  titleStyle: {},
  title: null,
};
export default FriendRequestButton;

const Styles = StyleSheet.create({
  container: {
    width: getWp(90),
    height: getHp(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getHp(7),
  },
  title: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text14,
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
  requestedTitle: {
    fontWeight: '500',
    color: '#999999',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadowStyle1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  friendTile: {
    color: '#00CFFF',
  },
});
