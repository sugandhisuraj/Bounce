import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {CustomButton, Checkbox, Header} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {FONTSIZE, getHp, getWp} from '@utils';
import {ScrollView} from 'react-native';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {AuthService} from '../../../app/services';
import {useKeyboardStatus} from '@hooks';
import {observer} from 'mobx-react';
import {useCountryCodeAndOtpLayout} from '../../../app/hooks';
import {FONTFAMILY, wp} from '../../../app/utils';
import MobxStore from '../../../mobx';
import ToastUtil from '../../../app/constants/toast';
import {APP_CONFIGURATIONS} from '../../../app/constants';
import Back from 'react-native-vector-icons/Ionicons';
import {CenterRoundBlurView} from '../../../components/AppPopups/Frames';
import {BlueEye, GreyEye} from '@svg';
import {ListTiles, Lists, Headers} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginScreen from './LoginScreen';

function ChangePasswordScreen(props) {
  const {user} = props.route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasswrod] = useState('');
  const [isKeyboardOpen] = useKeyboardStatus();

  const [passVisible, setPassVisible] = useState(false);
  const [cPassVisible, cSetPassVisible] = useState(false);
  const onContinuePress = async () => {
    try {
      if (password.length == 0) {
        return ToastUtil('Required Password');
      }
      if (confirmPassword.length == 0) {
        return ToastUtil('Required Confirm Password');
      }
      if (password != confirmPassword) {
        return ToastUtil('Password should match with confirm password!');
      }
      Keyboard.dismiss();
      MobxStore.toggleLoader(true);
      const res = await AuthService.resetPassword(user.id, password);
      console.log('RESET_PASS_RES - ', res);
      window.setUserNameForTest(user.username);
      props.navigation.navigate(LoginScreen.routeName);
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const PassEye = passVisible ? BlueEye : GreyEye;
  const CPassEye = cPassVisible ? BlueEye : GreyEye;
  //   const confirmPassEye =
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      {/* <CountryCodeModal onSelectCountryCode={item => {}} /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : ''}
        scrollEnabled={false}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#FBFBFB',
        }}>
        <View>
          <Headers.BackTile
            onBackPress={() => props.navigation.goBack()}
            containerStyle={{backgroundColor: '#FBFBFB'}}
            title={'Reset Password'}
          />

          <View style={[styles.container]}>
            <View style={styles.phoneNumberTextContainer}>
              <TextInput
                autoCapitalize={false}
                returnKeyType="done"
                placeholderTextColor={'#999999'}
                placeholder={'New Password'}
                style={styles.phoneNumberText}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={!passVisible}
              />
              <TouchableOpacity
                onPress={() => setPassVisible(i => !i)}
                style={{
                  marginRight: getWp(15),
                  position: 'absolute',
                  right: getWp(0),
                }}>
                <PassEye height={getHp(20)} width={getWp(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.phoneNumberTextContainer}>
              <TextInput
                autoCapitalize={false}
                returnKeyType="done"
                placeholderTextColor={'#999999'}
                placeholder={'Confirm New Password'}
                style={styles.phoneNumberText}
                onChangeText={setConfirmPasswrod}
                value={confirmPassword}
                secureTextEntry={!cPassVisible}
              />
              <TouchableOpacity
                onPress={() => cSetPassVisible(i => !i)}
                style={{
                  marginRight: getWp(15),
                  position: 'absolute',
                  right: getWp(0),
                }}>
                <CPassEye height={getHp(20)} width={getWp(20)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            bottom: isKeyboardOpen
              ? getHp(Platform.OS == 'ios' ? 55 : 15)
              : getHp(20),
            width: '90%',
            alignSelf: 'center',
          }}>
          <CustomButton
            userContinue
            ButtonTitle={'Continue'}
            onPress={onContinuePress}
          />
        </View>
      </KeyboardAvoidingView>
    </Scaffold>
  );
}
ChangePasswordScreen.routeName = '/ChangePasswordScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
  },
  phoneNumberTextContainer: {
    width: '92%',
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(10),
    justifyContent: 'center',
    marginTop: getHp(30),
    alignSelf: 'center',
    height: getHp(42),
    borderRadius: getHp(10),
  },
  phoneNumberText: {
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    color: '#000',
    paddingLeft: getWp(15),
    fontWeight: '500',
    //     backgroundColor: 'red',
    height: '100%',
  },
});

export default observer(ChangePasswordScreen);
