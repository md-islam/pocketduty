import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { AcademicDuties } from './academicDuties.js';
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default academic duty price to $10 dollars.
export const AcademicDutyPrice = 10; 

export const insertAcademicDuty = new ValidatedMethod({
  name: 'academicDuties.insert',
    validate: AcademicDuties.simpleSchema().pick(['title','dueDate', 'description', 'dateOfClass', 'classRoomNumber', 'timeRangeOfClass']).validator({ clean: true, filter: false }),
    run({ title, dueDate, description, dateOfClass, classRoomNumber, timeRangeOfClass}) {
    if (!this.userId) {
      throw new Meteor.Error('academicDuties.insert.accessDenied',
        'You must be signed in to create a new Shopping Duty');
    }

    const academicDuty = {
      title,
      description,
      dueDate,
      userId : this.userId,
      status: AcceptableDutyStatuses.New,
      dateCreated: new Date(),
      dateOfClass,
      classRoomNumber,
      timeRangeOfClass,
      price: AcademicDutyPrice
    };

    AcademicDuties.insert(academicDuty);
  },
});


export const updateAcademicDuty = new ValidatedMethod({
  name: 'academicDuties.updateDuty',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
    newTitle: AcademicDuties.simpleSchema().schema('title'),
    newDescription : AcademicDuties.simpleSchema().schema('description'),
    newDateOfClass : AcademicDuties.simpleSchema().schema('dateOfClass'),
    newClassRoomNumber : AcademicDuties.simpleSchema().schema('classRoomNumber'),
    newTimeRangeOfClass : AcademicDuties.simpleSchema().schema('timeRangeOfClass')
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId, newTitle, newDescription, dateOfClass, classRoomNumber, timeRangeOfClass}) {
    // This is complex auth stuff - perhaps denormalizing a userId onto shoppingDuties
    // would be correct here?
    const academicDuty = AcademicDuties.findOne(todoId);

    if (!academicDuty.editableBy(this.userId)) {
      throw new Meteor.Error('academicDuties.updateDuty.accessDenied',
        'Cannot edit academicDuty that is not yours');
    }
    AcademicDuties.update(academicDutyId, {
      $set: {
        title: (_.isUndefined(newText) ? academicDuty.title : newTitle),
        description: (_.isUndefined(newDescription) ? academicDuty.description : newDescription),
        dateOfClass: (_.isUndefined(newDateOfClass) ? academicDuty.dateOfClass : newDateOfClass),
        classRoomNumber: (_.isUndefined(newDateOfClass) ? academicDuty.classRoomNumber : newClassRoomNumber),
        timeRangeOfClass: (_.isUndefined(newDateOfClass) ? academicDuty.timeRangeOfClass : newTimeRangeOfClass)
      },
    });
  },
});

export const removeAcademicDuty = new ValidatedMethod({
  name: 'academicDuties.remove',
  validate: new SimpleSchema({
    todoId: AcademicDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ todoId }) {
    const todo = AcademicDuties.findOne(todoId);

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('academicDuties.remove.accessDenied',
        'Cannot remove academicDuties that is not yours');
    }

    AcademicDuties.remove(todoId);
  },
});

// export const assignDutyToLaborer = new ValidatedMethod({
//   name: 'shoppingDuties.assign',
//   validate: new SimpleSchema({

//   }),
//   run({dutyId}) {
//     if( !this.userId)){
//       throw new Meteor.Error('error')
//     }

//     shoppingDuty = ShoppingDuties.find({userId : this.userId});

//     shoppingDuty.laborerId = this.userId;

//   }
// });

// Get list of all method names on shoppingDuties
const ACADEMIC_DUTIES_METHODS = _.pluck([
  insertAcademicDuty,
  updateAcademicDuty,
  removeAcademicDuty,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 shoppingDuties operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ACADEMIC_DUTIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}