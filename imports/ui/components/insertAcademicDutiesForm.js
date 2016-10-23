import { Template } from 'meteor/templating';
import { AcademicDuties } from '../../api/academicDuties/academicDuties.js';
import { insertAcademicDuty, updateAcademicDuty } from '../../api/academicDuties/methods.js';
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
	},
  	updateAcademicDutiesForm: {
 		beginSubmit: function(){
 			console.log("Calling update submit");
			updateAcademicDuty.call({
 				academicDutyId: this.updateDoc.$set._id,
 				newTitle: this.updateDoc.$set.title, 
 				newDueDate: this.updateDoc.$set.dueDate, 
 				newDescription: this.updateDoc.$set.description, 
 				newDateOfClass: this.updateDoc.$set.dateOfClass,
				newClassRoomNumber: this.updateDoc.$set.classRoomNumber,
 				newTimeRangeOfClass: this.updateDoc.$set.timeRangeOfClass}, (err, res) => {
 					if (err) {
 						throw err;
 					}
 					console.log(res);
 			});
 			return false;
 		}
 	}
});

Template.insertAcademicDutiesForm.helpers({
	academicDutyCollection(){
		return AcademicDuties;
	}
});

Template.updateAcademicDutiesForm.helpers({
 	academicDutyCollection(){
 		return AcademicDuties;
 	}
});