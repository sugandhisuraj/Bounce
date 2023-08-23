import React from 'react';
import {View, Text} from 'react-native';
import * as ListTiles from '../../ListTiles';
import Styles from './indexCss';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {getHp, getWp, removeDuplicateFromArr} from '../../../app/utils';
import {BlackPerson} from '@svg';

FontAwesomeIcons.loadFont();
const FriendAvatarList = props => {
  let {
    renderFriendCountAndHeading,
    DataList,
    onPress,
    friendTextData,
    containerStyle,
    listContainerStyle,
  } = props;
  let updatedDataList = removeDuplicateFromArr(DataList, 'id');
  friendTextData = updatedDataList.length + ' ' + friendTextData;
  const RenderAvatarTile = (friend, index) => {
    return (
      <ListTiles.FriendAvatarInfo
        onPress={!onPress ? null : () => onPress(friend)}
        friendName={friend.fullName}
        friendAvatarUrl={friend?.profileImage?.filePath ?? null}
        containerStyle={{marginLeft: getWp(5), marginTop: getHp(10)}}
      />
    );
  };
  let shouldRenderFriendText = friendTextData?.length > 0 ?? false;
  return (
    <View style={[Styles.container, containerStyle]}>
      {renderFriendCountAndHeading && shouldRenderFriendText && (
        <View style={[Styles.friendHeadingText]}>
          <BlackPerson height={getHp(20)} width={getWp(14)} />
          <Text style={[Styles.friendText, Styles.friendTextCommon]}>
            Friends
          </Text>
          <Text style={[Styles.friendTextData, Styles.friendTextCommon]}>
            {' '}
            {friendTextData}
          </Text>
        </View>
      )}

      <View
        style={[
          Styles.listContainer,
          !shouldRenderFriendText && {marginTop: 0},
          listContainerStyle,
        ]}>
        {updatedDataList.slice(0, 8).map(RenderAvatarTile)}
      </View>
    </View>
  );
};

FriendAvatarList.defaultProps = {
  updatedDataList: [],
  onPress: null,
  friendTextData: '',
  listContainerStyle: {},
  containerStyle: {},
  renderFriendCountAndHeading: true,
};
export default FriendAvatarList;
