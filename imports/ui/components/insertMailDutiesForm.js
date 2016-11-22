import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import './insertMailDutiesForm.html';

import { insertMailDuty } from '../../api/mailDuties/methods.js'


Template.insertMailDutiesForm.onRendered(function() {
	this.autorun(function() {
		if (GoogleMaps.loaded()) {
			console.log("googlemaps");
			$("#mailPickUpLocation").geocomplete();
			$("#mailDropOffLocation").geocomplete();
		}
	});


	$('#mailTimePickerFieldID').datetimepicker({
		format: 'LT'
	});

	

});


//prevent default actions here if something goes wrong such as user submits with 
//empty fields
Template.insertMailDutiesForm.events({
	'submit #insertMailDutyForm': function(event) {
		console.log("prevented submit default action in case of an error");
		event.preventDefault();
	}
});


AutoForm.hooks({
	insertMailDutyForm: {
		beginSubmit: function() {
			console.log("Calling submit");
			insertMailDuty.call({
				pickUpLocation: $("#mailPickUpLocation").val(),
				dropOffLocation: $("#mailDropOffLocation").val(),
				pickUpTime: $("#mailTimePickerFieldID").val(),
				deliveryType: this.insertDoc.deliveryType,
				servicePrice: this.insertDoc.servicePrice,
				dueDate: this.insertDoc.dueDate
			}, (err, res) => {
				if (err) {
					console.log(err);
					sweetAlert({
						type: "error",
						title: "Error!",
						text: "Make sure you have entered all fields"
					});
					throw err;
				}
				// console.log(res);
			});
			return false;
		},
		endSubmit: function() {
			console.log("submission success");
			var amount = this.insertDoc.servicePrice + 10;
			var invoice_no = SimpleSchema.RegEx.Id;
			var param = {invoice_no: invoice_no, amount: amount};
			FlowRouter.go('payment', param);
			// sweetAlert({
			// 	type: "success",
			// 	title: "Duty Created!",
			// 	text: "The mail duty has been successfully added!"
			// }, function(){
			// 	console.log("redirecting to employer page...")
			// 	FlowRouter.go('/employer');
			// });
			

		}
	}
});



Template.insertMailDutiesForm.helpers({
	mailDutyCollection() {
		console.log(MailDuties);
		return MailDuties;
	}
});