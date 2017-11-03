'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp').controller('RegisterCtrl', function ($scope,toaster, auth,$state,authToken) {
    $scope.submit = function () {

      auth.register($scope.email, $scope.password).then(function (response) {
        toaster.pop('success', 'Account Created!', 'Welcome '+ response.data.user.email + '!');
        authToken.setToken(response.data.token)
        $state.go('main')
      }).catch(function (e) {
        console.log(e)
        toaster.pop('error', e.statusText, 'User Exists');
      })
    }
  });
