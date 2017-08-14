angular
.module('project3')
.controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group){
  const vm = this;

  // vm.delete = groupsDelete;

  groupsIndex();

  function groupsIndex() {
    vm.groups = Group.query();

  }


}
