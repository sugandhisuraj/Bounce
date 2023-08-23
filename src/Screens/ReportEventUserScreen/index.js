import React, {useState} from 'react';
import {View, Text, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {getHp, wait} from '../../app/utils';
import {Scaffold, Headers, Buttons} from '../../components';
import Styles from './indexCss';
import MobxStore from '../../mobx';
import ToastUtil from '../../app/constants/toast';

const ReportEventUserScreen = (props) => {
  const [userOrEventName, setUserOrEventName] = useState('');
  const [guidelineText, setGuidelineText] = useState('');
  const onSubmitReport = async () => {
    Keyboard.dismiss();
    MobxStore.toggleLoader(true);
    await wait(3000);
    setUserOrEventName(_ => '');
    setGuidelineText(_ => '');
    MobxStore.toggleLoader(false);
    ToastUtil('Report Successfully Submitted!');
  };
  const SpecificTextInput = ({containerStyle = {}, inputProps = {}}) => {
    return (
      <View style={[Styles.textInputContainer, containerStyle]}>
        <TextInput
          {...inputProps}
          style={[Styles.textInput]}
          placeholderTextColor={'#979797'}
          textAlignVertical={'top'}
          multiline={true}
          autoCapitalize={false}
          autoCorrect={false}
        />
      </View>
    );
  };
  return (
    <Scaffold
      statusBarStyle={{backgroundColor: '#FBFBFB'}}
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
      <Headers.BackTile 
      onBackPress={() => props.navigation.goBack()}
      title={'Report Event / User'} />
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1, backgroundColor: '#FBFBFB'}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={[Styles.reportInfoText]}>
          We’re constantly working on making Bounce a safe and comfortable
          environment. Please report any illegal, suspicious, and unsettling
          events or profiles here. Visit our{' '}
          <Text 
          onPress={() => console.log('PRESS')}
          style={[Styles.reportInfoText, Styles.guidelineText]}>
            guidlines
          </Text>{' '}
          for more information
        </Text>
        <View style={{marginTop: getHp(170), paddingHorizontal: getHp(15)}}>
          {SpecificTextInput({
            inputProps: {
              placeholder: 'Event or User Name',
              value: userOrEventName,
              onChangeText: setUserOrEventName,
            },
          })}
          {SpecificTextInput({
            inputProps: {
              placeholder: 'How did they break Bounce’s guidelines?',
              value: guidelineText,
              onChangeText: setGuidelineText,
            },
            containerStyle: Styles.breakGuidelineTextInput,
          })}
          <Buttons.LinearGradient
            onPress={onSubmitReport}
            titleStyle={[Styles.reportTitleStyle]}
            linearGradientStyle={Styles.reportContainerStyle}
            showArrow={false}
            title={'Report'}
          />
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
};

ReportEventUserScreen.routeName = '/ReportEventUserScreen';
export default ReportEventUserScreen;

/* linear-gradient(88.58deg, #00CFFF 12.45%, #71E4FF 89.74%) */
