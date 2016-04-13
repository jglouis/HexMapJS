'use strict';

describe('Controller: HexmapCtrl', function () {

  // load the controller's module
  beforeEach(module('hexMapJsApp'));

  var HexmapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HexmapCtrl = $controller('HexmapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
