// Here we define the routes for our web application
// For reference https://github.com/meteor/todos/blob/master/imports/startup/client/routes.js
// In this file we should import the appropriate UI templates and route to them.
// In the todo example, we populate the App_body main template with the 

import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import '../../ui/accounts/accounts-templates.js';
import '../../ui/pages/Main.html';
import '../../ui/layouts/MainLayout.js';
import '../../ui/pages/Dashboard.js';
import '../../ui/pages/NewDuty.js';
import '../../ui/components/shoppingDuty.js';
import '../../ui/pages/NewLaundryDuty.js';


// Main Page (User not logged in)
FlowRouter.route('/', {
    name: 'main',
    action() {
        BlazeLayout.render("MainLayout", {main: "Main"});
    }
});

// Home Page (User logged in)
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "Dashboard"});
    }
});

// Create Duty Screen
FlowRouter.route('/new_duty', {
    name: 'new_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewDuty"})
    }
})


// Create Shopping Duty Screen
FlowRouter.route('/shopping_duty', {
    name: 'shopping_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "shoppingDuty"})
    }
})

// Create New Laundry Duty Screen
FlowRouter.route('/new_laundry', {
    name: 'new_laundry',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewLaundryDuty"})
    }
})


// // Home Page (New Duty)
// FlowRouter.route('/newduty', {
//     name: 'newduty',
//     action() {
//         if(!Meteor.userId()) {
//         FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "NewDuty"});
//     }
// });




Accounts.onLogin(function(){
    FlowRouter.go('dashboard');
});

Accounts.onLogout(function(){
    FlowRouter.go('main');
});

FlowRouter.triggers.enter([function(context, redirect){
    if(!Meteor.userId()) {
        FlowRouter.go('main');
    }
}]);
