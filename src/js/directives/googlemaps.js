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
      let markers      = [];

      const bounds = new $window.google.maps.LatLngBounds();
      const map = new $window.google.maps.Map(element[0]);
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


      $rootScope.$on('destinationData', (event, args) => {
        if (args.data.length === 0) {
          var listener = $window.google.maps.event.addListener(map, 'idle', function () {
            map.setZoom(2);
            $window.google.maps.event.removeListener(listener);
          });
        }
        createMarkers(args.data);
      });

      $rootScope.$on('updatedDestinations', (event, args) => {
        clearMarkers();
        createMarkers(args.data);
      });

      function createMarkers(array) {
        array.forEach(destination => {
          const marker = new $window.google.maps.Marker({
            map: map,
            position: { lat: destination.lat, lng: destination.long }
          });

          bounds.extend(marker.position);

          markers.push(marker);
        });

        map.fitBounds(bounds);
        map.setZoom(12);
      }

      $rootScope.$on('centerMapOnDestination', (event, args) => {
        map.setCenter({lat: args.data.lat, lng: args.data.long });
      });

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }
    }
  };

  return directive;
}


// shit way
// when directive loads, a request is made for the destinations of the group
// this array is then looped over and for each element in the array a marker is created
// when a destination is added, a new request is made for the updated array
// a marker is created for the last element in the array

// good way
// when the get request is made on the controller load, broadcast the destinations data to the directive
// so you wouldnt need to make a mirror request on the directive to get the destinations
// when adding or removing a destination, create a updateDestinations broadcast which will update the directive array.


// center map on clicked destination
  // ng-click on list in html
  // the function that runs will be passed the destination that has been clicked
  // broadcast message containing item
  // set map center to items lat, lng position
