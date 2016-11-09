import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import './EditLaundryDuty.html';
import '../components/insertLaundryDutiesForm.js';

Template.EditLaundryDuty.onCreated(function(){
	this.autorun(() => {
		this.subscribe('laundryDuties', {});
	});
});
Template.EditLaundryDuty.helpers({
	getDocument() {
		var docId = FlowRouter.getParam('_id');
		console.log(docId);
		var doc = LaundryDuties.findOne(docId) || {};
		console.log(doc);
		return doc;
	}
});
