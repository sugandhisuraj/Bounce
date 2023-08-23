import moment from 'moment';
import {RegexCollection} from '../../constants';

class NotificationCohostInvite {
  isCohostInvite = true;
  constructor(cohostInvite) {
    Object.assign(this, cohostInvite);
  }
  renderData = () => {
    return {
      partyTitle: this?.party?.title ?? '',
      setByUser: this?.setByUser?.fullName ?? '',
      setByUserIcon: this?.setByUser?.profileImage?.filePath ?? null,
      partyTime: moment.utc(this?.party?.date).format(
        RegexCollection.PartyInviteFormat,
      ),
    };
  };
  static fromJSON = cohostInvite => {
    return new NotificationCohostInvite(cohostInvite);
  };
}

export default NotificationCohostInvite;
