import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import './LaborDashboard.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';

Template.LaborDashboard.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {})
	});
});

Template.LaborDashboard.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
		return duties;
	},
	academicDuties() {
		return AcademicDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	},
	laundryDuties() {
		return LaundryDuties.find({userId: { $ne: Meteor.userId() }}, { sort: {dateCreated: -1}});
	}
})

