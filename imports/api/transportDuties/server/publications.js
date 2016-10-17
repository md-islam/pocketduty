import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
