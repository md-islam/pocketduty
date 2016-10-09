import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { LaundryDuties } from './laundryDuties.js';
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default Laundry duty price to $10 dollars.
export const LaundryDutyPrice = 10; 

export const insertLaundryDuty = new ValidatedMethod({
  name: 'laundryDuties.insert',
  validate: LaundryDuties.simpleSchema().pick(['title', 'dueDate', 'description', 'loadNo']).validator({ clean: true, filter: false }),
  run({ title, dueDate, description, loadNo }) {
    if (!this.userId) {
      throw new Meteor.Error('laundryDuties.insert.accessDenied',
        'You must be signed in to create a new Laundry Duty');
    }

    const laundryDuty = {
      title,
      description,
      userId : this.userId,
      status: AcceptableDutyStatuses.New,
      dueDate,
      dateCreated: new Date(),
      loadNo,
      price: LaundryDutyPrice
    };

    LaundryDuties.insert(laundryDuty);
  },
});


export const updateLaundryDuty = new ValidatedMethod({
  name: 'laundryDuties.updateDuty',
  validate: new SimpleSchema({
    laundryDutyId: LaundryDuties.simpleSchema().schema('_id'),
    newTitle: LaundryDuties.simpleSchema().schema('title'),
    newDescription : LaundryDuties.simpleSchema().schema('description'),
    newMaxSpending : LaundryDuties.simpleSchema().schema('loadNo')
  }).validator({ clean: true, filter: false }),
  run({ laundryDutyId, newTitle, newDescription, loadNo }) {
    // This is complex auth stuff - perhaps denormalizing a userId onto laundryDuties
    // would be correct here?
    const laundryDuty = LaundryDuties.findOne(todoId);

    if (!laundryDuty.editableBy(this.userId)) {
      throw new Meteor.Error('laundryDuties.updateDuty.accessDenied',
        'Cannot edit laundryDuty that is not yours');
    }
    LaundryDuties.update(laundryDutyId, {
      $set: {
        title: (_.isUndefined(newText) ? laundryDuty.title : newTitle),
        description: (_.isUndefined(newDescription) ? laundryDuty.description : newDescription),
        loadNo: (_.isUndefined(loadNo) ? laundryDuty.loadNo : newMaxSpending),
      },
    });
  },
});

export const removeLaundryDuty = new ValidatedMethod({
  name: 'laundryDuties.remove',
  validate: new SimpleSchema({
    todoId: LaundryDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ todoId }) {
    const todo = LaundryDuties.findOne(todoId);

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('laundryDuties.remove.accessDenied',
        'Cannot remove laundryDuties that is not yours');
    }

    LaundryDuties.remove(todoId);
  },
});

// export const assignDutyToLaborer = new ValidatedMethod({
//   name: 'laundryDuties.assign',
//   validate: new SimpleSchema({

//   }),
//   run({dutyId}) {
//     if( !this.userId)){
//       throw new Meteor.Error('error')
//     }

//     laundryDuty = LaundryDuties.find({userId : this.userId});

//     laundryDuty.laborerId = this.userId;

//   }
// });

// Get list of all method names on laundryDuties
const LAUNDRY_DUTIES_METHODS = _.pluck([
  insertLaundryDuty,
  updateLaundryDuty,
  removeLaundryDuty,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 laundryDuties operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LAUNDRY_DUTIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}