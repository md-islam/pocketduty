import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import './PastDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.PastDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('laborShoppingCompleted', {});
		// this.subscribe('academicDuties', {});
		// this.subscribe('laundryDuties', {})
	});
});

Template.PastDuties.helpers({
	shoppingDuties() {
		//var status = ShoppingDuties.find({status: Meteor.status()});
		//if (status === "New") {
			console.log("Getting Completed shopping duties");
			// duties = ShoppingDuties.find({userId: Meteor.userId()});
			duties = ShoppingDuties.find({status: "Complete"});
			return duties;
		// }
	}
	// ,
	// academicDuties() {
	// 	console.log("Getting Completed academic duties");
	// 	return AcademicDuties.find({userId: Meteor.userId()});
	// },
	// laundryDuties() {
	// 	console.log("Getting Completed laundry duties");
	// 	return LaundryDuties.find({userId: Meteor.userId()});
	// }
});