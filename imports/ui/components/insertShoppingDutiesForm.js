import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { insertShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './insertShoppingDutiesForm.html';

AutoForm.hooks({
	insertShoppingDutyForm: {
		beginSubmit: function(){
			console.log("Calling submit");
			insertShoppingDuty.call({
				title: this.insertDoc.title, 
				dueDate: this.insertDoc.dueDate, 
				description: this.insertDoc.description, 
				maxSpending: this.insertDoc.maxSpending}, (err, res) => {
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