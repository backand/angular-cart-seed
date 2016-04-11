(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
        .state('root.login', {
          url: '/login',
          views: {
            '@': {
              templateUrl: 'src/app/login/login.tpl.html',
              controller: 'loginCtrl as vm'
            }
          }
        });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function loginCtrl($state, AuthService) {

    var vm = this,
        path = 'root.cart-main';

    vm.email = null;
    vm.password = null;
    vm.errorMessage = null;
    vm.errorSignupMessage = null;

    (function init() {
      fixRecaptchaReloadBug(); //remove if you don't need Recaptcha
    }());


    vm.signup = function (form) {

      //collect additional parameters and send it to the signup method (you need to make sure that the phoneNumber
      // field is exists in the users object
      var captcha = document.getElementById('g-recaptcha-response').value; //if you don't use captcha then remove
      // this code and update the parameters
      var params = {phoneNumber : vm.phoneNumber, recaptcha: captcha};

      AuthService.signup(vm.firstName, vm.lastName, vm.signEmail, vm.signPassword, params).then(function (status) {
        $state.go(path);
      },function(error){
        vm.errorSignupMessage = error.error_description || error.data.error_description || error.data;
      });
    };
    
    vm.login = function () {
      AuthService.login(vm.email, vm.password).then(function (status) {
        $state.go(path);
      },function(error){
        vm.errorMessage = error.error_description;
      });
    };

    //make sure the recaptcha loads every time
    function fixRecaptchaReloadBug(){
      var script   = document.createElement("script");
      script.type  = "text/javascript";
      script.src   = "https://www.google.com/recaptcha/api.js";    // use this for linked script
      document.head.appendChild(script);
    }

  }

  angular.module('login', [])
      .config(config)
      .controller('loginCtrl', ['$state','AuthService', loginCtrl]);
})();