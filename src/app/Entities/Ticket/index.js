class Ticket {
  title = '';
  description = '';
  price = '';
  quantity = '';

  static validate = ticket => {
    let errorVal = {
      valid: true,
      msg: '',
    };
    console.log('THIS_CON_HERE - ', ticket);

    if (ticket.title.length == 0) {
      errorVal.valid = false;
      errorVal.msg = 'Enter Ticket Title';
    }
    if (ticket.description.length == 0 && errorVal.valid) {
      errorVal.valid = false;
      errorVal.msg = `Enter Description for ${ticket.title} Ticket`;
    }
    if (ticket.price.length == 0 && errorVal.valid) {
      errorVal.valid = false;
      errorVal.msg = `Enter Price for ${ticket.title} Ticket`;
    }
    if (ticket.quantity.length == 0 && errorVal.valid) {
      errorVal.valid = false;
      errorVal.msg = `Enter Quantity for ${ticket.title} Ticket`;
    }
    if (isNaN(ticket.price) && errorVal.valid) {
      errorVal.valid = false;
      errorVal.msg = `Price for ${ticket.title} Ticket should be Numeric`;
    }
    if (isNaN(ticket.quantity) && errorVal.valid) {
      errorVal.valid = false;
      errorVal.msg = `Quantity for ${ticket.title} Ticket should be Numeric`;
    }
    return errorVal;
  };

  static update = (oldData, updatedData) => {
    let ticket = new Ticket();
    return {...ticket, ...oldData, ...updatedData};
  };
}
export default Ticket;
