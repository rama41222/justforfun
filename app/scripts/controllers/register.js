'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('RegisterCtrl', function ($scope, $http,toaster, authToken) {
    $scope.submit = function () {
      var url = 'http://localhost:9090/register';
      var user = {
        email: $scope.email,
        password: $scope.password,
      }
      $http.post(url, user).then(function (response) {
        toaster.pop('success', 'Success', response.data.email);
        authToken.setToken(response.token)
      }).catch(function (e) {
        console.log(e)
        toaster.pop('error', e.statusText, 'Server Error');
      })
    }
  });
