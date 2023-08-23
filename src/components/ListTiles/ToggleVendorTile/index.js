import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {observer} from 'mobx-react';

import {CloseGreyCircularSvg} from '@svg';
import {getWp, getHp} from '../../../app/utils';
import {Placeholder} from '@assets';
import Styles from './indexCss';

const ToggleVendorTile = props => {
  const {
    avatar,
    title,
    subTitle,
    onTitlePress,
    IconComponent,
    RightComponent,
    onRightIconPress,
    tileContainerStyle,
    tileAvatarContainerStyle,
    tileTitleStyle,
    tileSubTitleStyle,
    tileTitleContainerStyle,
    tileIconContainerStyle,
    onAvatarPress,
    shouldOnClose,
    Icon,
    avatarToolTipComponent,
    onClosePress
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
        {avatarToolTipComponent && (
          <View style={[Styles.avatarToolTipContainer]}>
            {avatarToolTipComponent()}
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={onTitlePress ? false : true}
        onPress={onTitlePress}
        style={[Styles.contentContainer, tileTitleContainerStyle]}>
        <Text style={[Styles.title, tileTitleStyle]}>{title}</Text>
        <Text style={[Styles.subTitle, tileSubTitleStyle]}>{subTitle}</Text>
      </TouchableOpacity>
      {shouldOnClose ? (
        <TouchableOpacity onPress={onClosePress} disabled={!onClosePress}>
          <CloseGreyCircularSvg height={getHp(24)} width={getWp(24)} />
        </TouchableOpacity>
      ) : RightComponent ? (
        <RightComponent {...props} />
      ) : (
        <TouchableOpacity
          disabled={onRightIconPress ? false : true}
          onPress={onRightIconPress}
          style={[Styles.iconContainer, tileIconContainerStyle]}>
          {IconComponent ? <IconComponent {...props} /> : Icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

ToggleVendorTile.defaultProps = {
  avatarToolTipComponent: null,
  avatar: null,
  title: 'Add Title',
  subTitle: 'Add Subtitle',
  IconComponent: null,
  Icon: null,
  onTitlePress: null,
  onRightIconPress: null,
  tileContainerStyle: {},
  tileAvatarContainerStyle: {},
  tileTitleStyle: {},
  tileSubTitleStyle: {},
  tileTitleContainerStyle: {},
  tileIconContainerStyle: {},
  onAvatarPress: null,
  shouldOnClose: false,
  RightComponent: null,
  onClosePress: null
};
export default observer(ToggleVendorTile);
