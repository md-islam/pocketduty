import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AcceptableDutyStatuses } from '../../duties/duties.js';
import { ShoppingDuties } from '../shoppingDuties.js';

Meteor.publish('shoppingDuties', function shoppingDuties(){
  if(!this.userId){
    return this.ready();
  }

  return ShoppingDuties.find({
    userId : this.userId
  }, {
    fields : ShoppingDuties.publicFields
  })
});

Meteor.publish('laborShoppingDuties', function laborShoppingDuties(){
  if(!this.userId){
    return this.ready();
  }

  return ShoppingDuties.find({userId: { $ne: this.userId },  status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : ShoppingDuties.publicFields
  })
});

Meteor.publish('laborShoppingIncomplete', function laborShoppingIncomplete(){
  if(!this.userId){
    return this.ready();
  }

  return ShoppingDuties.find({userId: { $ne: this.userId }, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : ShoppingDuties.publicFields
  })
});

Meteor.publish('laborShoppingCompleted', function laborShoppingCompleted(){
  if(!this.userId){
    return this.ready();
  }

  return ShoppingDuties.find({userId: { $ne: this.userId }, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : ShoppingDuties.publicFields
  })
});

// Meteor.publishComposite('todos.inList', function todosInList(params) {
//   new SimpleSchema({
//     listId: { type: String },
//   }).validate(params);

//   const { listId } = params;
//   const userId = this.userId;

//   return {
//     find() {
//       const query = {
//         _id: listId,
//         $or: [{ userId: { $exists: false } }, { userId }],
//       };

//       // We only need the _id field in this query, since it's only
//       // used to drive the child queries to get the todos
//       const options = {
//         fields: { _id: 1 },
//       };

//       return Lists.find(query, options);
//     },

//     children: [{
//       find(list) {
//         return Todos.find({ listId: list._id }, { fields: Todos.publicFields });
//       },
//     }],
//   };
// });