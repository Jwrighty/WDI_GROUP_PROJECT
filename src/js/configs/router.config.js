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
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'controller'
  })
  .state('groupsIndex', {
    url: '/groups',
    templateUrl: 'js/views/groups/groups-index.html',
    controller: 'GroupsIndexCtrl',
    controllerAs: 'controller'
  })
  .state('groupsShow', {
    url: '/groups/:id',
    templateUrl: 'js/views/groups/groups-show.html',
    controller: 'GroupsShowCtrl',
    controllerAs: 'controller'
  });

  $urlRouterProvider.otherwise('/');
}
