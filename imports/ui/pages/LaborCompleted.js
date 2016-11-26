import {Template} from 'meteor/templating';
import { ShoppingDuties} from '../../api/shoppingDuties/shoppingDuties.js';
import { AcademicDuties} from '../../api/academicDuties/academicDuties.js';
import { TransportDuties} from '../../api/transportDuties/transportDuties.js';
import { LaundryDuties} from '../../api/laundryDuties/laundryDuties.js';
import { MailDuties } from '../../api/mailDuties/mailDuties.js';
import './LaborCompleted.html';
import '../components/laborShoppingCompleted.html';
import '../components/laborMailDutyCompleted.html';
import '../components/laborAcademicCompleted.html';
import '../components/laborTransportCompleted.html';
import '../components/laborLaundryDutyCompleted.html';
import '../components/academicDuty.html';
import '../components/laundryDuty.html';
//import { AcceptableDutyStatuses } from '../../api/duties/duties.js';

Template.LaborCompleted.onCreated(function(){
    this.autorun(() => {
        console.log("Yo yo yo");
        this.subscribe('laborShoppingCompleted', {});
        this.subscribe('laborMailDutiesAssignedComplete',{});
        this.subscribe('laborAcademicCompleted', {});
        this.subscribe('laborTransportCompleted', {});
        this.subscribe('laborLaundryDutiesAssignedComplete', {});
    });
});

Template.LaborCompleted.helpers({
    shoppingDuties() {
        console.log("Getting shopping duties");
        duties = ShoppingDuties.find();
        return duties;
    },
    academicDuties() {
        console.log("Getting academic duties");
        return AcademicDuties.find();
    },
    transportDuties() {
        console.log("Getting transport duties")
        return TransportDuties.find();
    },
    laundryDuties() {
        return LaundryDuties.find();
    },
    mailDuties(){
        console.log("Getting shoppingduties");
        return MailDuties.find();
    }

})

