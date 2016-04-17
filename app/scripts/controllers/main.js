'use strict';

/**
 * @ngdoc function
 * @name learningAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the learningAngularJsApp
 */
 angular.module('hexMapJsApp')
   .controller('MainCtrl', function () {
     // Set active Tab
     $('.nav.navbar-nav > li').removeClass('active');
     $('#mainTab').addClass('active');
   });
