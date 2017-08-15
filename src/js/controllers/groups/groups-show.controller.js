angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, CurrentUserService) {
  const vm = this;
  vm.group = {};

  vm.members = userAttending;
  vm.user = CurrentUserService.currentUser;

  vm.memberArray = [];
  // vm.members = userAttending;


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

  // function userAttending() {
  //   Group.findByIdandUpdate(
  //     Group._id,
  //     {$push: { 'members': members}},
  //     {safe: true, upsert: true, new: true},
  //     function(err) {
  //       console.log(err);
  //     }
  //   );
  //
  //   vm.memberArray.push({members: ''});
  // }


  function onError(err) {
    console.log(err);
  }

  // function onError(err) {
  //   console.log(err);
  // }
}
