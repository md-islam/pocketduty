import {
	MailDuties
} from '../../api/mailDuties/mailDuties.js';
import './insertMailDutiesForm.html';

import { insertMailDuty } from '../../api/mailDuties/methods.js'


Template.insertMailDutiesForm.onRendered(function() {
	this.autorun(function() {
		if (GoogleMaps.loaded()) {
			$("#mailDropOffLocation").geocomplete();
			$("#mailPickUpLocation").geocomplete();
		}
	});


	$('#mailTimePickerFieldID').datetimepicker({
		format: 'LT'
	});

});


AutoForm.hooks({
	insertMailDutyForm:{
		beginSubmit:function(){
			console.log("Calling submit");
			insertMailDuty.call({
				pickUpLocation: $("#mailPickUpLocation").val(), 
				dropOffLocation: $("#mailDropOffLocation").val(), 
				pickUpTime: $("#mailTimePickerFieldID").val(), 
				deliveryType: this.insertDoc.deliveryType, 
				servicePrice: this.insertDoc.servicePrice,
				dueDate: this.insertDoc.dueDate
			},(err, res) => {
					if (err) {
						throw err;
					}
					// console.log(res);
				});
			return false;
		}
	}
});






Template.insertMailDutiesForm.helpers({
	mailDutyCollection() {
		return MailDuties;
	}
})