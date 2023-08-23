import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {CustomButton, Checkbox, DismissKeyboard} from '@components';
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
import {CloseGreyCircularSvg} from '@svg';
import {ListTiles, Lists} from '../../../components';
import ChangePasswordScreen from './ChangePasswordScreen';

function FindUserNameResetPasswordScreen(props) {
  const {navigation, onBackPress} = props;
  const [recievedOtp, setRecievedOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const [isKeyboardOpen] = useKeyboardStatus();
  const [users, setUsers] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const {
    otpInput,
    setOtpInput,
    startTimer,
    selectedCountryCode,
    SelectedCountryCodeShowTray,
    CountryCodeModal,
    setShowCountryCodeModel,
    OtpInputAndResendTray,
    setSelectedCountryCode,
  } = useCountryCodeAndOtpLayout();
  const mobileNumber = selectedCountryCode + phoneNumber;
  const onSendOtp = async otp => {
    try {
      if (phoneNumber.length == 0) {
        return ToastUtil('Enter Phone Number!');
      }
      if (isNaN(phoneNumber)) {
        return ToastUtil('Invalid Phone Number!');
      }
      MobxStore.toggleLoader(true);

      const otpRes = await AuthService.sendAuthOtp(mobileNumber);
      startTimer();
      ToastUtil('Otp Successfully Send');
      console.log('OTP_REC - ', otpRes);
      setRecievedOtp(otpRes.otp);
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onContinuePress = async () => {
    try {
      if (checkUsername == false && checkPassword == false) {
        return ToastUtil(
          'Choose your action find username or reset password ?',
        );
      }
      if (phoneNumber.length == 0) {
        return ToastUtil('Enter Phone Number!');
      }
      if (isNaN(phoneNumber)) {
        return ToastUtil('Invalid Phone Number!');
      }

      if (APP_CONFIGURATIONS.IS_PRODUCTION) {
        if (otpInput.length == 0) {
          return ToastUtil('Enter 6 digit code!');
        }
        if (otpInput != recievedOtp) {
          return ToastUtil('Invalid Code');
        }
      }
      Keyboard.dismiss();
      MobxStore.toggleLoader(true);
      const users = await AuthService.getUsersByPhoneNumber(phoneNumber);
      console.log('ALL_USERS - ', JSON.stringify(users));
      if (users.length == 0) {
        return ToastUtil('No Account registered with this Phone Number', {
          duration: 3000,
        });
      }
      setUsers(users);
      setShowModel(true);
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onSelectProfile = item => {
    console.log('SELECTED_USER_PROFILE - ', item);
    onCloseModel();
    if (checkUsername) {
      window.setUserNameForTest(item.username);
      props.navigation.goBack();
      return;
    }
    return props.navigation.navigate(ChangePasswordScreen.routeName, {
      user: item,
    });
  };
  const onCloseModel = () => {
    setRecievedOtp('');
    setPhoneNumber('');
    setCheckUsername(false);
    setCheckPassword(false);
    setUsers(false);
    setShowModel(false);
    setOtpInput('');
    setSelectedCountryCode('+1');
  };
  return (
    <Fragment>
      <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
        {/* <CountryCodeModal onSelectCountryCode={item => {}} /> */}
        {CountryCodeModal({})}
        <KeyboardAvoidingView
          onTouchStart={() => {
            setShowCountryCodeModel(false);
          }}
          behavior={Platform.OS == 'ios' ? 'padding' : ''}
          scrollEnabled={false}
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{marginHorizontal: getHp(10)}}
            onTouchStart={() => {
              setShowCountryCodeModel(false);
            }}>
            <TouchableOpacity
              style={[
                {
                  marginTop: getHp(5),
                },
              ]}
              onPress={() => props.navigation.goBack()}>
              <Back name="chevron-back" color={'#000'} size={getHp(30)} />
            </TouchableOpacity>
            <View style={styles.checkBoxStyle}>
              <Checkbox
                onCheck={() => {
                  setCheckPassword(false);
                  setCheckUsername(!checkUsername);
                }}
                isChecked={checkUsername}
              />
              <View style={{marginTop: getHp(40)}}>
                <Text style={styles.textStyle}>{'Find Username'}</Text>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: '#999999',
                      fontSize: FONTSIZE.Text11,
                    },
                  ]}>
                  {'Enter your phone number to get your username.'}
                </Text>
              </View>
            </View>

            <View style={[styles.checkBoxStyle, {marginTop: getHp(10)}]}>
              <Checkbox
                onCheck={() => {
                  setCheckUsername(false);
                  setCheckPassword(!checkPassword);
                }}
                isChecked={checkPassword}
              />
              <View>
                <Text style={styles.textStyle}>{'Reset Password'}</Text>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: '#999999',
                      fontSize: FONTSIZE.Text11,
                    },
                  ]}>
                  {'Enter your phone number to change your password.'}
                </Text>
              </View>
            </View>

            <View style={[styles.phoneNumberContainer]}>
              <SelectedCountryCodeShowTray
                countryCodeTextStyle={[
                  styles.phoneNumberText,
                  {height: getHp(42)},
                ]}
              />
              <View style={[styles.phoneNumberTextContainer]}>
                <TextInput
                  keyboardType={'numeric'}
                  autoCapitalize={false}
                  returnKeyType="done"
                  placeholderTextColor={'#999999'}
                  placeholder={'Phone Number'}
                  style={styles.phoneNumberText}
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                />
              </View>
            </View>
            {OtpInputAndResendTray({
              otpInputTextStyle: {width: wp(55)},
              sendCodeContainerStyle: {height: getHp(38)},
              otpInputContainerStyle: styles.otpInputContainerStyle,
              phoneNumber,
              onSendOtp,
            })}
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

      {showModel && (
        <CenterRoundBlurView>
          <View style={[styles.blurUpperContainer]}>
            <View>
              <Text style={styles.availableProfileText}>
                Available Profiles
              </Text>
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: '#999999',
                    fontSize: FONTSIZE.Text13,
                    marginTop: getHp(5),
                  },
                ]}>
                Select profile for continue
              </Text>
            </View>

            <TouchableOpacity onPress={onCloseModel}>
              <CloseGreyCircularSvg />
            </TouchableOpacity>
          </View>
          <Lists.NewToggleList
            containerStyle={{maxHeight: getHp(500)}}
            dividerStyle={{marginVertical: getHp(15)}}
            heading={''}
            ListData={users}
            ListTile={({item}) => {
              return (
                <ListTiles.FriendTile
                  onAvatarPress={() => onSelectProfile(item)}
                  onTitlePress={() => onSelectProfile(item)}
                  tileAvatarContainerStyle={{width: '18%'}}
                  tileContainerStyle={{paddingHorizontal: getWp(20)}}
                  avatar={item?.profileImage?.filePath ?? null}
                  title={item.fullName}
                  subTitle={item.username}
                />
              );
            }}
          />
          <View style={{height: getHp(45)}} />
        </CenterRoundBlurView>
      )}
    </Fragment>
  );
}
FindUserNameResetPasswordScreen.routeName = '/FindUserNameResetPasswordScreen';

const styles = StyleSheet.create({
  divider: {},
  blurUpperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getWp(20),
    paddingTop: getHp(20),
  },
  availableProfileText: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.5,
    color: '#000',
  },
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: getHp(20),
    flexDirection: 'column',
  },
  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  textStyle: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text22,
    color: '#000000',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'blue',
    marginTop: getHp(41),
    paddingHorizontal: getHp(15),
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
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(10),
  },
  phoneNumberTextContainer: {
    height: getHp(42),
    width: wp(65),
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(10),
  },
  otpInputContainerStyle: {
    marginTop: getHp(15),
    paddingHorizontal: getHp(15),
  },
});

export default observer(FindUserNameResetPasswordScreen);

var demoUsers = [
  {
    id: 1,
    phoneNumber: '8720880991',
    email: 'music1@gmail.com',
    fullName: 'Music1',
    birthday: null,
    state: null,
    city: 'Indore, Madhya Pradesh, India',
    about: 'Dress',
    description: null,
    profession: null,
    vendorType: 2,
    age: 1,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: [
      {
        code: 'aa',
        label: 'Afar',
        value: 1,
      },
      {
        code: 'ae',
        label: 'Avestan',
        value: 3,
      },
    ],
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: null,
    username: 'music1',
    gender: 0,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 1,
      fileName: 'FE90D058-4837-44A6-B355-683C11D3DE48.jpg',
      createdAt: '2021-09-21T12:30:46.420Z',
      filePath:
        'https://bounce-prod-media.s3.amazonaws.com/2021-09-21/e4cc487859f670c8ebb9195dc0e42bc06fee1621/f6d9f71d1393ea964396b44ef326d3e2/FE90D058-4837-44A6-B355-683C11D3DE48.jpg',
      fileSequence: 0,
    },
    gallery: [
      {
        id: 18,
        fileName: 'image-1632228267640.jpg',
        createdAt: '2021-09-21T12:46:12.751Z',
        filePath:
          'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/095339bcebf9635410bffae261277b01ada8d50a/28e832942084f01977151226a7106d4e/image-1632228267640.jpg',
        fileSequence: 0,
      },
    ],
  },
  {
    id: 2,
    phoneNumber: '8720880991',
    email: 'guest1@gmail.com',
    fullName: 'Guest 1',
    birthday: '2021-05-21 00:00:00',
    state: null,
    city: null,
    about: null,
    description: null,
    profession: null,
    vendorType: 0,
    age: 0,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: null,
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: [
      'f3lbHsDmwEuZnj7HZCCtVA:APA91bGjP4LuTepKrDu6GJYtZjbOaTxFgYUXS00xYqPNs083eeiIx_aeTeMIgGrwhUqwCnTV5eLgwoDMSbyOWVUev93lwNU3g0h6cSs7lA9Z_0xSoiWOOPj2bk1FVaNvWnRjhbEL52eN',
    ],
    username: 'guest1',
    gender: null,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 13,
      fileName: 'image-1632227609690.jpg',
      createdAt: '2021-09-21T12:35:12.510Z',
      filePath:
        'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/d530e5553fc52aa2b9dbf3d4da73acd2ee6fbf25/bb57f0e25dc40d7dc9eb35277794f93e/image-1632227609690.jpg',
      fileSequence: 0,
    },
    gallery: [],
  },
  {
    id: 4,
    phoneNumber: '8720880991',
    email: 'cleaningcrew1@gmail.com',
    fullName: 'Clearning crew 1',
    birthday: null,
    state: null,
    city: 'Indore, Madhya Pradesh, India',
    about: 'Desc',
    description: null,
    profession: null,
    vendorType: 8,
    age: 1,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: [
      {
        code: 'aa',
        label: 'Afar',
        value: 1,
      },
      {
        code: 'ab',
        label: 'Abkhazian',
        value: 2,
      },
      {
        code: 'ae',
        label: 'Avestan',
        value: 3,
      },
    ],
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: null,
    username: 'cleaningcrew1',
    gender: 0,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 19,
      fileName: 'C04FA262-983B-4B34-B73F-4C227F774EC3.jpg',
      createdAt: '2021-09-21T12:47:26.608Z',
      filePath:
        'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/cc0b8e0aa32296e636372248dbf5ddc496323678/38cfe6848d6560112b33e756d2e3e413/C04FA262-983B-4B34-B73F-4C227F774EC3.jpg',
      fileSequence: 0,
    },
    gallery: [
      {
        id: 20,
        fileName: 'image-1632228352037.jpg',
        createdAt: '2021-09-21T12:47:39.584Z',
        filePath:
          'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/ca51540736f168c8c0a0b73cf72f9e9a0191943d/b65cc6b05146bdeb873e11bffc5a461f/image-1632228352037.jpg',
        fileSequence: 0,
      },
      {
        id: 21,
        fileName: 'image-1632228352037.jpg',
        createdAt: '2021-09-21T12:47:39.767Z',
        filePath:
          'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/f9723bf0743cddae762a19634623790453c89dcd/b65cc6b05146bdeb873e11bffc5a461f/image-1632228352037.jpg',
        fileSequence: 0,
      },
    ],
  },
  {
    id: 5,
    phoneNumber: '8720880991',
    email: 'eventrental1@gmailcom',
    fullName: 'Event rental 1',
    birthday: null,
    state: null,
    city: 'Indore, Madhya Pradesh, India',
    about: 'Desc',
    description: null,
    profession: null,
    vendorType: 7,
    age: 1,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: [
      {
        code: 'aa',
        label: 'Afar',
        value: 1,
      },
      {
        code: 'ab',
        label: 'Abkhazian',
        value: 2,
      },
      {
        code: 'ae',
        label: 'Avestan',
        value: 3,
      },
    ],
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: null,
    username: 'evntrental1',
    gender: 0,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 22,
      fileName: 'D612D7D2-E28A-459A-ACAF-708DD5A176C1.jpg',
      createdAt: '2021-09-21T12:48:44.888Z',
      filePath:
        'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-21/7244ac56b68225e67edc9c03cf800bfe3b7c08b4/213f08ddb8b974292c378cef6d715834/D612D7D2-E28A-459A-ACAF-708DD5A176C1.jpg',
      fileSequence: 0,
    },
    gallery: [],
  },
  {
    id: 15,
    phoneNumber: '8720880991',
    email: 'drinks11@gmail.com',
    fullName: 'Drinks 11',
    birthday: null,
    state: null,
    city: 'Indore, Madhya Pradesh, India',
    about: 'Desc',
    description: null,
    profession: null,
    vendorType: 4,
    age: 1,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: [
      {
        code: 'aa',
        label: 'Afar',
        value: 1,
      },
      {
        code: 'ab',
        label: 'Abkhazian',
        value: 2,
      },
      {
        code: 'ae',
        label: 'Avestan',
        value: 3,
      },
    ],
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: null,
    username: 'drinks11',
    gender: 0,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 61,
      fileName: 'EA4CF424-F9C3-4773-A340-105A95242EC5.jpg',
      createdAt: '2021-09-22T07:33:58.432Z',
      filePath:
        'https://bounce-prod-media.s3.amazonaws.com/2021-09-22/aee37b574204676e1c36df290ac25fd49826a3d1/cd197383d8a8a5646ce07350890c05aa/EA4CF424-F9C3-4773-A340-105A95242EC5.jpg',
      fileSequence: 0,
    },
    gallery: [
      {
        id: 62,
        fileName: 'image-1632295971065.jpg',
        createdAt: '2021-09-22T07:34:38.721Z',
        filePath:
          'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-22/90e3d623abd80d00695eaf0c5b800a7420280b37/b74b96208b09cdaeadf59a3e79eb4c93/image-1632295971065.jpg',
        fileSequence: 0,
      },
      {
        id: 63,
        fileName: 'image-1632295971065.jpg',
        createdAt: '2021-09-22T07:34:38.889Z',
        filePath:
          'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-22/710cc4f9e57bbb1b0a99ffc47964f3c0dbe97228/b74b96208b09cdaeadf59a3e79eb4c93/image-1632295971065.jpg',
        fileSequence: 0,
      },
    ],
  },
  {
    id: 16,
    phoneNumber: '8720880991',
    email: 'guest2@gmail.com',
    fullName: 'Guest 2',
    birthday: '2021-09-24 00:00:00',
    state: null,
    city: null,
    about: null,
    description: null,
    profession: null,
    vendorType: 0,
    age: 0,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: null,
    countryCode: {
      id: 229,
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      dial_code: '+1',
    },
    firebaseTokens: [
      'cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp',
    ],
    username: 'guest2',
    gender: null,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 75,
      fileName: 'image-1632461972667.jpg',
      createdAt: '2021-09-24T05:41:17.507Z',
      filePath:
        'https://bounce-prod-media.s3.amazonaws.com/2021-09-24/dbecbe1f2e39ff36b4747b75875317361c476537/fc74c1f7ea0309c6a310baa04952bbca/image-1632461972667.jpg',
      fileSequence: 0,
    },
    gallery: [],
  },
  {
    id: 17,
    phoneNumber: '8720880991',
    email: 'surajsugandhi11@gmail.com',
    fullName: 'Suraj Dev',
    birthday: '2021-09-24 00:00:00',
    state: null,
    city: null,
    about: null,
    description: null,
    profession: null,
    vendorType: 0,
    age: 0,
    snapchatUsername: null,
    instagramUsername: null,
    tiktokUsername: null,
    twitterUsername: null,
    linkedInUsername: null,
    language: null,
    countryCode: {
      id: 97,
      code: 'IN',
      flag: '🇮🇳',
      name: 'India',
      dial_code: '+91',
    },
    firebaseTokens: [
      'cjCXa9fqBEgdlvQ60IvG_3:APA91bGFLXWJJaPUVXCvQAIyGohCdmfgJB1grdffP-UrFDLI8kd6AzY6RDxXxXbVpdbY2VrOhDuIHusfnaDv5ck8sqTqkctZD5VMZPv1JD27MIlb-CheOMc91P8E-dVMXYBOemoQixVp',
    ],
    username: 'surajdev1',
    gender: null,
    numberOfRatings: 0,
    averageRating: 0,
    instaData: null,
    instaId: null,
    friendCount: false,
    hosting: false,
    attending: false,
    interested: false,
    profileImage: {
      id: 76,
      fileName: 'image-1632474861017.jpg',
      createdAt: '2021-09-24T09:16:06.509Z',
      filePath:
        'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-09-24/c8f84447e3f1bd37d605864871eedf59b4790e6a/747f52b8a4dce83fdb5ff0c8fc656710/image-1632474861017.jpg',
      fileSequence: 0,
    },
    gallery: [],
  },
];
