import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  BackHandler,
  Platform,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Scaffold} from '@components';
import {Apple, Insta, Google, Bounce, BounceNewLogoSvg} from '@svg';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {FONTSIZE, getHp, getWp, smallHitSlop} from '@utils';
import {connect, useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useIsFocused} from '@react-navigation/native';
import MobxStore from '../../../mobx';
import VendorCategory from '../../Signup/Vendor/VendorCategory';
import NameScreen from './NameScreen';
import ForgotPassword from './ForgotPassword';
import {BounceProLogo, BounceSplash} from '@svg';
import {Toast} from '@constants';
// import InstagramLogin from 'react-native-instagram-login';
import {BlueEye, GreyEye} from '@svg';
import {
  AccountService,
  AppleMusicService,
  AuthService,
  NotificationService,
} from '../../../app/services';
import VendorHomeDrawerNavigator from '../../../navigation/VendorNavigation/drawerNavigation';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';

import {APP_CONFIGURATIONS} from '../../../app/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FindUserNameResetPasswordScreen from './FindUserNameResetPasswordScreen';
import {Buttons, TermsAndConditionsWidgets} from '../../../components';
import {FONTFAMILY} from '../../../app/utils';
import axios from 'axios';
function LoginScreen(props) {
  const [animated, setAnimated] = useState({
    ballAnimation: new Animated.Value(-25),
  });
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {authStore} = MobxStore;
  console.log('IS_AUTH - ', authStore.isAuthenticated);
  useEffect(() => {
    // setTimeout(() => {
    //   AppleMusicService.authenticate();
    // }, 3000);
    window.setUserNameForTest = (text = '') => {
      setUsername(text);
      animateBall();
    };
    AuthService.getCountryCode();
  }, []);
  const handleUserLogin = async () => {
    try {
      if (username.length == 0) {
        return Toast('Required Username!');
      }
      if (password.length == 0) {
        return Toast('Required Password!');
      }
      MobxStore.toggleLoader(true);
      const loginResponse = await AuthService.singin(
        username.toLowerCase(),
        password,
      );
      if (authStore.user?.isAuthenticated) {
        if (loginResponse?.isUser) {
          navigation.navigate(UserHomeDrawerNavigator.routeName);
        } else {
          navigation.navigate(VendorHomeDrawerNavigator.routeName);
        }
      }
    } catch (error) {
      console.log('ERROR_Login - ', error.response.data);
      let errorMsg = error?.response?.data?.message ?? 'Something went wrong!';
      Toast(errorMsg);
      // return Alert.alert('Message', errorMsg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const animateBall = () => {
    Animated.timing(animated.ballAnimation, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  const ballAnimation = {
    transform: [
      {
        translateY: animated.ballAnimation,
      },
    ],
  };
  // const onTestApi = async () => {
  //   new Array(1000000).fill(1).map(i => {
  //     axios.get('http://204.236.172.208:8085');
  //   })
  //   console.log("HI");
  // }
  return (
    <Scaffold contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: '#FBFBFB'}}>
        <View style={styles.container}>
          {authStore.user?.isAuthenticated && (
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <IonIcons name="chevron-back" color={'#000'} size={getHp(35)} />
            </TouchableOpacity>
          )}
          <View style={{alignItems: 'center', marginTop: 50}}>
            <BounceNewLogoSvg
              preserveAspectRatio="none"
              height={getHp(160)}
              width={getWp(300)}
            />
          </View>

          <Text style={[styles.signStyle, {marginTop: getHp(26)}]}>
            {'Sign In'}
          </Text>
          <View style={[styles.textInput, {justifyContent: 'space-between'}]}>
            <TextInput
              autoCorrect={false}
              autoCapitalize={false}
              returnKeyType="done"
              placeholderTextColor={'#999999'}
              placeholder="Username"
              style={{
                fontSize: FONTSIZE.Text16,
                fontFamily: 'AvenirNext-Regular',
                letterSpacing: 0.1,
                width: '100%',
                color: '#000',
                borderWidth: 0,
                borderColor: 'red',
                height: '100%',
              }}
              value={username}
              onChangeText={value => {
                if (value.length == 0) {
                  animated.ballAnimation.setValue(-25);
                }
                setUsername(value);
                animateBall();
              }}
            />
          </View>

          {username.length >= 1 ? (
            <Animated.View style={[ballAnimation]}>
              <View style={[styles.textInput]}>
                <TextInput
                  autoCapitalize={false}
                  placeholderTextColor={'#999999'}
                  returnKeyType="done"
                  placeholder="Password"
                  style={{
                    fontSize: FONTSIZE.Text16,
                    fontFamily: 'AvenirNext-Regular',
                    letterSpacing: 0.1,
                    width: '90%',
                    color: '#000',
                    borderWidth: 0,
                    borderColor: 'red',
                    height: '100%',
                  }}
                  // multiline={true}
                  onChangeText={value => setPassword(value)}
                  secureTextEntry={!passwordVisible}
                  value={password}
                />
                {passwordVisible ? (
                  <TouchableOpacity
                    hitSlop={smallHitSlop}
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <BlueEye
                      height={getHp(20)}
                      width={getWp(20)}
                      style={{marginRight: getWp(15)}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    hitSlop={smallHitSlop}
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <GreyEye
                      height={getHp(20)}
                      width={getWp(20)}
                      style={{marginRight: getWp(15)}}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setPassword('');
                  props.navigation.navigate(
                    FindUserNameResetPasswordScreen.routeName,
                  );
                }}>
                <Text
                  style={[
                    {
                      fontSize: FONTSIZE.Text12,
                      fontFamily: 'AvenirNext-Regular',
                      color: '#1FAEF7',
                      marginTop: getHp(10),
                      marginRight: getWp(5),
                      textAlign: 'right',
                    },
                  ]}>
                  {'Forgot Username / Password'}
                </Text>
              </TouchableOpacity>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']}
                style={[
                  styles.linearGradient,
                  {marginTop: 30, marginBottom: 15, width: '100%'},
                ]}>
                <TouchableOpacity onPress={handleUserLogin}>
                  <Text
                    style={[styles.buttonText, {fontSize: FONTSIZE.Text16}]}>
                    {'Login'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setPassword('');
                props.navigation.navigate(
                  FindUserNameResetPasswordScreen.routeName,
                );
              }}>
              <Text
                style={[
                  {
                    fontSize: FONTSIZE.Text12,
                    marginTop: getHp(10),
                    fontFamily: 'AvenirNext-Regular',
                    color: '#1FAEF7',
                    marginRight: getWp(5),
                    textAlign: 'right',
                  },
                ]}>
                {'Forgot Username / Password'}
              </Text>
            </TouchableOpacity>
          )}

          {/* <View style={styles.CardContainer}>
              <TouchableOpacity
                // onPress={() => {
                //   this.instagramLogin.show();
                //   console.log('insta click');
                // }}
                style={[styles.Card, styles.boxShadow]}>
                <Insta height={getHp(30)} width={getWp(30)} />
                <Text style={styles.ThirdParty}>{'Instagram'}</Text>
              </TouchableOpacity>

              {Platform.OS == 'ios' && (
                <TouchableOpacity style={[styles.Card, styles.boxShadow]}>
                  <Apple height={getHp(30)} width={getWp(30)} />
                  <Text style={styles.ThirdParty}>{'Apple'}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.Card, styles.boxShadow]}>
                <Google height={getHp(26)} width={getWp(26)} />
                <Text style={styles.ThirdParty}>{'Google'}</Text>
              </TouchableOpacity>
            </View> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: getHp(10),
            }}>
            <View style={styles.Line} />
            <View>
              <Text style={styles.OR}>{'or'}</Text>
            </View>
            <View style={styles.Line} />
          </View>

          {/* <TouchableOpacity
            style={[styles.linearGradient, styles.boxShadow, {marginTop: 20}]}
            onPress={() => navigation.navigate(NameScreen.routeName)}>
            <Text
              style={[
                styles.buttonText,
                {letterSpacing: 0.5, color: '#1FAEF7'},
              ]}>
              {'User Sign Up'}
            </Text>
          </TouchableOpacity> */}
          <Buttons.PrimaryButton
            withShadow={false}
            onPress={() => navigation.navigate(NameScreen.routeName)}
            //onPress={onTestApi}
            title={'Sign Up'}
            containerStyle={[
              styles.signUpAsEventVendorContainer,
              {backgroundColor: '#00CFFF'},
            ]}
            titleStyle={[styles.signUpAsEventVendorTitle, {color: 'white'}]}
          />
          <Buttons.PrimaryButton
            withShadow={false}
            onPress={() => props.navigation.navigate(VendorCategory.routeName)}
            title={'Sign up as an Event Vendor'}
            containerStyle={[
              styles.signUpAsEventVendorContainer,
              {height: getHp(40)},
            ]}
            titleStyle={[styles.signUpAsEventVendorTitle]}
          />
          {/* <TouchableOpacity
            style={[styles.linearGradient, styles.boxShadow]}
            onPress={() => props.navigation.navigate(VendorCategory.routeName)}>
            <Text
              style={[
                styles.buttonText,
                {letterSpacing: 0.5, color: '#F8A41E'},
              ]}>
              {'Vendor Sign Up'}
            </Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAwareScrollView>
      <TermsAndConditionsWidgets.LoginComponent />
      {/* <InstagramLogin
        ref={ref => (this.instagramLogin = ref)}
        appId="315364603524733"
        appSecret="f2bd03e5cfeb924622557378e282b384"
        redirectUrl="https://b2576732c16f.ngrok.io/auth/instagram/callback"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={data => setIgToken(data)}
        onLoginFailure={data => console.log(data)}
      /> */}
    </Scaffold>
  );
}
LoginScreen.routeName = '/LoginScreen';
export default LoginScreen;

const styles = StyleSheet.create({
  versionText: {
    fontWeight: '800',
    fontSize: FONTSIZE.Text16,
  },
  versionContainer: {
    position: 'absolute',
    bottom: getHp(10),
    alignSelf: 'center',
  },
  boxShadow: {
    shadowColor: '#EFEFEF',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 1,
  },
  Line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  OR: {
    color: '#DDDDDD',
    width: 50,
    textAlign: 'center',
    fontSize: getHp(18),
  },
  ThirdParty: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
  },
  buttonText: {
    fontSize: FONTSIZE.Text14,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: getHp(10),
    color: '#ffffff',
    // backgroundColor: 'transparent',
  },
  linearGradient: {
    justifyContent: 'center',
    height: getHp(50),
    elevation: 1,
    backgroundColor: '#fff',
    marginVertical: getHp(10),
    borderRadius: 20,
  },
  container: {
    // backgroundColor:'#fff',
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  HeadingStyle: {
    // fontFamily: 'AvenirNext-Regular',
    letterSpacing: 1.6,
    color: '#000',
    fontSize: FONTSIZE.Text28,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  signStyle: {
    marginLeft: '2%',
    fontFamily: 'AvenirNext-Bold',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text18,
    // fontWeight: 'bold',
  },
  textInput: {
    flexDirection: 'row',
    height: getHp(49),
    backgroundColor: '#F2F5F6',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: FONTSIZE.Text16,
    marginTop: 20,
    color: '#000',
  },

  TitleStyle: {
    fontSize: FONTSIZE.Text14,
    paddingVertical: 0,
  },
  Card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '28%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkoutButtonStyle: {
    marginTop: getHp(25),
    height: getHp(45),
    borderRadius: getHp(20),
  },
  signUpAsEventVendorContainer: {
    backgroundColor: '#FFF3C7',
    height: getHp(45),
    marginTop: getHp(25),
    width: '100%',
  },
  signUpAsEventVendorTitle: {
    color: '#F3BE00',
    fontSize: FONTSIZE.Text16,
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.9,
  },
});
