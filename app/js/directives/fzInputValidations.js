//[Why do we need this directives?](https://www.google.pt/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&ved=0CFQQFjAD&url=https%3A%2F%2Fgroups.google.com%2Fd%2Fmsg%2Fangular%2FX1DD7jsdScE%2F2hDQ6APqVTYJ&ei=uR5WUczHMY2h7AaMroHwCA&usg=AFQjCNFbl24_GEMfth5aqv8qgw4kEVlrWw&sig2=g5fHlIqywXJXXrZHjoZ-4w&bvm=bv.44442042,d.ZGU)
'use strict';

var formzDirectives = angular.module('formz.directives');

// Directive - fzMinlength
//------------------------
formzDirectives.directive('fzMinlength', function fzMinlengthFactory() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
    	var minlength =  scope.$eval(attrs.fzMinlength);
      ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue.length >= minlength) {
          // it is valid
          ctrl.$setValidity('minlength', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('minlength', false);
          return undefined;
        }
      });
    }
  };
});