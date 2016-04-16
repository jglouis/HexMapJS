'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('hexMapJsApp'));

  var MainCtrl,
    scope,
    hexagonGrid;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    // append a canvas to test hexmap.js
    $('body').append('<canvas id="Canvas" "></canvas>');
    hexagonGrid = new HexagonGrid('Canvas', 50);
    hexagonGrid.drawHexGrid(10, 500, 600);
  }));

  it('should compute distance between hexes', function () {
    expect(hexagonGrid.Distance({u: 0, v:0},{u: 0, v:0})).toBe(0);
    expect(hexagonGrid.Distance({u: 0, v:0},{u: 0, v: 1})).toBe(1);
    expect(hexagonGrid.Distance({u: 3, v:0},{u: -3, v: 2})).toBe(6);
  });

  it('should verify hex to pixel and pixel to hex to be inverse', function () {
    var hexCoordinates = [
      {u: 0, v:0},
      {u: 0, v: 1},
      {u: -3, v: -1},
      {u: 3, v: -1}
    ];
    for (var i = 0; i < hexCoordinates.length; i++){
      var pixel = hexagonGrid.hexToPixel(hexCoordinates[i].u, hexCoordinates[i].v);
      var computedHexCoordinate = hexagonGrid.pixelToHex(pixel[0], pixel[1]);
      expect(hexCoordinates[i].u).toBe(computedHexCoordinate[0]);
      expect(hexCoordinates[i].v).toBe(computedHexCoordinate[1]);
    }
  });

  it('should add a vector when none exists, then add a vector with same id', function() {
    hexagonGrid.addVector('test', 0, 1, 2, 3);
    hexagonGrid.addVector('test', 3, 2, 1, 0);
    expect(Object.keys(hexagonGrid.vectorsById).length).toBe(1);
  });

  it('should add two vectors with different ids', function() {
    hexagonGrid.addVector('test1', 0, 1, 2, 3);
    hexagonGrid.addVector('test2', 3, 2, 1, 0);
    expect(Object.keys(hexagonGrid.vectorsById).length).toBe(2);
  });
});
