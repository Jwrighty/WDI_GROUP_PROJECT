angular
  .module('project3')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'controller'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'controller'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UsersShowCtrl',
    controllerAs: 'controller'
  })
  .state('groupsIndex', {
    url: '/groups',
    templateUrl: 'js/views/groups/groups-index.html',
    controller: 'GroupsIndexCtrl',
    controllerAs: 'controller'
  })
  .state('groupsNew', {
    url: '/groups/new',
    templateUrl: 'js/views/groups/groups-new.html',
    controller: 'GroupsNewCtrl',
    controllerAs: 'controller'
  })
  .state('groupsShow', {
    url: '/groups/:id',
    templateUrl: 'js/views/groups/groups-show.html',
    controller: 'GroupsShowCtrl',
    controllerAs: 'controller'
  })
  .state('groupsEdit', {
    url: '/groups/:id/edit',
    templateUrl: 'js/views/groups/groups-edit.html',
    controller: 'GroupsEditCtrl',
    controllerAs: 'controller'
  });

  $urlRouterProvider.otherwise('/');
}
