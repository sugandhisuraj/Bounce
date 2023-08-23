import moment from 'moment';
import {RegexCollection} from '../../constants';

class NotificationPartyInvite {
  constructor(invite) {
    Object.assign(this, invite);
  }
  renderData = () => {
    return {
      partyTitle: this?.party?.title ?? '',
      invitedBy: this?.invitedBy?.fullName ?? '',
      invitedByIcon: this?.invitedBy?.profileImage?.filePath ?? null,
      partyTime: moment.utc(this?.party?.date).format(
        RegexCollection.PartyInviteFormat,
      ),
    };
  };
  static fromJSON = invite => {
    return new NotificationPartyInvite(invite);
  };
}

export default NotificationPartyInvite;
