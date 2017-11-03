'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('RegisterCtrl', function ($scope, $http,toaster) {
    $scope.submit = function () {
      var url = '/d.commmm';
      var user = {
        email:'ee@ee.com',
        pass:'ee'
      }
      $http.post(url, user).then(function (response) {
        // toaster.pop('success', e.statusText, 'Server Error');
      }).catch(function (e) {
        toaster.pop('error', e.statusText, 'Server Error');
      })
    }
  });
