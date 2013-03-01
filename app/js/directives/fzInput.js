'use strict';

angular.module('formz.directives').
directive('fzinput', function fzInputFactory() {
  
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'partials/directives/fzInput.html'
  };
});