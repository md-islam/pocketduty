import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { insertLaundryDuty, updateLaundryDuty } from '../../api/laundryDuties/methods.js';


import './insertLaundryDutiesForm.html';


AutoForm.hooks({
	insertLaundryDutyForm: {
		beginSubmit: function(){
			console.log("Calling submit");
			insertLaundryDuty.call({
				title: this.insertDoc.title, 
				dueDate: this.insertDoc.dueDate, 
				description: this.insertDoc.description, 
				loadNo: this.insertDoc.loadNo}, (err, res) => {
					if (err) {
						throw err;
					}
					else{
						console.log(res);
						var amount = 10;
						var invoice_no = SimpleSchema.RegEx.Id;
						var param = {invoice_no: invoice_no, amount: amount};
						FlowRouter.go('payment', param);
					}
					// console.log(res);
				});
			return false;
		}
	},

updateLaundryDutiesForm: {
		beginSubmit: function(){
			updateLaundryDuty.call({
				laundryDutyId: this.updateDoc.$set._id,
				newTitle: this.updateDoc.$set.title, 
				newDueDate: this.updateDoc.$set.dueDate, 
				newDescription: this.updateDoc.$set.description, 
				// newMaxSpending: this.updateDoc.$set.maxSpending,
				newLoadNo : this.updateDoc.$set.loadNo }, (err, res) => {
					if (err) {
						throw err;
					}
					console.log(res);
			});
			return false;
		}
	}

});

Template.insertLaundryDutiesForm.helpers({
	laundryDutyCollection(){
		return LaundryDuties;
	}
})

Template.updateLaundryDutiesForm.helpers({
	laundryDutyCollection(){
		return LaundryDuties;
	}
})