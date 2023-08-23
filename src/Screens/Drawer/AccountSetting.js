import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  PhoneNumber,
  ModalDropDownComponent,
  Scaffold,
  CustomButton,
  FloatingInput,
} from '@components';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Toast} from '@constants';
import MobxStore from '../../mobx';
import {ApiClient} from '../../app/services';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {observer} from 'mobx-react';
import { RegexCollection } from '../../app/constants';

function AccountSetting(props) {
  const {user: userObj} = MobxStore.authStore;
  const {user} = userObj;
  console.log('ACC_PAGE_TEST - ', JSON.stringify(user));
//
  let phoneValue = RegexCollection.convertToMobileNumber(user?.phoneNumber);
  if (typeof user?.countryCode == 'object' && user?.countryCode != null) {
    phoneValue = `${user.countryCode?.dial_code} ${phoneValue}`;
  }
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: '#FBFBFB'}}>
        <Header
          headerBackColor={{
            backgroundColor: '#FBFBFB',
            elevation: 0,
          }}
          back
          headerStyleProp={{
            letterSpacing: 0.3,
            fontSize: FONTSIZE.Text24,
          }}
          headerTitle={'My Account'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.container}>
          <FloatingInput
            editable={false}
            custom
            floatingLabel={'Username'}
            value={user?.username ?? ''}
          />
          {phoneValue != null && <FloatingInput
            editable={false}
            keyboardType={'numeric'}
            custom
            floatingLabel={'Phone Number'}
            value={phoneValue}
          />}

          <FloatingInput
            editable={false}
            custom
            floatingLabel={'Email'}
            value={user?.email ?? ''}
          />
          {/* <PhoneNumber /> */}
        </View>

        {/* <View style={{paddingHorizontal: getWp(10), paddingBottom: 80}}>
          <CustomButton
            complete
            bar
            onPress={handleSubmit}
            ButtonTitle={'Save Changes'}
          />
        </View> */}
      </ScrollView>
    </Scaffold>
  );
}
AccountSetting.routeName = '/AccountSetting';
const styles = StyleSheet.create({
  countryTitle: {
    fontSize: FONTSIZE.Text16,
    marginVertical: getHp(10),
    marginLeft: getWp(10),
    fontFamily: 'AvenirNext-Medium',
  },
  alertText: {
    fontFamily: 'AvenirNext-Italic',
    fontSize: FONTSIZE.Text11,
    marginLeft: getWp(5),
    marginTop: getHp(-8),
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
    paddingHorizontal: 10,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  TitleStyle: {},
  countryField: {
    height: getHp(58),
    borderRadius: 9.5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
    width: '20%',
    marginRight: getWp(10),
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default observer(AccountSetting);
