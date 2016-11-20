import {Template} from 'meteor/templating';
import './paypal.html';


  Template.paypal_page.events({
    'click .paymentButton': function () {
      var amount = parseFloat($('[name="amountInput"]').val());
      if (isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
      }
      var invoice_no = $('[name="invoiceNoInput"]').val();
      if (invoice_no == '') {
        alert("Please enter Invoice No");
        return;
      }
      var param = {invoice_no: invoice_no, amount: amount};

      FlowRouter.go('payment', param);

    }
  });