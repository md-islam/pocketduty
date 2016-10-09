import {Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import './NewDuty.html';
import '../components/insertShoppingDutiesForm.js';

Template.NewDuty.onCreated(function NewDutyCreated(){
	this.autorun(() => {
	    this.subscribe('shoppingDuties', { });
	  });
})