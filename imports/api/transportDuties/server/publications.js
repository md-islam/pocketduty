import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AcceptableDutyStatuses } from '../../duties/duties.js';
import { TransportDuties } from '../transportDuties.js';

Meteor.publish('transportDuties', function transportDuties () {
  if (!this.userId) {
    return this.ready();
  }

  return TransportDuties.find({
    userId : this.userId
  }, {
    fields : TransportDuties.publicFields
  })
});

Meteor.publish('employerTransportAssigned', function employerTransportAssigned(){
  if(!this.userId){
    return this.ready();
  }

  return TransportDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : TransportDuties.publicFields
  })
});

Meteor.publish('employerTransportUnassigned', function employerTransportUnassigned(){
  if(!this.userId){
    return this.ready();
  }

  return TransportDuties.find({userId: this.userId, status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : TransportDuties.publicFields
  })
});

Meteor.publish('employerTransportComplete', function employerTransportComplete(){
  if(!this.userId){
    return this.ready();
  }

  return TransportDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : TransportDuties.publicFields
  })
});
