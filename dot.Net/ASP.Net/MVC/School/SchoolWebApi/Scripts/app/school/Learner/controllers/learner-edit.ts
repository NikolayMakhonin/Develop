///<reference path="../../../app.ts"/>

'use strict';

angular.module('app').controller('LearnerEditController', ($scope, $stateParams, pageService, $rootScope) => {
    var pageURL = $stateParams.pageId;
    var handleSuccess = (data, status) => {
        $scope.pageDetails = data;
        $rootScope.pageTitle = $scope.pageDetails.title;
    };
    pageService.getPageByURL(pageURL).success(handleSuccess);
});
