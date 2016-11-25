import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import './LaborDashboard.html';
import '../components/laborShoppingDuty.js';
import '../components/laborTransportDuty.js';
import '../components/laborMailDuty.js';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';
//import { AcceptableDutyStatuses } from '../../api/duties/duties.js';


Template.LaborDashboard.onCreated(function(){
	this.autorun(() => {
		console.log("Yo yo yo");
		this.subscribe('academicDuties', {});	//Academic
		this.subscribe('laundryDuties', {});	//Laundry
		this.subscribe('laborMailDutiesNew', {});	//Mailing
		this.subscribe('laborShoppingDuties', {});	//Shopping
		this.subscribe('laborTransportDuties', {});	//Transport
	});
});

Template.LaborDashboard.helpers({
	academicDuties() {	//Academic
		return AcademicDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	},
	laundryDuties() {	//Laundry
		return LaundryDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	},
	mailDuties() {	//Mailing
		console.log("getting mail duties")
		mailDuties = MailDuties.find();
		console.log(mailDuties.fetch());
		return mailDuties;
	},
	shoppingDuties() {	//Shopping
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find();
		return duties;
	},
	transportDuties() {	//Transport
		return LaundryDuties.find();
	}
})

Template.LaborDashboard.events({
		'click .shopping' : function(event){
			console.log("clicked shopping check box");
			var x = event.target.checked;
			console.log(x);
			//this.subscribe('laborShoppingDuties', {});
		}
})

