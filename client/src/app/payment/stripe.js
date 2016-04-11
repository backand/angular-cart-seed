(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.stripe', {
        url: '/stripe',
        views: {
          '@': {
            templateUrl: 'src/app/payment/stripe.tpl.html',
            controller: 'stripeCtrl as vm'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function stripeCtrl(BackandService, AuthService, ngCart, stripe) {

    var vm = this;

    (function init() {
      vm.amount = ngCart.totalCost();
    }());
    

    vm.makePayment = function(){

      vm.error = "";
      vm.success = "";

      //get the form's data
      var form = angular.element(document.querySelector('#payment-form'))[0];

      //Use angular-stripe service to get the token
      return stripe.card.createToken(form)
      .then(function (token) {
          console.log('token created for card ending in ', token.card.last4);

          //Call Backand action to make the payment
          return createCart(token.id)
        })
        .then(function (payment) {
          vm.success = 'successfully submitted payment for $' + payment.data.totalCost;
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            vm.error = 'Stripe error: ' +  err.message;
          }
          else {
            vm.error = err.data;
          }
      });
    };

    //Add new Cart in carts object and all the related items. When use Stripe get the token as well
    function createCart(tokenId){
      if(!AuthService.user.isAuthenticated)
        alert('You must login before checkout!');

      var cart = ngCart.toObject();

      cart.user = AuthService.user.id;
      cart.token = tokenId; //use for Stripe payment

      //need to update the item field based on the item id
      angular.forEach(cart.items, function(value) {
        value.item = Number(value.id);
      });

      console.log(cart);
      return BackandService.createCart(cart);

    };


  }

  angular.module('stripe', [])
    .config(config)
    .controller('stripeCtrl', ['BackandService', 'AuthService', 'ngCart','stripe', stripeCtrl]);
})();
