import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import './LaborDashboard.html';
import '../components/laborShoppingDuty.js';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';
//import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.LaborDashboard.onCreated(function(){
	this.autorun(() => {
		console.log("Yo yo yo");
		this.subscribe('laborShoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {});
	});
});

Template.LaborDashboard.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find();
		return duties;
	},
	academicDuties() {
		return AcademicDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	},
	laundryDuties() {
		return LaundryDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	}
})

