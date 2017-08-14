angular
  .module('project3')
  .controller('GroupsShowCtrl', GroupShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams'];
function GroupShowCtrl(Group, $stateParams) {
  const vm = this;
  vm.group = {};

  vm.group = Group.get({ id: $stateParams.id});

  function onError(err) {
    console.log(err);
  }
}
