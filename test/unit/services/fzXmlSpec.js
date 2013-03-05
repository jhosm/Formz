'use strict';

describe('service', function() {
	var sampleXml = '<?xml version="1.0" encoding="utf-8"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="urn:bancobpi.pt/papiro/model/definition"/>';

	beforeEach(module('formz.services'));

	describe('The xml parser', function() {
		it('should parse and load a xml document from a string', inject(function(fzXml) {
			var loadedSampleXml = fzXml.parse(sampleXml);
			expect(loadedSampleXml).not.toBe(null);
		}));

		it('should serialize a xml document into a string', inject(function(fzXml) {
			var loadedSampleXml = fzXml.parse(sampleXml);
			expect(fzXml.toString(loadedSampleXml)).toEqual(sampleXml);
		}));

		it('should select nodes based on a xpath', inject(function(fzXml) {
			var loadedSampleXml = fzXml.parse(sampleXml);
			expect(fzXml.select(loadedSampleXml, '/xs:schema')[0].nodeName).toEqual('xs:schema');
		}));

		it('should select nodes based on a xpath, and the given namespace mappings', inject(function(fzXml) {
			var xmlWithNamespaces = '<?xml version="1.0" encoding="utf-8"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ui="urn:myui.pt"><ui:info>hello</ui:info></xs:schema>';

			var loadedSampleXml = fzXml.parse(xmlWithNamespaces);

			var selectedZeroNodes = fzXml.select(loadedSampleXml, '/xs:schema/ui:info', {
				'xs': 'http://www.w3.org/2001/XMLSchema',
				'ui': 'wrongnamespace'
			});
			expect(selectedZeroNodes.length).toBe(0);

			var selectedOneNode = fzXml.select(loadedSampleXml, '/xs:schema/ui:info', {
				'xs': 'http://www.w3.org/2001/XMLSchema',
				'ui': 'urn:myui.pt'
			});
			expect(selectedOneNode.length).toBe(1);
			expect(selectedOneNode[0].textContent).toBe('hello');
		}));
	});
});