import { Template } from 'meteor/templating';
import { AcademicDuties } from '../../api/academicDuties/academicDuties.js';
import { removeAcademicDuty } from '../../api/academicDuties/methods.js';
import './academicDuty.html';

Template.AcademicDuty.onCreated(function(){
	console.log("Created academic duty template with date context ", this.data);
});

Template.AcademicDuty.events({
 	'click button' : function(){
 		removeAcademicDuty.call({
 			academicDutyId : this._id
 		}, function(err, response){
 			if (err) {
						sweetAlert({
							type: "error",
							title: "Error!",
							text: "Oh no! Something went wrong!"
						});

						throw err;
					} else {
						sweetAlert({
							type: "success",
							title: "Success!",
							text: "The academic duty has been successfully deleted!"
						});
					}
 		})
 	}
 }); 