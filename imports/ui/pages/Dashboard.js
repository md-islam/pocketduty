import {Template} from 'meteor/templating';


import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';


import './Dashboard.html';
import '../components/academicDuty.js';
import '../components/shoppingDuty.js';
import '../components/laundryDuty.html';
import '../components/mailDuty.js';
import '../components/mailDuty.html';
import '../components/transportDuty.js';
import '../components/mailDuty.js';
import '../components/mailDuty.html';
import '../components/laundryDuty.js';
 


Template.Dashboard.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {});
		this.subscribe('transportDuties', {});
		this.subscribe('mailDuties', {});
	});
});

Template.Dashboard.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find({userId: Meteor.userId()});
		return duties;
	},
	academicDuties() {
		console.log("Getting academic duties");
		return AcademicDuties.find({userId: Meteor.userId()});
	},
	laundryDuties() {
		console.log("Getting laundry duties");
		return LaundryDuties.find({userId: Meteor.userId()});
	},
	transportDuties () {
		console.log("Getting transport duties");
		let duties = TransportDuties.find({userId: Meteor.userId()});
		return duties;
	},
	mailDuties(){
		console.log("mailDuties getting duties");
		console.log('maildutiesfetch', MailDuties.find().fetch());
		return MailDuties.find({userId: Meteor.userId()});
	}
})