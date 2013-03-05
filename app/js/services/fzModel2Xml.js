'use strict;'

angular.module('formz.services').
service('fzModel2Xml', function() {
	function toString(xsdModel) {
		return addChild('', xsdModel.rootElement, xsdModel.namespace);
	}

	function addChild(xmlString, element, namespace) {
		
		var attributes = _.filter(element.children, function(child) { return /^@/.test(child.name) });
		var elements = _.difference(element.children, attributes); 

		xmlString = append(xmlString, '<' + element.name);

		if(namespace !== null && namespace !== undefined) xmlString = append(xmlString, ' xmlns="' + namespace + '"');

		if(attributes.length === 0) xmlString += '>';

		xmlString += _.reduce(attributes, function(memo, child) {
			return memo + " " + child.name.substring(1) + '="' + child.value + '"';
		}, '');
		
		if(attributes.length > 0) xmlString += '>';
		if(angular.isDefined(element.value)) xmlString = append(xmlString, element.value);
		
		_.each(elements, function(element) {
			xmlString = addChild(xmlString, element);
		});

		xmlString = append(xmlString, '</' + element.name + '>');

		return xmlString;
	}

	function append(string, toAppend) {
		string += toAppend;
		return string;
	}

	return {
		'toString': toString
	};
});