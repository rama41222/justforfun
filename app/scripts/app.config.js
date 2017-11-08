'use strict';

/**
 * @ngdoc overview
 * @name justforfunApp
 * @description
 * # justforfunApp
 *
 * Main module of the application.
 */
angular.module('justforfunApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('main',{
      url: '/',
      templateUrl:'/views/main.html',
      controller:'MainCtrl'
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
  }).state('card',{
    url:'/card/:id',
    templateUrl: '/views/card.html',
    controller : 'CardCtrl'
  }).state('orders',{
    url:'/orders',
    templateUrl: '/views/orders.html',
    controller : 'OrdersCtrl'
  }).state('checkout', {
    url: '/card/:id/wrapper/:wid',
    templateUrl: '/views/checkout.html',
    controller: 'CheckoutCtrl'
  });


  $authProvider.google({
    clientId: '',
    url : API_URL + 'auth/google'
  })

  $authProvider.loginUrl = API_URL + 'login'
  $authProvider.signupUrl = API_URL + 'register'

  $authProvider.google({
    clientId: '791834574695-2qa67rdsq3354pe9vt572331auhsoqoi.apps.googleusercontent.com',
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    requiredUrlParams:['scope'],
    url: API_URL + 'auth/google',
    scope: ['profile', 'email'],
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 452, height: 633 }
  });

  $authProvider.facebook({
    clientId: '1535547543206159',
    url: API_URL + 'auth/facebook',
  });

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
