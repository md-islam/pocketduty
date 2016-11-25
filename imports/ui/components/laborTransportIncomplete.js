import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { unassignTransportDuty, completeTransportDuty} from '../../api/transportDuties/methods.js';
import './laborTransportIncomplete.html';
import './laborTransportDutyInfo.js';

Template.LaborTransportIncomplete.onCreated(function(){
	console.log("Created labor transport incomplete ", this.data);
});

Template.LaborTransportIncomplete.events({
	'click .cancel' : function(){
		unassignTransportDuty.call({
			transportDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	},

	'click .complete' : function(){
		console.log("calling completeShoppingDuty");
		completeTransportDuty.call({
			transportDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})