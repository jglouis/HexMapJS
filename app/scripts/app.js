'use strict';

/**
 * @ngdoc overview
 * @name hexMapJS
 * @description
 * # hexMapJS
 *
 * Main module of the application.
 */
angular
  .module('hexMapJsApp', [
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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
      .when('/arcoffire', {
        templateUrl: 'views/arcoffire.html',
        controller: 'ArcoffireCtrl',
        controllerAs: 'arcoffire'
      })
      .when('/arcoffire', {
        templateUrl: 'views/arcoffire.html',
        controller: 'ArcoffireCtrl',
        controllerAs: 'arcoffire'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]);
