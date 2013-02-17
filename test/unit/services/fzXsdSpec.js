'use strict';

describe('service', function() {

	beforeEach(module('definitionsCenter.services'));

	describe('The xml schema parser', function() {

		it('should parse a simple element with all the basic info', inject(function(fzXsd) {
			var parsedSchema = fzXsd.parse(xsd_simpleElement);

			expect(parsedSchema.rootElement.name).toEqual('person');
			expect(parsedSchema.rootElement.label).toEqual('Pessoa');
			expect(parsedSchema.rootElement.documentation).toEqual('Humano');
			expect(parsedSchema.rootElement.placeholder).toEqual('Nome da Pessoa');
		}));

		it('should set a default documentation message when none is available', inject(function(fzXsd) {
			var parsedSchema = fzXsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.documentation).toEqual('.noHelp');
		}));

		it("should set the name of the element as it's label if none is specified ", inject(function(fzXsd) {
			var parsedSchema = fzXsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.label).toEqual('person');
		}));

		it("should define an empty placeholder when the element doesn't have one", inject(function(fzXsd) {
			var parsedSchema = fzXsd.parse(xsd_simpleElement_minimalData);

			expect(parsedSchema.rootElement.placeholder).toEqual('');
		}));

		it("should give a clear explanation when it doesn't find a root element", inject(function(fzXsd) {
			var noRootElement = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>';

			expect(function() {
				fzXsd.parse(noRootElement)
			}).toThrow();

		}));
	});
});