import {Template } from 'meteor/templating';
import { LaundryDuties } from '../../api/laundryDuties/laundryDuties.js';
import './NewLaundryDuty.html';
import '../components/insertLaundryDutiesForm.js';

Template.NewLaundryDuty.onCreated(function NewLaundryDutyCreated(){
	this.autorun(() => {
	    this.subscribe('laundryDuties', { });
	  });
})