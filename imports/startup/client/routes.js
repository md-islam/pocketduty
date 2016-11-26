// Here we define the routes for our web application
// For reference https://github.com/meteor/todos/blob/master/imports/startup/client/routes.js
// In this file we should import the appropriate UI templates and route to them.
// In the todo example, we populate the App_body main template with the 
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {GenerateUrl} from '../../api/paypal/method.js';
import '../../ui/accounts/accounts-templates.js';
import '../../ui/pages/Main.html';
import '../../ui/layouts/MainLayout.js';
import '../../ui/pages/Dashboard.js';
import '../../ui/pages/LaborDashboard.js';
import '../../ui/pages/LaborIncomplete.js';
import '../../ui/pages/LaborCompleted.js';
import '../../ui/pages/NewDuty.js';
import '../../ui/pages/NewShoppingDuty.js';
import '../../ui/pages/NewLaundryDuty.js';
import '../../ui/pages/NewAcademicDuty.js';
import '../../ui/pages/EditAcademicDuty.js';
import '../../ui/pages/EditShoppingDuty.js';
import '../../ui/pages/EditLaundryDuty.js';
import '../../ui/pages/NewTransportDuty.js';
import '../../ui/pages/NewMailDuty.js'; 
import '../../ui/components/updateMailDutiesForm.js';
import '../../ui/pages/ActiveDuties.js';
import '../../ui/pages/InactiveDuties.js';
import '../../ui/pages/PastDuties.js';
import '../../ui/pages/EditTransportDuty.js';
import '../../ui/pages/paypal.js';

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

// Employee Dashboard
FlowRouter.route('/employee/labor_dashboard', {
    name: 'labor_dashboard',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "LaborDashboard"});
    }
});

// Employer Dashboard
FlowRouter.route('/employer/employer_dashboard', {
    name: 'employer_dashboard',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "Dashboard"});
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

// Create New Academic Duty Screen
FlowRouter.route('/employer/new_duty/new_academic_duty', {
    name: 'new_academic_duty',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "NewAcademicDuty"})
    }
});

// Create transport duty route
FlowRouter.route('/employer/new_duty/new_transport_duty', {
  name: 'new_transport_duty',
  action () {
    if (!Meteor.userId()) {
      FlowRouter.go('main');
    }
    BlazeLayout.render("MainLayout", {main: "NewTransportDuty"})
    }
});

FlowRouter.route('/edit/academic_duty/:_id', {
   name: 'academic_duty.edit',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "EditAcademicDuty"})
    }
});

// Active duties(User logged in)
FlowRouter.route('/employer/active_duties', {
    name: 'active_duties',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "ActiveDuties"});
    }
});

// Inactive duties(User logged in)
FlowRouter.route('/employer/inactive_duties', {
    name: 'inactive_duties',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "InactiveDuties"});
    }
});

// Past duties(User logged in)
FlowRouter.route('/employer/past_duties', {
    name: 'past_duties',
    action() {
        if(!Meteor.userId()) {
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "PastDuties"});
    }
});

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


// // Employer Active Duties
// FlowRouter.route('/employer/active_duties', {
//     name: 'active_duties',
//     action() {
//         if(!Meteor.userId()) {
//             FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "ActiveDuties"});

//     }
// })



FlowRouter.route('/edit/laundry_duty/:_id', {
    name: 'laundry_duty.edit',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "EditLaundryDuty"})
    }
})



// Create transport duty route
FlowRouter.route('/employer/new_duty/new_transport_duty', {
  name: 'new_transport_duty',
  action () {
    if (!Meteor.userId()) {
      FlowRouter.go('main');

    }
    BlazeLayout.render("MainLayout", {main: "NewTransportDuty"})
  }
})

FlowRouter.route('/paypal', {
    name: 'paypal',
    action() {
        BlazeLayout.render("paypal_page");
    }
});

FlowRouter.route('/edit/transport_duty/:_id', {
    name: 'transport_duty.edit',
    action() {
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "EditTransportDuty"});
    }
})


//ADD AND UPDATE MAIL DUTY ROUTES

//ADD MAIL DUTY ROUTE

FlowRouter.route('/employer/new_duty/new_mailing_duty', {
  name: 'new_mail_duty',
  action () {
    if (!Meteor.userId()) {
      FlowRouter.go('main');
    }

    console.log("mail_duty_route");
    BlazeLayout.render('MainLayout', {
      main: "NewMailDuty"
    });

    }

});

// // Employer Past Duties
// FlowRouter.route('/employer/past_duties', {
//     name: 'past_duties',
//     action() {
//         if(!Meteor.userId()) {
//             FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "PastDuties"});
//     }
// });

// Employer Account Settings
// FlowRouter.route('/employer/account_settings', {
//     name: 'account_settings',
//     action() {
//         if(!Meteor.userId()) {
//             FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "AccountSettings"});
//     }
// });

//EDIT MAIL DUTY ROUTE
FlowRouter.route('/employer/edit/mail_duty/:_id',{
    name: 'mail_duty.edit',
    action(){
        if(!Meteor.userId()){
            FlowRouter.go('main');
        }
        BlazeLayout.render("MainLayout", {main: "updateMailDutiesForm"})

    }
});


// // Employer Past Duties
// FlowRouter.route('/employer/past_duties', {
//     name: 'past_duties',
//     action() {
//         if(!Meteor.userId()) {
//             FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "PastDuties"});
//     }
// });

// Employer Account Settings
// FlowRouter.route('/employer/account_settings', {
//     name: 'account_settings',
//     action() {
//         if(!Meteor.userId()) {
//             FlowRouter.go('main');
//         }
//         BlazeLayout.render("MainLayout", {main: "AccountSettings"});
//     }
// });

FlowRouter.route('/paypal/payment_return/', {
    name: 'paypal_return',
    action() {
        sweetAlert({
            type: "success",
            title: "Success!",
            text: "The shopping duty has been successfully added!"
        });
        FlowRouter.go('employer');
    }
});

FlowRouter.route('/paypal/payment/:invoice_no/:amount/', {
    name: 'payment',
    action(){
        var amount = parseInt(FlowRouter.getParam("amount"));

        var url = GenerateUrl.call(
            {invoice_no: FlowRouter.getParam("invoice_no"), amount: parseFloat(FlowRouter.getParam("amount"))}, 
            (error, res) => {
                if(error){
                    console.error(error);
                }
                location.assign(res);
            });
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
