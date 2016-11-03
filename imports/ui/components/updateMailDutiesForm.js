import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import './updateMailDutiesForm.html';

import {
	updateMailDuty
} from '../../api/mailDuties/methods.js'



Template.updateMailDutiesForm.onCreated(function(){
	this.autorun(() => {
		this.subscribe('mailDuties', {});
	});
});

Template.updateMailDutiesForm.helpers({
	getDocument() {
		var docId = FlowRouter.getParam('_id');
		var oid = MailDuties.findOne({"_id":docId});
		console.log("docId", docId, oid);

		var doc = MailDuties.findOne(oid);
		console.log("getDocumentCallBRUHHHHHH", oid);
		return oid;
	},
	mailDutyCollection() {
		console.log("mailDutyCollection", MailDuties);
		return MailDuties;
	},
	mailDuties(){
		console.log("mailDuties getting duties");
		console.log('get mailDuties call', MailDuties.find().fetch());
		var docId = FlowRouter.getParam('_id');
		return MailDuties.findOne(docId) || {};
	}
});

//prevent default actions here if something goes wrong such as user submits with 
//empty fields
Template.updateMailDutiesForm.events({
	'submit #updateMailDutyForm': function(event) {
		console.log("prevented submit default action in case of an error");
		event.preventDefault();
	}
});



// deliveryType: this.insertDoc.deliveryType,
// shoppingDutyId: this.updateDoc.$set._id,
// 				newTitle: this.updateDoc.$set.title, 
// 				newDueDate: this.updateDoc.$set.dueDate, 
// 				newDescription: this.updateDoc.$set.description, 
// 				newMaxSpending: this.updateDoc.$set.maxSpending,
// 				newList : this.updateDoc.$set.list}, (err, res) =

AutoForm.hooks({
	updateMailDutyForm: {
		beginSubmit: function(){
			console.log("update button clicked");
			console.log(this.currentDoc);
			console.log("haaaaa");
			updateMailDuty.call({
				mailDutyId: this.currentDoc._id,
				newPickUpLocation: $("#mailPickUpLocationUpdateForm").val(),
				newDropOffLocation: $("#mailDropOffLocationUpdateForm").val(), 
				newPickUpTime: $("#mailTimePickerFieldIDUpdateForm").val(), 
				newDeliveryType: this.currentDoc.deliveryType, 
				newServicePrice : this.currentDoc.servicePrice,
				newDueDate: this.currentDoc.dueDate}, (err, res) => {
				if (err) {
					console.log(err);
					sweetAlert({
						type: "error",
						title: "Error!",
						text: "Make sure you have entered all fields"
					});
					throw err;
				}
				// console.log(res);
			});
			return false;
		},
		endSubmit: function() {
			console.log("Update Successfull success");
			sweetAlert({
				type: "success",
				title: "Updated Duty!",
				text: "The mail duty has been successfully updated!"
			}, function(){
				console.log("redirecting to employer page...")
				FlowRouter.go('/employer');
			});
			

		}
	}
});

// pickUpLocation: $("#mailPickUpLocation").val(),

// MailDuties.publicFields = {
// 	dateCreated:1,
// 	dateExecuted:1,
// 	userId:1,
// 	status: 1, //This field will be used for filtering unassigned duties. 
// 	title: 1,
// 	description: 1,
// 	price: 1,
// 	pickUpLocation:1,
// 	dropOffLocation:1,
// 	deliveryType:1,
// 	pickUpTime:1
// };

// AutoForm.hooks({
// 	insertMailDutyForm: {
// 		beginSubmit: function() {
// 			console.log("Calling submit");
// 			insertMailDuty.call({
// 				pickUpLocation: $("#mailPickUpLocation").val(),
// 				dropOffLocation: $("#mailDropOffLocation").val(),
// 				pickUpTime: $("#mailTimePickerFieldID").val(),
// 				deliveryType: this.insertDoc.deliveryType,
// 				servicePrice: this.insertDoc.servicePrice,
// 				dueDate: this.insertDoc.dueDate
// 			}, (err, res) => {
// 				if (err) {
// 					console.log(err);
// 					sweetAlert({
// 						type: "error",
// 						title: "Error!",
// 						text: "Oh no! Something went wrong!"
// 					});
// 					throw err;
// 				}
// 				// console.log(res);
// 			});
// 			return false;
// 		},
// 		endSubmit: function() {
// 			console.log("submission success");
// 			sweetAlert({
// 				type: "success",
// 				title: "Success!",
// 				text: "The mail duty has been successfully added!"
// 			}, function(){
// 				console.log("redirecting to employer page...")
// 				FlowRouter.go('/employer');
// 			});
			

// 		}
// 	}
// });



