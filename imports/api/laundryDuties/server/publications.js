import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AcceptableDutyStatuses } from '../../duties/duties.js';
import { LaundryDuties } from '../laundryDuties.js';

Meteor.publish('laundryDuties', function laundryDuties(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({
    userId : this.userId
  }, {
    fields : LaundryDuties.publicFields
  })
});

//publish laundryDuties for employee/labor to pick up
Meteor.publish('laborLaundryDutiesNew', function laborLaundryDutiesNew(){
  if(!this.userId){
    return this.ready();
  }
  return LaundryDuties.find({userId: { $ne: this.userId },  status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
  })
});

Meteor.publish('laborLaundryDutiesAssignedIncomplete', function laborLaundryDutiesAssignedIncomplete(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({laborerId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
  })
});

Meteor.publish('laborLaundryDutiesAssignedComplete', function laborLaundryDutiesAssignedComplete(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({laborerId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
  })
});




Meteor.publish('employerLaundryAssigned', function employerLaundryAssigned(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
  })
});

Meteor.publish('employerLaundryUnassigned', function employerLaundryUnassigned(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({userId: this.userId, status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
  })
});

Meteor.publish('employerLaundryComplete', function employerLaundryComplete(){
  if(!this.userId){
    return this.ready();
  }

  return LaundryDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : LaundryDuties.publicFields
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