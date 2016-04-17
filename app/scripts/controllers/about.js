'use strict';

/**
 * @ngdoc function
 * @name learningAngularJsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the learningAngularJsApp
 */
angular.module('hexMapJsApp')
  .controller('AboutCtrl', function () {
    // Set active Tab
    $('.nav.navbar-nav > li').removeClass('active');
    $('#aboutTab').addClass('active');
  });
