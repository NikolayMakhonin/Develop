///<reference path="../../../environment.ts"/>
///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').service('learnerService', ['$http', 'Environment',
    ($http, Environment) => {
        return {
            getPages($scope) {
                var locale = Environment.currentLocale();
                var url = Environment.settings.api + '/' + locale + '/page/?limit=' + $scope.pageLimit + '&current=' + $scope.paginationPage + '&category=' + $scope.categoryId;
                console.log(url);
                return $http.get(url);
            },
            getPageByURL($url) {
                var locale = Environment.currentLocale();
                var url = Environment.settings.api + '/' + locale + '/page/' + $url;
                console.log(url);
                return $http.get(url);
            }
        };
    }]);
