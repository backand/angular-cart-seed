(function () {
  'use strict';

  function backandService($http, Backand) {

    var factory = {};

    factory.listOfActiveItems = function(pageSize, pageNumber) {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/items',
        params: {
          pageSize: pageSize || 30,
          pageNumber: pageNumber || 1,
          filter: [
            {
              fieldName: 'inStock',
              operator: 'equals',
              value: true
            }
          ],
          sort: [
            {
              fieldName: "price",
              order: "desc"
            }
          ]
        }
      });
    };

    factory.getItems =  function(pageIndex, pageSize, filter, sort) {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/items',
        params: {
          pageSize: pageSize,
          pageNumber: pageIndex+1,
          filter: filter || null,
          sort: sort || null
        }
      });
    };

    factory.createCart = function(cart, token) {
      return $http({
        method: 'POST',
        url: Backand.getApiUrl() + '/1/objects/cart?deep=true&returnObject=true',
        data: cart,
        params:{
          parameters:{
            token: token
          }
        }
      });
    };

    factory.addItem = function(item) {
      return $http({
        method: 'POST',
        url: Backand.getApiUrl() + '/1/objects/items?returnObject=true',
        data: item
      });
    };

    //Call makePayment on demand action
    factory.makePayment = function(amount, token){
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/action/cart',
        params:{
          name: 'StripePayment',
          parameters:{
            token: token,
            amount: amount
          }
        }
      });
    }

    // call to Backand action with the file name and file data  
    factory.uploadFile = function(filename, filedata) {
      // By calling the files action with POST method in will perform 
      // an upload of the file into Backand Storage
      return $http({
        method: 'POST',
        url : Backand.getApiUrl() + '/1/objects/action/items',
        params:{
          name: 'files'
        },
        headers: {
          'Content-Type': 'application/json'
        },
        // you need to provide the file name and the file data
        data: {
          filename: filename,
          filedata: filedata.substr(filedata.indexOf(',') + 1, filedata.length) //need to remove the file prefix type
        }
      });
    };

    return factory;

  }

  angular.module('common.services.backand', [])
    .factory('BackandService', ['$http','Backand', backandService]);

})();
