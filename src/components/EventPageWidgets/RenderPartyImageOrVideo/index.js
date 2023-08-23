import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import {Spinner} from 'native-base';

import Styles from './indexCss';
import FastImage from 'react-native-fast-image';
import {FileMIMETypesUtils, PartyUtils, getHp} from '../../../app/utils';

const RenderPartyImageOrVideo = props => {
  const [loading, setLoading] = useState(true);
  const {sourceURL, source, sourceType, gallery, sourceProps, sourceStyle} =
    props;
  let finalSourceType = FileMIMETypesUtils.getAssetTypeFromFileURL(null);
  let finalSource = null;
  if (gallery) {
    finalSource = PartyUtils.getPartyCoverPhoto(gallery);
    finalSourceType = finalSource?.uri
      ? FileMIMETypesUtils.getAssetTypeFromFileURL(finalSource.uri)
      : FileMIMETypesUtils.getAssetTypeFromFileURL('test.jpeg');
  } else {
    finalSource = sourceURL ? {uri: sourceURL} : source;
    if (sourceURL) {
      finalSourceType = FileMIMETypesUtils.getAssetTypeFromFileURL(sourceURL);
    } else {
      finalSourceType = sourceType;
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(_ => false);
    });
  }, [8000]);
  const RenderPhoto = () => {
    return (
      <FastImage
        onLoadEnd={() => {
          console.log('ON_LOAD)_ED');
          setLoading(_ => false);
        }}
        source={finalSource}
        style={[Styles.imgStyle, sourceStyle]}
        {...sourceProps}
      />
    );
  };
  const RenderVideo = () => {
    return (
      <Video
        onEnd={() => setLoading(i => false)}
        resizeMode={'cover'}
        source={finalSource}
        style={[Styles.videoStyle, sourceStyle]}
        posterResizeMode={'cover'}
        {...sourceProps}
      />
    );
  };
  let Component = null;
  console.log('LOADING_ST ', loading);
  if (loading) {
    Component = (
      <View style={[Styles.loadingContainerStyle, sourceStyle]}>
        <Spinner color={'#00CFFF'} style={Styles.loadingSpinnerStyle} />
      </View>
    );
  }
  // else
  else if (finalSourceType.isPhoto) {
    Component = <RenderPhoto />;
  } else if (finalSourceType.isVideo) {
    Component = <RenderVideo />;
  }
  return Component;
};

RenderPartyImageOrVideo.assetType = {};
RenderPartyImageOrVideo.assetType.Video = 'Video';
RenderPartyImageOrVideo.assetType.Photo = 'Photo';
export default RenderPartyImageOrVideo;
