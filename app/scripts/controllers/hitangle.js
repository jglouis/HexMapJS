'use strict';

/**
 * @ngdoc function
 * @name hexMapJsApp.controller:HitangleCtrl
 * @description
 * # HitangleCtrl
 * Controller of the hexMapJsApp
 */
angular.module('hexMapJsApp')
    .controller('HitangleCtrl', function ($scope) {
        var hexagonGrid = new HexagonGrid('HitAngleHexCanvas', 50);
        hexagonGrid.drawHexGrid(3, 500, 350);
        var u, v;
        // Front
        for (u = 0; u >= -2; u--) {
            for (v = -1; v >= -3; v--) {
                hexagonGrid.setHexColor(u - v - 1, v, 'green');
                hexagonGrid.addLabel(u - v - 1, v, 'Front', 'white', '30px Arial', { x: -20, y: 0 });
            }
        }
        // Rear
        for (u = 0; u < 3; u++) {
            for (v = 0; v < 3; v++) {
                hexagonGrid.setHexColor(u + v - 2, 3 - v, 'yellow');
                hexagonGrid.addLabel(u + v - 2, 3 - v, 'Rear', 'black', '30px Arial', { x: -20, y: 0 });
            }
        }
        // Left 
        for (u = -3; u <= -1; u++) {
            for (v = 0; v <= 3 - (u + 3); v++) {
                hexagonGrid.setHexColor(u, v, 'red');
                hexagonGrid.addLabel(u, v, 'Left', 'white', '30px Arial', { x: -20, y: 0 });
            }
        }
        // Right 
        for (u = 1; u <= 3; u++) {
            for (v = -u; v <= 0; v++) {
                hexagonGrid.setHexColor(u, v, 'blue');
                hexagonGrid.addLabel(u, v, 'Right', 'white', '30px Arial', { x: -20, y: 0 });
            }
        }

        // Add space ship in the center
        hexagonGrid.addSprite('ship', 0, 0, 'images/space_ship_200x200.png');

        hexagonGrid.updateStage();

        $scope.hexagonGrid = hexagonGrid;
    });
