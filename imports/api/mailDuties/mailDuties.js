/**
This file sets up defining the schema here. 
**/

import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DutySchema } from '../duties/duties.js';
import faker from 'faker';


// export const PackageSize = {

// }

class MailDutiesCollection extends Mongo.Collection{
	//writing our own userDefined insert,update and remove files
	insert(doc, callback){
		const ourDoc = doc;
		ourDoc.createdAt = ourDoc.dateCreated || new Date;
		const result = super.insert(ourDoc, callback);
		return result;
	}

	update(selector, modifier){
		const result = super.update(selector, modifier);
		return result;
	}
	remove(selector){
		const todos = this.find(selector).fetch();
		const result = super.remove(selector);
		return result;
	}
}

export const MailDuties = new MailDutiesCollection('MailDuties');


// Deny all client-side updates since we will be using methods to manage this collection
MailDuties.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});



// define standalone mail duty schema.==> extra fields in addition to Duties 


//item pick up/drop off location
MailDuties.schema = new SimpleSchema([DutySchema, { 
	pickUpLocation:{
		type: String,
		label: "Pick up location",
		max: 200
	},
	dropOffLocatopn:{
		type: String,
		label: "Drop off location",
		max: 200
	},
	mailing:{ //This will be a checkbox
		label: "Must be mailed",
		type: Boolean,
		optional: true
	}, 

}]);

MailDuties.attachSchema(MaidDuties.schema);



MailDuties.publicFields = {
	dateCreated:1,
	dateExecuted:1,
	userId:1,
	status: 1, //This field will be used for filtering unassigned duties. 
	title: 1,
	description: 1,
	price: 1,
	pickUpLocation:1,
	dropOffLocatopn:1,
	mailing:1
};


// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define('mailDuty', MailDuties, {
  listId: () => Factory.get('list'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});









