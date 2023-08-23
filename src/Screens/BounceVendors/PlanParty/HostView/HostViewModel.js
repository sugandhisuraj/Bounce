import {action, computed, makeAutoObservable, observable} from 'mobx';

class HostViewModel {
  @observable isCurrentPartyLoaded = false;
  @observable _currentParty = {};
  @observable _selectedTicket = {};

  constructor(props) {
    makeAutoObservable(this);
  }
  @computed
  get selectedTicket() {
    return {...this._selectedTicket};
  }

  @computed
  getTopGuestInterests = () => {
    if (!this._currentParty?.topGuestTags || !this._currentParty?.topGuestTags?.length) {
      return [];
    }
    return this._currentParty?.topGuestTags?.filter((t) => {
      return t.subtag != null;
    });
  }

  @computed
  getTicketWithVat = () => {
    if (Object.keys(this.selectedTicket).length == 0) {
      return '';
    }
    let ticketPrice = parseFloat(this.selectedTicket?.price ?? 0);
    let result = ticketPrice + ((ticketPrice / 100) * 3);  
    return `$`+result?.toFixed(2);
  };
  @computed
  isTicketSelected = ticket => {
    let ticketDetail = {
      exist: false,
    };
    if (this.selectedTicket.id == ticket.id) {
      ticketDetail.exist = true;
    }
    return ticketDetail;
  };
  @action
  toggleSelectedTicket = ticket => {
    if (this.selectedTicket?.id == ticket.id) {
      return (this._selectedTicket = null);
    }
    this._selectedTicket = ticket;
  };
  @computed
  isThisPartyHostByMe = () => {
    return this.currentParty?.isHost == true ?? false;
  };

  @action
  setCurrentParty = party => {
    this._currentParty = party;
    this.isCurrentPartyLoaded = true;
  };

  @computed
  get currentParty() {
    return {...this._currentParty};
  }

  static _instance = null;
  static instance() {
    if (!this._instance) {
      this._instance = new HostViewModel();
    }
    return this._instance;
  }
}

export default HostViewModel;

/*
 //@observable _selectedTickets = [];
@computed
  get selectedTickets() {
    return this._selectedTickets.slice();
  }
  @computed
  isTicketSelected = ticket => {
    let ticketDetails = {
      exist: false,
      index: -1,
    };
    let ticketIndex = this.selectedTickets.findIndex(t => t.id == ticket.id);
    if (ticketIndex > -1) {
      ticketDetails.exist = true;
      ticketDetails.index = ticketIndex;
    }
    return ticketDetails;
  };
  @action
  toggleSelectedTicket = ticket => {
    let ticketStatus = this.isTicketSelected(ticket);
    let newTickets = this.selectedTickets;
    if (ticketStatus.exist) {
      newTickets.splice(ticketStatus.index, 1);
    } else {
      newTickets.push(ticket);
    }
    this._selectedTickets = newTickets;
  };
  */
