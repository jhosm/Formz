'use strict';

/* Directives */


angular.module('definitionsCenter.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);