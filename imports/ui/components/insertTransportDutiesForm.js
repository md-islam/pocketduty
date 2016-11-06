import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { insertTransportDuty, updateTransportDuty } from '../../api/transportDuties/methods.js';
import './insertTransportDutiesForm.html';

Template.insertTransportDutiesForm.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
     $("[name='pickupLocation']").geocomplete();
	  $("[name='dropoffLocation']").geocomplete();
    }

		$("[name='pickupTime']").datetimepicker({
      format: 'LT'
    });
  });
});


Template.updateTransportDutiesForm.onRendered(function() {
  this.autorun(function () {
   if (GoogleMaps.loaded()) {
     $("[name='pickupLocation']").geocomplete();
	  $("[name='dropoffLocation']").geocomplete();
    }

		$("[name='pickupTime']").datetimepicker({
      format: 'LT'
    });
  });
});


AutoForm.hooks({
	insertTransportDutyForm: {
		beginSubmit: function () {

				insertTransportDuty.call({
					dueDate: this.insertDoc.dueDate,
					passengerNumber: this.insertDoc.passengerNumber,
					pickupLocation: this.insertDoc.pickupTime,
					dropoffLocation: this.insertDoc.dropoffLocation,
					pickupTime: this.insertDoc.pickupTime
				}, (err, res) => {
					if (err) {
						sweetAlert({
							type: "error",
							title: "Error!",
							text: "Oh no! Something went wrong!"
						});

						throw err;
					} else {
						sweetAlert({
							type: "success",
							title: "Success!",
							text: "The transport duty has been successfully added!"
						});
					}
				});
				
				return false;
			} 		
		},
	
	updateTransportDutiesForm: {
		beginSubmit: function () {

				updateTransportDuty.call({
					transportDutyId: this.updateDoc.$set._id,
					newDueDate: this.updateDoc.$set.dueDate,
					newPassengerNumber: this.updateDoc.$set.passengerNumber,
					newPickupLocation: this.updateDoc.$set.pickupTime,
					newDropOffLocation: this.updateDoc.$set.dropoffLocation,
					newPickupTime: this.updateDoc.$set.pickupTime
				}, (err, res) => {
					if (err) {
						sweetAlert({
							type: "error",
							title: "Error!",
							text: "Oh no! Something went wrong!"
						});

						throw err;
					} else {
						sweetAlert({
							type: "success",
							title: "Success!",
							text: "The transport duty has been successfully added!"
						});
					}
				});
			return false;
		}
	}
});

Template.insertTransportDutiesForm.helpers({
	transportDutyCollection () {
		return TransportDuties;
	}
});


Template.updateTransportDutiesForm.helpers({
	transportDutyCollection(){
		return TransportDuties;
	}
});
