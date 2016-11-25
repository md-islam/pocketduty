import { Template } from 'meteor/templating';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import './laborTransportDutyInfo.html';
import {moment} from 'meteor/momentjs:moment';

Template.laborTransportDutyInfo.helpers({
	formatDate: function (dueDate) {
		// ...
		return moment(dueDate).format('LLL');
	}
});