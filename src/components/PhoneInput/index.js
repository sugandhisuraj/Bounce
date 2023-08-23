import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-codes-picker';

import Styles from './indexCss';

export default PhoneInput = (props) => {
    const {
        onCountrySelect,
        phoneNumber,
        onPhoneNumberChange,
        selectedCountry
    } = props;
  const [showCountryCode, setShowCountryCode] = useState(false); 
  return (
    <View style={{flexDirection: 'row'}}>
      {showCountryCode && (
        <View
          style={{
            zIndex: 1000,
            alignSelf: 'center',
            position: 'absolute',
            height: getHp(500),
            width: '100%',
          }}>
          <CountryPicker
            show={showCountryCode}
            pickerButtonOnPress={item => {
              onCountrySelect(item);
              setShowCountryCode(false);
            }}
          />
        </View>
      )}
      <TouchableOpacity
        //style={{borderWidth: 1, borderColor: 'red'}}
        onPress={() => {
          console.log('PRESS');
          setShowCountryCode(true);
        }}>
        <TextInput
          pointerEvents={'none'}
          editable={false}
          selectTextOnFocus={false}
          autoCorrect={false}
          autoCapitalize={false}
          keyboardType={'numeric'}
          placeholder="@phone"
          placeholderTextColor="#999"
          style={Styles.countryCodeText}
          value={`${selectedCountry.dial_code}`}
          onChangeText={() => {}}
        />
      </TouchableOpacity>

      <TextInput
        autoCorrect={false}
        autoCapitalize={false}
        keyboardType={'numeric'}
        placeholder="(000) 000-0000"
        placeholderTextColor="#999"
        style={[styles.textInput]}
        value={contactNumber}
        onChangeText={onPhoneNumberInput}
      />
    </View>
  );
};
