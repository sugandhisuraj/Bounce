import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';

import {Placeholder} from '@assets';
import Styles from './indexCss';
import { getWp } from '../../../app/utils';
import {Buttons} from '../../';
import MobxStore from '../../../mobx';

const UnfriendModal = () => {
  const popupStore = MobxStore.popupStore;
  let unfriendModalData = popupStore.unfriendPopup;
  if (!unfriendModalData?.visible ?? false) {
    return null;
  }
  let source = {uri: unfriendModalData?.friend?.profileImage?.filePath ?? null};
  if (!source.uri) {
    source = Placeholder;
  }
  return (
    <Modal isVisible={unfriendModalData?.visible ?? false}>
      <View style={[Styles.modalContainerSyle]}>
        <View style={[Styles.userInfoContainer]}>
          <View style={[Styles.avatarStyle]}>
            <Avatar source={source} rounded size={getWp(60)} />
          </View>
          <Text style={[Styles.confirmTextStyle]}>
            Would you like to unfriend
            {` ${unfriendModalData?.friend?.username}`}
          </Text>
          <Buttons.PrimaryButton
            onPress={() => {
              unfriendModalData.onSuccess();
              popupStore.resetUnfriendPopup();
            }}
            textColor={'#FF2E00'}
            withShadow={false}
            containerStyle={Styles.unfriendButtonStyle}
            title={'Unfriend'}
            titleStyle={[Styles.unfriendButtonTextStyle]}
          />
        </View>
        <TouchableOpacity
          onPress={() => popupStore.resetUnfriendPopup()}
          style={[Styles.closeButtonStyle]}>
          <AntDesign style={[Styles.closeIcon]} name={'close'} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default observer(UnfriendModal);
