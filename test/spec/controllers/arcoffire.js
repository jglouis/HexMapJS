'use strict';

describe('Controller: ArcoffireCtrl', function () {

  // load the controller's module
  beforeEach(module('hexMapJS'));

  var ArcoffireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArcoffireCtrl = $controller('ArcoffireCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArcoffireCtrl.awesomeThings.length).toBe(3);
  });
});
