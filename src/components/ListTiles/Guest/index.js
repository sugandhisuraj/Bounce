import React, {useCallback, useState, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {BlackPen} from '@svg';
import Styles from './indexCss';
import {getHp, getWp} from '../../../app/utils';
import {Girl} from '@assets';
import {DotSvg} from '@svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BlackShare} from '@svg';
import {EditSvg, DeleteSvg} from '@assets';
import {Menus} from '../..';

const GuestTile = props => {
  const {
    guestListData,
    editable,
    onMenuPress,
    onTilePress,
    containerStyle,
    guestTitleContainerStyle,
    guestPartyTextStyle,
    guestTrayContainer,
    guestAvatarStyle,
    guestCountTextStyle,
    isSelected,
  } = props;
  if (!guestListData) {
    return null;
  }
  const guestData = guestListData.guestList;
  const guestPartyName = guestListData?.title;
  let guestListLen = guestData?.length ?? 0;
  let guestCountText;
  if (guestListLen == 0) {
    guestCountText = `0 Guest`;
  } else {
    guestCountText =
      guestListLen > 1 ? guestListLen + ' Guests' : guestListLen + ' Guest';
  }

  const menuPress = useCallback(
    menuType => {
      if (onMenuPress && typeof onMenuPress == 'function') {
        onMenuPress(menuType, guestListData);
      }
    },
    [onMenuPress],
  );
  const MenuConfig = [
    {
      title: GuestTile.MenuOptions.Edit,
      Icon: <EditSvg />,
      onPress: menuPress.bind(null, GuestTile.MenuOptions.Edit),
    },
    // {
    //   title: Menu,
    //   Icon: <BlackShare />,
    //   onPress: () => {},
    // },
    {
      title: GuestTile.MenuOptions.Delete,
      Icon: <DeleteSvg />,
      onPress: menuPress.bind(null, GuestTile.MenuOptions.Delete),
    },
  ];
  return (
    <TouchableOpacity
      disabled={!onTilePress}
      onPress={onTilePress ? () => onTilePress(guestListData) : null}
      style={[
        Styles.container,
        isSelected && Styles.selectedContainer,
        containerStyle,
      ]}>
      <View style={[Styles.guestTitleContainer, guestTitleContainerStyle]}>
        <Text style={[Styles.guestPartyText, guestPartyTextStyle]}>
          {guestPartyName}
        </Text>
        {editable && (
          <Fragment>
            <Menus.GuestMenu
              menuAnchor={<DotSvg height={getHp(28)} width={getWp(25)} />}
              config={MenuConfig}
            />
          </Fragment>
        )}
      </View>
      <View style={[Styles.guestTray, guestTrayContainer]}>
        {guestData.slice(0, 5).map(record => {
          let img = record?.guest?.profileImage?.filePath ?? null;
          if (img) {
            return (
              <Image
                resizeMode={'cover'}
                source={{uri: img}}
                style={[Styles.guestAvatar, guestAvatarStyle]}
              />
            );
          }
          return null;
        })}

        <Text style={[Styles.guestCountText, guestCountTextStyle]}>
          {guestCountText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
GuestTile.defaultProps = {
  guestListData: null,
  onMenuPress: null,
  guestPartyTextStyle: {},
  containerStyle: {},
  guestTitleContainerStyle: {},
  editable: true,
  guestTrayContainer: {},
  guestAvatarStyle: {},
  guestCountTextStyle: {},
  onTilePress: null,
  isSelected: false,
};
GuestTile.MenuOptions = {};
GuestTile.MenuOptions.Edit = 'Edit';
GuestTile.MenuOptions.Share = 'Share';
GuestTile.MenuOptions.Delete = 'Delete';
export default GuestTile;
