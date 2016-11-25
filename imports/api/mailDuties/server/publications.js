import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { MailDuties } from '../mailDuties.js';
import { AcceptableDutyStatuses } from '../../duties/duties.js';


//publish all duties 
Meteor.publish('mailDuties', function mailDuties(){
	if(!this.userId){
		return this.ready();
	}
	 return MailDuties.find({
    userId : this.userId
  }, {
    fields : MailDuties.publicFields
  })
});

//publish mailDuties for employee/labor to pick up
Meteor.publish('laborMailDutiesNew', function laborMailDutiesNew(){
  if(!this.userId){
    return this.ready();
  }
  return MailDuties.find({userId: { $ne: this.userId },  status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});

Meteor.publish('laborMailDutiesAssignedIncomplete', function laborMailDutiesAssignedIncomplete(){
  if(!this.userId){
    return this.ready();
  }

  return MailDuties.find({userId: { $ne: this.userId }, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});

Meteor.publish('laborMailDutiesAssignedComplete', function laborMailDutiesAssignedComplete(){
  if(!this.userId){
    return this.ready();
  }

  return MailDuties.find({userId: { $ne: this.userId }, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});


Meteor.publish('employerMailAssigned', function employerMailAssigned(){
  if(!this.userId){
    return this.ready();
  }

  return MailDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Assigned}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});

Meteor.publish('employerMailUnassigned', function employerMailUnassigned(){
  if(!this.userId){
    return this.ready();
  }

  return MailDuties.find({userId: this.userId, status: AcceptableDutyStatuses.New}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});

Meteor.publish('employerMailComplete', function employerMailComplete(){
  if(!this.userId){
    return this.ready();
  }

  return MailDuties.find({userId: this.userId, status: AcceptableDutyStatuses.Complete}, { sort: {dateCreated: -1}}, {
    fields : MailDuties.publicFields
  })
});
