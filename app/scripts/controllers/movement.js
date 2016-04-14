'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:MovementCtrl
 * @description
 * # MovementCtrl
 * Controller of the hexMapJsApp
 */
angular.module('hexMapJsApp')
  .controller('MovementCtrl', function ($scope) {

    // Create hexagon grid
    var hexagonGrid = new HexagonGrid('MovementHexCanvas', 50);
    hexagonGrid.drawHexGrid(10, 500, 600);

    // Add space ship in the center
    hexagonGrid.addSprite(0, 0, 'images/space_ship_200x200.png');

    // Hardcoded ship characteristics
    // var current_position = {u: 0, v: 0};
    var foreseenDestination = {u: -3, v: 0};
    // var orientation = {u: -1, v: 0};
    var manoeuvrability = 2;

    // Compute allowed destinations
    var allowedDestinations = [];
    for (var allowedU = foreseenDestination.u - manoeuvrability; allowedU <= foreseenDestination.u + manoeuvrability; allowedU++) {
      for (var allowedV = foreseenDestination.v - manoeuvrability; allowedV <= foreseenDestination.v + manoeuvrability; allowedV++) {
        var allowedDestination = {u: allowedU, v: allowedV};
        if (hexagonGrid.Distance(foreseenDestination, allowedDestination) > manoeuvrability){
          continue;
        }
        allowedDestinations.push(allowedDestination);
      }
    }
    for (var i = 0; i < allowedDestinations.length; i++){
      hexagonGrid.setHexColor(allowedDestinations[i].u, allowedDestinations[i].v, 'green');
    }

    $scope.hexagonGrid = hexagonGrid;
  });
