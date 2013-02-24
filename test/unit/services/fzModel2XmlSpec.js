'use strict';

describe('service', function() {

	beforeEach(module('formz.services'));

	describe('The xsd -> xml serializer', function() {
		it('should serialize an xsd javascript structure into an xml instance string', inject(function(fzModel2Xml) {
			var xmlSchema = {
				rootElement: {
					name: 'person',
					value: 'Little John'
				}
			};

			expect(fzModel2Xml.toString(xmlSchema)).toEqual("<person>Little John</person>");
		}));
	});
});