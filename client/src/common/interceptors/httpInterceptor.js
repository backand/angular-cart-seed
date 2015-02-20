(function() {
  'use strict';

  function httpInterceptor($q, $log, $cookieStore) {
    return {
      request: function(config) {
        config.headers['Authorization'] = $cookieStore.get('backand_token');
        return config;
      },
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
        return $q.reject(rejection);
      }
    };
  }

  angular.module('common.interceptors.http', [])
    .factory('httpInterceptor', httpInterceptor);
})();
