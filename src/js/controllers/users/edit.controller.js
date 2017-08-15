angular
.module('project3')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;
  vm.user = User.get($stateParams);
  vm.update = usersUpdate;


  function usersUpdate() {
    User
    .update(vm.user)
    .$promise
    .then(() => $state.go('usersShow', $stateParams));
  }
}
