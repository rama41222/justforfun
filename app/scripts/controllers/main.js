'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('MainCtrl', function ($scope, $state, $auth) {
    $scope.navigate = function () {
      console.log('fucked')
      if($auth.isAuthenticated()){
        $state.go('cards')
      }else {
        $state.go('login')
      }
    }
  });
