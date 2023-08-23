import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import {ApiClient, AuthService} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import {BlueEye, GreyEye} from '@svg';
import MobxStore from '../../../mobx';

export default function UserNameScreen(props) {
  const {navigation} = props;
  const {name, phoneNumber, countryCode} = props.route.params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isKeyboardOpen, keyboardEvent, hideKeyboard] = useKeyboardStatus();

  const handleSubmit = async () => {
    try {
      if (username.length == 0) {
        return Toast('Username is required!');
      }
      if (password.length == 0) {
        return Toast('Password is required!');
      }
      if (password.length < 7) {
        return Toast('Password should be 8 characters long !');
      }
      hideKeyboard();
      if (username.length > 0 && password.length > 7) {
        MobxStore.toggleLoader(true);
        const isUserNameExist = await AuthService.validateUser({
          username: username.toLowerCase(),
        });
        console.log('IS_USER_NAME_EXIST - ', isUserNameExist);

        if (isUserNameExist.isUserExist) {
          return Toast('User already exist');
        }
        //dispatch(fetchVendorData(['FIRST_PAGE', body]));
        navigation.navigate(EmailScreen.routeName, {
          username: username.toLowerCase(),
          password: password,
          name,
          phoneNumber,
          countryCode,
        });
      }
    } catch (error) {
      Toast('User already exist');
      console.log(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const handleSpace = (value, type = 'Username') => {
    let regSpace = new RegExp(/\s/);
    if (regSpace.test(value)) {
      if (type == 'Password') {
        setPassword(value.trim());
      } else {
        setUsername(value.trim());
      }
      Toast(`${type} ` + 'cannot contain space !');
    } else {
      if (type == 'Password') {
        setPassword(value);
      } else {
        setUsername(value);
      }
    }
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
            <Text style={styles.HeadingStyle}>{'Pick a username! 😜'}</Text>

            <View style={{marginTop: 100}}>
              <TextInput
                autoCapitalize={'none'}
                placeholder="@Username"
                placeholderTextColor="#999"
                style={styles.textInput}
                value={username}
                onChangeText={value => handleSpace(value, 'Username')}
              />
              <Text style={styles.infoText}>
                {'You won’t be able to change it!'}
              </Text>
            </View>

            <View
              style={[
                styles.textInput,
                {
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Password"
                placeholderTextColor="#999"
                style={[
                  {
                    fontSize: FONTSIZE.Text22,
                    fontFamily: 'AvenirNext-Medium',
                    marginTop: 10,
                    color: '#000',
                    width: '90%',
                  },
                ]}
                value={password}
                secureTextEntry={!passwordVisible}
                onChangeText={value => handleSpace(value, 'Password')}
              />
              {passwordVisible ? (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  hitSlop={smallHitSlop}>
                  <BlueEye
                    height={getHp(20)}
                    width={getWp(20)}
                    style={{marginRight: getWp(15)}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  hitSlop={smallHitSlop}>
                  <GreyEye
                    height={getHp(20)}
                    width={getWp(20)}
                    style={{marginRight: getWp(15)}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              bottom: isKeyboardOpen
                ? getHp(Platform.select({ios: getHp(55), android: 15}))
                : getHp(20),
              width: '100%',
              alignSelf: 'center',
            }}>
            <ProgressCircle
              currentProgress={3}
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
UserNameScreen.routeName = '/UserNameScreen';

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
  },
});
