import React from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {CloseGreyCircularSvg} from '@svg';
import {Placeholder} from '../../../assets';
import Styles from './indexCss';
import MobxStore from '../../../mobx';
import ToastUtil from '../../../app/constants/toast';
import {AuthService, VendorService} from '../../../app/services';

const VendorMedia = props => {
  const {containerStyle, imageContainerStyle, media} = props;

  let source = Placeholder;
  if (media?.filePath) {
    source = {uri: media.filePath};
  }

  const onRemoveImg = async (showAlert = true) => {
    try {
      if (showAlert) {
        return Alert.alert('Message', 'Sure Remove Media?',[
          {
            text: 'Cancel'
          },
          {
            text: 'Confirm',
            onPress: onRemoveImg.bind(null, false)
          }
        ])
      }
      MobxStore.toggleLoader(true);
      const res = await VendorService.removeMedia(media);
        console.log("REMOVE_MEDIA_RES - ", res);
      await AuthService.reloadUser();
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <TouchableOpacity onPress={onRemoveImg} style={[Styles.closeContainer]}>
        <CloseGreyCircularSvg />
      </TouchableOpacity>
      <FastImage
        style={[Styles.imageContainerStyle, imageContainerStyle]}
        source={source}
      />
    </View>
  );
};

VendorMedia.defaultProps = {
  containerStyle: {},
  imageContainerStyle: {},
  media: {},
};
export default VendorMedia;
