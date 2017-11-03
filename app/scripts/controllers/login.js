'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp').controller('LoginCtrl', function ($scope ,toaster,authToken, auth, $state) {
  $scope.submit = function () {

    auth.login($scope.email, $scope.password).then(function (response) {
      console.log(response)
      toaster.pop('success', 'Welcome!', 'How are you today '+ response.data.user.email + '?');
      authToken.setToken(response.data.token)
      $state.go('main')
    }).catch(function (e) {
      console.log(e)
      toaster.pop('error', e.statusText, e.data.message);
    })
  }
  });
