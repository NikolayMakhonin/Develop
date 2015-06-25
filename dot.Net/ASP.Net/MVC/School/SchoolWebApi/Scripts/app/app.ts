///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="environment.ts"/>

'use strict';

console.log('App loading ...');
angular.module('app', [
    'ngRoute', 'ui.router', 'angular-loading-bar', 'environment'
]).run(['$http', '$rootScope', 'settingsService', 'initService',
    ($http, $rootScope, settingsService, initService) => {
        initService.launch();
    }])
    .config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
    }])
    .config(($provide, $locationProvider, $httpProvider) => {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
        document.getElementById("page-is-loading").style.visibility = "hidden";
    });

