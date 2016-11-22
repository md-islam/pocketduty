import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { insertShoppingDuty, updateShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './insertShoppingDutiesForm.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

AutoForm.hooks({
	insertShoppingDutyForm: {
		beginSubmit: function(){
			console.log("Calling submit");
			insertShoppingDuty.call({
				title: this.insertDoc.title, 
				dueDate: this.insertDoc.dueDate, 
				description: this.insertDoc.description,
				list : this.insertDoc.list, 
				//laborerId: "none",
				maxSpending: this.insertDoc.maxSpending}, (err, res) => {
					if (err) {
						sweetAlert({
							type: "error",
							title: "Error!",
							text: "Oh no! Something went wrong!"
						});

						throw err;
					} else {
						var amount = this.insertDoc.maxSpending + 10;
						var invoice_no = SimpleSchema.RegEx.Id;
						var param = {invoice_no: invoice_no, amount: amount};
						FlowRouter.go('payment', param);
						
						// sweetAlert({
						// 	type: "success",
						// 	title: "Success!",
						// 	text: "The shopping duty has been successfully added!"
						// });
						// FlowRouter.go('employer');
					}
				});
			return false;
		}
	},
	updateShoppingDutiesForm: {
		beginSubmit: function(){
			updateShoppingDuty.call({
				shoppingDutyId: this.updateDoc.$set._id,
				newTitle: this.updateDoc.$set.title, 
				newDueDate: this.updateDoc.$set.dueDate, 
				newDescription: this.updateDoc.$set.description, 
				newMaxSpending: this.updateDoc.$set.maxSpending,
				newList : this.updateDoc.$set.list}, (err, res) => {
					if (err) {
						throw err;
					}
					console.log(res);
			});
			return false;
		}
	}
});

Template.insertShoppingDutiesForm.helpers({
	shoppingDutyCollection(){
		return ShoppingDuties;
	}
});

Template.updateShoppingDutiesForm.helpers({
	shoppingDutyCollection(){
		return ShoppingDuties;
	}
})