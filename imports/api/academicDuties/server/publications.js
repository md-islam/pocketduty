import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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