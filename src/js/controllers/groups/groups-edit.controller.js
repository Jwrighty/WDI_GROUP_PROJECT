angular
.module('project3')
.controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['Group', '$stateParams', '$state'];
function GroupsEditCtrl(Group, $stateParams, $state) {
  const vm = this;
  vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  vm.delete = groupsDelete;

  function groupsUpdate() {
    Group
    .update(vm.group)
    .$promise
    .then(() => $state.go('groupsShow', $stateParams));
  }

  function groupsDelete() {
    Group
    .remove({ id: vm.group._id })
    .$promise
    .then(() => {
      $state.go('groupsIndex');
    });
  }
}
