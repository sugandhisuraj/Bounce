import {Placeholder} from '../../assets';
import {FileMIMETypesUtils} from '../utils';
import {sortArrayAlphabatically} from './array';

export const getPartyGalleryByFileSequence = (gallery = []) => {
  return sortArrayAlphabatically(gallery, 'fileSequence');
}
export const partyTicketsStatus = party => {
  const obj = {
    free: false,
    onlyTicketLink: false,
    bounceTicketAndTicketLink: false,
    onlyBounceTicket: false,
    ticketRange: '',
  };
  if (isPartyFree(party)) {
    obj.free = true;
  }
  if (isPartyOnlyHaveExternalLink(party)) {
    obj.onlyTicketLink = true;
  }
  if (isPartyHaveBounceTicketsAndTicketLink(party)) {
    obj.bounceTicketAndTicketLink = true;
  }
  if (isPartyHaveOnlyBounceTickets(party)) {
    obj.onlyBounceTicket = true;
  }
  obj.ticketRange = getTicketRange(party.tickets);
  return obj;
};

export const getTicketRange = tickets => {
  try {
    let range = `$`;
    if (tickets.length == 0) {
      return '';
    }
    if (tickets.length == 1) {
      return range + '' + tickets[0].price;
    }
    tickets = tickets.map(t => ({...t, price: Number(t.price)}));
    let sortedPrice = sortArrayAlphabatically(tickets, 'price');
    return (
      range +
      sortedPrice[0].price +
      '-' +
      sortedPrice[sortedPrice.length - 1].price
    );
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const isPartyFree = party => {
  if (
    (party.externalLink == null || party.externalLink?.length == 0) &&
    party.tickets?.length == 0
  ) {
    return true;
  }
  return false;
};

export const isPartyOnlyHaveExternalLink = party => {
  if (isPartyFree(party)) {
    return false;
  }
  if (
    party.externalLink != null &&
    party.externalLink?.length > 0 &&
    party.tickets?.length == 0
  ) {
    return true;
  }
  return false;
};
export const isPartyHaveBounceTicketsAndTicketLink = party => {
  if (isPartyFree(party)) {
    return false;
  }
  if (
    party.externalLink != null &&
    party.externalLink?.length > 0 &&
    party.tickets?.length > 0
  ) {
    return true;
  }
  return false;
};

export const isPartyHaveOnlyBounceTickets = party => {
  if (isPartyFree(party)) {
    return false;
  }
  if (
    (party.externalLink == null || party.externalLink?.length == 0) &&
    party.tickets?.length > 0
  ) {
    return true;
  }
  return false;
};

export const getPartyPhotoInSequence = (partyGallery = []) => {
  let isContainsFileSequence = true;
  partyGallery.map(gal => {
    if (!('fileSequence' in gal) && isContainsFileSequence) {
      isContainsFileSequence = false;
    }
  });
  if (!isContainsFileSequence) {
    return partyGallery;
  }
  return sortArrayAlphabatically(partyGallery.slice(), 'fileSequence');
};
export const getPartyCoverPhoto = (partyGallery = []) => {
  try {
    if (!partyGallery) {
      return Placeholder;
    }
    if (partyGallery && partyGallery?.length == 0) {
      return Placeholder;
    }
    let isContainsFileSequence = true;
    partyGallery.map(gal => {
      if (!('fileSequence' in gal) && isContainsFileSequence) {
        isContainsFileSequence = false;
      }
    });
    if (!isContainsFileSequence) {
      return getPartyURLOrPlaceholder(partyGallery[0]?.filePath);
    }
    let sortedGallery = sortArrayAlphabatically(
      partyGallery.slice(),
      'fileSequence',
    );
    if (sortedGallery[0] && typeof sortedGallery[0] == 'object') {
      return getPartyURLOrPlaceholder(sortedGallery[0].filePath);
    } else {
      return Placeholder;
    }
  } catch (error) {
    return Placeholder;
  }
};
export const getPartyURLOrPlaceholder = filePath => {
  if (filePath) {
    console.log("FILE_PATH_REC_HERE_1 - ", filePath);
    const resp = FileMIMETypesUtils.getAssetTypeFromFileURL(filePath);
    if (resp.isVideo || resp.isPhoto) {
      return {uri: filePath};
    }
    return Placeholder;
  }
};
export const extractPartySubTags = party => {
  const partySubTags = [];
  party.partyTags.map(p => {
    partySubTags.push(...p.subTags);
  });
  return partySubTags;
};
