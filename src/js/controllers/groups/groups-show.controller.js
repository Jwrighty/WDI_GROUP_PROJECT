angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, CurrentUserService) {
  const vm = this;

  vm.destination      = {};
  vm.members          = userAttending;
  vm.notAttending     = notAttending;
  vm.addDestination   = addDestination;
  vm.removeDestination = removeDestination;
  vm.user             = CurrentUserService.currentUser;
  Group
    .get({ id: $stateParams.id})
    .$promise
    .then(data => {
      vm.group = data;

      // vm.group.members.indexOf(vm.user._id) === -1 ? vm.attending = true : vm.attending = false;
    });

  function userAttending(){
    vm.attending = !vm.attending;
    Group
    .attending({ id: vm.group._id })
    .$promise
    .then(() => {
      vm.group.members.push(vm.user);
    });
  }

  function notAttending() {
    vm.attending = !vm.attending;
    Group
    .removeattending({ id: vm.group._id })
    .$promise
    .then(() => {
      const selectedUser = vm.group.members.find(obj => {
        if (obj._id === vm.user._id ) {
          return obj;
        }
      });
      vm.group.members.splice(vm.group.members.indexOf(selectedUser), 1);
    });
  }

  function addDestination(){
    Group
      .addDestination({ id: vm.group._id }, vm.destination)
      .$promise
      .then(group =>{
        vm.group.destinations = group.destinations;
        vm.destination = {};
      });
  }

  function removeDestination(destination){
    console.log(destination._id);

    Group
      .removeDestination({ groupId: vm.group._id, destinationId: destination._id} )
      .$promise
      .then(() =>{
        vm.group.destinations.splice(vm.group.destinations.indexOf(destination), 1);
      });
  }
}
