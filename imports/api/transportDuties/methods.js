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

//Assign transport duty
export const assignTransportDuty = new ValidatedMethod({
  name: 'transportDuties.assign',
  validate: new SimpleSchema({
    transportDutyId: TransportDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ transportDutyId }) {
    const duty = TransportDuties.findOne(transportDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('transportDuties.assign.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    TransportDuties.update(transportDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.Assigned}});
  },
});

//Unassign transport duty
export const unassignTransportDuty = new ValidatedMethod({
  name: 'transportDuties.unassign',
  validate: new SimpleSchema({
    transportDutyId: TransportDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ transportDutyId }) {
    const duty = TransportDuties.findOne(transportDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('transportDuties.unassign.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    TransportDuties.update(transportDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.New}});
  },
});

//Complete transport duty
export const completeTransportDuty = new ValidatedMethod({
  name: 'transportDuties.complete',
  validate: new SimpleSchema({
    transportDutyId: TransportDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ transportDutyId }) {
    const duty = TransportDuties.findOne(transportDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('transportDuties.complete.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    TransportDuties.update(transportDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.Complete}});
  },
});

export const updateTransportDuty = new ValidatedMethod({
  name: 'transportDuties.updateDuty',
  validate: new SimpleSchema({
    transportDutyId: TransportDuties.simpleSchema().schema('_id'),
    newPickupLocation: TransportDuties.simpleSchema().schema('pickupLocation'),
    newPickupTime : TransportDuties.simpleSchema().schema('pickupTime'),
    newDropOffLocation : TransportDuties.simpleSchema().schema('dropoffLocation'),
    newDueDate: TransportDuties.simpleSchema().schema('dueDate'),
    newPassengerNumber : TransportDuties.simpleSchema().schema('passengerNumber')
  }).validator({ clean: true, filter: false }),
  run({ transportDutyId, newPickupLocation, newPickupTime,  newDropOffLocation, newDueDate, newPassengerNumber}) {
    // This is complex auth stuff - perhaps denormalizing a userId onto transportDuties
    // would be correct here?
    const transportDuty = TransportDuties.findOne(transportDutyId);
    console.log(transportDuty);
    if (transportDuty.userId != this.userId) {
      throw new Meteor.Error('transportDuties.updateDuty.accessDenied',
        'Cannot edit transportDuty that is not yours');
    }
    
    TransportDuties.update(transportDutyId, {
      $set: {
        dueDate: (_.isUndefined(newDueDate) ? transportDuty.dueDate: newDueDate),
        pickupLocation: (_.isUndefined(newPickupLocation) ? transportDuty.pickupLocation : newPickupLocation),
        pickupTime: (_.isUndefined(newPickupTime) ? transportDuty.pickupTime :  newPickupTime),
        dropoffLocation: (_.isUndefined(newDropOffLocation) ? transportDuty.dropoffLocation : newDropOffLocation),
        passengerNumber: (_.isUndefined(newPassengerNumber) ? transportDuty.passengerNumber : newPassengerNumber)
      },
    });
  },
});

// Get list of all method names on transportDuties
const TRANSPORT_DUTIES_METHODS = _.pluck([
  insertTransportDuty,
  updateTransportDuty
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
