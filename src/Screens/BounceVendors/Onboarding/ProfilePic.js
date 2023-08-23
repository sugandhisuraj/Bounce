import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, ProgressCircle} from '@components';
import {UploadBlue, BlackClose, Google} from '@svg';
import {connect, useSelector, useDispatch} from 'react-redux';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';

import UserNavigation from '../../../navigation/UserNavigation';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {LocalStorage} from '../../../app/utils/localStorage';
import {UserContext} from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import moment from 'moment';
import {
  ApiClient,
  AuthService,
  NotificationService,
} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import UserAddInterestScreen from './UserAddInterestScreen';
import {UserAgreementPopup} from '../../../components/AppPopups';
export default function ProfilePic(props) {
  const agreementRef = useRef();
  const {authStore} = MobxStore;
  const {navigation} = props;
  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [FCM, setFCM] = useState('');
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {phoneNumber, countryCode, username, password, fullName} =
    props.route.params;

  useEffect(() => {
    // let token = NotificationService.getToken();
    // setFCM(token);
  }, []);

  const handleSubmit = async (saveUser = false) => {
    try {
      if (picture == null) {
        return Toast('Please select a picture!');
      }
      if (!saveUser) {
        agreementRef.current.togglePopup(true);
        return;
      }
      setLoader(true);
      let birthday =
        moment(props.route.params.birthday).format('YYYY-MM-DD') + ' 00:00:00';
      console.log('BIRTHDAY Final---->', birthday);
      let milliseconds = new Date().getTime();
      // console.log('PICTURE', picture);
      let imgObj = {
        uri: `${picture.path}`,
        type: 'image/jpeg',
        name: `image-${milliseconds}.jpg`,
      };
      let formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('birthday', birthday);
      //formData.append('age', age);
      formData.append('profileImageFile', imgObj);
      formData.append('vendorType', 0);
      //formData.append('email', email);
      formData.append('firebaseTokens', FCM);
      formData.append('phoneNumber', phoneNumber);
      formData.append('countryCode', JSON.stringify(countryCode));

      const userSignupResponse = await AuthService.signupUser(formData);
      console.log(
        'USER_SIGNUP_RESPONSE - ',
        JSON.stringify(userSignupResponse),
      );

      setTimeout(() => {
        navigation.navigate(UserAddInterestScreen.routeName, {
          userData: userSignupResponse,
        });
      }, 300);
    } catch (e) {
      let errorMsg =
        e.response.data.message ?? 'Something went wrong! Try Again';
      Toast(errorMsg);
    } finally {
      setLoader(false);
    }
  };

  const handleImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        setPicture(image);
      });
    } catch (error) {
      console.log('IMAGE_PICKER_ERROR - ', error);
    }
  };

  // const handleImage = () => {
  //   try {
  //     launchImageLibrary(
  //       {
  //         maxWidth: 300,
  //         maxHeight: 300,
  //         mediaType: 'photo',
  //         // cropping: true,
  //       },
  //       image => {
  //         // console.log(image);
  //         // console.log('PICTURE FIXED IN PICTURE');
  //         setPicture(image);
  //       },
  //     );
  //   } catch (error) {
  //     console.log('IMAGE_PICKER_ERROR - ', error);
  //   }

  // openFooter(fa)
  // launchImageLibrary({}, (response) => {
  //     console.log('Respuesta =', response);
  //     // setPhotoURI(response.uri);
  //     if (response.didCancel) {
  //         alert('Subida cancelada');
  //     } else if (response.error) {
  //         alert('Error encontrado: ', error);
  //     } else {
  //         console.log("IMAGE RESPONSE", response);
  //         // let img = {
  //         //     uri: response.uri,
  //         //     type: response.type,
  //         //     name: response.fileName ||
  //         //         response.uri.substr(response.uri.lastIndexOf('/') + 1)
  //         // }
  //         setPicture(response.uri)
  //     }
  // });

  // };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => setPicture(null)}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };
  return (
    <Fragment>
      <UserAgreementPopup
        ref={agreementRef}
        onPressAccept={() => handleSubmit(true)}
      />

      <Scaffold>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader && (
          <KeyboardAwareScrollView
            bounces={false}
            alwaysBounceVertical={false}
            style={{flex: 1, backgroundColor: '#FBFBFB'}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Text style={styles.HeadingStyle}>
                {'Add a 🔥🔥🔥 profile pic!'}
              </Text>

              <View style={{marginVertical: 40}}>
                {picture == null ? (
                  <TouchableOpacity
                    onPress={handleImage}
                    style={{
                      padding: 20,
                      marginVertical: getHp(60),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 100,
                        backgroundColor: '#fff',
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowOpacity: 0.3,
                        elevation: 2,
                        shadowRadius: 15,
                        shadowOffset: {width: 1, height: 13},
                      }}>
                      <UploadBlue height={getHp(100)} width={getHp(100)} />
                    </View>
                    <Text style={styles.uploadText}>
                      {'Upload Profile Picture'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View
                      style={[
                        styles.shadowBox,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <TouchableOpacity
                        onPress={() => openFooter(true)}
                        style={{marginVertical: 30}}>
                        <Avatar
                          source={{uri: picture.path}}
                          size={getHp(224)}
                          rounded
                        />

                        <View style={styles.shadowBox}>
                          <UploadBlue
                            height={getHp(69)}
                            width={getHp(69)}
                            style={{
                              position: 'absolute',
                              alignSelf: 'center',
                              bottom: -30,
                              // left: 75,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        {picture == null ? null : <ImageFooter />}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: getHp(15),
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <ProgressCircle
                  currentProgress={4}
                  containerStyle={{marginBottom: 20}}
                />

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Buttons.PrimaryButton
                    containerStyle={{width: '47%'}}
                    onPress={() => props.navigation.goBack()}
                    title={'Go back'}
                    withShadow={true}
                  />
                  <Buttons.PrimaryButton
                    title={'Continue'}
                    textColor={'#FFF'}
                    containerStyle={{width: '47%', backgroundColor: '#1FAEF7'}}
                    withShadow={false}
                    onPress={() => handleSubmit(true)}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Scaffold>
    </Fragment>
  );
}

ProfilePic.routeName = '/ProfilePic';

const styles = StyleSheet.create({
  uploadText: {
    fontSize: FONTSIZE.Text16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    marginTop: 15,
  },
  skip: {
    fontSize: FONTSIZE.Text19,
    color: '#1FAEF7',
    marginBottom: getHp(15),
    fontFamily: 'AvenirNext-Regular',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  signStyle: {
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#1FAEF7',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    color: '#000',
  },
  TitleStyle: {
    fontSize: 14,
    paddingVertical: 0,
    fontFamily: 'AvenirNext-Regular',
  },
  Card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
  shadowBox: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.3,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});

/*

import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, ProgressCircle} from '@components';
import {UploadBlue, BlackClose, Google} from '@svg';
import {connect, useSelector, useDispatch} from 'react-redux';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';

import UserNavigation from '../../../navigation/UserNavigation';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {LocalStorage} from '../../../app/utils/localStorage';
import {UserContext} from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import moment from 'moment';
import {
  ApiClient,
  AuthService,
  NotificationService,
} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import UserAddInterestScreen from './UserAddInterestScreen';
import {UserAgreementPopup} from '../../../components/AppPopups';
export default function ProfilePic(props) {
  const agreementRef = useRef();
  const {authStore} = MobxStore;
  const {navigation} = props;
  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [FCM, setFCM] = useState('');
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    name,
    username,
    password,
    birthday,
    age,
    email,
    phoneNumber,
    countryCode,
  } = props.route.params;

  useEffect(() => {
    // let token = NotificationService.getToken();
    // setFCM(token);
  }, []);

  const handleSubmit = async (saveUser = false) => {
    try {
      if (picture == null) {
        return Toast('Please select a picture!');
      }
      if (!saveUser) {
        agreementRef.current.togglePopup(true);
        return;
      }
      setLoader(true);
      let birthday =
        moment(props.route.params.birthday).format('YYYY-MM-DD') + ' 00:00:00';
      console.log('BIRTHDAY Final---->', birthday);
      let milliseconds = new Date().getTime();
      // console.log('PICTURE', picture);
      let imgObj = {
        uri: `${picture.path}`,
        type: 'image/jpeg',
        name: `image-${milliseconds}.jpg`,
      };
      let formData = new FormData();
      formData.append('fullName', name);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('birthday', birthday);
      formData.append('age', age);
      formData.append('profileImageFile', imgObj);
      formData.append('vendorType', 0);
      formData.append('email', email);
      formData.append('firebaseTokens', FCM);
      formData.append('phoneNumber', phoneNumber);
      formData.append('countryCode', JSON.stringify(countryCode));

      const userSignupResponse = await AuthService.signupUser(formData);
      console.log(
        'USER_SIGNUP_RESPONSE - ',
        JSON.stringify(userSignupResponse),
      );

      setTimeout(() => {
        navigation.navigate(UserAddInterestScreen.routeName, {
          userData: userSignupResponse,
        });
      }, 300);
    } catch (e) {
      let errorMsg =
        e.response.data.message ?? 'Something went wrong! Try Again';
      Toast(errorMsg);
    } finally {
      setLoader(false);
    }
  };

  const handleImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        setPicture(image);
      });
    } catch (error) {
      console.log('IMAGE_PICKER_ERROR - ', error);
    }
  };

  // const handleImage = () => {
  //   try {
  //     launchImageLibrary(
  //       {
  //         maxWidth: 300,
  //         maxHeight: 300,
  //         mediaType: 'photo',
  //         // cropping: true,
  //       },
  //       image => {
  //         // console.log(image);
  //         // console.log('PICTURE FIXED IN PICTURE');
  //         setPicture(image);
  //       },
  //     );
  //   } catch (error) {
  //     console.log('IMAGE_PICKER_ERROR - ', error);
  //   }

  // openFooter(fa)
  // launchImageLibrary({}, (response) => {
  //     console.log('Respuesta =', response);
  //     // setPhotoURI(response.uri);
  //     if (response.didCancel) {
  //         alert('Subida cancelada');
  //     } else if (response.error) {
  //         alert('Error encontrado: ', error);
  //     } else {
  //         console.log("IMAGE RESPONSE", response);
  //         // let img = {
  //         //     uri: response.uri,
  //         //     type: response.type,
  //         //     name: response.fileName ||
  //         //         response.uri.substr(response.uri.lastIndexOf('/') + 1)
  //         // }
  //         setPicture(response.uri)
  //     }
  // });

  // };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => setPicture(null)}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };
  return (
    <Fragment>
      <UserAgreementPopup
        ref={agreementRef}
        onPressAccept={() => handleSubmit(true)}
      />

      <Scaffold>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader && (
          <KeyboardAwareScrollView
            bounces={false}
            alwaysBounceVertical={false}
            style={{flex: 1, backgroundColor: '#FBFBFB'}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Text style={styles.HeadingStyle}>
                {'Add a 🔥🔥🔥 profile pic!'}
              </Text>

              <View style={{marginVertical: 40}}>
                {picture == null ? (
                  <TouchableOpacity
                    onPress={handleImage}
                    style={{
                      padding: 20,
                      marginVertical: getHp(60),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 100,
                        backgroundColor: '#fff',
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowOpacity: 0.3,
                        elevation: 2,
                        shadowRadius: 15,
                        shadowOffset: {width: 1, height: 13},
                      }}>
                      <UploadBlue height={getHp(100)} width={getHp(100)} />
                    </View>
                    <Text style={styles.uploadText}>
                      {'Upload Profile Picture'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View
                      style={[
                        styles.shadowBox,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <TouchableOpacity
                        onPress={() => openFooter(true)}
                        style={{marginVertical: 30}}>
                        <Avatar
                          source={{uri: picture.path}}
                          size={getHp(224)}
                          rounded
                        />

                        <View style={styles.shadowBox}>
                          <UploadBlue
                            height={getHp(69)}
                            width={getHp(69)}
                            style={{
                              position: 'absolute',
                              alignSelf: 'center',
                              bottom: -30,
                              // left: 75,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        {picture == null ? null : <ImageFooter />}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: getHp(15),
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <ProgressCircle
                  currentProgress={6}
                  containerStyle={{marginBottom: 20}}
                />

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Buttons.PrimaryButton
                    containerStyle={{width: '47%'}}
                    onPress={() => props.navigation.goBack()}
                    title={'Go back'}
                    withShadow={true}
                  />
                  <Buttons.PrimaryButton
                    title={'Continue'}
                    textColor={'#FFF'}
                    containerStyle={{width: '47%', backgroundColor: '#1FAEF7'}}
                    withShadow={false}
                    onPress={() => handleSubmit(false)}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Scaffold>
    </Fragment>
  );
}

ProfilePic.routeName = '/ProfilePic';

const styles = StyleSheet.create({
  uploadText: {
    fontSize: FONTSIZE.Text16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    marginTop: 15,
  },
  skip: {
    fontSize: FONTSIZE.Text19,
    color: '#1FAEF7',
    marginBottom: getHp(15),
    fontFamily: 'AvenirNext-Regular',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  signStyle: {
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 1,
    color: '#000',
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#1FAEF7',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'AvenirNext-Regular',
    color: '#000',
  },
  TitleStyle: {
    fontSize: 14,
    paddingVertical: 0,
    fontFamily: 'AvenirNext-Regular',
  },
  Card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 100,
  },
  CardContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
  shadowBox: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.3,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});

*/
