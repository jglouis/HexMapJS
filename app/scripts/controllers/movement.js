'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:MovementCtrl
 * @description
 * # MovementCtrl
 * Controller of the hexMapJsApp
 */

var shipImage = 'images/space_ship_200x200.png';
var allowedDestinations = [];
var displayAllowedDestinations = function (hexagonGrid, manoeuvrability, maxSpeed, foreseenDestination){
   hexagonGrid.setAllHexColor('grey');
   // Compute allowed destinations
   allowedDestinations = [];
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

    // Hardcoded ship characteristics
    // var current_position = {u: 0, v: 0};
    // var orientation = {u: -1, v: 0};
    $scope.maxSpeed = 3;
    $scope.manoeuvrability = 2;
    $scope.movementVector = {u: 0, v: -3};

    // Create hexagon grid
    var hexagonGrid = new HexagonGrid('MovementHexCanvas', 50);
    var onHexClick = function(e){
      var uv = hexagonGrid.pixelToHex(e.stageX, e.stageY);
      // Check if clicked hex is in allowed destinations
      for(var i = 0; i < allowedDestinations.length; i++){
        if(allowedDestinations[i].u === uv[0] && allowedDestinations[i].v === uv[1]){
          console.log('allowed destination');
          hexagonGrid.addSprite('shipNewPos', uv[0], uv[1], shipImage);
          console.log('movementVector', $scope.movementVector);
          hexagonGrid.addVector(
            'newMovement',
            uv[0],
            uv[1],
            2 * uv[0],
            2 * uv[1],
            'orange');
          hexagonGrid.updateStage();
          break;
        }
      }
    };
    hexagonGrid.drawHexGrid(10, 500, 600, onHexClick);

    // Add space ship in the center
    hexagonGrid.addSprite('ship', 0, 0, shipImage);

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
