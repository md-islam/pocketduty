import { Meteor } from 'meteor/meteor';
import './security.js';
import { configure } from './configure-login-services.js';
import './register-api.js';

if( Meteor.isServer){
	Meteor.startup(() => {
		configure();
	});
}