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
  validate: TransportDuties.simpleSchema().pick(['title', 'dueDate', 'description', 'maxSpending']).validator({ clean: true, filter: false }),
  run({ title, dueDate, description, maxSpending }) {

    if (!this.userId) {
      throw new Meteor.Error('transportDuties.insert.accessDenied',
        'You must be signed in to create a new Transport Duty');
    }

    const transportDuty = {
      title,
      description,
      userId : this.userId,
      dueDate,
      status: AcceptableDutyStatuses.New,
      dateCreated: new Date(),
      maxSpending,
      price: TransportDutyPrice
    };

    TransportDuties.insert(transportDuty);
  },
});


export const updateTransportDuty = new ValidatedMethod({
  name: 'transportDuties.updateDuty',
  validate: new SimpleSchema({
    transportDutyId: TransportDuties.simpleSchema().schema('_id'),
    newTitle: TransportDuties.simpleSchema().schema('title'),
    newDescription : TransportDuties.simpleSchema().schema('description'),
    newMaxSpending : TransportDuties.simpleSchema().schema('maxSpending')
  }).validator({ clean: true, filter: false }),
  run({ transportDutyId, newTitle, newDescription, maxSpending }) {
    // This is complex auth stuff - perhaps denormalizing a userId onto transportDuties
    // would be correct here?
    const transportDuty = TransportDuties.findOne(todoId);

    if (!transportDuty.editableBy(this.userId)) {
      throw new Meteor.Error('transportDuties.updateDuty.accessDenied',
        'Cannot edit transportDuty that is not yours');
    }
    TransportDuties.update(transportDutyId, {
      $set: {
        title: (_.isUndefined(newText) ? transportDuty.title : newTitle),
        description: (_.isUndefined(newDescription) ? transportDuty.description : newDescription),
        maxSpending: (_.isUndefined(maxSpending) ? transportDuty.maxSpending : newMaxSpending),
      },
    });
  },
});

export const removeTransportDuty = new ValidatedMethod({
  name: 'transportDuties.remove',
  validate: new SimpleSchema({
    todoId: TransportDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ todoId }) {
    const todo = TransportDuties.findOne(todoId);

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('transportDuties.remove.accessDenied',
        'Cannot remove transportDuties that is not yours');
    }

    TransportDuties.remove(todoId);
  },
});
// });

// Get list of all method names on transportDuties
const TRANSPORT_DUTIES_METHODS = _.pluck([
  insertTransportDuty,
  updateTransportDuty,
  removeTransportDuty,
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
