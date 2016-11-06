import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { DutySchema, AcceptableDutyStatuses } from '../duties/duties.js';


class TransportDutiesCollection extends Mongo.Collection {
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

export const TransportDuties = new TransportDutiesCollection('TransportDuties');

// Deny all client-side updates since we will be using methods to manage this collection
TransportDuties.deny({
  insert() { return true; },
  update() { return true; }//
});

TransportDuties.schema = new SimpleSchema([DutySchema, {
  dueDate: {
    type: Date,
    label: "Due Date",
    optional: true
  },
  passengerNumber : {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6],
    label: "Passenger Number",
    autoform: {
      afFieldInput: {
        firstOption: "(Select number)"
      }
    }
  },
  pickupLocation : {
    type: String
  },
  dropoffLocation : {
    type: String
  },
  pickupTime : {
    type: String
    // autoform: {
    //   type: "hidden"
    // }
  },
  title : {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  description : {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
}]);

TransportDuties.attachSchema(TransportDuties.schema);

// This represents the keys from Shoppingduties objects that should be published
// to the client. If we add secret properties to TransportDuties objects, don't list
// them here to keep them private to the server.
TransportDuties.publicFields = {
  dateCreated: 1,
  dateExecuted: 1,
  userId: 1,
  status: 1, // This field will be used for filtering unassigned Duties
  passengerNumber: 1,
  pickupLocation: 1,
  dropoffLocation: 1,
  pickupTime: 1
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define('transportDuty', TransportDuties, {
  listId: () => Factory.get('list'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});
