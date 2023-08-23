import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import Styles from './indexCss';
import {Placeholder} from '../../../assets';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

const CohostInvite = props => {
  const {cohost, onCohostActionPress,containerStyle} = props;

  if (typeof cohost != 'object' || Object.keys(cohost)?.length == 0) {
    return <Text>Required Cohost Object</Text>;
  }
  let cohostData = cohost.renderData();
  let avatar = Placeholder;
  if (cohostData?.setByUserIcon) {
    avatar = {uri: cohost.setByUser.profileImage.filePath};
  }
  const ButtonsPress = btnProps => {
    const {title, onPress, textColor} = btnProps;
    return (
      <TouchableOpacity onPress={onPress} style={[Styles.pressButtonStyle]}>
        <Text style={[Styles.btnText, {color: textColor}]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={[Styles.infoContainer]}>
        <Avatar source={avatar} size={40} rounded />
        <View style={[Styles.inviteText]}>
          <Text
            style={[
              Styles.whoInviteCohostText,
            ]}>{`${cohostData?.setByUser} `}</Text>
          <Text style={[Styles.cohostInviteText]}>added you as a cohost</Text>
        </View>
      </View>

      <View style={[Styles.cohostInviteDetailsContainer]}>
        <Text
          style={[Styles.cohostInviteDetailsText, Styles.cohostPartyNameText]}>
          {cohostData?.partyTitle}
        </Text>
        <Text style={[Styles.cohostInviteDetailsText]}>
          {cohostData?.partyTime}
        </Text>
      </View>

      <View style={[Styles.buttonTrayContainer]}>
        <ButtonsPress
          title={'Accept'}
          textColor={'#00E08F'}
          onPress={() =>
            onCohostActionPress(CohostInvite.actions.Accept, cohost)
          }
        />
        <ButtonsPress
          title={'Deny'}
          textColor={'#FF2E00'}
          onPress={() => onCohostActionPress(CohostInvite.actions.Deny, cohost)}
        />
      </View>
    </View>
  );
};

CohostInvite.defaultProps = {
  cohost: {},
  containerStyle: {}
};
CohostInvite.actions = {};
CohostInvite.actions.Accept = 'Accept';
CohostInvite.actions.Deny = 'Deny';
export default CohostInvite;
