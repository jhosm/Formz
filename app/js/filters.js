'use strict';

/* Filters */

angular.module('definitionsCenter.filters', []).
filter('asXml', ['xsd2xml', function(xsd2xml) {
	return function(xmlSchema) {
		return xsd2xml.toString(xmlSchema);
	}
}]);