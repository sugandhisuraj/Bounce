import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Button, TouchableOpacity, View} from 'react-native';
import DjProfileScreen from '../../Screens/host/DjProfile';
 
import PartyRental from '../../Screens/BounceVendors/PartyRentals';
import {
  GreyBell,
  GreyParty,
  GreyPerson,
  BlackBell,
  Party_Outline,
  Bell_Outline,
  BlackPerson,
  BlackParty,
} from '@svg';
import MobxStore from '../../mobx';
import {Avatar} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTSIZE, getHp, getWp} from '@utils';
import {observer} from 'mobx-react';
import VendorNotificationScreen from '../../Screens/BounceUsers/Notifications/VendorNotificationScreen';
const VendorBottomTab = createBottomTabNavigator();

class VendorBottomNavigation {
  static routeName = '/HomeBottom';
  static bottom = observer(props => {
    const {authStore} = MobxStore;
    const userinfo = authStore.user;
    const {profileImage = {}} = userinfo?.user;
    return (
      <VendorBottomTab.Navigator
        initialRouteName={DjProfileScreen.routeName}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#000000',
          fontSize: FONTSIZE.Text16,
          paddingVertical: 10,
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 0,
            height: getHp(90),
          },
        }}
        sceneContainerStyle={{
          backgroundColor: '#FBFBFB',
          elevation: 5,
          height: 100,
          fontSize: FONTSIZE.Text16,
        }}>
        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            title: '',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <Party_Outline height={34} width={34} />
              ) : (
                <Party_Outline height={34} width={34} />
              );
            },
          }}
          name={PartyRental.routeName}
          component={PartyRental}
        />

        <VendorBottomTab.Screen
          options={{
            title: '',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <Bell_Outline height={30} width={23} />
              ) : (
                <Bell_Outline height={30} width={23} />
              );
            },
          }}
          name={VendorNotificationScreen.routeName}
          component={VendorNotificationScreen}
        />

        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            title: '',
            // tabBarColor: 'red',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    padding: 2,
                    borderColor: 'black',
                  }}>
                  <Avatar
                    rounded
                    source={{uri: `${profileImage?.filePath}`}}
                    style={{resizeMode: 'contain', height: 23, width: 23}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    padding: 2,
                    borderColor: 'black',
                  }}>
                  <Avatar
                    rounded
                    source={{uri: `${profileImage?.filePath}`}}
                    style={{resizeMode: 'contain', height: 23, width: 23}}
                  />
                </View>
              );
            },
          }}
          name={DjProfileScreen.routeName}
          component={DjProfileScreen}
          // unmountOnBlur={true}
        />
      </VendorBottomTab.Navigator>
    );
  });
}

export default VendorBottomNavigation;
