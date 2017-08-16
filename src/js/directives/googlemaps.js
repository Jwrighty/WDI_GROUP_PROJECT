angular
.module('project3')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const markerData =  [[52.238, -0.888],[52.242, -0.889]];
  console.log(markerData[0][0]);


  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      marker: '='
    },
    link($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: {lat: markerData[0][0], lng: markerData[0][1] }
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
        const name = place.name;
        const lat = place.geometry.location.lat();
        const lng =  place.geometry.location.lng();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert('No details available for input: ' + place.name + '');
          return;
        }
      });

      function addMarkersToMap () {
        for (let i = 0; i < markerData.length; i++) {
          const marker = new $window.google.maps.Marker({
            map: map,
            position: {lat: markerData[i][0], lng: markerData[i][1]},
            animation: $window.google.maps.Animation.BOUNCE
          });
        }
      }
      addMarkersToMap();
    }
  };
  return directive;
}
