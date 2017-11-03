'use strict';

/**
 * @ngdoc service
 * @name justforfunApp.auth
 * @description
 * # auth
 * Service in the justforfunApp.
 */
angular.module('justforfunApp').service('auth', function (API_URL, authToken, $http, $state, $window) {
    var url = API_URL+'login'
    this.login = function (email, password) {
      return $http.post(url, { email:email, password: password })
    }

  this.register = function (email, password) {
    return $http.post(API_URL+'register', { email:email, password: password })
  }

  var urlBuilder = []
  urlBuilder.push('response_type=code',
    'client_id=791834574695-2qa67rdsq3354pe9vt572331auhsoqoi.apps.googleusercontent.com',
    'redirect_uri='+window.location.origin,
    'scope=profile email '

  )

  this.googleAuth = function () {
      var url = "https://accounts.google.com/o/oauth2/v2/auth?"+ urlBuilder.join('&')
      var options = "width=500, height=500,left="+($window.outerWidth - 500) /2 + ",top=" +($window.outerHeight - 500)/2.5

    // scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&
    // access_type=offline&
    // include_granted_scopes=true&
    // state=state_parameter_passthrough_value&
    // redirect_uri=http%3A%2F%2Foauth2.example.com%2Fcallback&
    // response_type=code&
    // client_id=client_id
    var popup = $window.open(url, '', options)
    $window.focus()
    $window.addEventListener('message', function (event) {
      if(event.origin === $window.location.origin) {
        popup.close()
        var code = event.data
        $http.post(API_URL+'auth/google', {code:code})
      }
    })
  }

  });
