'use strict;'

angular.module('formz.services').
service('fzXsd', ['fzXml', function(xml) {
	var xsdNamespaces = {
			'xs': 'http://www.w3.org/2001/XMLSchema',
			'ui': 'http://formz.com/UI'
		};

	function select(node, xpath) {
		return xml.select(node, xpath, xsdNamespaces);
	}

	function selectOne(node, xpath) {
		return xml.selectOne(node, xpath, xsdNamespaces);
	}

	function getReference(node, xpath) {
		var documentElement = xml.documentElement(node);
		var reference = selectOne(documentElement, xpath);
		return reference;
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
		return selectOne(node, 'xs:annotation/xs:appinfo/ui:info');
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
		var doc = xml.selectOne(node, 'xs:annotation/xs:documentation');
		if(doc === null) {
			return '.no-help';
		}
		return doc.textContent;
	}

	function parseUiInfo(model, node) {
		model.label = getLabel(node, model.name);
		model.documentation = getDocumentation(node);
		model.placeholder = getPlaceholder(node);

		return model;
	}

	function parseAttributes(model, node) {
		var attributes = xml.select(node, 'xs:attribute');
		if(attributes.length === 0) return model;

		var parsedAttributes = _.map(attributes, function(attr) {
			var parsedAttribute = { name: '@' + attr.getAttribute('name') };
			return parseUiInfo(parsedAttribute, attr);
		});
		model.children = _.union(model.children, parsedAttributes);
		return model;
	}

	function parseAttributeGroup(model, node) {
		var attributeGroupRef = xml.selectOne(node, 'xs:attributeGroup/@ref');
		if(attributeGroupRef === null) return model;

		var attributeGroup = getReference(node, '//xs:attributeGroup[@name="' + attributeGroupRef.value + '"]');
		if(attributeGroup === null) {
			throw new Error('xsd service: Could not find a referenced attributeGroup named "' + attributeGroupRef.value + '".');
		}

		model = parseAttributes(model, attributeGroup);

		return model;
	}

	function parseContent(model, node) {
		model = parseAttributes(model, node);
		model = parseAttributeGroup(model, node);
		return model;
	}

	function parseComplexContent(model, node) {
		var extension = xml.selectOne(node, 'xs:complexContent/xs:extension');
		if(extension === null) return model;
		
		model = parseContent(model, extension);

		var nodeComplexType = getComplexType(extension);
		if(nodeComplexType !== null) {
			model = parseComplexContent(model, nodeComplexType);
			model = parseContent(model, nodeComplexType);
		
			return model;
		}

		return model;
	}

	function getComplexType(node) {
		var type = node.getAttribute('type');
		if(type === null) type = node.getAttribute('base');
		if(type === null) return null;
		if(/^xs:/.test(type)) return null;

		var complexType = getReference(node, '//xs:complexType[@name="' + type + '"]');
		if(complexType === null) {
			throw new Error('xsd service: Could not find a referenced type named "' + type + '".');
		}
		return complexType;
	}

	function parseComplexType(model, complexTypeNode) {
		model = parseUiInfo(model, complexTypeNode);
		model = parseComplexContent(model, complexTypeNode);
		model = parseContent(model, complexTypeNode);
		
		return model;
	}

	function parseRootElement(xmlDoc) {
		var rootNode = xml.selectOne(xmlDoc, '/xs:schema/xs:element');
		if(rootNode === null) {
			throw new Error('xsd service: Could not find a root element definition on this Xml Schema.');
		}

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
		rootElement = parseContent(rootElement, rootNode);

		return rootElement;
	}

	return {
		'parse': parse
	}
}]);