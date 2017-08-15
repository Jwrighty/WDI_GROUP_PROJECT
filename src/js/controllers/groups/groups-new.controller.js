angular
.module('project3')
.controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['Group', '$state','CurrentUserService'];
function GroupsNewCtrl(Group, $state, CurrentUserService){
  const vm = this;
  vm.create = groupsCreate;

  function groupsCreate(){
    const currentUser = CurrentUserService.getUser();
    console.log(currentUser);
    Group
    .save(vm.group)
    .$promise
    .then(()=> {

      $state.go('groupsIndex');
    });


  }
}
