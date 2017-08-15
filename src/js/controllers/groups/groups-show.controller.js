angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, CurrentUserService) {
  const vm = this;
  vm.group = {};

  vm.members = userAttending;
  // vm.notAttending = notAttending;
  vm.user = CurrentUserService.currentUser;

  vm.memberArray = [];
  // vm.members = userAttending;
  vm.group = Group.get({ id: $stateParams.id});

  function userAttending(){
    Group
      .attending({ id: vm.group._id })
      .$promise
      .then(() => {
        vm.group.members.push(vm.user);
      });
  }

//   function notAttending() {
//     Group
//       .attending({ id: vm.group._id })
//       .$promise
//       .then(() => {
//         vm.group.members.splice(vm.user);
//       });
//   }
}
