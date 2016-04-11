(function() {
  'use strict';

  function headerCtrl($scope, $state, AuthService) {

    var vm = this;
    setLoginLogoutText();

    $scope.$on('loginStatusChanged', function (loggedIn) {
      setLoginLogoutText(loggedIn);
    });

    function setLoginLogoutText() {
      vm.loginLogoutText = (AuthService.user.isAuthenticated) ? 'Logout (' + AuthService.user.email + ')': 'Login';
    }
    
    vm.loginOrOut = function () {
      
      if(!AuthService.user.isAuthenticated){
        $state.go('root.login');
        return;
      }
      
      AuthService.logout().then(function (status) {
        console.log('logout');
        $state.go('root.login');
      });
    };
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl',['$scope','$state','AuthService', headerCtrl]);
})();
