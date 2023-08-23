import React, {Fragment, Component} from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';

import {AgreementHTML} from './agreement';
import {CenterRoundBlurView} from '../Frames';
import {Buttons} from '../..';
import Styles from './indexCss';
import {FONTSIZE, getHp} from '../../../app/utils';

class UserAgreementPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
  }

  togglePopup = (status = false) => {
    this.setState(() => ({popupVisible: status}));
  };
  onAcceptPress = () => {
    const {onPressAccept} = this.props;
    this.setState({popupVisible: false}, () =>  onPressAccept());
   
  }
  render() {
    if (!this.state.popupVisible) {
      return null;
    }
    
    return (
      <Fragment>
        <CenterRoundBlurView
          showClose={true}
          onClosePress={() => this.togglePopup(false)}
          centerViewContainerStyle={[Styles.centerViewContainerStyle]}>
          <Text style={[Styles.endUserAgreement]}>
            End User License Agreement
          </Text>
          <View style={{height: '85%', marginTop: getHp(10)}}>
            <WebView source={{html: AgreementHTML}} />
          </View>
          <Buttons.LinearGradient
            onPress={this.onAcceptPress}
            title={'Accept'}
            titleStyle={Styles.acceptTitleStyle}
            showArrow={false}
            linearGradientStyle={Styles.acceptLinearGradient}
          />
        </CenterRoundBlurView>
      </Fragment>
    );
  }
}
export default UserAgreementPopup;
