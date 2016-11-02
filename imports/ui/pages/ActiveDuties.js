import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './ActiveDuties.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.js';
import '../components/laundryDuty.html';
import '../components/transportDuty.html';

import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.ActiveDuties.onCreated(function(){
	this.autorun(() => {
		this.subscribe('laborShoppingIncomplete', {});
		// this.subscribe('academicDuties', {});
		// this.subscribe('laundryDuties', {});
		// this.subscribe('transportDuties', {});
	});
});

Template.ActiveDuties.helpers({
	shoppingDuties() {
		// var status = ShoppingDuties.find({status: ShoppingDuties.find(status)});
		// console.log(status);
		//if (status === "New") {
			console.log("Getting Assigned shopping duties");
			// var myCursor = ShoppingDuties.find({userId: Meteor.userId()});
			// var myDocument = myCursor.hasNext() ? myCursor.next() : null;
			// if (myDocument) {
   //  			var myStatus = myDocument.status;
   //  			console.log (tojson(myName));
			// }
			
			// window.ShoppingDuties = ShoppingDuties;
			var obj = ShoppingDuties.find({userId: Meteor.userId()}, {"status": "Assigned"}).fetch();
			console.log(obj);
			duties = ShoppingDuties.find({status: "Assigned"});
			return duties;
		// }
	}
	// ,
	// academicDuties() {
	// 	console.log("Getting NEW academic duties");
	// 	return AcademicDuties.find({userId: Meteor.userId()});
	// },
	// laundryDuties() {
	// 	console.log("Getting NEW laundry duties");
	// 	return LaundryDuties.find({userId: Meteor.userId()});
	// },
	// transportDuties() {
	// 	console.log("Getting NEW transport duties");
	// 	return TransportDuties.find({userId: Meteor.userId()});
	// }
	// text: {
	// 	var status = ShoppingDuties.find({status: Meteor.status()});
	// 	console.log(status);
	// }
});