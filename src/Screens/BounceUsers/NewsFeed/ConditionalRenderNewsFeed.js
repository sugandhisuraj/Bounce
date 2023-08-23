import React from 'react'; 
import MobxStore from '../../../mobx';
import {observer} from 'mobx-react';
import AddInterest from './AddInterest';
import NewsFeed from './NewsFeed';

function ConditionalRenderNewsFeed(props) {
  const {authStore} = MobxStore; 
  const userinfo = authStore.user;
  const {userInterest} = userinfo.user;

  if (userInterest.length > 0) {
    return <NewsFeed {...props} />;
  }
  return <AddInterest {...props} fromBottomNav={true} />;
}
ConditionalRenderNewsFeed.routeName = '/ConditionalRenderNewsFeed';
export default observer(ConditionalRenderNewsFeed);
