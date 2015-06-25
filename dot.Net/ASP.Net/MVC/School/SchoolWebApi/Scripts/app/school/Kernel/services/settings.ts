///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../environment.ts"/>
///<reference path="../../../app.ts"/>

'use strict';

console.log('Kernel settings loading ...');
angular.module('app')
    .service('settingsService', ['$http', '$rootScope', 'Environment',
        ($http, $rootScope, Environment) => {
            return {
                getApplicationConfig() {
                    var locale = Environment.currentLocale();
                    var url = Environment.settings.api + '/' + locale + '/config/';
                    // console.log(url);
                    return $http.get(url);
                },
                getMenu() {
                    var locale = Environment.currentLocale();
                    var url = Environment.settings.api + '/' + locale + '/navigation/';
                    //console.log(url);
                    return $http.get(url);
                }
            };
        }
    ]);
