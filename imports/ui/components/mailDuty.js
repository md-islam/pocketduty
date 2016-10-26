import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { removeMailDuty } from '../../api/mailDuties/methods.js';
import './mailDuty.html';
//need to import methods.js



Template.MailDuty.events({
	'click #mailDutyDeleteButton':function(){
		console.log("mailduty delete button pressed");
		removeMailDuty.call({
		 	mailDutyId: this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
});