'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('LogoutCtrl', function (authToken, $state) {
    authToken.removeToken()
    $state.go('main')
  });
