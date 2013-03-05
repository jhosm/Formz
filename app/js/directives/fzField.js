'use strict';

angular.module('formz.directives').
directive('fzField', function fzFieldFactory() {
  
  return {
    restrict: 'EA',
    replace: true,
    controller: ['$scope', 'fzLocalization', function fzFieldCtrl($scope, fzLocalization) {
      $scope.locales = fzLocalization;
    }],
    scope: {
      label: '@label',
      placeholder: '@placeholder',
      documentation: '@documentation',
      value: '=ngModel'
    },
    templateUrl: 'partials/directives/fzField.html'
  };
});