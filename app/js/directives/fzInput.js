'use strict';

angular.module('formz.directives').
directive('fzInput', function fzInputFactory() {
  
  return {
    restrict: 'EA',
    replace: true,
    controller: ['$scope', 'fzLocalization', function fzInputCtrl($scope, fzLocalization) {
      $scope.locales = fzLocalization;
    }],
    scope: {
      label: '@label',
      placeholder: '@placeholder',
      documentation: '@documentation',
      value: '=fzValue'
    },
    templateUrl: 'partials/directives/fzInput.html'
  };
});