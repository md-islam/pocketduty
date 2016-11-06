import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import './EditTransportDuty.html';
import '../components/insertTransportDutiesForm.js';

Template.EditTransportDuty.onCreated(function(){
	this.autorun(() => {
		this.subscribe('transportDuties', {});
	});
});
Template.EditTransportDuty.helpers({
	getDocument() {
		var docId = FlowRouter.getParam('_id');
		console.log(docId);
		var doc = TransportDuties.findOne(docId) || {};
		console.log(doc);
		return doc;
	}
});
