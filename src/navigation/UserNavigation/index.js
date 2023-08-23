import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserHomeDrawerNavigator from './drawerNavigation';
import UserQrScreen from '../../Screens/Views/QRcode';
import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';
import UploadMedia from '../../Screens/BounceVendors/PlanParty/CreateInvitation/UploadMedia';
import AccountSetting from '../../Screens/Drawer/AccountSetting';
import HostProfile from '../../Screens/BounceUsers/HostProfile/HostProfile';
import AboutUs from '../../Screens/Views/About/AboutUs';

import HostView from '../../Screens/BounceVendors/PlanParty/HostView';

import AuthNavigation from '../AuthNavigation';
import InviteFriends from '../../Screens/BounceVendors/PlanParty/InviteFriends';
import FriendsPage from '../../Screens/BounceUsers/Profile/FriendsPage';
import GuestProfile from '../../Screens/BounceUsers/Profile/GuestProfile';
import AddInterest from '../../Screens/BounceUsers/NewsFeed/AddInterest';
import NewsFeed from '../../Screens/BounceUsers/NewsFeed/NewsFeed';
import CommonInterestNewsFeed from '../../Screens/BounceUsers/NewsFeed/CommonInterestNewsFeed';

import MutualFriend from '../../Screens/BounceUsers/Profile/MutualFriend';
import MyBounceWithFriends from '../../Screens/BounceUsers/MyBounceWithFriends';
import TicketListScreen from '../../Screens/BounceVendors/PlanParty/TicketList';
import GuestListScreen from '../../Screens/BounceVendors/PlanParty/GuestList';
import CreateEditGuestListScreen from '../../Screens/BounceVendors/PlanParty/CreateEditGuestList';
import MyAllEvents from '../../Screens/BounceUsers/MyAllEvents';
import ChooseVendor from '../../Screens/BounceVendors/PlanParty/ChooseVendor';
import VendorListScreen from '../../Screens/BounceVendors/PlanParty/VendorListScreen';
import FilterVendorScreen from '../../Screens/BounceVendors/PlanParty/FilterVendorScreen';
import ConfirmHireVendorScreen from '../../Screens/BounceVendors/PlanParty/ConfirmHireVendorScreen';
import VendorProfileScreen from '../../Screens/BounceVendors/PlanParty/VendorProfileScreen';
import FavoriteVendorScreen from '../../Screens/BounceVendors/PlanParty/FavoriteVendorScreen';
import SingleVendorProfileScreen from '../../Screens/BounceUsers/SingleVendorProfileScreen';
import UserToVendorRatingScreen from '../../Screens/BounceUsers/UserToVendorRatingScreen';
import NewsFeedGuestList from '../../Screens/BounceUsers/NewsFeedGuestList';
import MyBounceWithFriendsParties from '../../Screens/BounceUsers/MyBounceWithFriendsParties';
import ReportEventUserScreen from '../../Screens/ReportEventUserScreen';
import SearchEvent from '../../Screens/BounceUsers/SearchEvent';
import ViewPurchasedTicketsScreen from '../../Screens/BounceVendors/PlanParty/ViewPurchasedTicketsScreen';

//import CreateInvitationTemplate from '../../Screens/BounceVendors/PlanParty/CreateInvitationTemplate';
//import PurchaseTickets from '../../Screens/BounceUsers/EventPage/Public/PurchaseTickets';
//import Featuring from '../../Screens/BounceUsers/EventPage/Public/Featuring';
//import PartyRental from '../../Screens/BounceVendors/PartyRentals';
//import RatingPage from '../../components/ReviewCard/RatingPage';
//import ScrollCarousel from '../../Screens/BounceVendors/VendorProfile/ScrollCarousel';
const UserRootStack = createStackNavigator();

class UserNavigation {
  static routeName = '/UserNavigation';

  static stack = props => {
    return (
      <UserRootStack.Navigator
        screenOptions={{gestureEnabled: false}}
        headerMode={'none'}
        initialRouteName={UserHomeDrawerNavigator.routeName}>
        <UserRootStack.Screen
          name={SearchEvent.routeName}
          component={SearchEvent}
        />
        <UserRootStack.Screen
          name={UserHomeDrawerNavigator.routeName}
          component={UserHomeDrawerNavigator.drawerHome}
        />
        <UserRootStack.Screen
          name={ReportEventUserScreen.routeName}
          component={ReportEventUserScreen}
        />
        <UserRootStack.Screen
          name={MyAllEvents.routeName}
          component={MyAllEvents}
        />
        <UserRootStack.Screen
          name={TicketListScreen.routeName}
          component={TicketListScreen}
        />
        <UserRootStack.Screen
          name={ViewPurchasedTicketsScreen.routeName}
          component={ViewPurchasedTicketsScreen}
        />
        <UserRootStack.Screen
          name={GuestListScreen.routeName}
          component={GuestListScreen}
        />
        <UserRootStack.Screen
          name={CreateEditGuestListScreen.routeName}
          component={CreateEditGuestListScreen}
        />
        <UserRootStack.Screen
          name={MyBounceWithFriends.routeName}
          component={MyBounceWithFriends}
        />
        <UserRootStack.Screen
          name={MyBounceWithFriendsParties.routeName}
          component={MyBounceWithFriendsParties}
        />
        <UserRootStack.Screen name={NewsFeed.routeName} component={NewsFeed} />
        <UserRootStack.Screen
          name={NewsFeedGuestList.routeName}
          component={NewsFeedGuestList}
        />
        <UserRootStack.Screen
          name={UserQrScreen.routeName}
          component={UserQrScreen}
        />
        <UserRootStack.Screen
          name={HostProfile.routeName}
          component={HostProfile}
        />
        <UserRootStack.Screen
          name={AccountSetting.routeName}
          component={AccountSetting}
        />

        <UserRootStack.Screen name={HostView.routeName} component={HostView} />
        <UserRootStack.Screen
          name={ChooseVendor.routeName}
          component={ChooseVendor}
        />
        <UserRootStack.Screen
          name={VendorListScreen.routeName}
          component={VendorListScreen}
        />
        <UserRootStack.Screen
          name={VendorProfileScreen.routeName}
          component={VendorProfileScreen}
        />
        <UserRootStack.Screen
          name={ConfirmHireVendorScreen.routeName}
          component={ConfirmHireVendorScreen}
        />
        <UserRootStack.Screen
          name={FilterVendorScreen.routeName}
          component={FilterVendorScreen}
        />
        <UserRootStack.Screen
          name={SingleVendorProfileScreen.routeName}
          component={SingleVendorProfileScreen}
        />
        <UserRootStack.Screen
          name={FavoriteVendorScreen.routeName}
          component={FavoriteVendorScreen}
        />
        <UserRootStack.Screen
          name={UserToVendorRatingScreen.routeName}
          component={UserToVendorRatingScreen}
        />

        <UserRootStack.Screen
          name={CreateInvitation.routeName}
          component={CreateInvitation}
        />
        <UserRootStack.Screen
          name={InviteFriends.routeName}
          component={InviteFriends}
        />
        <UserRootStack.Screen
          name={FriendsPage.routeName}
          component={FriendsPage}
        />
        <UserRootStack.Screen
          name={GuestProfile.routeName}
          component={GuestProfile}
        />
        <UserRootStack.Screen
          name={MutualFriend.routeName}
          component={MutualFriend}
        />
        <UserRootStack.Screen
          name={AddInterest.routeName}
          component={AddInterest}
        />
        <UserRootStack.Screen
          name={CommonInterestNewsFeed.routeName}
          component={CommonInterestNewsFeed}
        />
        <UserRootStack.Screen
          name={UploadMedia.routeName}
          component={UploadMedia}
        />
        <UserRootStack.Screen name={AboutUs.routeName} component={AboutUs} />
        <UserRootStack.Screen
          component={AuthNavigation.Stack}
          name={AuthNavigation.routeNameForUser}
        />
      </UserRootStack.Navigator>
    );
  };
}

export default UserNavigation;

/*
 <UserRootStack.Screen
          name={ScrollCarousel.routeName}
          component={ScrollCarousel}
        />
<UserRootStack.Screen
          name={PurchaseTickets.routeName}
          component={PurchaseTickets}
        />
 <UserRootStack.Screen
          name={RatingPage.routeName}
          component={RatingPage}
        />
        <UserRootStack.Screen
          name={Featuring.routeName}
          component={Featuring}
        />
<UserRootStack.Screen
          name={CreateInvitationTemplate.routeName}
          component={CreateInvitationTemplate}
        />
<UserRootStack.Screen
          name={PartyRental.routeName}
          component={PartyRental}
        />
        */
