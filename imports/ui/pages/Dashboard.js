import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import './Dashboard.html';
import '../components/shoppingDuty.html';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';

Template.Dashboard.onCreated(function(){
	this.autorun(() => {
		this.subscribe('shoppingDuties', {});
		this.subscribe('academicDuties', {});
		this.subscribe('laundryDuties', {})
	});
});

Template.Dashboard.helpers({
	shoppingDuties() {
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find();
		return duties;
	},
	academicDuties() {
		return AcademicDuties.find();
	},
	laundryDuties() {
		return LaundryDuties.find();
	}
})