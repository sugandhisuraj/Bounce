import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BlurView} from '@components';
import styles from './indexCss';
AntDesign.loadFont();

class InfoBlurView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      infoData: InfoBlurView.types.forAvgMutualInfo,
    };
  }

  componentDidMount = () => {
    window.showAvgFriendInfo = () => {
      this.setState(() => {
        return {
          isVisible: true,
          infoData: InfoBlurView.types.forAvgMutualInfo,
        };
      });
    };

    window.showSkipAddInterestInfo = () => {
      this.setState(() => {
        return {
          isVisible: true,
          infoData: InfoBlurView.types.forSkipAddInterest,
        };
      });
    };
  };

  hideBlurView = () => {
    this.setState(o => {
      return {
        isVisible: false,
      };
    });
  };
  render() {
    const {isVisible, infoData} = this.state;
    return (
      <BlurView isVisible={isVisible}>
        <View style={[styles.infoBlurContainer]}>
          <View style={[styles.blurWhiteContainer]}>
            <Text style={[styles.infoTextHeading]}>{infoData.heading}</Text>
            <Text style={[styles.infoText]}>{infoData.info}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.hideBlurView}
          style={[styles.closeBlurStyle]}>
          <AntDesign style={[styles.closeIcon]} name={'close'} />
        </TouchableOpacity>
      </BlurView>
    );
  }

  static types = {
    forAvgMutualInfo: {
      heading: `Average Mutual Friends`,
      info: `The average number of mutual friends each guest has on your guest
            list. The the higher this number, the more fun they’ll have!`,
    },
    forSkipAddInterest: {
      heading: `Add Interest`,
      info: `Without your interests it’s more difficult to find the events and activities you enjoy most, and you won’t be able to find events or acitivities`,
    },
  };
}
export default InfoBlurView;
