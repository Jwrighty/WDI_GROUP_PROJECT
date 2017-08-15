angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams'];
function GroupsShowCtrl(Group, $stateParams) {
  const vm = this;
  vm.group = {};
  vm.members = userAttending;

  vm.group = Group.get({ id: $stateParams.id});


  function userAttending() {

  }

  // function onError(err) {
  //   console.log(err);
  // }
}
