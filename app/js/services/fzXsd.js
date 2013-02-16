'use strict;'

angular.module('definitionsCenter.services').
service('fzXsd', ['fzXml', function(xml) {
	function parse(xmlDoc) {
		if(angular.isString(xmlDoc)) {
			xmlDoc = xml.parse(xmlDoc);
		}
		var rootElement = parseRootElement(xmlDoc);
		return {
			'rootElement': rootElement
		};
	}

	function getDocumentation(node) {
		var doc = xml.select(node, 'xs:annotation/xs:documentation');
		if( doc.length == 0 ) {
			return 'No help available.';
		}
		return doc[0].textContent;
	}

	function getLabel(node) {
		var label = node.getAttribute('ui:label');
		if(label !== null) return label;
		return node.getAttribute('name');
	}

	function getPlaceholder(node) {
		var placeholder = node.getAttribute('ui:placeholder');
		if(placeholder !== null) return placeholder;
		return '';	
	}

	function parseRootElement(xmlDoc) {
		var rootNode = xml.select(xmlDoc, '/xs:schema/xs:element');
		if(rootNode.length == 0) {
			throw new Error("xsd service: Could not find a root element definition on this Xml Schema.");
		}
		rootNode = rootNode[0];

		var rootElement = {
			name: rootNode.getAttribute('name'),
			label: getLabel(rootNode),
			documentation: getDocumentation(rootNode),
			placeholder: getPlaceholder(rootNode)
		};
		return rootElement;
	}

	return {
		'parse': parse
	}
}]);
