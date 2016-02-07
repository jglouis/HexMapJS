'use strict';

/**
 * @ngdoc function
 * @name learningAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the learningAngularJsApp
 */
 angular.module('hexMapApp')
   .controller('MainCtrl', function ($scope, localStorageService) {

     var todosInStore = localStorageService.get('todos');

     $scope.todos = todosInStore || [];

     $scope.$watch('todos', function(){
       localStorageService.set('todos', $scope.todos);
     }, true);

     $scope.addTodo = function () {
       $scope.todos.push({name: $scope.todoName});
       $scope.todoName = '';
     };
     $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
   });
