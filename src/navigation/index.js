import React, {Component} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '../Screens/BounceVendors/Onboarding/Splash';
import {connect} from 'react-redux';
import {fetchMiscData} from '../reducer/CurrentData';
import MobxStore from '../mobx';
import {observer} from 'mobx-react';
import AuthStackNavigator from './AuthNavigation';
import VendorNavigation from './VendorNavigation';
import UserNavigation from './UserNavigation';
import NavigationService from './NavigationService';
import {AccountService} from '../app/services';
import * as PocsScreens from '../Screens/Pocs';

class Navigation extends Component {
  componentDidMount = () => {
    //this.props.fetchMiscData();
    AccountService.deserialize();
  };
  createAppNavigation = () => {
    //return PocsScreens.ImageCropPickerScreen;
    const {authStore} = MobxStore;
    if (!authStore.isAutoLoginDone) {
      return SplashScreen;
    }

    if (authStore.user?.isAuthenticated && authStore?.isAutoLoginDone) {
      if (authStore.user.isVendor) {
        return VendorNavigation.stack;
      } else {
        return UserNavigation.stack;
      }
    } else {
      console.log('IS_LAND_HERE');
      return AuthStackNavigator.Stack;
    }
  };
  render() {
    MobxStore.authStore.user;
    const Navigator = this.createAppNavigation();
    return (
      <NavigationContainer
        // linking={{
        //   prefixes: ['bounceeventapp-deeplink.com', 'bounceapp://']
        // }}
        ref={NavigationService._navigationRef}
        theme={this.props.theme}>
        <Navigator />
      </NavigationContainer>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMiscData: () => {
      dispatch(fetchMiscData());
    },
  };
};
export default observer(Navigation);
