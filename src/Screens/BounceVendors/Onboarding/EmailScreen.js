import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, ProgressCircle,DismissKeyboard} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {FONTSIZE} from '@utils';
import {ScrollView} from 'react-native';
import UserNameScreen from './UsernameScreen';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import BirthDayScreen from './BirthDayScreen';
import {ApiClient} from '../../../app/services';
import {RegexCollection} from '../../../app/constants';
import {getHp} from '../../../app/utils';
import {AuthService} from '../../../app/services';
import MobxStore from '../../../mobx';
export default function EmailScreen(props) {
  const {navigation} = props;
  const {name, username, password, phoneNumber, countryCode} =
    props?.route?.params;
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [isKeyboardOpen, keyboardEvent, hideKeyboard] = useKeyboardStatus();
  const [loader, setLoader] = useState(false);
  // const handleSubmit = async () => {
  //     if (email.length > 0) {
  //         navigation.navigate(BirthDayScreen.routeName, {
  //             email: email,
  //             name,
  //             username,
  //             password,
  //         });
  //     } else {
  //         Toast('Please enter your email!');
  //     }
  // };

  const handleSubmit = async () => {
    try {
      if (email.length == 0) {
        return Toast('Email is required!');
      }
      if (!RegexCollection.EmailRegex.test(email)) {
        return Toast('Invalid Email!');
      }

      hideKeyboard();
      MobxStore.toggleLoader(true);
      const isUserNameExist = await AuthService.validateUser({
        useremail: email.toLowerCase(),
      });
      if (isUserNameExist.isUserExist) {
        return Toast('Email already exist!');
      }
      navigation.navigate(BirthDayScreen.routeName, {
        email: email.toLowerCase(),
        name,
        username,
        password,
        phoneNumber,
        countryCode,
      });
    } catch (error) {
      console.log(error);
      return Toast('Email already exist!');
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
            <Text style={styles.HeadingStyle}>{'What’s your email? 👋'}</Text>
            <View style={{marginTop: 100}}>
              <TextInput
                autoCapitalize={'none'}
                placeholder={'Email'}
                placeholderTextColor="#999"
                style={styles.textInput}
                onChangeText={value => setEmail(value)}
                value={email}
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
              currentProgress={4}
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
EmailScreen.routeName = '/EmailScreen';

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
    color: '#000000',
  },
});
