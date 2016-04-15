'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:ArcoffireCtrl
 * @description
 * # ArcoffireCtrl
 * Controller of the hexMapJsApp
 */
angular.module('hexMapJsApp')
  .controller('ArcoffireCtrl', function ($scope, $http) {
    // Load weapons.json
    $http.get('data/weapons.json')
      .then(function(res){
        $scope.weapons = res.data;
      });

    var hexagonGrid = new HexagonGrid('ArcOfFireHexCanvas', 50);

    $scope.$watch('selectedWeapons', function(newSelectedWeapons, oldSelectedWeapons){
      var n,i;

      if (typeof oldSelectedWeapons !== 'undefined'){
        for (n = 0; n < oldSelectedWeapons.length; n++){
          for (i = 0; i < oldSelectedWeapons[n].arcOfFire.length; i++){
            var ocoord = oldSelectedWeapons[n].arcOfFire[i];
            hexagonGrid.setHexColor(ocoord.u,ocoord.v,'grey');

            // Remove corresponding labels
            hexagonGrid.addLabel(ocoord.u, ocoord.v, '');
          }
        }
      }

      if (typeof newSelectedWeapons !== 'undefined'){
        var strengthByCoordinates = {};

        for (n = 0; n < newSelectedWeapons.length; n++){
          for (i = 0; i < newSelectedWeapons[n].arcOfFire.length; i++){
            var ncoord = newSelectedWeapons[n].arcOfFire[i];
            hexagonGrid.setHexColor(ncoord.u,ncoord.v,'red');
            hexagonGrid.addLabel(ncoord.u,ncoord.v,newSelectedWeapons[n].strength);
            if([ncoord.u,ncoord.v] in strengthByCoordinates){
              strengthByCoordinates[[ncoord.u,ncoord.v]] += newSelectedWeapons[n].strength;
            } else {
              strengthByCoordinates[[ncoord.u,ncoord.v]] = newSelectedWeapons[n].strength;
            }
          }
        }
        for (var coordStrength in strengthByCoordinates){
          hexagonGrid.addLabel(coordStrength.split(',')[0],coordStrength.split(',')[1],strengthByCoordinates[coordStrength]);
        }
      }
    }, true);

    hexagonGrid.drawHexGrid(3, 500, 350);

    // Add space ship in the center
    hexagonGrid.addSprite(0, 0, 'images/space_ship_200x200.png');

    $scope.hexagonGrid = hexagonGrid;
  });
