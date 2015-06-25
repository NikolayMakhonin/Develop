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
//# sourceMappingURL=environment.js.map