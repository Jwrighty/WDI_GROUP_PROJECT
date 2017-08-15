angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, CurrentUserService) {
  const vm = this;
  vm.group = {};
  vm.members = userAttending;
  vm.user = CurrentUserService.currentUser;

  vm.group = Group.get({ id: $stateParams.id});

  function userAttending(){
    vm.group.members = vm.user;
    console.log(vm.group.members);
    Group
    .save(vm.group)
    .$promise
    .then(data => {
      console.log(data);
    });
  }

  function onError(err) {
    console.log(err);
  }
}
