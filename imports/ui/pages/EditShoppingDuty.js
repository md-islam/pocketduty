import { ShoppingDuties } from '../../api/shoppingDuties/shoppingDuties.js';
import './EditShoppingDuty.html';
import '../components/insertShoppingDutiesForm.js';

Template.EditShoppingDuty.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
	});
});
Template.EditShoppingDuty.helpers({
	getDocument() {
		var docId = FlowRouter.getParam('_id');
		console.log(docId);
		var doc = ShoppingDuties.findOne(docId) || {};
		console.log(doc);
		return doc;
	}
});
