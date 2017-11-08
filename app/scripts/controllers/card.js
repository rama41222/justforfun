'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp').controller('CardCtrl', function ($scope, $http,toaster,$stateParams,API_URL) {
  $http.get(API_URL+'cards/'+ $stateParams.id).then(function (card) {
    console.log(card)
    $scope.card = card.data[0]
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })

  $http.get(API_URL+'wrappers').then(function (wrappers) {
    $scope.wrappers = wrappers.data
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })


});
