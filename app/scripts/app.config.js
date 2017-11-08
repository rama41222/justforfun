'use strict';

/**
 * @ngdoc overview
 * @name justforfunApp
 * @description
 * # justforfunApp
 *
 * Main module of the application.
 */
angular.module('justforfunApp').config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('main',{
      url: '/',
      templateUrl:'/views/main.html'
    })
    .state('register',{
      url: '/register',
      templateUrl:'/views/register.html',
      controller:'RegisterCtrl'
  }).state('products',{
    url: '/products',
    templateUrl:'/views/product.html',
    controller:'productController'
}).state('payments',{
  url: '/payments',
  templateUrl:'/views/payments.html',
  controller:'paymentController'
}).state('users',{
  url: '/users',
  templateUrl:'/views/user.html',
  controller:'userController'
}).state('notes',{
  url: '/notes',
  templateUrl:'/views/notes.html',
  controller:'noteController'
}).state('orders',{
  url: '/orders',
  templateUrl:'/views/order.html',
  controller:'orderController'
}).state('gifts',{
  url: '/gifts',
  templateUrl:'/views/gifts.html',
  controller:'giftController'
}).state('addPayments',{
  url: '/addPayments',
  templateUrl:'/views/addPayments.html',
  controller:'addPaymentController'
}).state('getAdminOders',{
  url: '/getAdminOders',
  templateUrl:'/views/adminGetOrders.html',
  controller:'adminOrderController'
});

});
