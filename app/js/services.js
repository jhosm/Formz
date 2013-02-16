'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var service = angular.module('definitionsCenter.services', []);

service.value('version', '0.1');

service.factory('xml', function() {
	function parse(xmlDocStr) {
		var xmlDoc;
		if(window.DOMParser) {
			var parser = new window.DOMParser();
			xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
		} else {
			// IE :(
			if(xmlDocStr.indexOf("<?") == 0) {
				xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
			}
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	}

	function toString(xmlDoc) {
		if(window.DOMParser) {
			// Gecko- and Webkit-based browsers (Firefox, Chrome), Opera.
			return new XMLSerializer().serializeToString(xmlDoc);
		} else {
			return xmlDoc.xml;
		}
	}

	function select(xmlDoc, xpath) {
		var nsResolver = document.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
		var xpathResult = document.evaluate(xpath, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);

		var result = [];
		var currentNode = xpathResult.iterateNext();
		while(currentNode) {
			result.push(currentNode);
			currentNode = xpathResult.iterateNext();
		}

		return result;
	}

	return {
		'parse': parse,
		'toString': toString,
		'select': select
	};
})

service.factory('xsd', ['xml', function(xml) {
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

service.factory('xsd2xml', function() {
	function toString(xsdModel) {
		return '<' + xsdModel.rootElement.name + '>' + xsdModel.rootElement.value + '</' + xsdModel.rootElement.name + '>';
	}

	return {
		'toString': toString
	};
});