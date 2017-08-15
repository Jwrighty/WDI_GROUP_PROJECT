angular
.module('project3')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = () => {
    User.login(vm.user)
    .$promise
    .then(data => {
      console.log(data);

      CurrentUserService.getUser();
      $state.go('groupsIndex');
      // change destination

    }, err => {
      console.log(err);
    });
  };
}
