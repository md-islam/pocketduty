import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { unassignMailDuty, completeMailDuty} from '../../api/mailDuties/methods.js';
import './laborMailDutyIncomplete.html';
import './laborMailDutyInfo.js';

Template.LaborMailDutyIncomplete.onCreated(function(){
	console.log("Created mail duty incomplete ", this.data);
});



Template.LaborMailDutyIncomplete.events({
	'click .cancel' : function(){
		unassignMailDuty.call({
			mailDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	},

	'click .complete' : function(){
		console.log("calling completeMailDuty");
		completeMailDuty.call({
			mailDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})