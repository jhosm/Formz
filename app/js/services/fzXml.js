'use strict;'

angular.module('definitionsCenter.services').
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