import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { insertTransportDuty } from '../../api/transportDuties/methods.js';
import './insertTransportDutiesForm.html';

AutoForm.hooks({
	insertTransportDutyForm: {
		beginSubmit: function () {
			console.log("Calling submit");

			insertTransportDuty.call({
				title: this.insertDoc.title,
				dueDate: this.insertDoc.dueDate,
				description: this.insertDoc.description,
				maxSpending: this.insertDoc.maxSpending}, (err, res) => {
					if (err) {
						throw err;
					}
					console.log(res);
				});

			return false;
		}
	}
});

Template.insertTransportDutiesForm.helpers({
	transportDutyCollection () {
		return TransportDuties;
	}
});
