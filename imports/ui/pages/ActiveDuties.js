import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './ActiveDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';
import '../components/transportDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.ActiveDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('employerShoppingAssigned', {});
		//this.subscribe('employerAcademicAssigned', {});
	
	});
});

Template.ActiveDuties.helpers({
	shoppingDuties() {
		console.log("Getting Assigned shopping duties");
		duties = ShoppingDuties.find({status: "Assigned"});
		return duties;
	}
	// ,
	// academicDuties() {
	// 	console.log("Getting NEW academic duties");
	// 	return AcademicDuties.find({status: "Assigned"});
	// }
});