import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

import {Seperator} from '../..';
import {GreyHamburger, BlackCircleCross, EditPen, WhiteEditPen} from '@svg';
import Styles from './indexCss';
import {getHp} from '../../../app/utils';
import RenderPartyImageOrVideo from '../RenderPartyImageOrVideo';
const PartyImageInput = props => {
  const {
    source,
    widgetMode,
    forCoverPhoto,
    onHamburgerPress,
    containerStyle,
    onDeletePress,
    onEditPress,
    showEdit,
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
            <RenderPartyImageOrVideo
              sourceURL={source.path || source.filePath}
            />
            {showEdit && (
              <TouchableOpacity
                onPress={() => onEditPress(source)}
                style={[Styles.editPenContainer]}>
                <WhiteEditPen height={getHp(50)} width={getHp(50)} />
              </TouchableOpacity>
            )}
          </View>

          {widgetMode == PartyImageInput.WidgetModes.Delete ? (
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

PartyImageInput.defaultProps = {
  source: {},
  widgetMode: null,
  forCoverPhoto: false,
  containerStyle: {},
  onHamburgerPress: null,
  onDeletePress: null,
  onEditPress: null,
};
PartyImageInput.WidgetModes = {};
PartyImageInput.WidgetModes.Delete = 'Delete';
export default PartyImageInput;
