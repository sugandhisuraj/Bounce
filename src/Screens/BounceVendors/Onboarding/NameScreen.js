import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Checkbox,
  CustomButton,
  ProgressCircle,
  DismissKeyboard,
} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {FONTSIZE, getHp, getWp} from '@utils';
import {ScrollView} from 'react-native';
import UserNameScreen from './UsernameScreen';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ContactNumberScreen from './ContactNumberScreen';
import {Buttons, TextInputs} from '../../../components';
import {FONTFAMILY} from '../../../app/utils';
import MobxStore from '../../../mobx';
import {AuthService} from '../../../app/services';
export default function NameScreen(props) {
  const {navigation} = props;
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardOpen, keyboardEvent, hideKeyboard] = useKeyboardStatus();

  //console.log('TEST_EV2 - ', Dimensions.get('window').height - keyboardEvent?.endCoordinates?.height);
  const handleSubmit = async () => {
    try {
      if (fullName.length == 0) {
        return Toast('Fullname is required!');
      }
      if (username.length == 0) {
        return Toast('Username is required!');
      }
      if (password.length < 7) {
        return Toast('Password should be 8 characters long !');
      }
      hideKeyboard();
      MobxStore.toggleLoader(true);
      const isUserNameExist = await AuthService.validateUser({
        username: username.toLowerCase(),
      });
      console.log('IS_USER_NAME_EXIST - ', isUserNameExist);

      if (isUserNameExist.isUserExist) {
        return Toast('User already exist');
      }
      navigation.navigate(ContactNumberScreen.routeName, {
        username: username.toLowerCase(),
        password: password,
        fullName,
      });
    } catch (error) {
      Toast('User already exist');
      console.log(error);
    } finally {
      MobxStore.toggleLoader(false);
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
            <Text style={styles.HeadingStyle}>{'Sign Up 👋'}</Text>
            <Text style={styles.titleSubHeadingText}>
              You won’t be able to change this info
            </Text>

            <TextInputs.PrimaryInput
              containerStyle={{marginTop: getHp(30)}}
              placeholder={'full name'}
              onChangeText={setFullName}
              value={fullName}
              textInputProps={{
                autoCompleteType:'name',
                textContentType: 'name'
              }}
            />
            <TextInputs.PrimaryInput
              containerStyle={{marginTop: getHp(15)}}
              placeholder={'@username'}
              onChangeText={setUsername}
              value={username}
              textInputProps={{
                autoCompleteType:'username',
                textContentType: 'username'
              }}
            />
            <TextInputs.PasswordInput
              containerStyle={{marginTop: getHp(15)}}
              placeholder={'password'}
              onChangeText={setPassword}
              value={password}
              textInputProps={{
                autoCompleteType:'password',
                textContentType: 'password'
              }}
            />
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
              currentProgress={1}
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
              {/* <CustomButton userContinue onPress={handleSubmit} /> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </Scaffold>
  );
}
NameScreen.routeName = '/NameScreen';

const styles = StyleSheet.create({
  titleSubHeadingText: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
    color: '#999',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
  },
  textStyle: {
    fontFamily: 'AvenirNext-Medium',
    color: '#999999',
    fontSize: FONTSIZE.Text17,
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
    padding: 15,
    flexDirection: 'column',
  },
  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHp(40),
    alignSelf: 'center',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  textInput: {
    width: '47%',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 10,
    color: '#000000',
  },
  nameInputContainer: {
    marginTop: getHp(100),
    marginHorizontal: getWp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

/*

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Checkbox,
  CustomButton,
  ProgressCircle,
  DismissKeyboard,
} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {FONTSIZE, getHp, getWp} from '@utils';
import {ScrollView} from 'react-native';
import UserNameScreen from './UsernameScreen';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ContactNumberScreen from './ContactNumberScreen';
import {Buttons} from '../../../components';

export default function NameScreen(props) {
  const {navigation} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isKeyboardOpen, keyboardEvent, hideKeyboard] = useKeyboardStatus();

  //console.log('TEST_EV2 - ', Dimensions.get('window').height - keyboardEvent?.endCoordinates?.height);
  const handleSubmit = async () => {
    if (firstName.length == 0) {
      return Toast('Please enter first name!');
    }
    if (lastName.length == 0) {
      return Toast('Please enter last name!');
    }

    hideKeyboard();
    navigation.navigate(ContactNumberScreen.routeName, {
      name: firstName + ' ' + lastName,
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
            <Text style={styles.HeadingStyle}>{'What’s your name? 👋'}</Text>

            <View style={styles.nameInputContainer}>
              <TextInput
                placeholder={'First Name'}
                placeholderTextColor="#999"
                style={styles.textInput}
                onChangeText={setFirstName}
                value={firstName}
              />
              <TextInput
                placeholder={'Last Name'}
                placeholderTextColor="#999"
                style={styles.textInput}
                onChangeText={setLastName}
                value={lastName}
              />
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
              currentProgress={1}
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
      return (
        <Scaffold>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            scrollEnabled={!isKeyboardOpen}
            bounces={false}
            alwaysBounceVertical={false}
            style={{flex: 1, backgroundColor: '#FBFBFB'}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Text style={styles.HeadingStyle}>{'What’s your name? 👋'}</Text>
    
              <View style={styles.nameInputContainer}>
                <TextInput
                  placeholder={'First Name'}
                  placeholderTextColor="#999"
                  style={styles.textInput}
                  onChangeText={setFirstName}
                  value={firstName}
                />
                <TextInput
                  placeholder={'Last Name'}
                  placeholderTextColor="#999"
                  style={styles.textInput}
                  onChangeText={setLastName}
                  value={lastName}
                />
              </View>
    
              <View
                style={{
                  position: 'absolute',
                  bottom: isKeyboardOpen
                    ? keyboardEvent?.endCoordinates?.height
                      ? getHp(keyboardEvent?.endCoordinates?.height - 20)
                      : getHp(15)
                    : getHp(15),
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <ProgressCircle
                  currentProgress={1}
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
            </View>
          </ScrollView>
        </Scaffold>
      );
    }
    NameScreen.routeName = '/NameScreen';
    
    const styles = StyleSheet.create({
      textStyle: {
        fontFamily: 'AvenirNext-Medium',
        color: '#999999',
        fontSize: FONTSIZE.Text17,
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
        padding: 15,
        flexDirection: 'column',
      },
      checkBoxStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHp(40),
        alignSelf: 'center',
      },
      HeadingStyle: {
        marginTop: 40,
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.2,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text26,
      },
      textInput: {
        width: '47%',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text22,
        fontFamily: 'AvenirNext-Medium',
        marginTop: 10,
        color: '#000000',
      },
      nameInputContainer: {
        marginTop: getHp(100),
        marginHorizontal: getWp(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });

    */
