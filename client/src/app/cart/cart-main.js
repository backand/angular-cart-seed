(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.cart-main', {
        url: '/cart',
        views: {
          '@': {
            templateUrl: 'src/app/cart/cart-main.tpl.html',
            controller: 'cartCtrl as vm'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function cartCtrl(BackandService, ngCart, AuthService, $state) {

    var vm = this;

    (function init() {
      ngCart.setTaxRate(7.5);
      ngCart.setShipping(2.99);
      loadItems();
    }());

    function loadItems(){

      BackandService.listOfActiveItems().then(function(results){
        vm.products = results.data.data;
      })
    }

    vm.getTotalItems = function(){
      return ngCart.getTotalItems();
    };

    vm.checkout = function() {
      if (!AuthService.user.isAuthenticated){
        alert('You must login before checkout!');
        $state.go('root.login');
      }
      else {
        $state.go('root.stripe');
      }
    };
    
  }

  angular.module('cart', [])
    .config(config)
    .controller('cartCtrl', ['BackandService','ngCart','AuthService','$state', cartCtrl]);
})();
