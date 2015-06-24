///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="environment.ts"/>
///<reference path="school/Kernel/services/settings.ts"/>
///<reference path="school/Kernel/services/init.ts"/>
'use strict';
angular.module('app', [
    'ngRoute',
    'environment'
]).run(['$http', '$rootScope', 'settingsService', 'initService', function ($http, $rootScope, settingsService, initService) {
    initService.launch();
}]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
}]).config(function ($provide, $locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $locationProvider.html5Mode(true);
    document.getElementById("page-is-loading").style.visibility = "hidden";
});
//# sourceMappingURL=app.js.map