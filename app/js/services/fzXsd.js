'use strict;'

angular.module('formz.services').
service('fzXsd', ['fzXml', function(xml) {
	function select(node, xpath) {
		return xml.select(node, xpath, {
			'xs': 'http://www.w3.org/2001/XMLSchema',
			'ui': 'http://formz.com/UI'
		});
	}

	function parse(xmlDoc) {
		if(angular.isString(xmlDoc)) {
			xmlDoc = xml.parse(xmlDoc);
		}
		var rootElement = parseRootElement(xmlDoc);

		var schema = select(xmlDoc, 'xs:schema')[0];
		
		return {
			'namespace': schema.getAttribute('targetNamespace') ,
			'rootElement': rootElement
		};
	}

	function getUiInfo(node) {
		var uiInfoNode = select(node, 'xs:annotation/xs:appinfo/ui:info');
		if(uiInfoNode.length === 0) {
			return null;
		}
		return uiInfoNode[0];
	}

	function getLabel(node, defaultLabel) {
		if(angular.isUndefined(defaultLabel)) defaultLabel = '';

		var uiInfoNode = getUiInfo(node);
		if(uiInfoNode === null) return defaultLabel;

		var label = uiInfoNode.getAttribute('label');
		if(label !== null) return label;
		return defaultLabel;
	}

	function getPlaceholder(node) {
		var uiInfoNode = getUiInfo(node);
		if(uiInfoNode === null) return '';

		var placeholder = uiInfoNode.getAttribute('placeholder');
		if(placeholder !== null) return placeholder;
		return '';
	}

	function getDocumentation(node) {
		var doc = xml.select(node, 'xs:annotation/xs:documentation');
		if(doc.length === 0) {
			return '.no-help';
		}
		return doc[0].textContent;
	}

	function parseUiInfo(model, node) {
		model.label = getLabel(node, model.name);
		model.documentation = getDocumentation(node);
		model.placeholder = getPlaceholder(node);

		return model;
	}

	function parseAttributes(model, node) {
		var attributes = xml.select(node, 'xs:attribute');
		if(attributes.length == 0) return model;

		var parsedAttributes = _.map(attributes, function(attr) {
			var parsedAttribute = { name: '@' + attr.getAttribute('name') };
			return parseUiInfo(parsedAttribute, attr);
		});
		model.children = _.union(model.children, parsedAttributes);
		return model;
	}

	function getComplexType(node) {
		var type = node.getAttribute('type');
		if(type === null) return null;
		if(/^xs:/.test(type)) return null;

		var documentElement = xml.documentElement(node);
		var complexType = select(documentElement, '//xs:complexType[@name="' + type + '"]');
		if(complexType.length === 0) {
			throw new Error('xsd service: Could not find a referenced type named "' + type + '".');
		}

		return complexType[0];
	}

	function parseComplexType(model, complexTypeNode) {
		model = parseUiInfo(model, complexTypeNode);
		model = parseAttributes(model, complexTypeNode);

		return model;
	}

	function parseRootElement(xmlDoc) {
		var rootNode = xml.select(xmlDoc, '/xs:schema/xs:element');
		if(rootNode.length === 0) {
			throw new Error('xsd service: Could not find a root element definition on this Xml Schema.');
		}
		rootNode = rootNode[0];

		// name acts as default label
		var rootElement = {
			name: rootNode.getAttribute('name'),
			children: []
		};

		var rootNodeComplexType = getComplexType(rootNode);
		if(rootNodeComplexType !== null) {
			return parseComplexType(rootElement, rootNodeComplexType);
		}

		rootElement = parseUiInfo(rootElement, rootNode);

		return rootElement;
	}

	return {
		'parse': parse
	}
}]);