(function() {
	'use strict';

	angular.module('formz.services').
	service('fzXsd', ['fzXml', function(xml) {

		// namespaces used to select nodes in the given xml.
		//<a id="xsdNamespaces"></a>
		var xsdNamespaces = {
			'xs': 'http://www.w3.org/2001/XMLSchema',
			'ui': 'http://formz.com/UI'
		};

		//selects nodes based on a xpath, namespacing it with [xsdNamespaces](#xsdNamespaces).

		function select(node, xpath) {
			return xml.select(node, xpath, xsdNamespaces);
		}

		//selects one node based on a xpath, namespacing it with [xsdNamespaces](#xsdNamespaces).

		function selectOne(node, xpath) {
			return xml.selectOne(node, xpath, xsdNamespaces);
		}

		function getReference(node, xpath) {
			var documentElement = xml.documentElement(node);
			var reference = selectOne(documentElement, xpath);
			return reference;
		}

		function parse(xmlDoc) {
			if (angular.isString(xmlDoc)) {
				xmlDoc = xml.parse(xmlDoc);
			}
			var rootElement = parseRootElement(xmlDoc);

			var schema = select(xmlDoc, 'xs:schema')[0];

			return {
				'namespace': schema.getAttribute('targetNamespace'),
				'rootElement': rootElement
			};
		}

		function getUiInfo(node) {
			return selectOne(node, 'xs:annotation/xs:appinfo/ui:info');
		}

		function getLabel(node, defaultLabel) {
			if (angular.isUndefined(defaultLabel)) defaultLabel = '';

			var uiInfoNode = getUiInfo(node);
			if (uiInfoNode === null) return defaultLabel;

			var label = uiInfoNode.getAttribute('label');
			if (label !== null) return label;
			return defaultLabel;
		}

		function getPlaceholder(node) {
			var uiInfoNode = getUiInfo(node);
			if (uiInfoNode === null) return '';

			var placeholder = uiInfoNode.getAttribute('placeholder');
			if (placeholder !== null) return placeholder;
			return '';
		}

		function getDocumentation(node) {
			var doc = xml.selectOne(node, 'xs:annotation/xs:documentation');
			if (doc === null) {
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

		function parseAttribute(attrNode) {
			var parsedAttribute = {
				name: '@' + attrNode.getAttribute('name')
			};

			var use = attrNode.getAttribute('use');
			if (use === null || use === 'optional') {
				parsedAttribute.required = false;
			} else {
				parsedAttribute.required = true;
			}

			var attrType = getType(attrNode);
			if (attrType !== null) {
				if (typeof attrType === 'string') {
					parsedAttribute = parseXsdType(parsedAttribute, attrType);
				} else {
					parsedAttribute = parseType(parsedAttribute, attrType);
				}
			}

			return parseUiInfo(parsedAttribute, attrNode);
		}

		function parseAttributes(model, node) {
			var attributes = xml.select(node, 'xs:attribute');
			if (attributes.length === 0) return model;

			var parsedAttributes = _.map(attributes, function(attr) {
				return parseAttribute(attr);
			});
			model.children = _.union(model.children, parsedAttributes);
			return model;
		}

		function parseAttributeGroup(model, node) {
			var attributeGroupRef = xml.selectOne(node, 'xs:attributeGroup/@ref');
			if (attributeGroupRef === null) return model;

			var attributeGroup = getReference(node, '//xs:attributeGroup[@name="' + attributeGroupRef.value + '"]');
			if (attributeGroup === null) {
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
			if (extension === null) return model;

			model = parseContent(model, extension);

			var nodeComplexType = getType(extension);
			if (nodeComplexType !== null) {
				model = parseComplexContent(model, nodeComplexType);
				model = parseContent(model, nodeComplexType);

				return model;
			}

			return model;
		}

		function parseRestrictions(model, node) {
			var restriction = xml.selectOne(node, 'xs:restriction');
			if (restriction === null) return model;

			if (model.restrictions === undefined) model.restrictions = {};
			model.restrictions.minLength = parseInt(xml.getValue(restriction, 'xs:minLength/@value', 0), 10);

			return model;
		}

		function parseType(model, typeNode) {
			model = parseUiInfo(model, typeNode);

			if (typeNode.localName === 'complexType') {
				model = parseComplexContent(model, typeNode);
				model = parseContent(model, typeNode);
			} else {
				model = parseRestrictions(model, typeNode);
			}

			return model;
		}

		function setStringType(model) {
			model.type = 'string';
			model.restrictions = {};
			model.restrictions.minLength = 0;
			return model;
		}

		function parseXsdType(model, xsdType) {
			if(xsdType === 'xs:string')
					return setStringType(model);
			else {
					throw new Error('xsd service: Could not parse a standard type names "' + xsdType + '".');
			}
		}

		function getType(node) {
			var typeName = node.getAttribute('type');
			if (typeName === null) typeName = node.getAttribute('base');
			if (typeName === null) return null;
			if (/^xs:/.test(typeName)) return typeName;

			var result = getReference(node, '//xs:complexType[@name="' + typeName + '"] | //xs:simpleType[@name="' + typeName + '"]');
			if (result === null) {
				throw new Error('xsd service: Could not find a referenced type named "' + typeName + '".');
			}

			return result;
		}

		function parseRootElement(xmlDoc) {
			var rootNode = xml.selectOne(xmlDoc, '/xs:schema/xs:element');
			if (rootNode === null) {
				throw new Error('xsd service: Could not find a root element definition on this Xml Schema.');
			}

			// name acts as default label
			var rootElement = {
				name: rootNode.getAttribute('name'),
				children: []
			};

			var rootType = getType(rootNode);
			if (rootType !== null) {
				if (typeof rootType === 'string') {
					rootElement = parseXsdType(rootElement, rootType);
				} else {
					return parseType(rootElement, rootType);
				}
			}

			rootElement = parseUiInfo(rootElement, rootNode);
			rootElement = parseContent(rootElement, rootNode);

			return rootElement;
		}

		return {
			'parse': parse
		};
	}]);
}());