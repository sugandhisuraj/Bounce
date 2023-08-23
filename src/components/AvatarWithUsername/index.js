import React from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

import {Placeholder} from '@assets';
import Styles from './indexCss';
const AvatarWithUsername = props => {
  const {
    userNameTextStyle,
    containerStyle,
    avatarSrc,
    userName,
    hintText,
    hintTextStyle,
  } = props;

  let avatar = Placeholder;
  if (avatarSrc) {
    avatar = {uri: avatarSrc};
  }

  return (
    <View style={[Styles.container, containerStyle]}>
      <Avatar source={avatar} size={40} rounded />
      <View style={[Styles.textContainer]}>
        <Text style={[Styles.userNameText, userNameTextStyle]}>{userName}</Text>
        {hintText && (
          <Text style={[Styles.hintText, hintTextStyle]}>{' ' + hintText}</Text>
        )}
      </View>
    </View>
  );
};

AvatarWithUsername.defaultProps = {
  containerStyle: {},
  hintTextStyle: {},
  avatarSrc: null,
  userName: 'Username',
  hintText: null,
  userNameTextStyle: {},
};
export default AvatarWithUsername;
