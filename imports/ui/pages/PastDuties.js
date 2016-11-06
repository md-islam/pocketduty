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
		this.subscribe('employerShoppingComplete', {});
		
	});
});

Template.PastDuties.helpers({
	shoppingDuties() {
			console.log("Getting Completed shopping duties");
			duties = ShoppingDuties.find({status: "Complete"});
			return duties;
	}
	// ,
	// academicDuties() {
	// 	console.log("Getting Completed academic duties");
	// 	return AcademicDuties.find({status: "Complete"});
	// }
});