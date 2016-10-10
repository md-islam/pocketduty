import { Template } from 'meteor/templating';
import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import './shoppingDuty.html';

Template.ShoppingDuty.onCreated(function(){
	console.log("Created shopping duty template with date context ", this.data);
});