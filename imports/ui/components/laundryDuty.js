import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { removeLaundryDuty } from '../../api/laundryDuties/methods.js';
import './laundryDuty.html';
import { moment } from 'meteor/momentjs:moment';

Template.LaundryDuty.onCreated(function(){
	console.log("Created Laundry duty template with date context ", this.data);
});

Template.LaundryDuty.events({
	'click button' : function(){

		

		removeLaundryDuty.call({
			laundryDutyId : this._id
		}, function(err, response){
			if(err){


		console.log("inside if " );
				throw err;
			}
			console.log(response);
		})
	}
})

Template.LaundryDuty.helpers({
	formatDate: function(dueDate){
		return moment(dueDate).format('LLL')
	}
})