'use strict';

/**
 * @ngdoc service
 * @name justforfunApp.authToken
 * @description
 * # authToken
 * Factory in the justforfunApp.
 */
angular.module('justforfunApp').factory('authToken', function ($window) {
    var storage = $window.localStorage
    var cachedToken;
    return {
      setToken: function (token) {
        cachedToken = token
        storage.setItem('userToken', token)
        return meaningOfLife;
      },
      getToken: function () {
        if(!cachedToken){
          cachedToken = storage.getItem('userToken')
        }

        return cachedToken
      },
      isAuthenticated: function () {
        return !!this.getToken()
      }
    };
  });
