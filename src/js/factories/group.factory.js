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
      'addDestination': { method: 'POST', url: `${API}/groups/:id/destinations/new`},
      'removeDestination': { method: 'DELETE', url: `${API}/groups/:groupId/destinations/:destinationId`},
      'addComment': { method: 'POST', url: `${API}/groups/:groupId/comments`}
      // 'deleteComment': { method: 'DELETE', url: `${API}/groups/:groupId/comments/:commentsId`}
    }
    );
}
