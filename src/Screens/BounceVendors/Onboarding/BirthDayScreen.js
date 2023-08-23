import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, DatePicker, ProgressCircle} from '@components';
import RadialGradient from 'react-native-radial-gradient';
import {Apple, Insta, Google} from '@svg';
import {connect, useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {FONTSIZE} from '@utils';
import ProfilePic from './ProfilePic';
import moment from 'moment';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {getHp} from '../../../app/utils';

var AGE;
export default function BirthDayScreen(props) {
  const {navigation} = props;
  const {name, username, password, email, phoneNumber, countryCode} =
    props.route?.params;
  console.log('BIRTHDAY PROPS -->', props.route.params);
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async () => {
    let userBirthDay = birthday || new Date();
    console.log('FINAL_USER_BIRTHDAY', userBirthDay);

    // if (birthday != '') {
    navigation.navigate(ProfilePic.routeName, {
      birthday: userBirthDay,
      username: username,
      password: password,
      email,
      age: moment().diff(userBirthDay, 'years'),
      name,
      phoneNumber,
      countryCode,
    });
    // } else {
    //   Toast('Please select birthday!');
    // }
  };
  const getAge = birthday => {
    var today = new Date();
    var birthDate = new Date(birthday);
    AGE = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      AGE--;
    }
    console.log('THIS IS AGE RETURNED', AGE);

    // setAge(age)
    // return age;
  };
  return (
    <Scaffold>
      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        style={{flex: 1, backgroundColor: '#FBFBFB'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.HeadingStyle}>{'When’s your birthday? 🎂'}</Text>

          {birthday !== '' && console.log('age: ' + getAge(birthday))}

          <View style={{marginTop: 100}}>
            <DatePicker
              setBirthday={setBirthday}
              birthday={
                birthday == '' ? '' : moment(birthday).format('MMM DD, YYYY')
              }
              tillToday
            />
            <Text style={[styles.infoText, {fontSize: FONTSIZE.Text14}]}>
              {'Optional!'}
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: getHp(15),
              width: '100%',
              alignSelf: 'center',
            }}>
            <ProgressCircle
              currentProgress={5}
              containerStyle={{marginBottom: getHp(20)}}
            />
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
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
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
}

BirthDayScreen.routeName = '/BirthDayScreen';

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
