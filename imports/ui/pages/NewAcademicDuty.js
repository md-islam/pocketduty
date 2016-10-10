import {Template} from 'meteor/templating';
import { AcademicDuties } from '../../api/academicDuties/academicDuties.js';
import './NewAcademicDuty.html';
import '../components/insertAcademicDutiesForm.js';

Template.NewAcademicDuty.onCreated(function NewAcademicDutyCreated() {
	this.autorun(() => {
		this.subscribe('academicDuties', {});
	});
}