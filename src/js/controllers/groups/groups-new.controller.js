angular
.module('project3')
.controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['Group', '$state', 'CurrentUserService'];
function GroupsNewCtrl(Group, $state, CurrentUserService){
  const vm = this;
  // vm.create = groupsCreate;
  vm.createNewGroup = createNewGroup;
  vm.user = CurrentUserService.currentUser;

  // function groupsCreate(){
  //
  //   Group
  //   .save(vm.group)
  //   .$promise
  //   .then(()=> {
  //
  //     $state.go('groupsIndex');
  //   });
  // }
  function createNewGroup(){
    vm.group.createdBy = vm.user;
    // Use Group factory rather than $http.
    Group
    .save(vm.group)
    .$promise
    //  $http.post(`${window.location.origin}/api/groups`, vm.group)
    .then(data => {
      console.log(data);
      $state.go('groupsIndex');
    });
  }
}
