'use strict';

/**
 * @ngdoc overview
 * @name hexmapjs
 * @description
 * # hexmapjs
 *
 * Main module of the application.
 */
angular
  .module('hexMapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'isteven-multi-select'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/hexmap.html',
        controller: 'HexmapCtrl',
        controllerAs: 'hexmap'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/hexmap', {
        templateUrl: 'views/hexmap.html',
        controller: 'HexmapCtrl',
        controllerAs: 'hexmap'
      })
      .when('/arcoffire', {
        templateUrl: 'views/arcoffire.html',
        controller: 'ArcoffireCtrl',
        controllerAs: 'arcoffire'
      })
      .otherwise({
        redirectTo: '/hexmap'
      });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]);
