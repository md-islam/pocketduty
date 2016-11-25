import { Template } from 'meteor/templating';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { unassignAcademicDuty, completeAcademicDuty} from '../../api/academicDuties/methods.js';
import './laborAcademicIncomplete.html';
import './laborAcademicDutyInfo.js';

Template.LaborAcademicIncomplete.onCreated(function(){
	console.log("Created labor shopping incomplete ", this.data);
});

Template.LaborAcademicIncomplete.events({
	'click .cancel' : function(){
		unassignAcademicDuty.call({
			academicDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	},

	'click .complete' : function(){
		completeAcademicDuty.call({
			academicDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})
