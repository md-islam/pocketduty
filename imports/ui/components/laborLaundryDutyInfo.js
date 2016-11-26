import { Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js'
// import { removeShoppingDuty, assignShoppingDuty } from '../../api/shoppingDuties/methods.js';
import './laborLaundryDutyInfo.html';
import {moment} from 'meteor/momentjs:moment';


Template.laborLaundryDutyInfo.helpers({
	formatDate: function (dueDate) {
		// ...
		return moment(dueDate).format('LLL');
	}
});