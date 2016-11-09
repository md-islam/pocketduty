import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { DutySchema } from '../duties/duties.js';


export const LoadSize = {
  Large : "Large",
  Medium: "Medium",
  Small: "Small"
}

LoadSize.loadNo = [LoadSize.Large, LoadSize.Medium, LoadSize.Small];

class LaundryDutiesCollection extends Mongo.Collection {
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

export const LaundryDuties = new LaundryDutiesCollection('LaundryDuties');

// Deny all client-side updates since we will be using methods to manage this collection
LaundryDuties.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

LaundryDuties.schema = new SimpleSchema([DutySchema, {
  loadNo : {
    type: String,
    allowedValues: LoadSize.loadNo  
  }
}]);

LaundryDuties.attachSchema(LaundryDuties.schema);

// This represents the keys from Laundryduties objects that should be published
// to the client. If we add secret properties to LaundryDuties objects, don't list
// them here to keep them private to the server.
LaundryDuties.publicFields = {
  dateCreated: 1,
  dateExecuted: 1,
  userId: 1,
  status: 1, // This field will be used for filtering unassigned Duties
  title: 1,
  description: 1,
  price: 1,
  maxSpending: 1, 
  dueDate: 1,
  loadNo: 1
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define('laundryDuty', LaundryDuties, {
  listId: () => Factory.get('list'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

