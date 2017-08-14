angular
.module('project3')
.factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject= ['API', 'TokenService'];

function AuthInterceptor(API, TokenService) {
  return {
    request: function(req) {

      const token = TokenService.getToken();
      if(req.url.indexOf(API) === 0 && token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    },
    response: function(res) {

      if(res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);

      }

      return res;
    }};
}
