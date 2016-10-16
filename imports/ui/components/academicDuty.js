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
 			if(err){
 				throw err;
 			}
 			console.log(response);
 		})
 	}
 }); 