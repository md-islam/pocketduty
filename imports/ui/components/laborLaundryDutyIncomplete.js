import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { unassignLaundryDuty, completeLaundryDuty} from '../../api/laundryDuties/methods.js';
import './laborLaundryDutyIncomplete.html';
import './laborLaundryDutyInfo.js';

Template.LaborLaundryDutyIncomplete.onCreated(function(){
	console.log("Created laundry duty incomplete ", this.date);
});



Template.LaborLaundryDutyIncomplete.events({
	'click .cancel' : function(){
		unassignLaundryDuty.call({
			laundryDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	},

	'click .complete' : function(){
		console.log("calling completeLaundryDuty");
		completeLaundryDuty.call({
			laundryDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})