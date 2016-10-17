import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { TransportDuties } from './transportDuties.js';
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default transport duty price to $10 dollars.
export const TransportDutyPrice = 10;

export const insertTransportDuty = new ValidatedMethod({
  name: 'transportDuties.insert',

  validate: TransportDuties.simpleSchema().pick(['pickupLocation', 'pickupTime', 'dropoffLocation', 'dueDate', 'passengerNumber']).validator({ clean: true, filter: false }),
  run({ pickupLocation, pickupTime, dropoffLocation, dueDate, passengerNumber }) {

    if (!this.userId) {
      throw new Meteor.Error('transportDuties.insert.accessDenied',
        'You must be signed in to create a new Transport Duty');
    }

    const transportDuty = {
      userId: this.userId,
      dueDate,
      status: AcceptableDutyStatuses.New,
      dateCreated: new Date(),
      passengerNumber,
      price: TransportDutyPrice,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      laborerId: "none"
    };

    TransportDuties.insert(transportDuty);
  },
});


// Get list of all method names on transportDuties
const TRANSPORT_DUTIES_METHODS = _.pluck([
  insertTransportDuty,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 transportDuties operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TRANSPORT_DUTIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
