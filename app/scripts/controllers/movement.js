'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:MovementCtrl
 * @description
 * # MovementCtrl
 * Controller of the hexMapJsApp
 */

 var displayAllowedDestinations = function (hexagonGrid, manoeuvrability, maxSpeed, foreseenDestination){
   hexagonGrid.setAllHexColor('grey');
   // Compute allowed destinations
   var allowedDestinations = [];
   for (var allowedU = foreseenDestination.u - manoeuvrability; allowedU <= foreseenDestination.u + manoeuvrability; allowedU++) {
     for (var allowedV = foreseenDestination.v - manoeuvrability; allowedV <= foreseenDestination.v + manoeuvrability; allowedV++) {
       var allowedDestination = {u: allowedU, v: allowedV};
       // manoeuvrability
       if (hexagonGrid.Distance(foreseenDestination, allowedDestination) > manoeuvrability){
         continue;
       }
       // max speed
       if (hexagonGrid.Distance({u:0, v:0}, allowedDestination) > maxSpeed){
         continue;
       }
       allowedDestinations.push(allowedDestination);
     }
   }
   for (var i = 0; i < allowedDestinations.length; i++){
     hexagonGrid.setHexColor(allowedDestinations[i].u, allowedDestinations[i].v, 'green');
   }
 };

 var displayAxes = function(hexagonGrid) {
   hexagonGrid.addVector('U', 0, 0, 1, 0, 'red');
   hexagonGrid.addLabel(1, 0, 'U', 'red', 'bold 40px Arial', {x: 20, y: 0});
   hexagonGrid.addVector('V', 0, 0, 0, 1, 'blue');
   hexagonGrid.addLabel(0, 1, 'V', 'blue', 'bold 40px Arial', {x: -25, y: -8});
 };

angular.module('hexMapJsApp')
  .controller('MovementCtrl', function ($scope) {
    // Set active Tab
    $('.nav.navbar-nav > li').removeClass('active');
    $('#movementTab').addClass('active');

    // Create hexagon grid
    var hexagonGrid = new HexagonGrid('MovementHexCanvas', 50);
    hexagonGrid.drawHexGrid(10, 500, 600);

    // Add space ship in the center
    hexagonGrid.addSprite(0, 0, 'images/space_ship_200x200.png');

    // Hardcoded ship characteristics
    // var current_position = {u: 0, v: 0};
    // var orientation = {u: -1, v: 0};
    $scope.maxSpeed = 3;
    $scope.manoeuvrability = 2;
    $scope.movementVector = {u: 0, v: -3};

    $scope.$watch('[movementVector, maxSpeed, manoeuvrability]', function(){
      console.log('New movement vector:', $scope.movementVector.u, $scope.movementVector.v);
      hexagonGrid.addVector(
        'movement',
        0,
        0,
        $scope.movementVector.u,
        $scope.movementVector.v,
        'black',
        function(newVector){
          $scope.movementVector = newVector;
          displayAllowedDestinations(
            hexagonGrid,
            parseInt($scope.manoeuvrability, 0),
            parseInt($scope.maxSpeed, 0),
            $scope.movementVector);
        });
      displayAllowedDestinations(
        hexagonGrid,
        parseInt($scope.manoeuvrability, 0),
        parseInt($scope.maxSpeed, 0),
        $scope.movementVector);
      hexagonGrid.updateStage();
    }, true);

    displayAxes(hexagonGrid);

    hexagonGrid.updateStage();

    $scope.hexagonGrid = hexagonGrid;
  });
