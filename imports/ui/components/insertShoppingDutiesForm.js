import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import './insertShoppingDutiesForm.html';

Template.insertShoppingDutiesForm.helpers({
	shoppingDutyCollection(){
		return ShoppingDuties;
	}
})