'use strict';

/* Filters */

angular.module('formz.filters', []).
filter('asXml', ['fzModel2Xml', function(fzModel2Xml) {
	return function(xmlSchema) {
		return fzModel2Xml.toString(xmlSchema);
	}
}]);