import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Validator from 'validator';

import {BlackClose} from '@svg';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../../../app/utils';

import {CenterRoundBlurView} from '../../../../../components/AppPopups/Frames';
import {Toast} from '../../../../../app/constants';

class CreateInvitationPopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      ticketLink: '',
    };
  }
  externalTicketLinkUI = () => {
    return (
      <View style={[Styles.popupContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[Styles.headerHeading]}>Ticket Website Link</Text>
          <TouchableOpacity onPress={this.onClosePress}>
            <BlackClose height={getHp(15)} width={getHp(15)} />
          </TouchableOpacity>
        </View>
        <Text style={Styles.contentText}>
          {
            'Paste a ticket link to direct attendees to an external website where they can purchase tickets outside Bounce.'
          }
        </Text>
        <View style={[Styles.linkInputContainer]}>
          <TextInput
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            value={this.state.ticketLink}
            onChangeText={t => this.setState({ticketLink: t})}
            placeholderTextColor={'#999999'}
            style={[Styles.linkInputTextStyle]}
            placeholder={'Paste Link Here'}
          />
        </View>
      </View>
    );
  };
  deleteEventUI = () => {
    return (
      <View style={[Styles.popupContainer]}>
        <Text style={[Styles.headerHeading]}>Error...</Text>
        <Text style={[Styles.contentText, {marginTop: getHp(10)}]}>
          {
            'Guests have already purchased tickets. In order to delete your event you may need to refund your guests. Contact us to initiate this process.'
          }
        </Text>
        <TouchableOpacity style={[Styles.contactBounceTouch]}>
          <Text style={[Styles.contactBounceTitle]}>Contact Bounce</Text>
        </TouchableOpacity>
      </View>
    );
  };
  setType = (type, ticketLink) => {
    this.setState(() => ({type, ticketLink}));
  };
  onClosePress = () => {
    if (this.state.type == CreateInvitationPopup.types.EXTERNAL_TICKET_LINK) {
      if (this.state.ticketLink.length == 0) {
        this.setState({type: null});
        return this.props.onCloseEvents(
          CreateInvitationPopup.types.EXTERNAL_TICKET_LINK,
          this.state.ticketLink,
        );
      }
      if (!Validator.isURL(this.state.ticketLink)) {
        return Toast('Invalid URL!', {
          style: Styles.toastForInvalidURL,
        });
      }
      this.props.onCloseEvents(
        CreateInvitationPopup.types.EXTERNAL_TICKET_LINK,
        this.state.ticketLink,
      );
    }
    return this.setState({type: null});
  };
  render() {
    const {type} = this.state;
    console.log(type);
    if (!type) {
      return null;
    }
    let showClose = false;
    let UIComponent = null;
    if (type == CreateInvitationPopup.types.EXTERNAL_TICKET_LINK) {
      UIComponent = this.externalTicketLinkUI();
    }
    if (type == CreateInvitationPopup.types.DELETE_EVENT) {
      showClose = true;
      UIComponent = this.deleteEventUI();
    }
    if (!UIComponent) {
      return null;
    }
    return (
      <CenterRoundBlurView showClose={showClose} onClosePress={this.onClosePress}>
        {UIComponent}
      </CenterRoundBlurView>
    );
  }
  static types = {
    EXTERNAL_TICKET_LINK: 'EXTERNAL_TICKET_LINK',
    DELETE_EVENT: 'DELETE_EVENT',
  };
}
export default CreateInvitationPopup;

const Styles = StyleSheet.create({
  popupContainer: {
    padding: getHp(20),
  },
  headerHeading: {
    fontSize: FONTSIZE.Text20,
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    letterSpacing: 0.5,
  },
  contentText: {
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    lineHeight: getHp(28),
    marginTop: getHp(22),
  },
  linkInputContainer: {
    marginTop: getHp(16),
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: getHp(15),
    height: getHp(40),
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
  },
  linkInputTextStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
  },
  contactBounceTouch: {
    backgroundColor: '#DFF9FF',
    height: getHp(42),
    borderRadius: getHp(13),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHp(20),
  },
  contactBounceTitle: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    color: '#00CFFF',
  },
  toastForInvalidURL: {
    position: 'absolute',
    bottom: getHp(10),
    alignSelf: 'center',
  },
});
