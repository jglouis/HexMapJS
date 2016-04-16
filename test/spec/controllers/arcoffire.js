'use strict';

describe('Controller: ArcoffireCtrl', function () {

  // load the controller's module
  beforeEach(module('hexMapJsApp'));

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
});
