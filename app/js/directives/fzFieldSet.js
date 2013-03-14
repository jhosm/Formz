'use strict';

angular.module('formz.directives').
directive('fzFieldset', function fzFieldFactory() {
  
  return {
    restrict: 'EA',
    replace: true,
    controller: ['$scope', 'fzLocalization', function fzFieldSetCtrl($scope, fzLocalization) {
      $scope.locales = fzLocalization;
    }],
    scope: {
      data: '='
    },
    templateUrl: 'partials/directives/fzFieldSet.html'
  };
});