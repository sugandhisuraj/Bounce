import React from 'react';
import {} from 'react-native';

import {GreyTick, SelectedBlueTick} from '@svg';
import {getWp, getHp} from '../../../app/utils';
import {observer} from 'mobx-react';
import FriendTile from '../Friend';
const ToggleContact = props => {
  const {
    isContactSelected,
    contact,
    onRightIconPress,
    onTitlePress,
    SelectedSvg,
    UnSelectedSvg,
    tileStyles,
  } = props;

  const IconComponent = innerProp => {
    let isSelected = isContactSelected(contact) ?? false;
    return isSelected ? SelectedSvg : UnSelectedSvg;
  };
  return (
    <FriendTile
      {...tileStyles}
      avatar={contact.getThumbnail()}
      title={contact.getName}
      subTitle={''}
      IconComponent={IconComponent}
      onRightIconPress={
        !onRightIconPress
          ? null
          : () => onRightIconPress && onRightIconPress(contact)
      }
      onTitlePress={!onTitlePress ? null : () => onTitlePress(contact)}
    />
  );
};

ToggleContact.defaultProps = {
  onRightIconPress: null,
  onTitlePress: null,
  isContactSelected: () => false,
  SelectedSvg: <SelectedBlueTick height={getHp(40)} width={getHp(40)} />,
  UnSelectedSvg: <GreyTick height={getHp(20)} width={getHp(20)} />,
  tileStyles: {},
};
export default observer(ToggleContact);
