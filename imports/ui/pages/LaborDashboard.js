import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import './LaborDashboard.html';
import '../components/laborShoppingDuty.js';
import '../components/laborTransportDuty.js';
import '../components/laborLaundryDuty.js';
import '../components/laborAcademic.js';
import '../components/laborMailDuty.js';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';
//import { AcceptableDutyStatuses } from '../../api/duties/duties.js';


Template.LaborDashboard.onCreated(function(){
	this.autorun(() => {
		console.log("Yo yo yo");
		this.subscribe('laborAcademicDuties', {});	//Academic
		this.subscribe('laborLaundryDutiesNew', {});	//Laundry
		this.subscribe('laborMailDutiesNew', {});	//Mailing
		this.subscribe('laborShoppingDuties', {});	//Shopping
		this.subscribe('laborTransportDuties', {});	//Transport

		$('#tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})
	});
});

Template.LaborDashboard.helpers({
	academicDuties() {	//Academic
		return AcademicDuties.find();
	},
	laundryDuties() {	//Laundry
		return LaundryDuties.find();
	},
	mailDuties() {	//Mailing
		console.log("getting mail duties")
		mailDuties = MailDuties.find();
		console.log(mailDuties.fetch());
		return mailDuties;
	},
	shoppingDuties() {	//Shopping
		console.log("Getting shopping duties");
		duties = ShoppingDuties.find();
		return duties;
	},
	transportDuties() {	//Transport
		console.log("getting Transport Duties");
		duties = TransportDuties.find();
		return duties;
	}
})

Template.LaborDashboard.events({
		'click .shopping' : function(event){
			console.log("clicked shopping check box");
			var x = event.target.checked;
			console.log(x);
			//this.subscribe('laborShoppingDuties', {});
		}
})

