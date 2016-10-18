import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborShoppingDuty.html';

Template.LaborShoppingDuty.onCreated(function(){
	console.log("Created shopping duty template with date context ", this.data);
});

Template.LaborShoppingDuty.events({
	'click button' : function(){
		assignShoppingDuty.call({
			shoppingDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})