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
    'ngRoute',
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
      .when('/arcoffire', {
        templateUrl: 'views/arcoffire.html',
        controller: 'ArcoffireCtrl',
        controllerAs: 'arcoffire'
      })
      .when('/movement', {
        templateUrl: 'views/movement.html',
        controller: 'MovementCtrl',
        controllerAs: 'movement'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  // Change navbar active status on click
  $('.nav.navbar-nav > li').on('click', function() {
    $('.nav.navbar-nav > li').removeClass('active');
    $(this).addClass('active');
  });
