angular
.module('project3')
.controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['Group', '$state'];
function GroupsNewCtrl(Group, $state){
  const vm = this;
  vm.create = groupsCreate;

  function groupsCreate(){
    Group
    .save(vm.group)
    .$promise
    .then(()=> $state.go('groupsIndex'));
  }
}
