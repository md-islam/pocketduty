import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AcceptableDutyStatuses } from '../../duties/duties.js';
import { AcademicDuties } from '../academicDuties.js';

Meteor.publish('academicDuties', function academicDuties(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({
    userId : this.userId
  }, {
    fields : AcademicDuties.publicFields
  })
});

Meteor.publish('employerAcademicAssigned', function employerAcademicAssigned(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});

Meteor.publish('employerAcademicUnassigned', function employerAcademicUnassigned(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({userId: this.userId, status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});

Meteor.publish('employerAcademicComplete', function employerAcademicComplete(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});

//Labor Dashboard
Meteor.publish('laborAcademicDuties', function laborAcademicDuties(){

  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({userId: { $ne: this.userId },  status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});

//Labor Incomplete
Meteor.publish('laborAcademicIncomplete', function laborAcademicIncomplete(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({laborerId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});

//Labor Completed
Meteor.publish('laborAcademicCompleted', function laborAcademicCompleted(){
  if(!this.userId){
    return this.ready();
  }

  return AcademicDuties.find({laborerId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : AcademicDuties.publicFields
  })
});