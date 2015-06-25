///<reference path="../typings/angularjs/angular.d.ts"/>
'use strict';
console.log('Environment loading ...');
angular.module('environment', []).service('Environment', function () {
    return {
        settings: {
            media: 'http://' + document.domain + '/media/product',
            api: 'http://' + document.domain + '/frontend/api',
            locale: {
                "primary": 'en',
                "available": ['en', 'ru']
            }
        },
        currentLocale: function () {
            var locale = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
            if (this.settings.locale.available.indexOf(locale) == -1) {
                locale = this.settings.locale.primary;
            }
            return locale;
        }
    };
});
///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="environment.ts"/>
'use strict';
console.log('App loading ...');
angular.module('app', [
    'ngRoute',
    'ui.router',
    'angular-loading-bar',
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
///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../environment.ts"/>
///<reference path="../../../app.ts"/>
///<reference path="settings.ts"/>
'use strict';
console.log('Kernel init service loading ...');
angular.module('app').service('initService', [
    '$http',
    '$rootScope',
    'settingsService',
    'Environment',
    function ($http, $rootScope, settingsService, /*authService, userService,*/ Environment) {
        return {
            launch: function () {
                // Load user status
                //userService.getUserInformation().success(
                //    (data, status) => {
                //        console.log(data);
                //        if (data.username) {
                //            $rootScope.user = data;
                //        } else {
                //            $rootScope.user = undefined;
                //        }
                //    }
                //);
                // Load settings data
                //settingsService.getApplicationConfig().success(
                //    (data, status) => {
                //        var settings = data.settings[Environment.currentLocale()];
                //        $rootScope.footer = settings.content.footerContent;
                //        $rootScope.disqusShortname = settings.disqus.shortname;
                //        $rootScope.disqusStatus = false;
                //        $rootScope.currency = settings.general.currency;
                //        $rootScope.paymentMethods = settings.general.paymentMethods;
                //        console.log('----------- School Loaded! -----------');
                //        var setLocale = () => {
                //            $rootScope.availableLocales = Environment.settings.locale.available;
                //            $rootScope.locale = Environment.currentLocale();
                //        }
                //        var setMetaData = () => {
                //            $rootScope.pageTitle = settings.meta.defaultMetaTitle;
                //            $rootScope.metaDescription = settings.meta.defaultMetaDescription;
                //            $rootScope.metaKeywords = settings.meta.defaultMetaKeywords;
                //        }
                //        // Init
                //        setLocale();
                //        setMetaData();
                //        // Hook for on route change
                //        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                //            console.log('State Change ...');
                //            setLocale();
                //            setMetaData();
                //        });
                //    }
                //);
                // Load navigation menu
                //settingsService.getMenu().success(
                //    (data, status) => {
                //        $rootScope.topMenu = data;
                //    }
                //);
            }
        };
    }
]);
///<reference path="../../../app.ts"/>
'use strict';
angular.module('app').config(['$provide', '$urlRouterProvider', function ($provide, $urlRouterProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
        var Environment = $injector.get('Environment');
        var $state = $injector.get('$state');
        var locale = Environment.settings.locale.primary;
        console.log('Fallback to primary locale');
        $state.transitionTo('homepage', { locale: locale });
    });
}]);
///<reference path="../../../app.ts"/>
'use strict';
angular.module('app').filter('text', function () {
    return function (text, name) {
        return text;
    };
});
///<reference path="config/resource.ts"/>
///<reference path="services/settings.ts"/>
///<reference path="services/init.ts"/>
///<reference path="filters/main.ts"/>
'use strict';
console.log('----------- Kernel Loaded! -----------');
///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../app.ts"/>
'use strict';
angular.module('app').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state("homepage", {
        url: "/:locale/",
        templateUrl: 'Scripts/app/School/HomePage/views/homepage.html',
        controller: 'HomepageCtrl'
    });
}]);
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
///<reference path="../../app.ts"/>
///<reference path="../Homepage/config/homepage.ts"/>
///<reference path="../Homepage/controllers/homepage.ts"/>
'use strict';
console.log('Homepage module loaded.');
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="app.ts"/>
'use strict';
$(function () {
    angular.bootstrap(document, ['app']);
});
///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="school/Kernel/services/settings.ts"/>
///<reference path="school/Kernel/services/init.ts"/>
///<reference path="app.ts"/>
///<reference path="school/Kernel/Kernel.ts"/>
///<reference path="school/Homepage/HomePage.ts"/>
///<reference path="bootstrap.ts"/>
//# sourceMappingURL=app_bunbled.js.map