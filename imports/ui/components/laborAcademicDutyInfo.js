import { Template } from 'meteor/templating';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
// import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborAcademicDutyInfo.html';
import {moment} from 'meteor/momentjs:moment';

Template.laborAcademicDutyInfo.helpers({
	formatDate: function (dueDate) {
		// ...
		return moment(dueDate).format('LLL');
	}
});