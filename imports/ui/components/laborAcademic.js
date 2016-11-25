import { Template } from 'meteor/templating';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { assignAcademicDuty } from '../../api/academicDuties/methods.js';
import './laborAcademic.html';
import './laborAcademicDutyInfo.js';
// import {moment} from 'meteor/momentjs:moment';

Template.LaborAcademicDuty.onCreated(function(){
	console.log("Created academic duty template with date context ", this.data);
});

Template.LaborAcademicDuty.events({
	'click button' : function(){
		assignAcademicDuty.call({
			academicDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})