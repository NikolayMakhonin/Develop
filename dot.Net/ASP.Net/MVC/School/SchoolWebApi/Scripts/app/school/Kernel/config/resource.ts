///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').config(['$provide', '$urlRouterProvider',
    ($provide, $urlRouterProvider) => {
        $urlRouterProvider.otherwise($injector => {

            var Environment = $injector.get('Environment');
            var $state = $injector.get('$state');
            var locale = Environment.settings.locale.primary;

            console.log('Fallback to primary locale');
            $state.transitionTo('homepage', {locale: locale});
        });
    }]);

