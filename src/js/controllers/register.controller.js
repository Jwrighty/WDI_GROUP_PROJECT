angular
.module('project3')
.controller('RegisterCtrl', RegisterCtrl);


RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state){
  const vm = this;
  vm.register = () => {
    User
    .register(vm.user)
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
