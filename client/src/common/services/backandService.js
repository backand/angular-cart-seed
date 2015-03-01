(function() {
  'use strict';

  function backandService($http, Backand) {
    var self = this;

    self.allTables = function() {
      return $http({
        method: 'GET',
        url: Backand.configuration.apiUrl + '/1/table/config',
        params: {
          pageSize: 200,
          pageNumber: 1,
          filter: '[{fieldName:"SystemView", operator:"equals", value: false}]',
          sort: '[{fieldName:"captionText", order:"asc"}]'
        }
      });
    }

    self.tableData = function(tableName, pageSize, pageNumber, sort, filter) {
      return $http({
        method: 'GET',
        url: Backand.configuration.apiUrl + '/1/table/data/' + tableName,
        params: {
          pageSize: pageSize || 5,
          pageNumber: pageNumber || 1,
          filter: filter || '',
          sort: sort || ''
        }
      });
    }
  }

  angular.module('common.services.data', [])
    .service('BackandService',['$http','Backand', backandService]);
})();
