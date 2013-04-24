(function() {
  'use strict';

  angular.module('formz.directives').
  directive('fzField', function fzFieldFactory() {
    return {
      restrict: 'EA',
      replace: true,
      controller: ['$scope', 'fzLocalization', function fzFieldCtrl($scope, fzLocalization) {
        $scope.locales = fzLocalization;
        $scope.$watch('data.value', function(newValue, oldValue) {
          if ($scope.fieldForm.input.$dirty && $scope.fieldForm.input.$invalid) {
            $scope.controlGroupClasses = 'error';
          } else {
            $scope.controlGroupClasses = '';
          }
        });
      }],
      scope: {
        data: '='
      },
      templateUrl: 'partials/directives/fzField.html'
    };
  });
}());