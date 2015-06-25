///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../environment.ts"/>
///<reference path="../../../app.ts"/>
'use strict';
console.log('Kernel settings loading ...');
angular.module('app').service('settingsService', ['$http', '$rootScope', 'Environment', function ($http, $rootScope, Environment) {
    return {
        getApplicationConfig: function () {
            var locale = Environment.currentLocale();
            var url = Environment.settings.api + '/' + locale + '/config/';
            // console.log(url);
            return $http.get(url);
        },
        getMenu: function () {
            var locale = Environment.currentLocale();
            var url = Environment.settings.api + '/' + locale + '/navigation/';
            //console.log(url);
            return $http.get(url);
        }
    };
}]);
//# sourceMappingURL=settings.js.map