import React, {useCallback, Fragment, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {SelectedBlueTick} from '@svg';
import Styles, {Styled} from './indexCss';
import {getWp, getHp} from '../../../app/utils';

Entypo.loadFont();

const VAT_TAX = ' + 3%';
const TicketTile = props => {
  let {
    ticket,
    isSelected,
    ticketTileOnPress,
    widgetType,
    textLength,
    containerStyle,
    partyData
  } = props;

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = useCallback(() => setShowMore(i => !i), []);
  //   ticket.description =
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  let shouldRenderShowMore = ticket.description?.length > textLength;

  let textDescription = ticket.description;
  if (textLength && shouldRenderShowMore) {
    textDescription = ticket.description.substr(
      0,
      showMore ? ticket.description.length : textLength,
    );
  }

  const RenderTicketQuantityTray = () => {
    return (
      <View style={[Styles.quantityTray]}>
        <Styled.ShadowView
          onPress={ticket.removeQuantity}
          style={[Styles.plusMinusContainer, {left: 0}]}>
          <Entypo name={'minus'} size={getHp(20)} />
        </Styled.ShadowView>
        <View style={Styles.quantityTextContainer}>
          <Text style={[Styles.quantityText]}>{ticket.selectedQuantity}</Text>
        </View>
        <Styled.ShadowView
          onPress={ticket.addQuantity}
          style={[Styles.plusMinusContainer, {right: 0}]}>
          <Entypo name={'plus'} size={getHp(20)} />
        </Styled.ShadowView>
      </View>
    );
  };
  console.log('TICKE - ', ticket);
  return (
    <Styled.Container
      // disabled={!ticketTileOnPress}
      // onPress={() => ticketTileOnPress(ticket)}
      style={[Styles.container, containerStyle]}>
      <View style={[Styles.ticketTitleContainer]}>
        <Text style={[Styles.textTitleText]}>{ticket.title}</Text>
        {widgetType == TicketTile.widgetType.Purchase && (
          <Fragment>
            {ticket.soldOut < ticket.quantity ? (
              RenderTicketQuantityTray()
            ) : (
              <Text style={[Styles.soldOutText]}>SOLD OUT</Text>
            )}
          </Fragment>
        )}
        {
          widgetType == TicketTile.widgetType.View && <Text style={[Styles.viewDollarText]}>{`$${ticket.totalTicketPriceWithTax}`}</Text>
        }
      </View>
      <Text style={[Styles.priceStyle]}>{`$${ticket.price}${VAT_TAX}`}</Text>
      <Text style={[Styles.titleDescriptionText]}>
        {textDescription}
        {shouldRenderShowMore && (
          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={[Styles.showMore]}>
              {!showMore && '...'}view {showMore ? 'less' : 'more'}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </Styled.Container>
  );
};

TicketTile.widgetType = {};
TicketTile.widgetType.Purchase = 'Purchase';
TicketTile.widgetType.View = 'View';
TicketTile.defaultProps = {
  textLength: 125,
  containerStyle: {},
  ticketTileOnPress: null,
  isSelected: null,
  widgetType: TicketTile.widgetType.Purchase,
};
export default TicketTile;
