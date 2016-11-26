import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './LaborIncomplete.html';
import '../components/laborShoppingIncomplete.js';
import '../components/laborMailDutyIncomplete.js';
import '../components/laborTransportIncomplete.js';
import '../components/laborAcademicIncomplete.js';
import '../components/laborLaundryDutyIncomplete.js';
import '../components/laundryDuty.html';
//import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.LaborIncomplete.onCreated(function(){
	this.autorun(() => {
		console.log("Yo yo yo");
		this.subscribe('laborShoppingIncomplete', {});
		this.subscribe('laborMailDutiesAssignedIncomplete', {});
		this.subscribe('laborAcademicIncomplete', {});
		this.subscribe('laborLaundryDutiesAssignedIncomplete', {});
		this.subscribe('laborTransportIncomplete', {});	//Transport
	});
});

Template.LaborIncomplete.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find();
		return duties;
	},
	transportDuties() {	//Transport
		console.log("getting Transport Duties");
		duties = TransportDuties.find();
		return duties;
	},
	academicDuties() {
		console.log("getting academic duties")
		return AcademicDuties.find();
	},
	laundryDuties() {
		return LaundryDuties.find();
	},
	mailDuties(){
		console.log();
		return MailDuties.find();
	}
})

