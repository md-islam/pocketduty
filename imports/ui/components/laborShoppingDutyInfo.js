import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborShoppingDutyInfo.html';
import {moment} from 'meteor/momentjs:moment';

Template.laborShoppingDutyInfo.helpers({
	formatDate : function(dueDate){
		return moment(dueDate).format('LLL');
	}
})