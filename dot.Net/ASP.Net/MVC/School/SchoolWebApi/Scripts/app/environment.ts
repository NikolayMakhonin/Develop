///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>

'use strict';

console.log('Environment loaded ...');
angular.module('environment', [])
    .service('Environment', () => {
        return {
            settings: {
                media: 'http://api.' + document.domain + '/media/product',
                api: 'http://api.' + document.domain + '/frontend/api',
                locale: {
                    "primary": 'en',
                    "available": ['en', 'ru']
                }
            },
            currentLocale() {
                var locale = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                if (this.settings.locale.available.indexOf(locale) == -1) {
                    locale = this.settings.locale.primary;
                }
                return locale;
            }
        }
    });
