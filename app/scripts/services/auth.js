'use strict';

/**
 * @ngdoc service
 * @name justforfunApp.auth
 * @description
 * # auth
 * Service in the justforfunApp.
 */
angular.module('justforfunApp').service('auth', function (API_URL, authToken, $http, $state) {
    var url = API_URL+'login'
    this.login = function (email, password) {
      return $http.post(url, { email:email, password: password })
    }

  this.register = function (email, password) {
    return $http.post(API_URL+'register', { email:email, password: password })
  }


  });
