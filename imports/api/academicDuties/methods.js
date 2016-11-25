import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { AcademicDuties } from './academicDuties.js';
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitrarily set default academic duty price to $10 dollars.
export const AcademicDutyPrice = 10; 

export const insertAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.insert',
    validate: AcademicDuties.simpleSchema().pick(['title','dueDate', 'description', 'dateOfClass', 'classRoomNumber', 'timeRangeOfClass']).validator({ clean: true, filter: false }),
    run({ title, dueDate, description, dateOfClass, classRoomNumber, timeRangeOfClass}) {
    if (!this.userId) {
      throw new Meteor.Error('AcademicDuties.insert.accessDenied',
        'You must be signed in to create a new Academic Duty');
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
      price: AcademicDutyPrice,
      laborerId: "none"
    };

    AcademicDuties.insert(academicDuty);
  },
});


export const updateAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.updateDuty',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
    newTitle: AcademicDuties.simpleSchema().schema('title'),
    newDescription : AcademicDuties.simpleSchema().schema('description'),
    newDateOfClass : AcademicDuties.simpleSchema().schema('dateOfClass'),
    newClassRoomNumber : AcademicDuties.simpleSchema().schema('classRoomNumber'),
    newTimeRangeOfClass : AcademicDuties.simpleSchema().schema('timeRangeOfClass'),
    newDueDate: AcademicDuties.simpleSchema().schema('dueDate')
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId, newTitle, newDueDate, newDescription, newDateOfClass, newClassRoomNumber, newTimeRangeOfClass}) {
    // This is complex auth stuff - perhaps denormalizing a userId onto shoppingDuties
    // would be correct here?
    const academicDuty = AcademicDuties.findOne(academicDutyId);
    console.log(academicDuty);

    if (academicDuty.userId != this.userId) {
      throw new Meteor.Error('AcademicDuties.updateDuty.accessDenied',
        'Cannot edit academicDuty that is not yours');
    }
    AcademicDuties.update(academicDutyId, {
      $set: {
        title: (_.isUndefined(newTitle) ? academicDuty.title : newTitle),
        description: (_.isUndefined(newDescription) ? academicDuty.description : newDescription),
        dateOfClass: (_.isUndefined(newDateOfClass) ? academicDuty.dateOfClass : newDateOfClass),
        classRoomNumber: (_.isUndefined(newDateOfClass) ? academicDuty.classRoomNumber : newClassRoomNumber),
        timeRangeOfClass: (_.isUndefined(newDateOfClass) ? academicDuty.timeRangeOfClass : newTimeRangeOfClass),
        dueDate: (_.isUndefined(newDueDate) ? academicDuty.dueDate : newDueDate)
      },
    });
  },
});

export const removeAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.remove',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId }) {
    const duty = AcademicDuties.findOne(academicDutyId);

    if (duty.userId != this.userId) {
      throw new Meteor.Error('AcademicDuties.remove.accessDenied',
        'Cannot remove AcademicDuties that is not yours');
    }

    AcademicDuties.remove(academicDutyId);
  },
});


//Assign academic duty
export const assignAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.assign',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId }) {
    const duty = AcademicDuties.findOne(academicDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('AcademicDuties.assign.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    AcademicDuties.update(academicDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.Assigned}});
  },
});

//Unassign academic duty
export const unassignAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.unassign',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId }) {
    const duty = AcademicDuties.findOne(academicDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('AcademicDuties.unassign.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    AcademicDuties.update(academicDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.New}});
  },
});

//Complete academic duty
export const completeAcademicDuty = new ValidatedMethod({
  name: 'AcademicDuties.complete',
  validate: new SimpleSchema({
    academicDutyId: AcademicDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ academicDutyId }) {
    const duty = AcademicDuties.findOne(academicDutyId);

    if (duty.userId == this.userId) {
      throw new Meteor.Error('AcademicDuties.complete.accessDenied',
        'Cannot assign shoppingDuties that is yours');
    }

    AcademicDuties.update(academicDutyId, {$set: {laborerId: this.userId, status: AcceptableDutyStatuses.Complete}});
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