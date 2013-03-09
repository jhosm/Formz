'use strict;'

angular.module('formz.services').
service('fzModel2Xml', function() {
	function toString(xsdModel) {
		if(angular.isUndefined(xsdModel) || xsdModel === null) return '';
		return addChild('', xsdModel.rootElement, xsdModel.namespace);
	}

	function addChild(xmlString, element, namespace) {
		
		var attributes = _.filter(element.children, function(child) { return /^@/.test(child.name) });
		var elements = _.difference(element.children, attributes); 

		// open starting tag. I thought about extracting this out, but I found it harder to read...
		xmlString = append(xmlString, '<' + element.name);

		xmlString = addNamespace(xmlString, namespace);

		xmlString = addAttributes(xmlString, attributes);
		
		// close starting tag
		xmlString += '>';

		xmlString = addElementValue(xmlString, element.value);
		
		xmlString = addElements(xmlString, elements);

		// close ending tag
		xmlString = append(xmlString, '</' + element.name + '>');

		return xmlString;
	}

	function addNamespace(xmlString, namespace) {
		if(namespace !== null && namespace !== undefined) xmlString = append(xmlString, ' xmlns="' + namespace + '"');
		return xmlString;
	}

	function addElements(xmlString, elements) {
		xmlString = _.reduce(elements, function(memo, element) {
			return addChild(memo, element);
		}, xmlString);

		return xmlString;
	}

	function addElementValue(xmlString, value) {
		if(angular.isDefined(value) && value !== null) xmlString = append(xmlString, value);

		return xmlString;
	}

	function addAttributes(xmlString, attributes) {
		xmlString += _.reduce(attributes, function(memo, child) {
			var result = memo + " " + child.name.substring(1) + '="';
			if(angular.isDefined(child.value) && child.value !== null) result += child.value;
			return result + '"';
		}, '');
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