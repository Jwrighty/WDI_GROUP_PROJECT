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
      // console.log(element[0]);
      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: {lat: markerData[0][0], lng: markerData[0][1] }
      });

      function addMarkersToMap () {
        for (var i = 0; i < markerData.length; i++) {
          const marker = new $window.google.maps.Marker({
            map: map,
            position: {lat: markerData[i][0], lng: markerData[i][1]},
            animation: google.maps.Animation.BOUNCE
          });
        }
      }
      addMarkersToMap();
    }
  };
  return directive;
}
