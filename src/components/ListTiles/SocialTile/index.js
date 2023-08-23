import React, {Fragment} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import Styles from './indexCss';
import {Insta, GreyCross, EditPen} from '@svg';
import {getWp, getHp, width} from '../../../app/utils';
const SocialTile = props => {
  const {
    outerContainerStyle,
    onActionTitlePress,
    SocialIcon,
    title,
    containerStyle,
    type,
    rowContainerStyle,
    actionTitle,
    actionTitleStyle,
    titleStyle,
    onOuterContainerPress,
  } = props;

  const GreyBtn = () => {
    return (
      <Fragment>
        <View style={[Styles.greyDots]} />
        <View style={[Styles.greyDots]} />
        <View style={[Styles.greyDots]} />
      </Fragment>
    );
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <View
        style={[
          Styles.rowContainer,
          Styles.shadowStyle,
          {width: type == SocialTile.types.Connect ? '100%' : '90%'},
          rowContainerStyle,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {SocialIcon}
          <Text style={[Styles.titleStyle, titleStyle]}>{title}</Text>
        </View>
        <TouchableOpacity
          disabled={!onActionTitlePress}
          onPress={onActionTitlePress}>
          <Text style={[Styles.actionTitle, actionTitleStyle]}>
            {actionTitle}
          </Text>
        </TouchableOpacity>
      </View>
      {type == SocialTile.types.ConnectClose && (
        <TouchableOpacity
          disabled={!onOuterContainerPress}
          onPress={onOuterContainerPress}
          style={[Styles.outerContainer, outerContainerStyle]}>
          <GreyCross height={getHp(15)} width={getWp(15)} />
        </TouchableOpacity>
      )}
      {type == SocialTile.types.ConnectDot && (
        <TouchableOpacity
          disabled={!onOuterContainerPress}
          onPress={onOuterContainerPress}
          style={[Styles.outerContainer, {width: '6%'}, outerContainerStyle]}>
          <GreyBtn />
        </TouchableOpacity>
      )}
    </View>
  );
};

SocialTile.types = {};
SocialTile.types.Connect = 'Connect';
SocialTile.types.ConnectClose = 'ConnectClose';
SocialTile.types.ConnectDot = 'ConnectDot';
SocialTile.defaultProps = {
  type: SocialTile.types.ConnectClose,
  containerStyle: {},
  rowContainerStyle: {},
  SocialIcon: null,
  title: 'Title',
  onTitlePress: null,
  actionTitle: 'Connect',
  actionTitleStyle: {},
  titleStyle: {},
  onActionTitlePress: null,
  outerContainerStyle: {},
  onOuterContainerPress: null,
};

export default SocialTile;
