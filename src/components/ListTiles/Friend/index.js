import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {observer} from 'mobx-react';

import {getWp, getHp} from '../../../app/utils';
import {Placeholder} from '@assets';
import Styles from './indexCss';

const FriendTile = props => {
  let {
    type = FriendTile.type.Icon,
    avatar,
    title,
    subTitle,
    IconComponent,
    Icon,
    avatarSize,
    onTitlePress,
    onRightIconPress,
    tileContainerStyle = {},
    tileAvatarContainerStyle = {},
    tileTitleStyle = {},
    tileSubTitleStyle = {},
    tileTitleContainerStyle = {},
    tileIconContainerStyle = {},
    onAvatarPress = null,
    avatarTooltipComponent = null,
    avatarToolTipContainerStyle = {}
  } = props;
  let source = Placeholder;
  if (avatar) {
    source = {uri: avatar};
  }
  return (
    <View style={[Styles.tileContainer, tileContainerStyle]}>
      <TouchableOpacity
        disabled={!onAvatarPress}
        onPress={onAvatarPress}
        style={[Styles.avatarContainer, tileAvatarContainerStyle]}>
        <Avatar source={source} rounded size={getWp(45)} />

        {avatarTooltipComponent && (
          <View style={[Styles.avatarToolTipContainerStyle,avatarToolTipContainerStyle]}>
            {avatarTooltipComponent()}
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={onTitlePress ? false : true}
        onPress={onTitlePress}
        style={[Styles.contentContainer, tileTitleContainerStyle]}>
        <Text style={[Styles.title, tileTitleStyle]}>{title}</Text>
        {subTitle != 'null' && (
          <Text style={[Styles.subTitle, tileSubTitleStyle]}>{subTitle}</Text>
        )}
      </TouchableOpacity>

      {type == FriendTile.type.Icon ? (
        <TouchableOpacity
          disabled={onRightIconPress ? false : true}
          onPress={onRightIconPress}
          style={[Styles.iconContainer, tileIconContainerStyle]}>
          {IconComponent && <IconComponent {...props} />}
          {Icon && Icon}
        </TouchableOpacity>
      ) : (
        <View style={[Styles.iconContainer, tileIconContainerStyle]}>
          {Icon}
        </View>
      )}
    </View>
  );
};

FriendTile.type = {};
FriendTile.type.Button = 'Button';
FriendTile.type.Icon = 'Icon';
export default observer(FriendTile);
