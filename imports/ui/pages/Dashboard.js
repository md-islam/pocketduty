import {Template} from 'meteor/templating';


import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';


import './Dashboard.html';
import '../components/academicDuty.js';
import '../components/shoppingDuty.js';
import '../components/laundryDuty.html';
import '../components/transportDuty.js';


Template.Dashboard.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {});
		this.subscribe('transportDuties', {});
	});
});

Template.Dashboard.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find({userId: Meteor.userId()});
		return duties;
	},
	academicDuties() {
		return AcademicDuties.find({userId: Meteor.userId()});
	},
	laundryDuties() {
		return LaundryDuties.find({userId: Meteor.userId()});
	},
	transportDuties () {
		console.log("Getting transport duties");
		console.log('bro',TransportDuties.find().fetch());
		window.ShoppingDuties = ShoppingDuties;
		window.TransportDuties = TransportDuties;
		let duties = TransportDuties.find({userId: Meteor.userId()});
		return duties;
	}
})