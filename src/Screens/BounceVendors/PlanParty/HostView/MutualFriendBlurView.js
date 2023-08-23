import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BlurView} from '@components';
import {FONTSIZE, getHp, getWp} from '../../../../app/utils';
import {CenterRoundBlurView} from '../../../../components/AppPopups/Frames';
AntDesign.loadFont();
const MutualFriendBlurView = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.toggleMutualFriendBlurView = (status = null) => {
      setIsVisible(i => (status ? status : !i));
    };
  }, []);

  if (!isVisible) {
    return null;
  }
  return (
    <CenterRoundBlurView
      showClose
      onClosePress={() => window.toggleMutualFriendBlurView(false)}>
      <View style={[Styles.blurWhiteContainer]}>
        <Text style={[Styles.avgMutualText]}>Average Mutual Friends</Text>
        <Text style={[Styles.mutualText]}>
          The average number of mutual friends each guest has on your guest
          list. The the higher this number, the more fun they’ll have!
        </Text>
      </View>
    </CenterRoundBlurView>
  );
};

const Styles = StyleSheet.create({ 
  blurWhiteContainer: {
    backgroundColor: '#FFF',
    borderRadius: getHp(25),
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    paddingHorizontal: getWp(27),
  },
  avgMutualText: {
    marginTop: getHp(20),
    fontWeight: '600',
    fontSize: FONTSIZE.Text20,
    fontFamily: 'AvenirNext-Medium',
  },
  mutualText: {
    marginTop: getHp(20),
    fontWeight: '400',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
    marginBottom: getHp(31),
  },  
});
export default MutualFriendBlurView;
