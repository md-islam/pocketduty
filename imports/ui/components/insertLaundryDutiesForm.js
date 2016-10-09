import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import { insertLaundryDuty } from '../../api/laundryDuties/methods.js';
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