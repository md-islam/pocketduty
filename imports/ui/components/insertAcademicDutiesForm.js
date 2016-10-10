import { Template } from 'meteor/templating';
import { AcademicsDuties } from '../../api/academicDuties/academicDuties.js';
import { insertAcademicDuty } from '../../api/academicDuties/methods.js';
import './insertAcademicDutiesForm.html';

Autoform.hooks({
	insertAcademicDutiesForm: {
		beginSubmit: function() {
			console.log("Calling submit");
			insertAcademicDuty.call({
				title: this.insertDoc.title,
				description: this.indertDoc.description,
				dateOfClass: this.insertDoc.dateOfClass,
				classRoomNumber: this.insertDoc.classRoomNumber,
				timeRangeOfClass: this.insertDoc.timeRangeOfClass => {
					if(err) {
						throw err;
					}
					console.log(res);
				}
			});
			return false;
		}
	}
});

Template.insertShoppingDutiesForm.helpers({
	academicsDutyCollection(){
		return AcademicsDuties;
	}
})