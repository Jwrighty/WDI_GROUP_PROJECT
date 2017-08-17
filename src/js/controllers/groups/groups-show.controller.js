angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$scope', 'Group', '$stateParams', 'CurrentUserService', '$rootScope', 'API', '$http'];
function GroupsShowCtrl($scope, Group, $stateParams, CurrentUserService, $rootScope, $http, API) {
  const vm = this;

  vm.destination      = {};
  vm.placeData        = {};
  vm.members          = userAttending;
  vm.notAttending     = notAttending;
  vm.addDestination   = addDestination;
  vm.removeDestination = removeDestination;
  vm.addComment       = addComment;
  // vm.deleteComment    = deleteComment;
  vm.user             = CurrentUserService.currentUser;

  Group
  .get({ id: $stateParams.id})
  .$promise
  .then(data => {
    vm.group = data;

    // vm.group.members.indexOf(vm.user._id) === -1 ? vm.attending = true : vm.attending = false;
  });

  $rootScope.$on('gotPlaceData', (event, args) => {
    vm.destination.name = args.placeData.name;
    vm.destination.lat  = args.placeData.lat;
    vm.destination.long = args.placeData.lng;
    vm.destination.description = args.placeData.description;

    $scope.$apply();
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
      // vm.group.push(group);
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

  function addComment(){
    Group
      .addComment({ id: vm.group._id }, vm.comment)
      .$promise
      .then(group => {
        console.log('comment has been successfully created!');
        console.log(group);
      });
  }

  // function deleteComment(comment) {
  //   Group
  //     .deleteComment({ groupId: vm.group._id, commentId: comment._id} )
  //     .$promise
  //     .then(() =>{
  //       vm.group.comments.splice(vm.group.comments.indexOf(comment), 1);
  //     });
  // }
}
