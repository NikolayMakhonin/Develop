///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').filter('text', () => {
        return (text, name) => {
            return text;
        };
    }
);
