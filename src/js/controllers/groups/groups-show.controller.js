angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams'];
function GroupsShowCtrl(Group, $stateParams) {
  const vm = this;
  vm.group = {};
  vm.memberArray = [];
  // vm.members = userAttending;

  vm.group = Group.get({ id: $stateParams.id});
  // vm.user = User.get({ id: $stateParams.id});

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
}
