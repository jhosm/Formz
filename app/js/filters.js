'use strict';

/* Filters */

angular.module('definitionsCenter.filters', []).
filter('asXml', ['fzModel2Xml', function(fzModel2Xml) {
	return function(xmlSchema) {
		return fzModel2Xml.toString(xmlSchema);
	}
}]);