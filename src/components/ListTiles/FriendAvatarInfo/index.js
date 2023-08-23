import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {Placeholder} from '@assets';
import Styles from './indexCss';

const FriendAvatarInfo = props => {
  const {
    friendName,
    friendAvatarUrl,
    onPress,
    textLength,
    containerStyle,
    imageStyle,
    friendNameContainerStyle,
    friendNameTextStyle,
  } = props;
  let source = Placeholder; 
  let fName =
  friendName?.length > textLength
      ? friendName.substr(0, textLength) + '...'
      : friendName ?? '';
  if (friendAvatarUrl) {
    source = {uri: friendAvatarUrl};
  }
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[Styles.container, containerStyle]}>
      <Image
        source={source}
        //resizeMode={'cover'}
        style={[Styles.image, imageStyle]}
      />
      <View style={[Styles.friendNameContainer, friendNameContainerStyle]}>
        <Text style={[Styles.friendNameText, friendNameTextStyle]}>
          {fName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

FriendAvatarInfo.defaultProps = {
  friendName : '',
  friendAvatarUrl: null,
  onPress: null,
  textLength: 9,
  containerStyle: {},
  imageStyle: {},
  friendNameContainerStyle: {},
  friendNameTextStyle: {},
};
export default FriendAvatarInfo;
