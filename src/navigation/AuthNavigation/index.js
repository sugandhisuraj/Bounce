import React, {Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../../Screens/BounceVendors/Onboarding/LoginScreen';

//Vendor Signup screens
import VendorCategory from '../../Screens/Signup/Vendor/VendorCategory';
import VendorSignup from '../../Screens/Signup/Vendor/VendorSignup';
import VendorMarketProfile from '../../Screens/Signup/Vendor/VendorMarketProfile';
//Vendor Signup screens

//User Signup screens
import NameScreen from '../../Screens/BounceVendors/Onboarding/NameScreen';

import UserNameScreen from '../../Screens/BounceVendors/Onboarding/UsernameScreen';
import BirthDayScreen from '../../Screens/BounceVendors/Onboarding/BirthDayScreen';
import ProfilePic from '../../Screens/BounceVendors/Onboarding/ProfilePic';
import EmailScreen from '../../Screens/BounceVendors/Onboarding/EmailScreen';
import ContactNumberScreen from '../../Screens/BounceVendors/Onboarding/ContactNumberScreen';
import UserAddInterestScreen from '../../Screens/BounceVendors/Onboarding/UserAddInterestScreen';
import UserAuthOtpScreen from '../../Screens/BounceVendors/Onboarding/UserAuthOtpScreen';
import FindUserNameResetPasswordScreen from '../../Screens/BounceVendors/Onboarding/FindUserNameResetPasswordScreen';
import ChangePasswordScreen from '../../Screens/BounceVendors/Onboarding/ChangePasswordScreen';
//User Signup screens

//Testing screen

//Testing screen

const AuthStack = createStackNavigator();
class AuthStackNavigator {
  static routeName = '/AuthStack';
  static routeNameForVendor = '/AuthStackVendor';
  static routeNameForUser = '/AuthStackUser';
  static Stack = () => {
    return (
      <AuthStack.Navigator
        headerMode="screen"
        initialRouteName={LoginScreen.routeName}
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen
          name={LoginScreen.routeName}
          component={LoginScreen}
        />

        {/* Vendor Signup Screens */}
        <AuthStack.Screen
          name={VendorCategory.routeName}
          component={VendorCategory}
        />
        <AuthStack.Screen
          name={VendorSignup.routeName}
          component={VendorSignup}
        />
        <AuthStack.Screen
          name={VendorMarketProfile.routeName}
          component={VendorMarketProfile}
        />
        {/* Vendor Signup Screens */}

        {/* User Signup Screens */}
        <AuthStack.Screen name={NameScreen.routeName} component={NameScreen} />
        <AuthStack.Screen
          name={ContactNumberScreen.routeName}
          component={ContactNumberScreen}
        />
        <AuthStack.Screen
          name={UserAuthOtpScreen.routeName}
          component={UserAuthOtpScreen}
        />
        <AuthStack.Screen
          name={UserNameScreen.routeName}
          component={UserNameScreen}
        />
        <AuthStack.Screen
          name={BirthDayScreen.routeName}
          component={BirthDayScreen}
        />
        <AuthStack.Screen name={ProfilePic.routeName} component={ProfilePic} />
        <AuthStack.Screen
          options={{gestureEnabled: false}}
          name={UserAddInterestScreen.routeName}
          component={UserAddInterestScreen}
        />
        <AuthStack.Screen
          name={EmailScreen.routeName}
          component={EmailScreen}
        />
        <AuthStack.Screen
          name={FindUserNameResetPasswordScreen.routeName}
          component={FindUserNameResetPasswordScreen}
        />
        <AuthStack.Screen
          name={ChangePasswordScreen.routeName}
          component={ChangePasswordScreen}
        />
        {/* User Signup Screens */}
      </AuthStack.Navigator>
    );
  };
}

export default AuthStackNavigator;

/*
Old auth stack

import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/BounceVendors/Onboarding/LoginScreen';

//Vendor Signup screens
import VendorCategory from '../../Screens/Signup/Vendor/VendorCategory';
import VendorSignup from '../../Screens/Signup/Vendor/VendorSignup';
import VendorMarketProfile from '../../Screens/Signup/Vendor/VendorMarketProfile';
//Vendor Signup screens

//User Signup screens
import NameScreen from '../../Screens/BounceVendors/Onboarding/NameScreen';
 
import UserNameScreen from '../../Screens/BounceVendors/Onboarding/UsernameScreen';
import BirthDayScreen from '../../Screens/BounceVendors/Onboarding/BirthDayScreen';
import ProfilePic from '../../Screens/BounceVendors/Onboarding/ProfilePic';
import EmailScreen from '../../Screens/BounceVendors/Onboarding/EmailScreen'
import ContactNumberScreen from '../../Screens/BounceVendors/Onboarding/ContactNumberScreen';
import UserAddInterestScreen from '../../Screens/BounceVendors/Onboarding/UserAddInterestScreen';
import UserAuthOtpScreen from '../../Screens/BounceVendors/Onboarding/UserAuthOtpScreen';
import FindUserNameResetPasswordScreen from '../../Screens/BounceVendors/Onboarding/FindUserNameResetPasswordScreen';
import ChangePasswordScreen from '../../Screens/BounceVendors/Onboarding/ChangePasswordScreen';
//User Signup screens

//Testing screen
 
//Testing screen

const AuthStack = createStackNavigator();
class AuthStackNavigator {
  static routeName = '/AuthStack';
  static routeNameForVendor = '/AuthStackVendor';
  static routeNameForUser = '/AuthStackUser';
  static Stack = () => {
    return (
      <AuthStack.Navigator
        headerMode="screen"
        initialRouteName={LoginScreen.routeName}
        screenOptions={{ headerShown: false }}>

        <AuthStack.Screen
          name={LoginScreen.routeName}
          component={LoginScreen}
        />
  
    
        <AuthStack.Screen
          name={VendorCategory.routeName}
          component={VendorCategory}
        />
        <AuthStack.Screen
          name={VendorSignup.routeName}
          component={VendorSignup}
        />
        <AuthStack.Screen
          name={VendorMarketProfile.routeName}
          component={VendorMarketProfile}
        /> 
        <AuthStack.Screen
          name={NameScreen.routeName}
          component={NameScreen}
        /> 
         <AuthStack.Screen
          name={ContactNumberScreen.routeName}
          component={ContactNumberScreen}
        />
         <AuthStack.Screen
          name={UserAuthOtpScreen.routeName}
          component={UserAuthOtpScreen}
        />
        <AuthStack.Screen
          name={UserNameScreen.routeName}
          component={UserNameScreen}
        />
        <AuthStack.Screen
          name={BirthDayScreen.routeName}
          component={BirthDayScreen}
        />
        <AuthStack.Screen
          name={ProfilePic.routeName}
          component={ProfilePic}
        />
        <AuthStack.Screen 
        options={{gestureEnabled: false}}
          name={UserAddInterestScreen.routeName}
          component={UserAddInterestScreen}
        />
        <AuthStack.Screen
          name={EmailScreen.routeName}
          component={EmailScreen}
        />
        <AuthStack.Screen 
          name={FindUserNameResetPasswordScreen.routeName}
          component={FindUserNameResetPasswordScreen}
        />
        <AuthStack.Screen 
          name={ChangePasswordScreen.routeName}
          component={ChangePasswordScreen}
        />
      
      </AuthStack.Navigator>
    );
  };
}

export default AuthStackNavigator;


*/
