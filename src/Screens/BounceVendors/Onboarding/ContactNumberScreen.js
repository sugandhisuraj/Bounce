import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, ProgressCircle, DismissKeyboard} from '@components';
import {
  FONTSIZE,
  getHp,
  getWp,
  validateEmail,
  validatePass,
  smallHitSlop,
} from '@utils';
import {postData} from '../../../FetchServices';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import BirthDayScreen from './BirthDayScreen';
import EmailScreen from './EmailScreen.js';
import {ApiClient} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import {BlueEye, GreyEye} from '@svg';
import CountryPicker from 'react-native-country-codes-picker';
import UserNameScreen from './UsernameScreen';
import MobxStore from '../../../mobx';
import {CountryCodeEntity} from '../../../app/Entities';
import UserAuthOtpScreen from './UserAuthOtpScreen';
import configurations from '../../../app/constants/configurations';
import ProfilePic from './ProfilePic';

export default function ContactNumberScreen(props) {
  const {navigation} = props;
  const {username, password, fullName} = props.route.params;
  const [contactNumber, setContactNumber] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id: 229,
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
  });
  const [isKeyboardOpen, keyboardEvent, hideKeyboard] = useKeyboardStatus();

  const handleSubmit = async () => {
    hideKeyboard();
    if (contactNumber.length == 0) {
      return Toast('Enter Phone Number!');
    }
    if (isNaN(contactNumber)) {
      return Toast('Invalid Phone Number!');
    }
    if (configurations.ENV == configurations.APP_ENV.DEVELOPMENT) {
      return navigation.navigate(ProfilePic.routeName, {
        phoneNumber: contactNumber,
        countryCode: selectedCountry,
        username,
        password,
        fullName,
      });
    }
    navigation.navigate(UserAuthOtpScreen.routeName, {
      phoneNumber: contactNumber,
      countryCode: selectedCountry,
      username,
      password,
      fullName,
    });
  };

  return (
    <Scaffold>
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : ''}
          scrollEnabled={false}
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: getHp(20),
          }}>
          <View>
            {showCountryCode && (
              <View
                onTouchStart={() => {
                  setScrollEnabled(false);
                }}
                style={{
                  elevation: 10,
                  zIndex: 1000,
                  alignSelf: 'center',
                  position: 'absolute',
                  height: getHp(500),
                  width: '100%',
                }}>
                <CountryPicker
                  show={showCountryCode}
                  pickerButtonOnPress={item => {
                    console.log('SELECTED_ITEM - ', item);
                    setSelectedCountry(
                      MobxStore.appStore.getCountryCodeDataOnDialCode(item),
                    );
                    setShowCountryCode(false);
                    setScrollEnabled(true);
                  }}
                />
              </View>
            )}
            <Text style={styles.HeadingStyle}>
              {'What’s your phone number? 😜 '}
            </Text>

            <View style={{marginTop: getHp(60)}}>
              <View style={{flexDirection: 'row'}}>
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
                    style={styles.showCountryCodeTextStyle}
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
                  onChangeText={setContactNumber}
                />
              </View>
              <Text style={styles.infoText}>
                {'You won’t be able to change it!'}
              </Text>
            </View>
          </View>
          <View
            style={{
              bottom: isKeyboardOpen
                ? getHp(Platform.OS == 'ios' ? 55 : 15)
                : getHp(20),
              width: '100%',
              alignSelf: 'center',
            }}>
            <ProgressCircle
              currentProgress={2}
              containerStyle={{marginBottom: 20}}
            />
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Buttons.PrimaryButton
                containerStyle={{width: '47%'}}
                onPress={() => {
                  hideKeyboard();
                  props.navigation.goBack();
                }}
                title={'Go back'}
                withShadow={true}
              />
              <Buttons.PrimaryButton
                title={'Continue'}
                textColor={'#FFF'}
                containerStyle={{width: '47%', backgroundColor: '#1FAEF7'}}
                withShadow={false}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </Scaffold>
  );
}
ContactNumberScreen.routeName = '/ContactNumberScreen';

const styles = StyleSheet.create({
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  textInput: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 10,
    color: '#000',
    maxWidth: '75%',
    minWidth: '75%',
  },
  showCountryCodeTextStyle: {
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    color: '#000',
    marginTop: 10,
    borderWidth: 0,
    borderColor: 'red',
    width: getWp(80),
  },
});
