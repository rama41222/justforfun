'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('CardsCtrl', function($scope, $http, API_URL, toaster) {
    $http.get(API_URL+'cards').then(function (cards) {
      $scope.cards = cards.data
    }).catch(function (e) {
      toaster.pop('error', 'Error!', e.data.error);
    })
  });
