(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.items', {
        url: '/items',
        views: {
          '@': {
            templateUrl: 'src/app/item/items.tpl.html',
            controller: 'itemsCtrl as vm'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function itemsCtrl(BackandService, AuthService, $state, $timeout, usSpinnerService) {

    var vm = this;
    vm.items = [];
    vm.filteredCount = 0;
    vm.orderby = "name";
    vm.reverse = false;
    vm.searchText = null;
    vm.cardAnimationClass = '.card-animation';

    //paging
    vm.totalRecords = 0;
    vm.pageSize = 10;
    vm.currentPage = 1;

    vm.DisplayModeEnum = {
      Card: 0,
      List: 1
    };
    vm.listDisplayModeEnabled = vm.DisplayModeEnum.Card;

    (function init() {
      loadItems('');
    }());

    vm.pageChanged = function (page) {
      vm.currentPage = page;
      loadItems(vm.searchText);
    };

    vm.navigate = function (url) {
      $location.path(url);
    };

    vm.setOrder = function (orderby) {
      if (orderby === vm.orderby) {
        vm.reverse = !vm.reverse;
      }
      vm.orderby = orderby;

      loadItems('');
    };

    vm.searchTextChanged = function () {
      loadItems(vm.searchText);
    };
    
    function loadItems(filterText) {
      BackandService.getItems(vm.currentPage - 1,
          vm.pageSize,
          filterItems(filterText),
          [{fieldName: vm.orderby, order: (vm.reverse) ? 'desc' : 'asc'}])
        .then(function (results) {
          vm.totalRecords = results.data.totalRows;
          vm.items = results.data.data;
          $timeout(function () {
            vm.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
          }, 1000);

        }, function (error) {
          alert('Sorry, an error occurred: ' + error.data);
        });
    }

    function filterItems(filterText) {
      if(filterText === '' || filterText === null)
          return null;
      else
        return {"q": { "name" : {"$like" : filterText } } };
    }
    
  }

  angular.module('items', [])
    .config(config)
    .controller('itemsCtrl', ['BackandService', 'AuthService','$state','$timeout','usSpinnerService', itemsCtrl]);
})();
