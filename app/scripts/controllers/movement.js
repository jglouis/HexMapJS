'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:MovementCtrl
 * @description
 * # MovementCtrl
 * Controller of the hexMapJsApp
 */

 var displayAllowedDestinations = function (hexagonGrid, manoeuvrability, foreseenDestination){
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
 };

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
    $scope.manoeuvrability = 2;
    $scope.movementVector = {u: -3, v: 0};

    $scope.$watch('manoeuvrability', function(){
      console.log('New manoeuvrability:', $scope.manoeuvrability);
      hexagonGrid.setAllHexColor('grey');
      displayAllowedDestinations(
        hexagonGrid,
        parseInt($scope.manoeuvrability, 0),
        foreseenDestination);
      hexagonGrid.updateStage();
    }, true);

    $scope.$watch('movementVector', function(){
      console.log('New movement vector:', $scope.movementVector.u, $scope.movementVector.v);
      hexagonGrid.addVector('movement', 0, 0, $scope.movementVector.u, $scope.movementVector.v);
      hexagonGrid.updateStage();
    }, true);

    hexagonGrid.updateStage();

    $scope.hexagonGrid = hexagonGrid;
  });
