import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { DutySchema } from '../duties/duties.js';
 


class AcademicDutiesCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.dateCreated || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const AcademicDuties = new AcademicDutiesCollection('AcademicDuties');

// Deny all client-side updates since we will be using methods to manage this collection
AcademicDuties.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

AcademicDuties.schema = new SimpleSchema([DutySchema, {
  timeRangeOfClass : {
      type: Number,
      allowedValues: [
         75,
         90,
         115
      ],
      defaultValue: 75,
      label: "Choose a number"
   },
   dateOfClass: {
      type: Date,
      optional: true,
      label: "Date of the class",
      min: new Date("2014-01-01T00:00:00.000Z"),
      autoform: {
         value: new Date("2014-10-18T00:00:00.000Z")
      }
   },
    classRoomNumber: {
      type: Number,
      min: 1
   }
}]);

AcademicDuties.attachSchema(AcademicDuties.schema);

// This represents the keys from Academicduties objects that should be published
// to the client. If we add secret properties to ShoppingDuties objects, don't list
// them here to keep them private to the server.
AcademicDuties.publicFields = {
  dateCreated: 1,
  dateExecuted: 1,
  userId: 1,
  status: 1, // This field will be used for filtering unassigned Duties
  title: 1,
  description: 1,
  dateOfClass: 1,
  classRoomNumber: 1,
  timeRangeOfClass: 1

};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define('academicDuty', AcademicDuties, {
  listId: () => Factory.get('list'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

