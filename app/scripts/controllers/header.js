'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp').controller('HeaderCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
