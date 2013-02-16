'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	var sampleXml = '<?xml version="1.0" encoding="utf-8"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="urn:bancobpi.pt/papiro/model/definition"/>';

	beforeEach(module('definitionsCenter.services'));


	describe('version', function() {
		it('should return current version', inject(function(version) {
			expect(version).toEqual('0.1');
		}));
	});

	describe('The xml parser', function() {
		it('should parse and load a xml document from a string', inject(function(xml) {
			var loadedSampleXml = xml.parse(sampleXml);
			expect(loadedSampleXml).not.toBe(null);
		}));

		it('should serialize a xml document into a string', inject(function(xml) {
			var loadedSampleXml = xml.parse(sampleXml);
			expect(xml.toString(loadedSampleXml)).toEqual(sampleXml);
		}));

		it('should select nodes based on a xpath', inject(function(xml) {
			var loadedSampleXml = xml.parse(sampleXml);
			expect(xml.select(loadedSampleXml, '/xs:schema')[0].nodeName).toEqual('xs:schema');
		}));
	});

	describe('The xml schema parser', function() {

		it('should parse a simple element with all the basic info', inject(function(xsd) {
			var parsedSchema = xsd.parse(xsd_simpleElement);

			expect(parsedSchema.rootElement.name).toEqual('person');
			expect(parsedSchema.rootElement.label).toEqual('Pessoa');
			expect(parsedSchema.rootElement.documentation).toEqual('Humano');
			expect(parsedSchema.rootElement.placeholder).toEqual('Nome da Pessoa');
		}));

		it('should set a default documentation message when none is available', inject(function(xsd) {
			var parsedSchema = xsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.documentation).toEqual('No help available.');
		}));

		it("should set the name of the element as it's label if none is specified ", inject(function(xsd) {
			var parsedSchema = xsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.label).toEqual('person');
		}));

		it("should define an empty placeholder when the element doesn't have one", inject(function(xsd) {
			var parsedSchema = xsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.placeholder).toEqual('');
		}));

		it("should give a clear explanation when it doesn't find a root element", inject(function(xsd) {
			var noRootElement = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>';

			expect(function() {
				xsd.parse(noRootElement)
			}).toThrow();

		}));
	});

	describe('The xsd -> xml serializer', function() {
		it('should serialize an xsd javascript structure into an xml instance string', inject(function(xsd2xml) {
			var xmlSchema = {
				rootElement: {
					name: 'person',
					value: 'Little John'
				}
			};

			expect(xsd2xml.toString(xmlSchema)).toEqual("<person>Little John</person>");
		}));
	});
});