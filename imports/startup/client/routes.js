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
import '../../ui/pages/LaborDashboard.js';
import '../../ui/pages/LaborIncomplete.js';
import '../../ui/pages/NewDuty.js';
import '../../ui/pages/NewShoppingDuty.js';
import '../../ui/pages/NewLaundryDuty.js';
import '../../ui/pages/NewAcademicDuty.js';
import '../../ui/pages/EditShoppingDuty.js';
import '../../ui/pages/NewTransportDuty.js';


// Main Page (User not logged in)
FlowRouter.route('/', {
    name: 'main',
    action() {
        BlazeLayout.render("MainLayout", {main: "Main"});
    }
});

// Employer Home Page (User logged in)
FlowRouter.route('/employer', {
    name: 'employer',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "Dashboard"});
    }
});

// Employee Home Page (User logged in)
FlowRouter.route('/employee', {
    name: 'employee',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "LaborDashboard"});
    }
});

// Employee Incomplete task page
FlowRouter.route('/employee/incomplete-task', {
    name: 'incomplete-task',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "LaborIncomplete"});
    }
});

// Employee Completed task page
FlowRouter.route('/employee/completed-task', {
    name: 'completed-task',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "LaborCompleted"});
    }
});

// Create Duty Screen
FlowRouter.route('/employer/new_duty', {
    name: 'new_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewDuty"})
    }
})


// Create Shopping Duty Screen
FlowRouter.route('/employer/new_duty/new_shopping_duty', {
    name: 'shopping_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewShoppingDuty"})
    }
})


// Create New Laundry Duty Screen
FlowRouter.route('/employer/new_duty/new_laundry_duty', {
    name: 'new_laundry',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewLaundryDuty"})
    }
})

// Create Duty Screen
FlowRouter.route('/employer/new_duty/new_academic_duty', {
    name: 'new_academic_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewAcademicDuty"})
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

FlowRouter.route('/edit/shopping_duty/:_id', {
    name: 'shopping_duty.edit',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "EditShoppingDuty"})
    }
})

// Create transport duty route
FlowRouter.route('/employer/new_duty/new_transport_duty', {
  name: 'new_transport_duty',
  action () {
    if (!Meteor.userId()) {
      FlowRouter.go('main');
    }
    BlazeLayout.render("MainLayout", {
      main: "NewTransportDuty"
    })
  }
});


Accounts.onLogin(function(){
    FlowRouter.go('main');
});

Accounts.onLogout(function(){
    FlowRouter.go('main');
});

FlowRouter.triggers.enter([function(context, redirect){
    if(!Meteor.userId()) {
        FlowRouter.go('main');
    }
}]);
