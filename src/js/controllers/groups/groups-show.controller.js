angular
.module('project3')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$scope', 'Group', '$stateParams', 'CurrentUserService', '$rootScope'];
function GroupsShowCtrl($scope, Group, $stateParams, CurrentUserService, $rootScope) {
  const vm = this;

  vm.destination            = {};
  vm.placeData              = {};
  vm.members                = userAttending;
  vm.notAttending           = notAttending;
  vm.addDestination         = addDestination;
  vm.removeDestination      = removeDestination;
  vm.addComment             = addComment;
  vm.centerMapOnDestination = centerMapOnDestination;
  // vm.deleteComment       = deleteComment;
  vm.user                   = CurrentUserService.currentUser;


  Group
  .get({ id: $stateParams.id})
  .$promise
  .then(data => {
    vm.group = data;
    $rootScope.$broadcast('destinationData', {
      data: vm.group.destinations
    });
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
      $rootScope.$broadcast('updatedDestinations', { data: vm.group.destinations });
    });
  }

  function removeDestination(destination){
    Group
    .removeDestination({ groupId: vm.group._id, destinationId: destination._id} )
    .$promise
    .then(() =>{
      vm.group.destinations.splice(vm.group.destinations.indexOf(destination), 1);
      $rootScope.$broadcast('updatedDestinations', { data: vm.group.destinations });
      vm.destination = {};
    });
  }

  // $scope.item = false;
  function centerMapOnDestination(event, destination) {
    angular.element(event.target).parent().children().removeClass('selected');
    if (!(event.target.classList.contains('selected'))) {
      event.target.className += ' selected';
    }
    $rootScope.$broadcast('centerMapOnDestination', {
      data: destination
    });
    // $scope.item = true;
  }

  function addComment(){
    console.log(vm.group._id);
    // Group
    //   .addComment({ groupId: vm.group._id }, vm.comments)
    //   .$promise
    //   .then(group =>  {
    //     vm.group.comments = group.comments;
    //     vm.comments = {};
    //   });
    $http.post(`${API}/groups/${vm.group._id}/comments`, vm.comments)
    .then(group =>  {
      vm.group.comments = group.comments;
      vm.comments = {};
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
