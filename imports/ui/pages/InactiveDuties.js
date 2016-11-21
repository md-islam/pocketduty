import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties} from '../../api/mailDuties/mailDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './InactiveDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';
import '../components/mailDuty.html';
import '../components/transportDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.InactiveDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('employerShoppingUnassigned', {});
		this.subscribe('employerAcademicUnassigned', {});
		this.subscribe('employerLaundryUnassigned', {});
		this.subscribe('employerMailUnassigned', {});
	    this.subscribe('employerTransportUnassigned', {});
	});
});

Template.InactiveDuties.helpers({
	shoppingDuties() {
		console.log("Getting Unassigned shopping duties");
		duties = ShoppingDuties.find({status: "New"});
		return duties;
	}
	,
	academicDuties() {
		console.log("Getting Unassigned academic duties");
		return AcademicDuties.find({status: "New"});
	}
	,
	laundryDuties() {
		console.log("Getting Unassigned laundry duties");
		return LaundryDuties.find({status: "New"});
	}
	,
	mailDuties() {
		console.log("Getting Unassigned mail duties");
		return MailDuties.find({status: "New"});
	}
	,
	transportDuties() {
		console.log("Getting Unassigned transport duties");
		return TransportDuties.find({status: "New"});
	}
});