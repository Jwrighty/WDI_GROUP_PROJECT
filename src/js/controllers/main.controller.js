angular
.module('project3')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['CurrentUserService', '$rootScope', '$state'];
function MainCtrl(CurrentUserService, $rootScope, $state) {
  const vm = this;

  $rootScope.$on('$stateChangeSuccess', ()=> {
    // vm.hideNav = false;

    // if new state === 'home'
      // vm.hideNav = true;
  });

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;

    vm.logout = () => {
      CurrentUserService.removeUser();
    };
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });
  
}
