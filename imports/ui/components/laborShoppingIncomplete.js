import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { unassignShoppingDuty, completeShoppingDuty} from '../../api/shoppingDuties/methods.js';
import './laborShoppingIncomplete.html';
import './laborShoppingDutyInfo.js';

Template.LaborShoppingIncomplete.onCreated(function(){
	console.log("Created labor shopping incomplete ", this.data);
});

Template.LaborShoppingIncomplete.events({
	'click .cancel' : function(){
		unassignShoppingDuty.call({
			shoppingDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	},

	'click .complete' : function(){
		console.log("calling completeShoppingDuty");
		completeShoppingDuty.call({
			shoppingDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})
