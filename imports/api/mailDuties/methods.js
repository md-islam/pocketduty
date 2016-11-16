import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { MailDuties } from './mailDuties.js'
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default mail duty price to $10 dollars.
export const MailDutyPrice = 10;



//remove --> will do this later
export const removeMailDuty = new ValidatedMethod({
  name: 'mailDuties.remove',
  validate: new SimpleSchema({
    mailDutyId: MailDuties.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ mailDutyId }) {
    const mailDuty = MailDuties.findOne(mailDutyId);

    if (mailDuty.userId != this.userId) {
      throw new Meteor.Error('mailDuties.remove.accessDenied',
        'Cannot remove this mail duty in a private list that is not yours');
    }

    MailDuties.remove(mailDutyId);
  },
});


// MailDuties.publicFields = {
//   dateCreated:1,
//   dateExecuted:1,
//   userId:1,
//   status: 1, //This field will be used for filtering unassigned duties. 
//   title: 1,
//   description: 1,
//   price: 1,
//   pickUpLocation:1,
//   dropOffLocation:1,
//   deliveryType:1,
//   pickUpTime:1
// };

//update --> will do this later 
export const updateMailDuty = new ValidatedMethod({
  name: 'mailDuties.update',
  validate: new SimpleSchema({
    mailDutyId: MailDuties.simpleSchema().schema('_id'),
    newPickUpLocation: MailDuties.simpleSchema().schema('pickUpLocation'),
    newDropOffLocation: MailDuties.simpleSchema().schema('dropOffLocation'),
    newPickUpTime: MailDuties.simpleSchema().schema('pickUpTime'),
    newDeliveryType: MailDuties.simpleSchema().schema('deliveryType'),
    newServicePrice: MailDuties.simpleSchema().schema('servicePrice'),
    newDueDate: MailDuties.simpleSchema().schema('dueDate')
  }).validator({clean: true, filter: false}),
  run({mailDutyId, newPickUpLocation, newDropOffLocation, newPickUpTime, newDeliveryType, newServicePrice}){
      const mailDuty = MailDuties.findOne(mailDutyId);
      if(mailDuty.userId != this.userId){
              throw new Meteor.Error('mailDuties.update.accessDenied',
        'Cannot edit mailDuty that is not yours')
      }
      MailDuties.update(mailDutyId, {
        $set: {
          pickUpLocation: (_.isUndefined(newPickUpLocation) ? mailDuty.pickUpLocation : newPickUpLocation),
          dropOffLocation: (_.isUndefined(newDropOffLocation) ? mailDuty.dropOffLocation : newDropOffLocation),
          pickUpTime: (_.isUndefined(newPickUpTime) ? mailDuty.pickUpTime : newPickUpTime),
          deliveryType: (_.isUndefined(newDeliveryType) ? mailDuty.deliveryType : newDeliveryType),
          servicePrice: (_.isUndefined(newServicePrice) ? mailDuty.servicePrice : newServicePrice)
        }
      })
  }
});

export const insertMailDuty = new ValidatedMethod({
  name: 'mailDuties.insert',
  validate: MailDuties.simpleSchema().pick(['pickUpLocation','dropOffLocation','pickUpTime','deliveryType','servicePrice', 'dueDate']).validator({clean:true, filter: false}),
  run({pickUpLocation, dropOffLocation, pickUpTime, deliveryType, servicePrice, dueDate}){
    if(!this.userId){
      throw new Meteor.Error('mailDuties.insert.accessDenied',
        'You must be signed in to create a new Mail Duty');
    }
    const mailDuty = {
      pickUpLocation, 
      dropOffLocation,
      userId : this.userId,
      status: AcceptableDutyStatuses.New,
      dueDate,
      dateCreated: new Date(),
      pickUpTime,
      deliveryType,
      servicePrice,
      price: servicePrice,
      laborerId: "none" 
    };
     MailDuties.insert(mailDuty);
    },
  });







// Get list of all method names on Lists
const MAIL_DUTIES_METHODS = _.pluck([
  insertMailDuty,
  removeMailDuty
], 'name');

if (Meteor.isServer) {
  // Only allow 5 shoppingDuties operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(MAIL_DUTIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}

