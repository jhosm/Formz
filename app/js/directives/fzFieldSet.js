'use strict';

angular.module('formz.directives').
directive('fzFieldSet', function fzFieldFactory() {
  
  return {
    restrict: 'EA',
    replace: true,
    controller: ['$scope', 'fzLocalization', function fzFieldSetCtrl($scope, fzLocalization) {
      $scope.locales = fzLocalization;
    }],
    scope: {
      model: '=ngModel'
    },
    templateUrl: 'partials/directives/fzFieldSet.html'
  };
});