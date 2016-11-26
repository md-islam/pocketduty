import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { assignLaundryDuty } from '../../api/laundryDuties/methods.js';
import './laborLaundryDuty.html';
import {moment} from 'meteor/momentjs:moment';
import './laborLaundryDutyInfo.js';


Template.LaborLaundryDuty.onCreated(function(){
	console.log("Created laundry duty template with date context ", this.date);
});

Template.LaborLaundryDuty.events({
	'click #acceptLaundryDutyButton' : function(){
		console.log("acceptLaundryDutyButton Clicked")
		assignLaundryDuty.call({
			laundryDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
});