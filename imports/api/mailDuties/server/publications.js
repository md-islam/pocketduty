import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { MailDuties } from '../mailDuties.js';

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
