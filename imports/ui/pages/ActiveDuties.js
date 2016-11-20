import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties} from '../../api/mailDuties/mailDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './ActiveDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';
import '../components/mailDuty.html';
import '../components/transportDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.ActiveDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('employerShoppingAssigned', {});
		this.subscribe('employerAcademicAssigned', {});
		this.subscribe('employerLaundryAssigned', {});
		this.subscribe('employerMailAssigned', {});
	    this.subscribe('employerTransportAssigned', {});
	});
});

Template.ActiveDuties.helpers({
	shoppingDuties() {
		console.log("Getting Assigned shopping duties");
		duties = ShoppingDuties.find({status: "Assigned"});
		return duties;
	}
	,
	academicDuties() {
		console.log("Getting Assigned academic duties");
		return AcademicDuties.find({status: "Assigned"});
	}
	,
	laundryDuties() {
		console.log("Getting Assigned laundry duties");
		return LaundryDuties.find({status: "Assigned"});
	}
	,
	mailDuties() {
		console.log("Getting Assigned mail duties");
		return MailDuties.find({status: "Assigned"});
	}
	,
	transportDuties() {
		console.log("Getting Assigned transport duties");
		return TransportDuties.find({status: "Assigned"});
	}
});