// This file is used to define the duties collection.
// Schema design would go here.
// For reference https://github.com/meteor/todos/blob/master/imports/api/lists/lists.js

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const AcceptableDutyStatuses = {
	New : "New",
	Assigned: "Assigned",
	Complete: "Complete"
}
AcceptableDutyStatuses.statuses =  [AcceptableDutyStatuses.New, AcceptableDutyStatuses.Assigned, AcceptableDutyStatuses.Complete];

export const DutySchema = new SimpleSchema({
	_id : {type: String, regEx : SimpleSchema.RegEx.Id, autoform: {type: "hidden"}},
	dateCreated: {type: Date, denyUpdate: true, autoform: {type: "hidden"}},
	dateExecuted: {type: Date, optional: true, autoform: {type: "hidden"}},
	dueDate: {type: Date},
	userId : {type: String, regEx: SimpleSchema.RegEx.Id, autoform: {type: "hidden"}},
	status: {type: String, allowedValues: AcceptableDutyStatuses.statuses, autoform: {type: "hidden"}},
	title: {type: String},
	description : {type: String},
	price: {type: Number, autoform: {type: "hidden"}}
});