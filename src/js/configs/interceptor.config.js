angular
.module('project3')
.config(Intercepetor);

Intercepetor.$inject = ['$httpProvider'];

function Intercepetor($httpProvider) {
  return $httpProvider.interceptors.push('AuthInterceptor');
}
