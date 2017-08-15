angular
.module('project3')
.factory('Group', Group);

Group.$inject = ['API', '$resource'];

function Group(API, $resource) {

  return $resource(`${API}/groups/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' },
      'attending': { method: 'GET', url: `${API}/groups/:id/attending` },
      'removeattending': { method: 'GET', url: `${API}/groups/:id/removeattending` },
      'destination': { method: 'GET', url: `${API}/groups/:id/destinations`}
    }
    );
}
