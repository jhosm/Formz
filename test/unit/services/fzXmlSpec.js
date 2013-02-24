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
	});
});