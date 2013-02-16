'use strict;'

angular.module('definitionsCenter.services').
service('fzModel2Xml', function() {
	function toString(xsdModel) {
		return '<' + xsdModel.rootElement.name + '>' + xsdModel.rootElement.value + '</' + xsdModel.rootElement.name + '>';
	}

	return {
		'toString': toString
	};
});