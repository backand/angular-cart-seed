(function () {
  'use strict';

  function authService($rootScope, Backand) {

    var factory = {
      user: {
        isAuthenticated: null,
        id: null,
        email: null,
        role: null
      }
    };

    (function init() {
      Backand.getUserDetails().then(function (results){
        updateUserDetails(results);
      })
    }());

    factory.login = function (email, password) {
      return Backand.signin(email, password).then(
        function (results) {
          return updateUserDetails(results);
        });
    };

    factory.logout = function () {
      return Backand.signout().then(
        function () {
          return updateUserDetails(null);
        });
    };

    factory.signup = function (firstname, lastname, email, password, parameters) {
      return Backand.signup(firstname, lastname, email, password, password, parameters).then(
        function (results) {
          return updateUserDetails(results);
        });
    };

    function updateUserDetails(details) {
      if(details != null) {
        factory.user.isAuthenticated = (details.access_token != '');
        factory.user.id = details.userId;
        factory.user.email = details.username;
        factory.user.role = details.role;
      }
      else {
        factory.user.isAuthenticated = false;
        factory.user.id = null;
        factory.user.email = null;
      }
      $rootScope.$broadcast('loginStatusChanged', factory.user.isAuthenticated);

      return factory.user.isAuthenticated;

    }

    return factory;

  }

  angular.module('common.services.auth', [])
      .factory('AuthService', ['$rootScope', 'Backand', authService]);

})();
