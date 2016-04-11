(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config(BackandProvider, $stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/cart');
    $logProvider.debugEnabled(true);

    BackandProvider.setAppName('ngcartexample');
    BackandProvider.setSignUpToken('2e74c95f-eefa-4193-9607-e7d20d9b23e7');
    BackandProvider.setAnonymousToken('ec9e6b1e-296b-4ac2-ae85-014c5a3482cc');

    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl as vm'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl as vm'
          }
        }
      });
  }

  function MainCtrl($log) {
    $log.debug('MainCtrl loaded!');
  }

  function run($log) {
    $log.debug('App is running!');
  }

  angular.module('app', [
      'ui.router',
      'ngCart',
      'ngFileUpload',
      'angularSpinner',
      'angular-stripe',
      'backand',
      'home',
      'getting-started',
      'common.header',
      'common.footer',
      'common.services.backand',
      'common.services.auth',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'templates',
      'cart',
      'login',
      'item',
      'items',
      'stripe'
    ])
    .config(config)
    .constant("myConfig", {
      "stripePublishableKey": "pk_test_pRcGwomWSz2kP8GI0SxLH6ay",
      "payPalBusinessEmail": "paypal@backand.com"
    })
    .config(function (stripeProvider, myConfig) {
      //Enter your Stripe publish key or use Backand test account
      stripeProvider.setPublishableKey(myConfig.stripePublishableKey);
    })
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.1.0');
})();
