import { Template } from 'meteor/templating';
import { TransportDuties } from '../../api/transportDuties/transportDuties.js';
import { insertTransportDuty } from '../../api/transportDuties/methods.js';
import './insertTransportDutiesForm.html';

Template.insertTransportDutiesForm.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#pickupLocation").geocomplete();
			$("#dropoffLocation").geocomplete();
    }

		$('#pickupTime').datetimepicker({
      format: 'LT'
    });
  });
});

AutoForm.hooks({
	insertTransportDutyForm: {
		beginSubmit: function () {

			// Check fields outside of autoform
			if (this.insertDoc.dueDate !== "" &&
					this.insertDoc.passengerNumber !== "" &&
					$("#pickupLocation").val() !== "" &&
					$("#dropoffLocation").val() !== "" &&
					$("#pickupTime").val() !== "") {

				insertTransportDuty.call({
					dueDate: this.insertDoc.dueDate,
					passengerNumber: this.insertDoc.passengerNumber,
					pickupLocation: $("#pickupLocation").val(),
					dropoffLocation: $("#dropoffLocation").val(),
					pickupTime: $("#pickupTime").val()
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

			} else {
				alert("You need to fill in all fields!");
			}

			return false;
		}
	}
});

Template.insertTransportDutiesForm.helpers({
	transportDutyCollection () {
		return TransportDuties;
	}
});
