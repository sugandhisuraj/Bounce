import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import VendorHomeDrawerNavigator from './drawerNavigation';
import UploadInventoryScreen from '../../Screens/host/UploadInventory';
import AuthNavigation from '../AuthNavigation';
import ScanTicketsScreen from '../../Screens/BounceVendors/ScanTickets';

const VendorRootStack = createStackNavigator();

class VendorNavigation {
  static routeName = '/VendorNavigation';

  static stack = props => {
    return (
      <VendorRootStack.Navigator
        headerMode={'none'}
        initialRouteName={VendorHomeDrawerNavigator.routeName}>
        <VendorRootStack.Screen
          name={VendorHomeDrawerNavigator.routeName}
          component={VendorHomeDrawerNavigator.drawer}
        />
         <VendorRootStack.Screen
          name={UploadInventoryScreen.routeName}
          component={UploadInventoryScreen}
        />
        <VendorRootStack.Screen 
          component={ScanTicketsScreen}
          name={ScanTicketsScreen.routeName}
        />
        <VendorRootStack.Screen
          component={AuthNavigation.Stack}
          name={AuthNavigation.routeNameForVendor}
        />
      </VendorRootStack.Navigator>
    );
  };
}

export default VendorNavigation;
