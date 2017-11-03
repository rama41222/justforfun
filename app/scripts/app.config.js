'use strict';

/**
 * @ngdoc overview
 * @name justforfunApp
 * @description
 * # justforfunApp
 *
 * Main module of the application.
 */
angular.module('justforfunApp').config(function($urlRouterProvider, $stateProvider, $httpProvider){
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
  }).state('login',{
    url: '/login',
    templateUrl:'/views/login.html',
    controller:'LoginCtrl'
  })

  $httpProvider.interceptors.push('authinterceptor')

})
  .constant('API_URL','http://localhost:9090/')
  .run(function ($window) {
      var params = $window.location.search.substring(1)
      if(params && $window.opener &&  $window.opener.location.origin === $window.location.origin) {
        var pair  = params.split('=')
        var code = decodeURIComponent(pair[1])
        $window.opener.postMessage(code , $window.location.origin)
      }
  })
