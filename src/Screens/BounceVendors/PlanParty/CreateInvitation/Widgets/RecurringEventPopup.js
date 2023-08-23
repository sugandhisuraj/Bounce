import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNCollapsible from 'react-native-collapsible';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../../../app/utils';
import {AppModal} from '../../../../../components/AppPopups/Frames';
import {EventPageWidgets, Seperator} from '../../../../../components';

IonIcons.loadFont();
MaterialCommunityIcons.loadFont();
const RecurringEventPopup = () => {
  const [showDoesNotEnd, setShowDoesNotEnd] = useState(false);

  const durationPicker = useCallback(() => {
    return (
      <EventPageWidgets.DurationDropDownPicker
        containerStyle={Styles.durationDropDownPickerContainer}
      />
    );
  }, []);

  const CommonFrame = props => {
    return (
      <View style={[Styles.commonFrameContainer, props.containerStyle]}>
        <View style={[{flexDirection: 'row'}]}>
          {props.leftIcon}
          <Text style={[Styles.commonFrameText]}>{props.text}</Text>
        </View>
        {props.rightIcon}
      </View>
    );
  };

  const DoesNotendSection = () => {
    return (
      <View style={{marginBottom: getHp(20)}}>
        <CommonFrame
          containerStyle={{paddingVertical: getHp(13)}}
          leftIcon={<View style={{width: getWp(25)}} />}
          text={'On a Date'}
          rightIcon={null}
        />
        <CommonFrame
          containerStyle={{paddingVertical: getHp(13)}}
          text={'After number of occurrences'}
          leftIcon={<View style={{width: getWp(25)}} />}
          rightIcon={null}
        />
      </View>
    );
  };
  return (
    <AppModal>
      <View style={[Styles.mainContainer]}>
        <CommonFrame
          leftIcon={<IonIcons name={'refresh-outline'} size={getHp(25)} />}
          text={'Every 5 Mins'}
        />
        <View style={{paddingHorizontal: getWp(15)}}>{durationPicker()}</View>

        <Seperator />

        <TouchableOpacity onPress={_ => setShowDoesNotEnd(i => !i)}>
          <CommonFrame
            containerStyle={{paddingVertical: getHp(13)}}
            leftIcon={
              <MaterialCommunityIcons size={getHp(25)} name={'link-variant'} />
            }
            text={'Does Not End'}
            rightIcon={
              <MaterialCommunityIcons size={getHp(30)} name={'chevron-right'} />
            }
          />
        </TouchableOpacity>
        <RNCollapsible collapsed={showDoesNotEnd}>
          {DoesNotendSection()}
        </RNCollapsible>
      </View>
    </AppModal>
  );
};

const Styles = StyleSheet.create({
  mainContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: getHp(70),
    //paddingVertical: getHp(20),
    paddingTop: getHp(20),
    //paddingBottom: getHp(10),
    backgroundColor: '#FFF',

    borderRadius: getHp(15),
  },

  durationDropDownPickerContainer: {marginVertical: getHp(20)},
  commonFrameText: {
    marginLeft: getWp(15),
    top: getHp(1),
    fontSize: FONTSIZE.Text15,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    fontWeight: '500',
    alignSelf: 'center',
  },
  commonFrameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getWp(15),
    justifyContent: 'space-between',
  },
});
export default RecurringEventPopup;
