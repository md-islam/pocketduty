import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { removeMailDuty } from '../../api/mailDuties/methods.js';
import './mailDuty.html';
//need to import methods.js

//single mail duty html




Template.MailDuty.events({
	'click #mailDutyDeleteButton': function() {
		console.log("mailduty delete button pressed");
		removeMailDuty.call({
			mailDutyId: this._id
		}, function(err, response) {
			if (err) {
				throw err;
			}
			console.log(response);
		})
	},
	'click #mailDutyEditButton': function() {
		console.log("mailDuty edit button pressed");
	}
});

Template.MailDuty.helpers({
	mailDutyCollections() {
		console.log(MailDuties);
		return MailDuties;
	}
});