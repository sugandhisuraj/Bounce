import React from 'react';
import {StackActions} from '@react-navigation/native';
class NavigationService {
  _navigationRef = React.createRef();

  setNavRef = nav => {
    this._navigationRef = nav;
  };
  navigate = (name, params) => {
    try {
      this._navigationRef.current?.navigate(name, params);
    } catch (error) {
      console.log('ERROR_WHILE_NAV - ', error);
    }
  };
  push = (screenName, props) => {
    try {
      const pushAction = StackActions.push(screenName, props);
      this._navigationRef.current?.dispatch(pushAction);
    } catch (e) {}
  };
  backHandlerFunction = () => {};

  screenNames = {
    NewsFeed: 'NewsFeed',
    BWF: 'BWF',
    EventPage: 'EventPage',
  };
}

export default new NavigationService();
