import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties} from '../../api/mailDuties/mailDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './PastDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';
import '../components/mailDuty.html';
import '../components/transportDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.PastDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('employerShoppingComplete', {});
		this.subscribe('employerAcademicComplete', {});
		this.subscribe('employerLaundryComplete', {});
		this.subscribe('employerMailComplete', {});
		this.subscribe('employerTransportComplete', {});
	});
});

Template.PastDuties.helpers({
	shoppingDuties() {
			console.log("Getting Completed shopping duties");
			duties = ShoppingDuties.find({status: "Complete"});
			return duties;
	}
	,
	academicDuties() {
		console.log("Getting Completed academic duties");
		return AcademicDuties.find({status: "Complete"});
	}
	,
	laundryDuties() {
		console.log("Getting Completed laundry duties");
		return LaundryDuties.find({status: "Complete"});
	}
	,
	mailDuties() {
		console.log("Getting Completed mail duties");
		return MailDuties.find({status: "Complete"});
	}
	,
	transportDuties() {
		console.log("Getting Completed transport duties");
		return TransportDuties.find({status: "Complete"});
	}
});