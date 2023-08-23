import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Seperator} from '../..';
import {GreyHamburger, BlackCircleCross, EditPen, WhiteEditPen} from '@svg';
import Styles from './indexCss';
import {getHp} from '../../../app/utils';
import RenderPartyImageOrVideo from '../RenderPartyImageOrVideo';
const PartyVideoInput = props => {
  const {
    source,
    widgetMode,
    forCoverPhoto,
    onHamburgerPress,
    containerStyle,
    onDeletePress,
  } = props;

  return (
    <Fragment>
      <View
        style={[
          Styles.container,
          forCoverPhoto && {backgroundColor: '#F1F5FC'},
          containerStyle,
        ]}>
        {forCoverPhoto && (
          <Text style={[Styles.coverPhotoText]}>Cover Photo </Text>
        )}

        <View style={[Styles.imageInputContainer]}>
          <View>
            <RenderPartyImageOrVideo sourceURL={source} />
          </View>
        
          {widgetMode == PartyVideoInput.WidgetModes.Delete ? (
            <TouchableOpacity onPress={() => onDeletePress(source)}>
              <BlackCircleCross height={30} width={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onLongPress={onHamburgerPress}>
              <GreyHamburger height={getHp(25)} width={getHp(25)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Seperator />
    </Fragment>
  );
};

PartyVideoInput.defaultProps = {
  source: null,
  widgetMode: null,
  forCoverPhoto: false,
  onHamburgerPress: null,
  containerStyle: {},
  onDeletePress: null,
};
PartyVideoInput.WidgetModes = {};
PartyVideoInput.WidgetModes.Delete = 'Delete';
export default PartyVideoInput;
