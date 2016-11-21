import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { removeShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './shoppingDuty.html';
import { moment } from 'meteor/momentjs:moment';
Template.ShoppingDuty.onCreated(function(){
	console.log("Created shopping duty template with date context ", this.data);
});

Template.ShoppingDuty.events({
	'click button' : function(){
		removeShoppingDuty.call({
			shoppingDutyId : this._id
		}, function(err, response){
			if(err){
				throw err;
			}
			console.log(response);
		})
	}
})

Template.ShoppingDuty.helpers({
	formatDate: function(dueDate){
		return moment(dueDate).format('LLL')
	}
})