'use strict;'

angular.module('formz.services').
service('fzXml', function() {
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

	function documentElement(node) {
		return node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement
	}

	function select(xmlDoc, xpath, namespaces) {
		var nsResolver;
		if(angular.isDefined(namespaces)) {
		 	nsResolver = function nsResolver(prefix) {
			  return namespaces[prefix] || null;
			}
		}
		else {
			nsResolver = document.createNSResolver(documentElement(xmlDoc));
		}

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
		'documentElement': documentElement,
		'select': select
	};
})