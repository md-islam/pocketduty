import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { assignMailDuty } from '../../api/mailDuties/methods.js';
import './laborMailDuty.html';
import {moment} from 'meteor/momentjs:moment';
import './laborMailDutyInfo.js';


Template.LaborMailDuty.onCreated(function(){
	console.log("Created mail duty template with date context ", this.date);
});

Template.LaborMailDuty.events({
	'click #acceptMailDutyButton' : function(){
		console.log("acceptMailDuty Clicked")
		assignMailDuty.call({
			mailDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
});





// Template.MailDuty.events({
// 	'click #mailDutyDeleteButton': function() {
// 		console.log("mailduty delete button pressed");
// 		removeMailDuty.call({
// 			mailDutyId: this._id
// 		}, function(err, response) {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log(response);
// 		})
// 	},    acceptMailDutyButton
// 	'click #mailDutyEditButton': function() {
// 		console.log("mailDuty edit button pressed");
// 	}
// });




