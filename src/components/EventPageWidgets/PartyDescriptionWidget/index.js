import React from 'react';
import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';
import ToggleShowMoreText from '../../ToggleShowMoreText';

const PartyDescriptionWidget = props => {
  const {
    containerStyle,
    currentParty,
    onShowMorePress,
    textLength,
    showMoreTextStyle,
    descriptionTextStyle
  } = props;
  return (
    <ToggleShowMoreText
      onShowMorePress={onShowMorePress}
      containerStyle={[Styles.containerStyle, containerStyle]}
      showMoreTextStyle={showMoreTextStyle}
      descriptionTextStyle={[Styles.partyDescriptionContainerStyle,descriptionTextStyle]}
      textLength={textLength}
      text={`${currentParty.description.trim() ?? ''}  `}
      // text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
      // text={`‼️ Bounce Launch Party
      // 🥃 FREE ALCOHOL
      // 🍕FREE FOOD
      // 🏙 ROOFTOP CLUB
      // 👯‍♀️ COSTUME CONTEST
      // 🎉 See you there`}
    />
  );
};

const Styles = StyleSheet.create({
  containerStyle: { 
    marginVertical: getHp(10),
    //backgroundColor: '#FFF',
    opacity: 0.9,
    //borderWidth: 0.3,
    borderRadius: 8,
  },
  partyDescriptionContainerStyle: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text15,
    color: '#FFF',
    letterSpacing: 0.24,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    lineHeight: getHp(24),
  },
});
export default PartyDescriptionWidget;
