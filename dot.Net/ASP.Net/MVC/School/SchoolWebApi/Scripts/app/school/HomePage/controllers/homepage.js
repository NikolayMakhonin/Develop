///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/angularjs/angular-route.d.ts"/>
///<reference path="../../../environment.ts"/>
///<reference path="../../../app.ts"/>
///<reference path="../../Kernel/services/settings.ts"/>
'use strict';
angular.module('app').controller('HomepageCtrl', ['$location', '$scope', '$routeParams', '$rootScope', 'settingsService', 'Environment', function ($location, $scope, $routeParams, $rootScope, settingsService, Environment) {
    //settingsService.getApplicationConfig().success(
    //    (data, status) => {
    //        var locale = Environment.currentLocale();
    //        $scope.content = data.settings[locale].content.homepageContent;
    //    }
    //);
}]);
//# sourceMappingURL=homepage.js.map