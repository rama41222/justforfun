'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the justforfunApp
 */
angular.module('justforfunApp').controller('OrdersCtrl', function ($scope, $http, API_URL, toaster) {
  $http.get(API_URL+'orders').then(function (orders) {
    $scope.orders = orders.data
  }).catch(function (e) {
    toaster.pop('error', 'Error!', e.data.error);
  })
  });
