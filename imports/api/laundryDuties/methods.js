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
  validate: LaundryDuties.simpleSchema().pick(['title', 'dueDate', 'description', 'loadNo'])
  .validator({ clean: true, filter: false }),

  run({ laundryDutyId, title, dueDate, description, loadNo }) {
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
      price: LaundryDutyPrice,
      laborerId : "none"
    };

    LaundryDuties.insert(laundryDuty);
  },
});


export const updateLaundryDuty = new ValidatedMethod({
  name: 'laundryDuties.updateDuty',
  validate: new SimpleSchema({
    laundryDutyId: LaundryDuties.simpleSchema().schema('_id'),
    newTitle: LaundryDuties.simpleSchema().schema('title'),
    newDueDate : LaundryDuties.simpleSchema().schema('dueDate'),
    newDescription : LaundryDuties.simpleSchema().schema('description'),
    newLoadNo : LaundryDuties.simpleSchema().schema('loadNo')
  }).validator({ clean: true, filter: false }),
  run({ laundryDutyId, newTitle,  newLoadNo ,newDescription, newDueDate}) {
    // This is complex auth stuff - perhaps denormalizing a userId onto laundryDuties
    // would be correct here?
    const laundryDuty = LaundryDuties.findOne(laundryDutyId);

    if (laundryDuty.userId != this.userId) {
      throw new Meteor.Error('laundryDuties.updateDuty.accessDenied',
        'Cannot edit laundryDuty that is not yours');
    }
    LaundryDuties.update(laundryDutyId, {
      $set: {
        title: (_.isUndefined(newTitle) ? laundryDuty.title : newTitle),
        loadNo: (_.isUndefined(newLoadNo) ? laundryDuty.loadNo : newLoadNo),
        description: (_.isUndefined(newDescription) ? laundryDuty.description : newDescription),
        dueDate: (_.isUndefined(newDueDate)  ?  laundryDuty.dueDate : newDueDate)
      },
    });
  },
});

export const removeLaundryDuty = new ValidatedMethod({
  name: 'laundryDuties.remove',
  validate: new SimpleSchema({
   laundryDutyId: LaundryDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ laundryDutyId }) {
    const duty = LaundryDuties.findOne(laundryDutyId);

    if (duty.userId != this.userId ) {
      throw new Meteor.Error('laundryDuties.remove.accessDenied',
        'Cannot remove laundryDuties that is not yours');
    }

    LaundryDuties.remove(laundryDutyId);
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