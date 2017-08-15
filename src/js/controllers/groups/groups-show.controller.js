angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'CurrentUserService', '$http', 'API'];
function GroupsShowCtrl(Group, $stateParams, CurrentUserService, $http, API) {
  const vm = this;
  vm.group = {};

  vm.members = userAttending;
  vm.user = CurrentUserService.currentUser;

  vm.memberArray = [];
  // vm.members = userAttending;
  vm.group = Group.get({ id: $stateParams.id});

  function userAttending(){
    $http
      .post(`${API}/groups/${vm.group._id}/attending`)
      .then(() => {
        vm.group.members.push(vm.user);
      });
  }
}
