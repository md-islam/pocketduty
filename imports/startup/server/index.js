import { Meteor } from 'meteor/meteor';
import './security.js';
import { configure } from './configure-login-services.js';
import './register-api.js';
import { Accounts} from 'meteor/accounts-base';

if( Meteor.isServer){
	Meteor.startup(() => {
		configure();
	});
}

Accounts.onCreateUser(function(options, user) {
   if (options.profile) {
       options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
       user.profile = options.profile;
   }
   return user;
});