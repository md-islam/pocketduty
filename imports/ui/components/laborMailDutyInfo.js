import { Template } from 'meteor/templating';
import { MailDuties } from '../../api/mailDuties/mailDuties.js'
// import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborMailDutyInfo.html';
import {moment} from 'meteor/momentjs:moment';

Template.laborMailDutyInfo.helpers({
	formatDate: function (dueDate) {
		// ...
		return moment(dueDate).format('LLL');
	}
});