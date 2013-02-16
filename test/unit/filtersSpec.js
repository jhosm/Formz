'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
	beforeEach(function() {
		module('definitionsCenter.services');
		module('definitionsCenter.filters');
	});


	describe('asXml', function() {

		it('should serialize into xml', inject(function(asXmlFilter) {
			var xmlSchema = {
				rootElement: {
					name: 'person',
					value: 'Little John'
				}
			};
			expect(asXmlFilter(xmlSchema)).toEqual('<person>Little John</person>');
		}));
	});
});