///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').config(['$stateProvider', $stateProvider => {
    $stateProvider
        .state("learners", {
            url: "/:locale/learners/",
            templateUrl: 'Script/app/school/Learner/views/learners.html',
            controller: 'learnersController'
        })
        .state("learner-edit", {
            url: "/:locale/learner/edit/:id/",
            templateUrl: 'Script/app/school/Learner/views/learner-edit.html',
            controller: 'learnerEditController'
        });
}]);
