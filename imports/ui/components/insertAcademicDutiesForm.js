import { Template } from 'meteor/templating';
import { AcademicDuties } from '../../api/academicDuties/academicDuties.js';
import { insertAcademicDuty } from '../../api/academicDuties/methods.js';
import './insertAcademicDutiesForm.html';

AutoForm.hooks({
	insertAcademicDutyForm: {
		beginSubmit: function() {
			console.log("Calling submit");
			insertAcademicDuty.call({
				title: this.insertDoc.title,
				description: this.insertDoc.description,
				dateOfClass: this.insertDoc.dateOfClass,
				classRoomNumber: this.insertDoc.classRoomNumber,
				dueDate: this.insertDoc.dueDate,
				timeRangeOfClass: this.insertDoc.timeRangeOfClass}, (err, res) => {
					if(err) {
						throw err;
					}
					console.log(res);
				}
			);
			return false;
		}
	}
});

Template.insertAcademicDutiesForm.helpers({
	academicDutyCollection(){
		return AcademicDuties;
	}
})