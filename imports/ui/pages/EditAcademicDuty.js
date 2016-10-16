import { AcademicDuties } from '../../api/academicDuties/academicDuties.js';
import './EditAcademicDuty.html';
import '../components/insertAcademicDutiesForm.js';

Template.EditAcademicDuty.onCreated(function(){
	this.autorun(() => {
		this.subscribe('academicDuties', {});
	});
});

Template.EditAcademicDuty.helpers({
	getDocument() {
		var docId = FlowRouter.getParam('_id');
		console.log(docId);
		var doc = AcademicDuties.findOne(docId) || {};
		console.log(doc);
		return doc;
	}
});