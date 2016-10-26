import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { MailDuties } from './mailDuties.js'
import { AcceptableDutyStatuses } from '../duties/duties.js';

//Arbitraryily set default mail duty price to $10 dollars.
export const MailDutyPrice = 10;


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
			price: MailDutyPrice,
			laborerId: "none"	
		};
		 MailDuties.insert(mailDuty);
		},
	});

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

//update --> will do this later 




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

