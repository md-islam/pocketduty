import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { assignTransportDuty } from '../../api/transportDuties/methods.js';
import './laborTransportDuty.html';
import './laborTransportDutyInfo.js';

Template.LaborTransportDuty.onCreated(function(){
	console.log("Created transport duty template with date context ", this.data);
});

Template.LaborTransportDuty.events({
	'click button' : function(){
		assignTransportDuty.call({
			transportDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})