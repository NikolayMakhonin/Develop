///<reference path="../../../app.ts"/>
///<reference path="../services/learner.ts"/>

'use strict';

angular.module('app').controller('LearnersController', ['$location', '$state', '$scope', '$stateParams', 'learnerService',
    ($location, $state, $scope, $stateParams, learnerService) => {

        $scope.pageLimit = 5;
        $scope.paginationPage = 1;
        $scope.categoryId = 0;

        var handleSuccess = (data, status) => {
            $scope.collection = data;
        };

        // Pages
        learnerService.getPages($scope).success(
            (data, status) => {
                console.log(data);
                $scope.collection = data;
            }
        );

        $scope.pageChanged = (page) => {
            $scope.paginationPage = page;
            learnerService.getPages($scope).success(
                (data, status) => {
                    $scope.collection = data;
                }
            );
        };

    }]);
