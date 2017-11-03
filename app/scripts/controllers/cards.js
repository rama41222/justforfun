'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp')
  .controller('CardsCtrl', function($scope) {
    $scope.cards = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
