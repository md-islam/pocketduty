import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import './transportDuty.html';

Template.TransportDuty.onCreated(function(){
	console.log("Created transportDuty duty template with date context ", this.data);
}); 