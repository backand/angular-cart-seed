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
  function itemsCtrl(BackandService, AuthService, $state, usSpinnerService) {

    var vm = this;
    vm.items = [];
    vm.filteredCount = 0;
    vm.orderby = "name";
    vm.reverse = 'asc';
    vm.searchText = null;
    vm.cardAnimationClass = '.card-animation';

    //paging
    vm.totalRecords = 0;
    vm.pageSize = 10;
    vm.currentPage = 1;

    (function init() {
      loadItems('');
    }());

    vm.pageChanged = function (page) {
      vm.currentPage = page;
      loadItems(vm.searchText);
    };
    
    vm.changeDisplayMode = function (displayMode) {
      switch (displayMode) {
        case vm.DisplayModeEnum.Card:
          vm.listDisplayModeEnabled = false;
          break;
        case vm.DisplayModeEnum.List:
          vm.listDisplayModeEnabled = true;
          break;
      }
    };

    vm.navigate = function (url) {
      $location.path(url);
    };

    vm.setOrder = function (orderby) {
      if (orderby === vm.orderby) {
        vm.reverse = (reverse === 'asc') ? 'desc' : 'asc';
      }
      vm.orderby = orderby;
    };
    
    function loadItems(filterText) {
      BackandService.getItems(vm.currentPage - 1,
          vm.pageSize,
          filterItems(filterText),
          [{fieldName: vm.orderby, order: vm.reverse}])
        .then(function (results) {
          vm.totalRecords = results.data.totalRows;
          vm.items = results.data.data;
          $timeout(function () {
            vm.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
          }, 1000);

        }, function (error) {
          $window.alert('Sorry, an error occurred: ' + error.data.message);
        });
    }

    function filterItems(filterText) {
      if(filterText === '' || filterText === null)
          return null;
      else
        return {"q":{"name": filterText}};
    }
    
  }

  angular.module('items', [])
    .config(config)
    .controller('itemsCtrl', ['BackandService', 'AuthService','$state','usSpinnerService', itemsCtrl]);
})();
