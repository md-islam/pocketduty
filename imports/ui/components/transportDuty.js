import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { removeTransportDuty } from '../../api/transportDuties/methods.js';
import './transportDuty.html';

Template.TransportDuty.onCreated(function(){
	console.log("Created transportDuty duty template with date context ", this.data);
}); 

Template.TransportDuty.events({
	'click button' : function(){
		removeTransportDuty.call({
			transportDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})