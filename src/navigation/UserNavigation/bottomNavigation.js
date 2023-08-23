import React, {Fragment} from 'react';
import {Button, TouchableOpacity, View, Text, StyleSheet, Platform} from 'react-native';

import {Avatar} from 'react-native-elements';
import {
  Add_Outline,
  Bell_Outline,
  Home_Outline,
  Search_Outline,
  Add_Fill,
  Bell_Fill,
  Home_Fill,
  Search_Fill,
} from '@svg';
import {Placeholderr, Placeholder} from '@assets';

import Temp from '../../Screens/BounceUsers/Temp';
import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
import DesignCanva from '../../Screens/Views/Canva/DesignCanva';
import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';
import MobxStore from '../../mobx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';
import NewsFeed from '../../Screens/BounceUsers/NewsFeed/NewsFeed';
import AddInterest from '../../Screens/BounceUsers/NewsFeed/AddInterest';
import ConditionalRenderNewsFeed from '../../Screens/BounceUsers/NewsFeed/ConditionalRenderNewsFeed';

import InviteFriends from '../../Screens/BounceVendors/PlanParty/InviteFriends';
import {observer} from 'mobx-react';
import UserNotificationScreen from '../../Screens/BounceUsers/Notifications/UserNotificationScreen';

const UserHomeBottomTab = createBottomTabNavigator();
class UserHomeBottomNavigation {
  static routeName = '/UserHomeBottomNavigation';
  static homeBottomNav = observer(props => {
    const {authStore, notificationsStore} = MobxStore;
    const user = authStore.user;
    const pendingFriendReqCount = user?.user?.pendingRequests?.length ?? 0;
    const incommingFriendReqCount = user?.user?.incomingRequests?.length ?? 0;
    const {profileImage = {}} = user?.user;
    let notificationsCount = notificationsStore.getNotificationCounts();
    notificationsCount = notificationsCount + pendingFriendReqCount+incommingFriendReqCount;
    return (
      <UserHomeBottomTab.Navigator
        initialRouteName={ConditionalRenderNewsFeed.routeName}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#000000',
          fontSize: FONTSIZE.Text16,
          paddingVertical: 10,
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 0,
            height: getHp(80),
          },
        }}
        sceneContainerStyle={{
          backgroundColor: '#FBFBFB',
          elevation: 5,
          // height: 100,
          fontSize: FONTSIZE.Text16,
        }}>
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Home_Fill height={25} width={32} />
              ) : (
                <Home_Outline height={25} width={32} />
              );
            },
          }}
          name={ConditionalRenderNewsFeed.routeName}
          component={ConditionalRenderNewsFeed}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Search_Fill height={21} width={21} />
              ) : (
                <Search_Outline height={21} width={21} />
              );
            },
          }}
          name={DesignCanva.routeName}
          component={DesignCanva}
        />

        <UserHomeBottomTab.Screen
          options={{
            //unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Add_Outline height={26} width={26} />
              ) : (
                <Add_Outline height={26} width={26} />
              );
            },
            tabBarVisible: false,
          }}
          name={CreateInvitation.routeNameForBottom}
          component={_ => <CreateInvitation {..._} />}
        />

        <UserHomeBottomTab.Screen
          options={{
            //unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return (
                <Fragment>
                  {focused ? (
                    <Bell_Fill height={22} width={19} />
                  ) : (
                    <Bell_Outline height={22} width={19} />
                  )}
                  {notificationsCount > 0 && (
                    <View style={Styles.notificationCountView}>
                      <Text style={Styles.notificationCountText}>
                        {notificationsCount}
                      </Text>
                    </View>
                  )}
                </Fragment>
              );
            },
          }}
          name={UserNotificationScreen.routeName}
          component={UserNotificationScreen}
        />

        <UserHomeBottomTab.Screen
          options={{
            //unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
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
                    // source={Placeholder}
                    style={{resizeMode: 'contain', height: 23, width: 23}}
                  />
                </View>
              ) : (
                <View>
                  <Avatar
                    rounded
                    source={{uri: `${profileImage?.filePath}`}}
                    style={{resizeMode: 'contain', height: 23, width: 23}}
                  />
                </View>
              );
            },
          }}
          name={UserHomeScreen.routeName}
          component={UserHomeScreen}
        />
      </UserHomeBottomTab.Navigator>
    );
  });
}

const Styles = StyleSheet.create({
  notificationCountView: {
    position: 'absolute',
    height: getHp(17),
    width: getHp(17),
    borderRadius: getHp(50),
    backgroundColor: '#00CFFF',
    top: getHp(7) + Platform.select({ios:0,android:getHp(10)}),
    right: getWp(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: { 
    fontWeight: '700',
    fontSize: FONTSIZE.Text10,
    color: '#FFF',
    letterSpacing: 0.24,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    alignSelf: 'center',
  },
});
export default UserHomeBottomNavigation;
