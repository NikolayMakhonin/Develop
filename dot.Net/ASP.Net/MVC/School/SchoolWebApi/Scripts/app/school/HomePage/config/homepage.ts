///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').config(['$stateProvider', $stateProvider => {
    $stateProvider
        .state("homepage", {
            url: "/:locale/",
            templateUrl: 'Scripts/app/School/HomePage/views/homepage.html',
            controller: 'HomepageCtrl'
        });
}]);
