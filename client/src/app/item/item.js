(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.item', {
        url: '/item',
        views: {
          '@': {
            templateUrl: 'src/app/item/item.tpl.html',
            controller: 'itemCtrl as vm'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function itemCtrl(BackandService, AuthService, $state, usSpinnerService) {

    var vm = this;
    vm.item = {};

    (function init() {

    }());

    vm.addItem = function(){
      if(AuthService.user.role !== 'Admin')
        alert('You must login as Admin!');

      console.log(vm.item);
      vm.item.inStock = true; //hidden property
      //call backand service to POST (add) the new item
      BackandService.addItem(vm.item).then(function(results){
        $state.go('root.cart-main');
      })
    };
    
    // input file onchange callback
    vm.upload = function(file) {

      //read file content
      var reader = new FileReader();

      reader.onload = function(e) {
        usSpinnerService.spin('upload-loading');
        BackandService.uploadFile(file.name, e.currentTarget.result).then(function(res) {
          vm.item.imageUrl = res.data.url;
          vm.item.filename = file.name;
          usSpinnerService.stop('upload-loading');
        }, function(err){
          usSpinnerService.stop('upload-loading');
          alert(err.data);
        });
      };

      reader.readAsDataURL(file);
    };
    
  }

  angular.module('item', [])
    .config(config)
    .controller('itemCtrl', ['BackandService', 'AuthService','$state','usSpinnerService', itemCtrl]);
})();
