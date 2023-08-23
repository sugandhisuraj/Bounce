import {makeAutoObservable, observable, action, computed} from 'mobx';
import {
  calculateTax,
  myParseFloat,
  sortArrayAlphabatically,
} from '../../../../app/utils';

class TicketListModel {
  @observable ticketIntent = {};
  @observable currentParty = {};
  @observable tickets = [];

  constructor() {
    makeAutoObservable(this);
  }
  @computed
  getTicketIntent = (fullIntent = false) => {
    if (fullIntent) {
      return {...this.ticketIntent};
    }
    return this.ticketIntent?.client_secret ?? '';
  };
  @action
  setTicketIntent = intent => {
    this.ticketIntent = intent;
  };
  @action
  syncWithTickets = currentParty => {
    let tickets = [];
    currentParty.tickets.map((t, i) => {
      tickets.push({
        ...t,
        price: Number(t.price),
        selectedQuantity: 0,
        addQuantity: this.changeTicketQuantity.bind(this, '+', t),
        removeQuantity: this.changeTicketQuantity.bind(this, '-', t),
      });
    });
    this.tickets = sortArrayAlphabatically(tickets, 'price');
    //this.tickets = tickets;
    this.currentParty = currentParty;
  };

  @computed
  getTicketsForCheckout = () => {
    let checkoutInfo = {
      total: 0,
      totalTax: 0,
      totalTicketQuantity: 0,
      tickets: [],
    };
    this.tickets.map(t => {
      if (t.selectedQuantity == 0) {
        return;
      }
      let ticketAmtCal = {...t};

      ticketAmtCal.totalTicketTax = myParseFloat(
        calculateTax(ticketAmtCal.price),
      );

      ticketAmtCal.totalTicketPrice = myParseFloat(
        ticketAmtCal.selectedQuantity * ticketAmtCal.price,
      );

      ticketAmtCal.totalTicketPriceWithTax = myParseFloat(
        ticketAmtCal.totalTicketPrice + ticketAmtCal.totalTicketTax,
      );

      checkoutInfo.total += ticketAmtCal.totalTicketPrice;

      checkoutInfo.totalTicketQuantity += t.selectedQuantity;

      checkoutInfo.totalTax += ticketAmtCal.totalTicketTax;

      checkoutInfo.tickets.push(ticketAmtCal);
    });

    checkoutInfo.total += checkoutInfo.totalTax;

    checkoutInfo.total = myParseFloat(checkoutInfo.total);

    checkoutInfo.totalTax = myParseFloat(checkoutInfo.totalTax);
    return checkoutInfo;
  };
  @action
  changeTicketQuantity = (action = '+', ticket) => {
    let newTickets = this.tickets.slice();
    let tIndex = newTickets.findIndex(t => t.id == ticket.id);
    if (action == '+') {
      newTickets[tIndex].selectedQuantity++;
    } else {
      if (newTickets[tIndex].selectedQuantity > 0) {
        newTickets[tIndex].selectedQuantity--;
      }
    }
    this.tickets = newTickets;
  };
  static _instance = null;
  static getInstance = () => {
    if (this._instance == null) {
      this._instance = new TicketListModel();
    }
    return this._instance;
  };
}

export default TicketListModel;
