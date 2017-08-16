angular
.module('project3')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$rootScope', 'Group', '$stateParams'];
function googleMap($window, $rootScope, Group, $stateParams) {
  // const markerData =  [[52.238, -0.888],[52.242, -0.889]];
  const vm = this;
  // vm.locationData = locationData;




  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      marker: '=',
      name: '=',
      lat: '=',
      lng: '=',
      description: '='
    },
    link(scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: {lat: 51.5074, lng: -0.0918 }
      });
      const card = document.getElementById('pac-card');
      const input = document.getElementById('pac-input');
      const types = document.getElementById('type-selector');
      const strictBounds = document.getElementById('strict-bounds-selector');

      map.controls[$window.google.maps.ControlPosition.TOP_RIGHT].push(card);

      const autocomplete = new $window.google.maps.places.Autocomplete(input);

      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', function() {
        // infowindow.close();
        // marker.setVisible(false);
        const place = autocomplete.getPlace();
        // console.log(place.types);
        scope.placeData = {
          name: place.name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          description: place.types[0]
        };

        $rootScope.$broadcast('gotPlaceData', {
          placeData: scope.placeData
        });

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert('No details available for input: ' + place.name + '');
          return;
        }
      });

      Group
      .get({ id: $stateParams.id})
      .$promise
      .then(data => {
        vm.locationData = data.destinations;

        function addMarkersToMap () {
          for (let i = 0; i < vm.locationData.length; i++) {
            const marker = new $window.google.maps.Marker({
              map: map,
              position: {lat: vm.locationData[i].lat, lng: vm.locationData[i].long},
              animation: $window.google.maps.Animation.BOUNCE
            });
          }
        }
        addMarkersToMap();

        return vm.locationData;

      });
    }
  };
  return directive;
}
