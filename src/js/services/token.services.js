angular
.module('project3')
.service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];

function TokenService($window, jwtHelper) {
  const self = this;

  self.setToken = (token) => {
    return $window.localStorage.setItem('MyToken', token);
  };

  self.getToken = () => {
    return $window.localStorage.getItem('MyToken');
  };

  self.decodeToken = () => {
    const token = self.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  };

  self.removeToken = () => {
    $window.localStorage.clear();
  };
}
