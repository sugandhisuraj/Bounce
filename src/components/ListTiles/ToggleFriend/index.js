import React from 'react';
import {} from 'react-native';

import FriendTile from '../Friend';
import {GreyTick, SelectedBlueTick} from '@svg';
import {getWp, getHp} from '../../../app/utils';
import {observer} from 'mobx-react';
const ToggleFriend = props => {
  const {
    isFriendSelected,
    friend,
    onRightIconPress,
    onTitlePress,
    SelectedSvg,
    UnSelectedSvg,
    tileStyles,
    disableUnSelectedIcon,
    onAvatarPress,
  } = props;

  const IconComponent = innerProp => {
    let checkResult = isFriendSelected(friend);
    if (
      checkResult != null &&
      typeof checkResult == 'object' &&
      Object.keys(checkResult).length > 0
    ) {
      if (checkResult.exist) {
        return checkResult.SVGComponent;
      }
    }
    if (checkResult == null) {
      return null;
    }
    let isSelected = checkResult ?? false;
    return isSelected
      ? SelectedSvg
      : disableUnSelectedIcon
      ? null
      : UnSelectedSvg;
  };
  return (
    <FriendTile
      {...tileStyles}
      avatar={friend?.profileImage?.filePath}
      title={friend?.fullName}
      subTitle={friend?.city ?? ''}
      IconComponent={IconComponent}
      onRightIconPress={
        !onRightIconPress ? null : () => onRightIconPress(friend)
      }
      onAvatarPress={!onAvatarPress ? null : () => onAvatarPress(friend)}
      onTitlePress={!onTitlePress ? null : () => onTitlePress(friend)}
    />
  );
};

ToggleFriend.defaultProps = {
  onRightIconPress: null,
  onTitlePress: null,
  onAvatarPress: null,
  isFriendSelected: () => false,
  SelectedSvg: <SelectedBlueTick height={getHp(40)} width={getHp(40)} />,
  UnSelectedSvg: <GreyTick height={getHp(20)} width={getHp(20)} />,
  tileStyles: {},
  disableUnSelectedIcon: false,
};
export default observer(ToggleFriend);
