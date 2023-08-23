import React from 'react';

import FriendTile from '../Friend';
import {getWp, getHp} from '../../../app/utils';
import {observer} from 'mobx-react';
import {RequestSent, SendRequest, BlueTick, ShareSvg} from '@svg';
import {RNShareService} from '../../../app/services';
import {Placeholder} from '@assets';
const ContactTile = props => {
  const {contact, onRightIconPress, onTitlePress} = props;

  const onRightIconPressShare = () => {
    RNShareService.shareBounceToContacts();

    onRightIconPress && onRightIconPress(contact);
  };
  return (
    <FriendTile
      {...props}
      avatar={contact.getThumbnail()}
      title={contact.getName}
      subTitle={''}
      Icon={<ShareSvg height={25} width={25} style={{}} />}
      onRightIconPress={onRightIconPressShare}
      onTitlePress={!onTitlePress ? null : () => onTitlePress(contact)}
    />
  );
};

ContactTile.defaultProps = {
  contact: {},
  onRightIconPress: null,
  onTitlePress: null,
};
export default observer(ContactTile);
