import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import './Dashboard.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';

Template.Dashboard.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {})
	});
});

Template.Dashboard.helpers({
	shoppingDuties() {
		duties = ShoppingDuties.find({userId: Meteor.userId()});
		return duties;
	},
	academicDuties() {
		console.log("Getting academic duties");
		return AcademicDuties.find({userId: Meteor.userId()});
	},
	laundryDuties() {
		return LaundryDuties.find({userId: Meteor.userId()});
	}
})