import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { ShoppingDuties } from './shoppingDuties.js';
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default shopping duty price to $10 dollars.
export const ShoppingDutyPrice = 10; 

export const insertShoppingDuty = new ValidatedMethod({
  name: 'shoppingDuties.insert',
  validate: ShoppingDuties.simpleSchema().pick(['title', 'description', 'maxSpending']).validator({ clean: true, filter: false }),
  run({ title, description, maxSpending }) {
    if (!this.userId) {
      throw new Meteor.Error('shoppingDuties.insert.accessDenied',
        'You must be signed in to create a new Shopping Duty');
    }

    const shoppingDuty = {
      title,
      description,
      userId : this.userId,
      status: AcceptableDutyStatuses.New,
      dateCreated: new Date(),
      maxSpending,
      price: ShoppingDutyPrice
    };

    ShoppingDuties.insert(todo);
  },
});


export const updateShoppingDuty = new ValidatedMethod({
  name: 'shoppingDuties.updateDuty',
  validate: new SimpleSchema({
    shoppingDutyId: ShoppingDuties.simpleSchema().schema('_id'),
    newTitle: ShoppingDuties.simpleSchema().schema('title'),
    newDescription : ShoppingDuties.simpleSchema().schema('description'),
    newMaxSpending : ShoppingDuties.simpleSchema().schema('maxSpending')
  }).validator({ clean: true, filter: false }),
  run({ shoppingDutyId, newTitle, newDescription, maxSpending }) {
    // This is complex auth stuff - perhaps denormalizing a userId onto shoppingDuties
    // would be correct here?
    const shoppingDuty = ShoppingDuties.findOne(todoId);

    if (!shoppingDuty.editableBy(this.userId)) {
      throw new Meteor.Error('shoppingDuties.updateDuty.accessDenied',
        'Cannot edit shoppingDuty that is not yours');
    }
    ShoppingDuties.update(shoppingDutyId, {
      $set: {
        title: (_.isUndefined(newText) ? shoppingDuty.title : newTitle),
        description: (_.isUndefined(newDescription) ? shoppingDuty.description : newDescription),
        maxSpending: (_.isUndefined(maxSpending) ? shoppingDuty.maxSpending : newMaxSpending),
      },
    });
  },
});

export const removeShoppingDuty = new ValidatedMethod({
  name: 'shoppingDuties.remove',
  validate: new SimpleSchema({
    todoId: ShoppingDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ todoId }) {
    const todo = ShoppingDuties.findOne(todoId);

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('shoppingDuties.remove.accessDenied',
        'Cannot remove shoppingDuties that is not yours');
    }

    ShoppingDuties.remove(todoId);
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
const SHOPPING_DUTIES_METHODS = _.pluck([
  insertShoppingDuty,
  updateShoppingDuty,
  removeShoppingDuty,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 shoppingDuties operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(SHOPPING_DUTIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}