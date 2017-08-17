angular
.module('project3')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$rootScope'];
function googleMap($window, $rootScope) {
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
      const map = new $window.google.maps.Map((element[0]), {
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#ebe3cd'
              }
            ]
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#523735'
              }
            ]
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#f5f1e6'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#c9b2a6'
              }
            ]
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#dcd2be'
              }
            ]
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#ae9e90'
              }
            ]
          },
          {
            'featureType': 'landscape.natural',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#93817c'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#a5b076'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#447530'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#f5f1e6'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#fdfcf8'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#f8c967'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#e9bc62'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#e98d58'
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#db8555'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#806b63'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#8f7d77'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#ebe3cd'
              }
            ]
          },
          {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dfd2ae'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#b9d3c2'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#92998d'
              }
            ]
          }
        ]
      });
      const card = document.getElementById('pac-card');
      const input = document.getElementById('pac-input');

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
        map.setZoom(10);
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
