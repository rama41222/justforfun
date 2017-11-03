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
  }).state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
  }).state('cards', {
    url: '/cards',
    templateUrl: '/views/cards.html',
    controller: 'CardsCtrl'
  })

});
