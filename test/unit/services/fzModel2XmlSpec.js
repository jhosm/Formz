'use strict';

describe('service', function() {

	beforeEach(module('formz.services'));

	describe('The model -> xml serializer', function() {
		it('should return the empty string when given a null or undefined model', inject(function(fzModel2Xml) {
			expect(fzModel2Xml.toString(null)).toBe('');
			expect(fzModel2Xml.toString()).toBe('');
		}));

		it('should serialize a model structure into an xml instance string', inject(function(fzModel2Xml) {
			var model = {
				rootElement: {
					name: 'person',
					children: [{
						name: '@gender',
						value: 'male'
					}, {
						name: 'name',
						children: [{
							name: 'firstName',
							value: 'Little'
						},{
							name: 'lastName',
							value: 'John'
						}]
					}]
				}
			};

			expect(fzModel2Xml.toString(model)).toBe('<person gender="male"><name><firstName>Little</firstName><lastName>John</lastName></name></person>');
		}));

		it('should serialize a model with a target namespace into an xml instance string', inject(function(fzModel2Xml) {
			var model = {
				namespace: 'http://formz.com/ANamespace',
				rootElement: {
					name: 'person',
					children: [{
						name: '@gender',
						value: 'male'
					}]
				}
			};

			expect(fzModel2Xml.toString(model)).toBe('<person xmlns="http://formz.com/ANamespace" gender="male"></person>');
		}));
	});
});