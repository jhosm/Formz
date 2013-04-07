(function() {
	'use strict';

	describe('filter', function() {
		beforeEach(function() {
			module('formz.services');
			module('formz.filters');
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
}());