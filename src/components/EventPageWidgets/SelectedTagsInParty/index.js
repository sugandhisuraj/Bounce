import React, {useRef} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';

import {AddInterestSvg, RemoveInterestSvg} from '@svg';
import Styles from './indexCss';
import {ListTiles, ToolTip} from '../..';
import {PartyService} from '../../../app/services';
import MobxStore from '../../../mobx';
import {wait} from '../../../app/utils';
import NavigationService from '../../../navigation/NavigationService';

const SelectedTagsInParty = props => {
  const tooltipRef = useRef();
  const {interestedParty, tagStore, bounceWithFriendsStore} = MobxStore;
  const {
    disableOnPressOnTags,
    currentParty,
    preAllSubTags,
    widgetType,
    scrollViewProps,
    tileContainerStyle,
  } = props;
  let allSubTags = [];
  if (preAllSubTags.length > 0) {
    allSubTags = preAllSubTags;
  } else {
    currentParty?.partyTags?.map(tags => {
      allSubTags.push(...tags.subTags);
    });
  }

  const partyTagTileContainerStyle = t => {
    let returnValue = {...tileContainerStyle};
    if (widgetType == NavigationService.screenNames.NewsFeed) {
      interestedParty.interestedTags.getAllSubTags().map(tag => {
        if (tag.name == t.name) {
          returnValue.backgroundColor = '#CEF6E8';
        }
      });
    } else if (widgetType == NavigationService.screenNames.BWF) {
      if (bounceWithFriendsStore.isTagExistInCommonTags(t)) {
        returnValue.backgroundColor = '#CEF6E8';
      }
    }

    return {...returnValue};
  };
  const operationOnTags = tagArr => {
    let addedInInterest = [];
    let notAddedInterest = [];
    if (widgetType == NavigationService.screenNames.NewsFeed) {
      tagArr.map(t => {
        let isThisMyInterest = interestedParty.interestedTags
          .getAllSubTags()
          .find(tag => t.name == tag.name);
        if (isThisMyInterest) {
          addedInInterest.push(t);
        } else {
          notAddedInterest.push(t);
        }
      });
    } else if (widgetType == NavigationService.screenNames.BWF) {
      tagArr.map(t => {
        if (bounceWithFriendsStore.isTagExistInCommonTags(t)) {
          addedInInterest.push(t);
        } else {
          notAddedInterest.push(t);
        }
      });
    }
    return [...addedInInterest, ...notAddedInterest];
  };
  const isSubTagExistInUserInterest = t => {
    return (
      interestedParty.interestedTags.getAllSubTags().findIndex(tag => {
        return t.id == tag.id;
      }) > -1
    );
  };
  const onPressForToolTipAction = async subTag => {
    if (tooltipRef.current) {
      tooltipRef.current.hide();
    }
    await wait(100);
    const tag = tagStore.getTagCategoryFromSubTag(subTag);
    interestedParty.interestedTags.onSelectTag(tag.tagCategory, subTag);

    await PartyService.addInterestController(false);
  };
  const operatedList = operationOnTags(allSubTags) ?? [];
  const RenderSubTags = subTag => {
    if (
      widgetType == NavigationService.screenNames.BWF ||
      disableOnPressOnTags
    ) {
      return (
        <ListTiles.ToggleSubTagTile
          data={subTag}
          withEmoji
          containerStyle={partyTagTileContainerStyle(subTag)}
        />
      );
    }
    return (
      <ToolTip
        ref={tooltipRef}
        menuContentStyle={Styles.menuContentStyle}
        contentContainerStyle={Styles.contentContainerStyle}
        menuAnchor={
          <ListTiles.ToggleSubTagTile
            data={subTag}
            withEmoji
            containerStyle={partyTagTileContainerStyle(subTag)}
          />
        }>
        <TouchableOpacity
          onPress={() => onPressForToolTipAction(subTag)}
          style={{backgroundColor: 'transparent'}}>
          {isSubTagExistInUserInterest(subTag) ? (
            <RemoveInterestSvg />
          ) : (
            <AddInterestSvg />
          )}
        </TouchableOpacity>
      </ToolTip>
    );
  };
  return (
    <ScrollView
      bounces={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      {...scrollViewProps}>
      {operatedList.map(RenderSubTags)}
    </ScrollView>
  );
};

SelectedTagsInParty.defaultProps = {
  tileContainerStyle: {},
  widgetType: NavigationService.screenNames.NewsFeed,
  preAllSubTags: [],
  disableOnPressOnTags: false,
};

export default observer(SelectedTagsInParty);
