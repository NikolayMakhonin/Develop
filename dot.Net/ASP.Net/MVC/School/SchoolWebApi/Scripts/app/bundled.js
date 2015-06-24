///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
'use strict';
console.log('Environment loaded ...');
angular.module('environment', []).service('Environment', function () {
    return {
        settings: {
            media: 'http://api.' + document.domain + '/media/product',
            api: 'http://api.' + document.domain + '/frontend/api',
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
///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../environment.ts"/>
'use strict';
console.log('Kernel settings loaded ...');
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
///<reference path="../../../../typings/requirejs/require.d.ts"/>
///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../environment.ts"/>
///<reference path="settings.ts"/>
'use strict';
console.log('Kernel init service loaded ...');
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
                settingsService.getApplicationConfig().success(function (data, status) {
                    var settings = data.settings[Environment.currentLocale()];
                    $rootScope.footer = settings.content.footerContent;
                    $rootScope.disqusShortname = settings.disqus.shortname;
                    $rootScope.disqusStatus = false;
                    $rootScope.currency = settings.general.currency;
                    $rootScope.paymentMethods = settings.general.paymentMethods;
                    console.log('----------- School Loaded! -----------');
                    var setLocale = function () {
                        $rootScope.availableLocales = Environment.settings.locale.available;
                        $rootScope.locale = Environment.currentLocale();
                    };
                    var setMetaData = function () {
                        $rootScope.pageTitle = settings.meta.defaultMetaTitle;
                        $rootScope.metaDescription = settings.meta.defaultMetaDescription;
                        $rootScope.metaKeywords = settings.meta.defaultMetaKeywords;
                    };
                    // Init
                    setLocale();
                    setMetaData();
                    // Hook for on route change
                    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                        console.log('State Change ...');
                        setLocale();
                        setMetaData();
                    });
                });
                // Load navigation menu
                settingsService.getMenu().success(function (data, status) {
                    $rootScope.topMenu = data;
                });
            }
        };
    }
]);
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
//# sourceMappingURL=bundled.js.map