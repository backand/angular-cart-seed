(function() {
  'use strict';

  function httpInterceptor($q, $log, $injector) {
    return {

      requestError: function(rejection) {
        $log.debug(rejection);
        return $q.reject(rejection);
      },
      response: function(response) {
        $log.debug('response: ', response);
        return response;
      },
      responseError: function(rejection) {
        $log.debug(rejection);
        
        if (rejection.status === 401 || rejection.status === 403) {
          var state = $injector.get('$state');
          state.transitionTo('root.login');
        }

        return $q.reject(rejection);
      }
    };
  }

  angular.module('common.interceptors.http', [])
    .factory('httpInterceptor',['$q','$log','$injector', httpInterceptor]);
})();
