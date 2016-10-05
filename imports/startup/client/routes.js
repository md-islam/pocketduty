// Here we define the routes for our web application
// For reference https://github.com/meteor/todos/blob/master/imports/startup/client/routes.js
// In this file we should import the appropriate UI templates and route to them.
// In the todo example, we populate the App_body main template with the 

import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import '../../ui/accounts/accounts-templates.js';

import '../../ui/layouts/MainLayout.js';
import '../../ui/layouts/HomeLayout.js';


// Home Page
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Home"});
    }
});

// Home Page
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
    	if(Meteor.userId()){
			FlowRouter.go('home');
		}
        BlazeLayout.render("AppLayout", {main: "Dashboard"});
    }
});


// Accounts.onLogin(function(){
//     FlowRouter.go('home');
// });

// Accounts.onLogout(function(){
//     FlowRouter.go('main');
// });

// FlowRouter.triggers.enter([function(context, redirect){
//     if(!Meteor.userId()) {
//         FlowRouter.go('main');
//     }
// }]);
