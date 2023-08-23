import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getHp} from '../../app/utils';

import {
  Placeholder,
  Airplane,
  AddButton,
  Bike,
  Camera,
  DJ,
  AngleBlueRight,
  Arrived,
} from '../../assets';
import Styles from './indexCss';

let DEMOIMG = [
  Placeholder,
  Airplane,
  AddButton,
  Bike,
  Camera,
  DJ,
  AngleBlueRight,
  Arrived,
];
const ImageStack = props => {
  const {
    images,
    infoTextStyle,
    infoText,
    avatarSize,
    numOfStacks,
    containerStyle,
    lastStackWithCount,
    lastStackWithCountContainerStyle,
    onPressContainer
  } = props;

  if (images?.length == 0 || !images?.length) {
    return null;
  }
  if (lastStackWithCount) {
    images.push(lastStackWithCount);
  }
  const RenderAvatars = (avatar, i) => {
    if (!avatar) {
      return null;
    }
    if (i > numOfStacks) {
      return null;
    }
    if (lastStackWithCount && i == numOfStacks) {
      return (
        <View style={[Styles.lastStackWithCount(avatarSize),lastStackWithCountContainerStyle]}>
          <Text style={[Styles.lastStackWithCountText]}>
            {lastStackWithCount}
          </Text>
        </View>
      );
    }
    return (
      <View style={[Styles.avatarContainerViewStyle]}>
        <Avatar rounded size={avatarSize} source={{uri: avatar}} />
      </View>
    );
  };
  return (
    <TouchableOpacity 
    disabled={!onPressContainer}
    onPress={onPressContainer}
    style={[Styles.container, containerStyle]}>
      {images.map(RenderAvatars)}
      {infoText.length > 0 && (
        <Text style={[Styles.infoText, infoTextStyle]}>{infoText}</Text>
      )}
    </TouchableOpacity>
  );
};

ImageStack.defaultProps = {
  images: [],
  numOfStacks: 5,
  containerStyle: {},
  avatarSize: getHp(32),
  infoText: '',
  infoTextStyle: {},
  lastStackWithCount: null,
  lastStackWithCountContainerStyle:{},
  onPressContainer: null
};
export default ImageStack;
