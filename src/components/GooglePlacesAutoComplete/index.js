import React, {useState} from 'react';
import {View} from 'react-native';
import { observer } from 'mobx-react';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {FONTSIZE, getHp, getWp} from '../../app/utils';
import Styles from './indexCss';

const GooglePlacesAutoComplete = props => {
  const {
    placeholder,
    onPress,
    textInputProps,
    geolocationContainerStyle,
    geolocationStyles,
    geolocationTextInputStyle
  } = props;
  return (
    <View style={{}}>
      <GooglePlacesAutocomplete
        styles={{
          container: [Styles.geolocationContainer, geolocationContainerStyle],
          textInput: [Styles.geolocationTextInput, geolocationTextInputStyle],
          ...geolocationStyles,
        }}
        placeholder={placeholder}
        onPress={onPress}
        minLength={1}
        renderDescription={row => row.description}
        fetchDetails
        istViewDisplayed={false}
        textInputProps={textInputProps}
        query={{
          key: 'AIzaSyC94iMpGS05cUQVCXQQt5PbSZapY597dPE',
          language: 'en',
          types: ['(regions)', '(cities)', 'address'],
        }}
        // filterReverseGeocodingByTypes={[
        //   'locality',
        //   'administrative_area_level_3',
        // ]}
      />
    </View>
  );
};

export default observer(GooglePlacesAutoComplete);
